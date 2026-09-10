import { useEffect, useState } from "react";
import { getDonorProfile, updateDonorProfile } from "../services/api";

function DonorDashboard() {
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(true);
  const [donor, setDonor] = useState(null);

  // ✅ editable form state
  const [formData, setFormData] = useState({
    bloodGroup: "",
    city: "",
    lastDonationDate: "",
    isAvailable: true,
  });

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await getDonorProfile(token);
      setDonor(res.data);

      setFormData({
        bloodGroup: res.data.bloodGroup || "",
        city: res.data.city || "",
        lastDonationDate: res.data.lastDonationDate
          ? res.data.lastDonationDate.substring(0, 10)
          : "",
        isAvailable: res.data.isAvailable ?? true,
      });
    } catch (err) {
      alert("❌ Failed to load donor profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await updateDonorProfile(formData, token);
      alert("✅ Profile updated successfully!");
      fetchProfile();
    } catch (err) {
      alert("❌ Failed to update donor profile");
    }
  };

  // ✅ eligibility logic
  const getEligibility = (lastDonationDate) => {
    if (!lastDonationDate) return { ok: true, msg: "✅ Eligible to donate" };

    const lastDate = new Date(lastDonationDate);
    const now = new Date();

    const diffDays = Math.floor((now - lastDate) / (1000 * 60 * 60 * 24));

    if (diffDays >= 90)
      return { ok: true, msg: "✅ Eligible to donate (90+ days)" };

    return {
      ok: false,
      msg: `❌ Not eligible yet (${90 - diffDays} days remaining)`,
    };
  };

  const eligibility = getEligibility(formData.lastDonationDate);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fdf2f2",
        padding: "40px 20px",
      }}
    >
      {/* ✅ Center container */}
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Page Header */}
        <h2
          style={{ color: "#8b0000", marginBottom: "5px", textAlign: "center" }}
        >
          Donor Dashboard
        </h2>

        <p style={{ color: "#555", marginBottom: "30px", textAlign: "center" }}>
          Manage your donor profile, availability and eligibility status.
        </p>

        {loading ? (
          <p style={{ fontWeight: "bold" }}>Loading donor profile...</p>
        ) : !donor ? (
          <p style={{ color: "red" }}>No donor data found.</p>
        ) : (
          <>
            {/* ✅ Row 1: 2 columns */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "22px",
                marginBottom: "22px",
              }}
            >
              {/* My Profile */}
              <div
                style={{
                  background: "#ffffff",
                  padding: "26px",
                  borderRadius: "14px",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                  borderLeft: "7px solid #8b0000",
                }}
              >
                <h3 style={{ color: "#8b0000", marginBottom: "15px" }}>
                  My Profile
                </h3>

                <p>
                  <strong>Name:</strong> {donor.name}
                </p>
                <p>
                  <strong>Email:</strong> {donor.email}
                </p>
                <p>
                  <strong>Blood Group:</strong>{" "}
                  {donor.bloodGroup || "Not updated"}
                </p>
                <p>
                  <strong>City:</strong> {donor.city || "Not updated"}
                </p>

                <p>
                  <strong>Availability:</strong>{" "}
                  <span
                    style={{
                      padding: "4px 12px",
                      borderRadius: "999px",
                      fontSize: "12px",
                      fontWeight: "bold",
                      background: formData.isAvailable ? "#d4edda" : "#f8d7da",
                      color: formData.isAvailable ? "#155724" : "#721c24",
                    }}
                  >
                    {formData.isAvailable ? "Available" : "Not Available"}
                  </span>
                </p>
              </div>

              {/* Donation Eligibility */}
              <div
                style={{
                  background: "#ffffff",
                  padding: "26px",
                  borderRadius: "14px",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                }}
              >
                <h3 style={{ color: "#8b0000", marginBottom: "12px" }}>
                  Donation Eligibility
                </h3>

                <p
                  style={{
                    padding: "14px 16px",
                    borderRadius: "12px",
                    fontWeight: "bold",
                    background: eligibility.ok ? "#e6ffed" : "#ffe6e6",
                    color: eligibility.ok ? "#0f5132" : "#842029",
                  }}
                >
                  {eligibility.msg}
                </p>

                <p
                  style={{
                    fontSize: "13px",
                    color: "#666",
                    marginTop: "10px",
                  }}
                >
                  Note: Generally donors can donate blood again after 90 days.
                </p>
              </div>
            </div>

            {/* ✅ Row 2: Full Width Update Profile */}
            <div
              style={{
                background: "#ffffff",
                padding: "26px",
                borderRadius: "14px",
                boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
              }}
            >
              <h3 style={{ color: "#8b0000", marginBottom: "15px" }}>
                Update Profile
              </h3>

              <form onSubmit={handleSave}>
                <label style={labelStyle}>Blood Group</label>
                <select
                  style={inputStyle}
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Select Blood Group --</option>
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                    (bg) => (
                      <option key={bg} value={bg}>
                        {bg}
                      </option>
                    ),
                  )}
                </select>

                <label style={labelStyle}>City</label>
                <input
                  style={inputStyle}
                  name="city"
                  placeholder="Enter your city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />

                <label style={labelStyle}>Last Donation Date</label>
                <input
                  style={inputStyle}
                  type="date"
                  name="lastDonationDate"
                  value={formData.lastDonationDate}
                  onChange={handleChange}
                />

                <label style={labelStyle}>Availability</label>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginTop: "6px",
                  }}
                >
                  <input
                    type="checkbox"
                    name="isAvailable"
                    checked={formData.isAvailable}
                    onChange={handleChange}
                  />
                  <span style={{ fontWeight: "bold" }}>
                    {formData.isAvailable
                      ? "I am available to donate"
                      : "Not available currently"}
                  </span>
                </div>

                <button
                  type="submit"
                  style={{
                    width: "100%",
                    marginTop: "18px",
                    background: "#8b0000",
                    color: "#fff",
                    border: "none",
                    padding: "12px",
                    borderRadius: "12px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: "15px",
                  }}
                >
                  Save Changes
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const labelStyle = {
  display: "block",
  marginTop: "12px",
  marginBottom: "6px",
  fontWeight: "bold",
  color: "#444",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "6px",
  borderRadius: "10px",
  border: "1px solid #ccc",
  outline: "none",
};

export default DonorDashboard;
