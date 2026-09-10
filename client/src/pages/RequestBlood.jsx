import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RequestBlood() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    requesterName: "",
    requesterPhone: "",
    requesterCity: "",
    hospitalName: "",
    bloodGroup: "O+",
    units: 1,
    urgency: "Emergency",
  });

  // ✅ tracking id state
  const [trackingId, setTrackingId] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(trackingId);
      alert("✅ Tracking ID copied!");
    } catch {
      alert("❌ Failed to copy");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTrackingId("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/public/request",
        formData
      );

      alert("✅ Blood request submitted successfully! Admin will review shortly.");

      // ✅ Tracking ID handling (supports both formats)
      const id = res.data.requestId || res.data.request?._id;

      if (id) {
        setTrackingId(id);
      }

      setFormData({
        requesterName: "",
        requesterPhone: "",
        requesterCity: "",
        hospitalName: "",
        bloodGroup: "O+",
        units: 1,
        urgency: "Emergency",
      });
    } catch (err) {
      alert("❌ Failed to submit request. Try again.");
    }
  };

  return (
    <div
      style={{
        padding: "40px",
        minHeight: "90vh",
        background: "#f9f9f9",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "520px",
          background: "#fff",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#8b0000" }}>
          Emergency Blood Request
        </h2>
        <p style={{ textAlign: "center", color: "#555", marginBottom: "20px" }}>
          Fill this form to request blood. No login required.
        </p>

        {/* ✅ Tracking ID display */}
        {trackingId && (
          <div
            style={{
              background: "#fff3f3",
              border: "1px solid #ffcccc",
              padding: "14px",
              borderRadius: "10px",
              marginBottom: "18px",
            }}
          >
            <p style={{ margin: 0, color: "#8b0000", fontWeight: "bold" }}>
              Tracking ID generated ✅
            </p>

            <p
              style={{
                marginTop: "8px",
                fontWeight: "bold",
                wordBreak: "break-all",
              }}
            >
              {trackingId}
            </p>

            <p style={{ fontSize: "12px", marginTop: "8px", color: "#444" }}>
              Save this Tracking ID to track request status.
            </p>

            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <button
                type="button"
                onClick={handleCopy}
                style={{
                  padding: "8px 10px",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "bold",
                  background: "#8b0000",
                  color: "#fff",
                  flex: 1,
                }}
              >
                Copy ID
              </button>

              {/* ✅ FIXED: send ID to tracking page */}
              <button
                type="button"
                onClick={() => navigate(`/track-request?id=${trackingId}`)}
                style={{
                  padding: "8px 10px",
                  borderRadius: "8px",
                  border: "1px solid #8b0000",
                  cursor: "pointer",
                  fontWeight: "bold",
                  background: "#fff",
                  color: "#8b0000",
                  flex: 1,
                }}
              >
                Track Now
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            style={inputStyle}
            name="requesterName"
            placeholder="Patient / Requester Name"
            value={formData.requesterName}
            onChange={handleChange}
            required
          />

          <input
            style={inputStyle}
            name="requesterPhone"
            placeholder="Phone Number"
            value={formData.requesterPhone}
            onChange={handleChange}
            required
          />

          <input
            style={inputStyle}
            name="requesterCity"
            placeholder="City"
            value={formData.requesterCity}
            onChange={handleChange}
            required
          />

          <input
            style={inputStyle}
            name="hospitalName"
            placeholder="Hospital Name (optional)"
            value={formData.hospitalName}
            onChange={handleChange}
          />

          <select
            style={inputStyle}
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
          >
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </select>

          <input
            style={inputStyle}
            name="units"
            type="number"
            min="1"
            value={formData.units}
            onChange={handleChange}
            required
          />

          <select
            style={inputStyle}
            name="urgency"
            value={formData.urgency}
            onChange={handleChange}
          >
            <option value="Normal">Normal</option>
            <option value="Emergency">Emergency</option>
          </select>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              background: "#8b0000",
              color: "#fff",
              fontWeight: "bold",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
              marginTop: "10px",
            }}
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
};

export default RequestBlood;
