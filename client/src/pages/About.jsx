import React from "react";

function About() {
  return (
    <div style={{ minHeight: "100vh", background: "#fdf2f2" }}>
      {/* Hero Section */}
      <section
        style={{
          padding: "70px 20px 40px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h1
            style={{
              fontSize: "42px",
              color: "#8b0000",
              marginBottom: "12px",
              lineHeight: 1.2,
            }}
          >
            A modern blood donation & request management system
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
            This platform is designed to help hospitals, donors, and patients by
            streamlining blood donation availability, inventory monitoring, and
            blood request approvals in one secure system.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ padding: "0 20px 70px" }}>
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: "22px",
          }}
        >
          {/* Left column */}
          <div style={{ display: "grid", gap: "18px" }}>
            {/* Mission Card */}
            <div style={cardStyle}>
              <h2 style={cardTitle}>Our Mission</h2>
              <p style={cardText}>
                To provide a reliable digital platform that improves
                coordination between donors and blood banks, reduces delays in
                emergency situations, and ensures transparency in blood request
                approvals.
              </p>
            </div>

            {/* Why this project */}
            <div style={cardStyle}>
              <h2 style={cardTitle}>Why this project?</h2>
              <p style={cardText}>
                In real-world situations, blood availability and response time
                is critical. A centralized system helps reduce confusion,
                improves decision-making for administrators, and supports donors
                in tracking eligibility & availability.
              </p>
            </div>

            {/* Features */}
            <div style={cardStyle}>
              <h2 style={cardTitle}>Key Highlights</h2>

              <div style={{ display: "grid", gap: "12px", marginTop: "12px" }}>
                <Feature
                  title="Donor Dashboard"
                  desc="Donors can update blood group, city, availability status and view donation eligibility."
                />
                <Feature
                  title="Admin Dashboard"
                  desc="Admin manages inventory, monitors expiry, and approves/rejects blood requests."
                />
                <Feature
                  title="Public Request + Tracking"
                  desc="Public users can request blood without login and track approval status using tracking ID."
                />
                <Feature
                  title="Secure Authentication"
                  desc="Role-based access using JWT authentication for donor and admin accounts."
                />
              </div>
            </div>
          </div>

          {/* Right column */}
          <div style={{ display: "grid", gap: "18px" }}>
            {/* Tech Stack */}
            <div style={cardStyle}>
              <h2 style={cardTitle}>Tech Stack</h2>

              <div style={{ marginTop: "12px", display: "grid", gap: "10px" }}>
                <TagRow label="Frontend" value="React + React Router + Axios" />
                <TagRow label="Backend" value="Node.js + Express.js" />
                <TagRow label="Database" value="MongoDB + Mongoose" />
                <TagRow label="Security" value="JWT Auth + Middleware" />
              </div>
            </div>

            {/* Professional Note */}
            <div style={{ ...cardStyle, borderLeft: "7px solid #8b0000" }}>
              <h2 style={cardTitle}>Professional Note</h2>
              <p style={cardText}>
                This project is developed with a focus on clean UI, scalable
                backend API design, and real-world workflow clarity—such as
                donor eligibility, inventory expiry, request tracking, and admin
                approvals.
              </p>
            </div>

            {/* Developer Card */}
            <div style={cardStyle}>
              <h2 style={cardTitle}>Developer</h2>

              <div
                style={{
                  marginTop: "14px",
                  padding: "16px",
                  borderRadius: "12px",
                  background: "#fff7f7",
                  border: "1px solid #ffd6d6",
                  display: "flex",
                  gap: "14px",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                {/* ✅ Photo */}
                <img
                  src={new URL("../assets/me.jpeg", import.meta.url).href}
                  alt="Developer"
                  style={{
                    width: "90px",
                    height: "90px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "3px solid #8b0000",
                  }}
                />

                {/* ✅ Details */}
                <div
                  style={{ fontSize: "14px", color: "#444", lineHeight: 1.8 }}
                >
                  <p style={{ margin: 0 }}>
                    <strong style={{ color: "#8b0000" }}>Name:</strong> Ashwid
                    Ibrahim
                  </p>
                  <p style={{ margin: 0 }}>
                    <strong style={{ color: "#8b0000" }}>Course:</strong> MCA
                    (Final Year)
                  </p>
                  <p style={{ margin: 0 }}>
                    <strong style={{ color: "#8b0000" }}>College:</strong> SDIT
                    Kenjar
                  </p>
                  <p style={{ margin: 0 }}>
                    <strong style={{ color: "#8b0000" }}>Location:</strong>{" "}
                    Mangalore, India
                  </p>
                  <p style={{ margin: 0 }}>
                    <strong style={{ color: "#8b0000" }}>Email:</strong>{" "}
                    ashwidibrahim@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ================= Small Components ================= */
function Feature({ title, desc }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "12px",
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          minWidth: "10px",
          height: "10px",
          marginTop: "6px",
          borderRadius: "999px",
          background: "#8b0000",
        }}
      />
      <div>
        <p style={{ margin: 0, fontWeight: "bold", color: "#222" }}>{title}</p>
        <p style={{ margin: "4px 0 0", color: "#555", fontSize: "14px" }}>
          {desc}
        </p>
      </div>
    </div>
  );
}

function TagRow({ label, value }) {
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

/* ================= Styles ================= */
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

export default About;
