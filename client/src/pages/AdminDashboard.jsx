import { useEffect, useState } from "react";
import axios from "axios";
import { getInventory, getRequests } from "../services/api";

function AdminDashboard() {
  const [inventory, setInventory] = useState([]);
  const [requests, setRequests] = useState([]);

  // ✅ NEW: donors state
  const [donors, setDonors] = useState([]);

  // ✅ new: inventory add form state
  const [bloodGroup, setBloodGroup] = useState("O+");
  const [units, setUnits] = useState(1);

  const token = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      const invRes = await getInventory(token);
      const reqRes = await getRequests(token);

      // ✅ NEW: fetch donors list
      const donorRes = await axios.get("http://localhost:5000/api/donors", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setInventory(invRes.data);
      setRequests(reqRes.data);
      setDonors(donorRes.data);
    } catch (err) {
      alert("Failed to load admin data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ Add/Update Inventory Stock
  const handleAddStock = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/inventory/add",
        { bloodGroup, units: Number(units) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("✅ Blood stock updated successfully");
      setUnits(1);
      fetchData();
    } catch (err) {
      alert("❌ Failed to update stock");
    }
  };

  // ✅ Approve Request
  const handleApprove = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/requests/${id}/approve`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("✅ Request Approved");
      fetchData();
    } catch (err) {
      alert("❌ Failed to approve request");
    }
  };

  // ✅ Reject Request
  const handleReject = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/requests/${id}/reject`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("❌ Request Rejected");
      fetchData();
    } catch (err) {
      alert("❌ Failed to reject request");
    }
  };

  // ✅ summary
  const totalUnits = inventory.reduce((sum, item) => sum + (item.units || 0), 0);
  const expiredCount = inventory.filter((i) => i.isExpired).length;

  // ✅ Donor eligibility (admin view)
  const getEligibility = (lastDonationDate) => {
    if (!lastDonationDate) {
      return { ok: true, msg: "Eligible", detail: "No donation record" };
    }

    const lastDate = new Date(lastDonationDate);
    const now = new Date();

    const diffDays = Math.floor((now - lastDate) / (1000 * 60 * 60 * 24));
    if (diffDays >= 90) {
      return { ok: true, msg: "Eligible", detail: `Last donated ${diffDays} days ago` };
    }

    return {
      ok: false,
      msg: "Not Eligible",
      detail: `${90 - diffDays} days remaining`,
    };
  };

  return (
    <div style={{ padding: "30px", background: "#f6f6f6", minHeight: "100vh" }}>
      <h2 style={{ color: "#8b0000", textAlign: "center", marginBottom: "25px" }}>
        Admin Dashboard
      </h2>

      {/* ✅ Summary Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "16px",
          maxWidth: "1100px",
          margin: "0 auto 22px auto",
        }}
      >
        <div style={summaryCard}>
          <p style={summaryTitle}>Total Units Available</p>
          <h2 style={summaryNumber}>{totalUnits}</h2>
        </div>

        <div style={summaryCard}>
          <p style={summaryTitle}>Expired Blood Groups</p>
          <h2 style={summaryNumber}>{expiredCount}</h2>
        </div>
      </div>

      {/* ✅ Inventory Section */}
      <div style={{ ...cardStyle, maxWidth: "1100px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "18px",
            marginBottom: "18px",
          }}
        >
          <h3 style={{ margin: 0 }}>Blood Inventory</h3>

          {/* ✅ Add stock form */}
          <form
            onSubmit={handleAddStock}
            style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
          >
            <select
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              style={inputStyle}
            >
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                <option key={bg} value={bg}>
                  {bg}
                </option>
              ))}
            </select>

            <input
              type="number"
              min="1"
              value={units}
              onChange={(e) => setUnits(e.target.value)}
              style={inputStyle}
              placeholder="Units"
              required
            />

            <button type="submit" style={primaryBtn}>
              + Add / Update Stock
            </button>
          </form>
        </div>

        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Blood Group</th>
              <th style={thStyle}>Units</th>
              <th style={thStyle}>Expired</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item._id}>
                <td style={tdStyle}>{item.bloodGroup}</td>
                <td style={tdStyle}>{item.units}</td>
                <td style={tdStyle}>
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: "999px",
                      fontSize: "12px",
                      fontWeight: "bold",
                      background: item.isExpired ? "#ffe6e6" : "#e6ffed",
                      color: item.isExpired ? "#842029" : "#0f5132",
                    }}
                  >
                    {item.isExpired ? "Expired" : "Valid"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ NEW: Donor Management Section */}
      <div
        style={{
          ...cardStyle,
          marginTop: "25px",
          maxWidth: "1100px",
          marginInline: "auto",
        }}
      >
        <h3 style={{ marginBottom: "15px" }}>Donor Management</h3>

        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Blood Group</th>
              <th style={thStyle}>City</th>
              <th style={thStyle}>Availability</th>
              <th style={thStyle}>Eligibility</th>
              <th style={thStyle}>Last Donation</th>
            </tr>
          </thead>

          <tbody>
            {donors.length === 0 ? (
              <tr>
                <td style={tdStyle} colSpan="7">
                  No donors found.
                </td>
              </tr>
            ) : (
              donors.map((d) => {
                const eligibility = getEligibility(d.lastDonationDate);

                return (
                  <tr key={d._id}>
                    <td style={tdStyle}>{d.name}</td>
                    <td style={tdStyle}>{d.email}</td>
                    <td style={tdStyle}>{d.bloodGroup || "-"}</td>
                    <td style={tdStyle}>{d.city || "-"}</td>

                    <td style={tdStyle}>
                      <span
                        style={{
                          padding: "4px 10px",
                          borderRadius: "999px",
                          fontSize: "12px",
                          fontWeight: "bold",
                          background: d.isAvailable ? "#e6ffed" : "#ffe6e6",
                          color: d.isAvailable ? "#0f5132" : "#842029",
                        }}
                      >
                        {d.isAvailable ? "Available" : "Not Available"}
                      </span>
                    </td>

                    <td style={tdStyle}>
                      <span
                        style={{
                          padding: "4px 10px",
                          borderRadius: "999px",
                          fontSize: "12px",
                          fontWeight: "bold",
                          background: eligibility.ok ? "#e6ffed" : "#ffe6e6",
                          color: eligibility.ok ? "#0f5132" : "#842029",
                        }}
                      >
                        {eligibility.msg}
                      </span>
                      <div style={{ fontSize: "12px", color: "#555", marginTop: "4px" }}>
                        {eligibility.detail}
                      </div>
                    </td>

                    <td style={tdStyle}>
                      {d.lastDonationDate
                        ? new Date(d.lastDonationDate).toLocaleDateString()
                        : "-"}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ Requests Section */}
      <div
        style={{
          ...cardStyle,
          marginTop: "25px",
          maxWidth: "1100px",
          marginInline: "auto",
        }}
      >
        <h3 style={{ marginBottom: "15px" }}>Blood Requests</h3>

        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Requester</th>
              <th style={thStyle}>Phone</th>
              <th style={thStyle}>City</th>
              <th style={thStyle}>Blood Group</th>
              <th style={thStyle}>Units</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Action</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((req) => (
              <tr key={req._id}>
                <td style={tdStyle}>
                  {req.requester?.name || req.requesterName || "Unknown"}
                </td>
                <td style={tdStyle}>{req.requesterPhone || "-"}</td>
                <td style={tdStyle}>{req.requesterCity || "-"}</td>
                <td style={tdStyle}>{req.bloodGroup}</td>
                <td style={tdStyle}>{req.units}</td>

                <td style={tdStyle}>
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: "999px",
                      fontWeight: "bold",
                      fontSize: "12px",
                      background:
                        req.status === "Approved"
                          ? "#e6ffed"
                          : req.status === "Rejected"
                          ? "#ffe6e6"
                          : "#fff3cd",
                      color:
                        req.status === "Approved"
                          ? "#0f5132"
                          : req.status === "Rejected"
                          ? "#842029"
                          : "#664d03",
                    }}
                  >
                    {req.status}
                  </span>
                </td>

                <td style={tdStyle}>
                  {req.status === "Pending" ? (
                    <>
                      <button onClick={() => handleApprove(req._id)} style={approveBtn}>
                        Approve
                      </button>

                      <button onClick={() => handleReject(req._id)} style={rejectBtn}>
                        Reject
                      </button>
                    </>
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ✅ Simple Styles */
const cardStyle = {
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.12)",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
};

const thStyle = {
  padding: "10px",
  background: "#8b0000",
  color: "white",
  textAlign: "left",
};

const tdStyle = {
  padding: "10px",
  borderBottom: "1px solid #ddd",
};

const approveBtn = {
  background: "green",
  color: "white",
  border: "none",
  padding: "6px 10px",
  borderRadius: "6px",
  cursor: "pointer",
  marginRight: "8px",
};

const rejectBtn = {
  background: "red",
  color: "white",
  border: "none",
  padding: "6px 10px",
  borderRadius: "6px",
  cursor: "pointer",
};

const primaryBtn = {
  background: "#8b0000",
  color: "#fff",
  border: "none",
  padding: "10px 14px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
};

const inputStyle = {
  padding: "10px",
  borderRadius: "10px",
  border: "1px solid #ccc",
  minWidth: "120px",
};

const summaryCard = {
  background: "#fff",
  padding: "18px",
  borderRadius: "14px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.12)",
  borderLeft: "7px solid #8b0000",
};

const summaryTitle = {
  margin: 0,
  color: "#555",
  fontWeight: "bold",
};

const summaryNumber = {
  margin: "10px 0 0 0",
  color: "#8b0000",
};

export default AdminDashboard;
