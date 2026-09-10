import React, { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("✅ Message sent successfully! (Demo mode)");

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div style={{ minHeight: "100vh", background: "#fdf2f2" }}>
      {/* Hero */}
      <section style={{ padding: "70px 20px 40px", textAlign: "center" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h1
            style={{
              fontSize: "42px",
              color: "#8b0000",
              marginBottom: "12px",
              lineHeight: 1.2,
            }}
          >
            Get in touch with us
          </h1>

          <p
            style={{
              maxWidth: "850px",
              margin: "0 auto",
              color: "#555",
              fontSize: "16px",
              lineHeight: 1.7,
            }}
          >
            Have questions, suggestions, or need support? Reach out to us — we’ll
            respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Grid */}
      <section style={{ padding: "0 20px 70px" }}>
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "22px",
          }}
        >
          {/* Left: Contact Info */}
          <div style={{ display: "grid", gap: "18px" }}>
            <div style={cardStyle}>
              <h2 style={cardTitle}>Contact Information</h2>
              <p style={cardText}>
                You can contact us directly through email/phone or send a quick
                message using the form.
              </p>

              <div style={{ marginTop: "14px", display: "grid", gap: "10px" }}>
                <InfoRow label="Email" value="ashwidibrahim@gmail.com" />
                <InfoRow label="Phone" value="+91 9980644527" />
                <InfoRow label="Location" value="Mangalore, Karnataka" />
              </div>
            </div>

            <div style={{ ...cardStyle, borderLeft: "7px solid #8b0000" }}>
              <h2 style={cardTitle}>Support Hours</h2>
              <p style={cardText}>
                Our support team is available to respond within working hours.
              </p>

              <p style={{ marginTop: "12px", color: "#444", fontSize: "14px" }}>
                <strong style={{ color: "#8b0000" }}>Mon - Sat:</strong> 9:00 AM
                - 6:00 PM <br />
                <strong style={{ color: "#8b0000" }}>Sunday:</strong> Emergency
                only
              </p>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div style={cardStyle}>
            <h2 style={cardTitle}>Send a Message</h2>
            <p style={cardText}>
              Fill in the details below and we’ll get back to you.
            </p>

            <form onSubmit={handleSubmit} style={{ margin: "14px" }}>
              <label style={labelStyle}>Full Name</label>
              <input
                style={inputStyle}
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />

              <label style={labelStyle}>Email</label>
              <input
                style={inputStyle}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />

              <label style={labelStyle}>Subject</label>
              <input
                style={inputStyle}
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Enter subject"
                required
              />

              <label style={labelStyle}>Message</label>
              <textarea
                style={{ ...inputStyle, minHeight: "110px", resize: "none" }}
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message..."
                required
              />

              <button type="submit" style={primaryBtn}>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ✅ Small Component */
function InfoRow({ label, value }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: "12px",
        flexWrap: "wrap",
        padding: "10px 12px",
        borderRadius: "12px",
        background: "#fff7f7",
        border: "1px solid #ffd6d6",
      }}
    >
      <span style={{ fontWeight: "bold", color: "#8b0000", fontSize: "13px" }}>
        {label}
      </span>
      <span style={{ color: "#444", fontSize: "13px" }}>{value}</span>
    </div>
  );
}

/* ✅ Styles */
const cardStyle = {
  background: "#ffffff",
  padding: "22px",
  borderRadius: "16px",
  boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
};

const cardTitle = {
  margin: 0,
  color: "#8b0000",
  fontSize: "18px",
};

const cardText = {
  marginTop: "10px",
  marginBottom: 0,
  color: "#555",
  lineHeight: 1.7,
  fontSize: "14.5px",
};

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
  borderRadius: "12px",
  border: "1px solid #ccc",
  outline: "none",
};

const primaryBtn = {
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
};

export default Contact;
