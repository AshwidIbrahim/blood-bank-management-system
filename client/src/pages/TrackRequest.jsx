import { useState } from "react";
import { trackPublicRequest } from "../services/api";

function TrackRequest() {
  const [phone, setPhone] = useState("");
  const [requestId, setRequestId] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult(null);

    try {
      const res = await trackPublicRequest({ requestId, phone });
      setResult(res.data);
    } catch (err) {
      alert("❌ Request not found. Check Tracking ID and Phone number.");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2 style={{ color: "#8b0000" }}>Track Blood Request</h2>

      <form onSubmit={handleSubmit} style={{ maxWidth: "450px" }}>
        <input
          className="input"
          placeholder="Tracking ID"
          value={requestId}
          onChange={(e) => setRequestId(e.target.value)}
          required
        />
        <br /><br />

        <input
          className="input"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <br /><br />

        <button className="btn" type="submit">
          Track
        </button>
      </form>

      {result && (
        <div style={{ marginTop: "20px", padding: "15px", background: "#fff3f3", borderRadius: "10px" }}>
          <h3 style={{ color: "#8b0000" }}>Status: {result.status}</h3>
          <p><b>Name:</b> {result.requesterName}</p>
          <p><b>Phone:</b> {result.phone}</p>
          <p><b>City:</b> {result.city}</p>
          <p><b>Hospital:</b> {result.hospitalName || "N/A"}</p>
          <p><b>Blood Group:</b> {result.bloodGroup}</p>
          <p><b>Units:</b> {result.units}</p>
          <p><b>Urgency:</b> {result.urgency}</p>
        </div>
      )}
    </div>
  );
}

export default TrackRequest;
