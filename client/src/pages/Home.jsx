import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ minHeight: "100vh", background: "#fdf2f2" }}>
      {/* ✅ HERO SECTION */}
      <section
        style={{
          padding: "70px 20px 40px",
          background: "linear-gradient(180deg, #fff 0%, #fdf2f2 100%)",
        }}
      >
        <div
          style={{
            maxWidth: "1150px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: "30px",
            alignItems: "center",
          }}
        >
          {/* Left */}
          <div>
            <h1
              style={{
                color: "#8b0000",
                fontSize: "44px",
                lineHeight: "1.2",
                marginBottom: "14px",
              }}
            >
              Online Blood Bank & Donor Management Platform
            </h1>

            <p
              style={{
                color: "#555",
                fontSize: "16px",
                lineHeight: "1.7",
                maxWidth: "650px",
                marginBottom: "26px",
              }}
            >
              A modern system to manage blood donors, blood inventory and blood
              requests efficiently. Public users can request blood and track
              request status in real-time.
            </p>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <Link to="/request-blood" style={{ textDecoration: "none" }}>
                <button style={primaryBtn}>Request Blood</button>
              </Link>

              <Link to="/track-request" style={{ textDecoration: "none" }}>
                <button style={secondaryBtn}>Track Request</button>
              </Link>

              <Link to="/register" style={{ textDecoration: "none" }}>
                <button style={outlineBtn}>Become a Donor</button>
              </Link>
            </div>

            <p style={{ marginTop: "18px", fontSize: "13px", color: "#777" }}>
              Secure • Reliable • Life-Saving Platform
            </p>
          </div>

          {/* Right Card */}
          <div
            style={{
              background: "#fff",
              borderRadius: "18px",
              padding: "26px",
              boxShadow: "0 12px 30px rgba(0,0,0,0.10)",
              border: "1px solid #f1d6d6",
            }}
          >
            <h3 style={{ color: "#8b0000", marginBottom: "16px" }}>
              Quick Access
            </h3>

            <div style={{ display: "grid", gap: "12px" }}>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <button style={{ ...primaryBtn, width: "100%" }}>
                  Login to Dashboard
                </button>
              </Link>

              <Link to="/register" style={{ textDecoration: "none" }}>
                <button style={{ ...secondaryBtn, width: "100%" }}>
                  Register Account
                </button>
              </Link>
            </div>

            <div style={{ marginTop: "18px" }}>
              <p
                style={{
                  fontSize: "13px",
                  color: "#555",
                  lineHeight: "1.6",
                  marginBottom: "10px",
                }}
              >
                ✅ Donor accounts can manage profile & availability ✅ Admin
                verifies requests and manages inventory
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ FEATURES SECTION */}
      <section style={{ padding: "40px 20px" }}>
        <div style={{ maxWidth: "1150px", margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", color: "#8b0000" }}>
            Platform Features
          </h2>
          <p style={{ textAlign: "center", color: "#666", marginTop: "10px" }}>
            Everything required for a real-world blood bank management workflow.
          </p>

          <div
            style={{
              marginTop: "28px",
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "18px",
            }}
          >
            <FeatureCard
              title="Emergency Requests"
              desc="Public users can request blood without login for urgent situations."
              icon="🚑"
            />
            <FeatureCard
              title="Tracking System"
              desc="Every request generates a tracking ID to monitor status updates."
              icon="📌"
            />
            <FeatureCard
              title="Verified Workflow"
              desc="Admin approves / rejects requests after checking inventory availability."
              icon="✅"
            />
            <FeatureCard
              title="Donor Management"
              desc="Donors can update city, blood group and availability status."
              icon="🩸"
            />
          </div>
        </div>
      </section>

      {/* ✅ HOW IT WORKS */}
      <section style={{ padding: "45px 20px", background: "#fff" }}>
        <div style={{ maxWidth: "1150px", margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", color: "#8b0000" }}>
            How It Works
          </h2>
          <p style={{ textAlign: "center", color: "#666", marginTop: "10px" }}>
            Simple process designed for fast approval & transparency.
          </p>

          <div
            style={{
              marginTop: "26px",
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "18px",
            }}
          >
            <StepCard
              step="1"
              title="Submit Request"
              desc="Fill request blood form"
            />
            <StepCard
              step="2"
              title="Admin Review"
              desc="Admin checks request details"
            />
            <StepCard
              step="3"
              title="Inventory Check"
              desc="Stock availability verified"
            />
            <StepCard
              step="4"
              title="Approve / Reject"
              desc="Status updated, request is tracked"
            />
          </div>
        </div>
      </section>

      {/* ✅ STATS */}
      <section style={{ padding: "45px 20px" }}>
        <div style={{ maxWidth: "1150px", margin: "0 auto" }}>
          <div
            style={{
              background: "#8b0000",
              borderRadius: "18px",
              padding: "28px",
              color: "#fff",
              boxShadow: "0 14px 35px rgba(139,0,0,0.25)",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "14px",
                textAlign: "center",
              }}
            >
              <StatItem value="100+" label="Registered Donors" />
              <StatItem value="24/7" label="Emergency Requests" />
              <StatItem value="8+" label="Blood Groups Managed" />
              <StatItem value="Fast" label="Approval Workflow" />
            </div>
          </div>
        </div>
      </section>

      {/* ✅ CTA */}
      <section style={{ padding: "40px 20px", background: "#fff" }}>
        <div
          style={{
            maxWidth: "1150px",
            margin: "0 auto",
            background: "#fff3f3",
            borderRadius: "18px",
            padding: "30px",
            border: "1px solid #ffd3d3",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "18px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h2 style={{ color: "#8b0000", marginBottom: "8px" }}>
              Need blood urgently?
            </h2>
            <p style={{ color: "#555", margin: 0 }}>
              Submit an emergency request and track status instantly.
            </p>
          </div>

          <Link to="/request-blood" style={{ textDecoration: "none" }}>
            <button style={primaryBtn}>Request Blood Now</button>
          </Link>
        </div>
      </section>

      {/* ✅ FOOTER */}
      <footer
        style={{
          marginTop: "20px",
          padding: "25px 20px",
          background: "#8b0000",
          color: "#fff",
        }}
      >
        <div
          style={{
            maxWidth: "1150px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr 1fr",
            gap: "18px",
          }}
        >
          <div>
            <h3 style={{ margin: 0 }}>Blood Bank System</h3>
            <p
              style={{ marginTop: "10px", fontSize: "13px", color: "#ffecec" }}
            >
              Professional donor & inventory management platform built for MCA
              final-year project.
            </p>
          </div>

          <div>
            <h4 style={{ margin: 0 }}>Quick Links</h4>

            <div
              style={{
                marginTop: "10px",
                display: "flex",
                gap: "16px",
                flexWrap: "wrap",
              }}
            >
              <Link to="/" style={footerLinkStyle}>
                Home
              </Link>
              <Link to="/about" style={footerLinkStyle}>
                About
              </Link>
              <Link to="/contact" style={footerLinkStyle}>
                Contact
              </Link>
              <Link to="/login" style={footerLinkStyle}>
                Login
              </Link>
              <Link to="/register" style={footerLinkStyle}>
                Register
              </Link>
            </div>
          </div>

          <div>
            <h4 style={{ margin: 0 }}>Support</h4>
            <p
              style={{ marginTop: "10px", fontSize: "13px", color: "#ffecec" }}
            >
              Contact: ashwidibrahim@gmail.com <br />
              Emergency: +91-9980644527
            </p>
          </div>
        </div>

        <p style={{ textAlign: "center", marginTop: "18px", fontSize: "13px" }}>
          © {new Date().getFullYear()} Blood Bank System • All Rights Reserved
        </p>
      </footer>
    </div>
  );
}

/* ================= Components ================= */

function FeatureCard({ icon, title, desc }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "16px",
        padding: "18px",
        border: "1px solid #f1d6d6",
        boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
        minHeight: "160px",
      }}
    >
      <div style={{ fontSize: "26px" }}>{icon}</div>
      <h3 style={{ color: "#8b0000", marginTop: "10px", marginBottom: "8px" }}>
        {title}
      </h3>
      <p style={{ color: "#666", fontSize: "14px", lineHeight: "1.6" }}>
        {desc}
      </p>
    </div>
  );
}

function StepCard({ step, title, desc }) {
  return (
    <div
      style={{
        background: "#fdf2f2",
        borderRadius: "16px",
        padding: "18px",
        border: "1px solid #ffdada",
      }}
    >
      <div
        style={{
          width: "38px",
          height: "38px",
          borderRadius: "12px",
          background: "#8b0000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontWeight: "bold",
          marginBottom: "12px",
        }}
      >
        {step}
      </div>

      <h3 style={{ margin: 0, color: "#8b0000" }}>{title}</h3>
      <p style={{ marginTop: "8px", color: "#666", fontSize: "14px" }}>
        {desc}
      </p>
    </div>
  );
}

function StatItem({ value, label }) {
  return (
    <div style={{ padding: "10px" }}>
      <h2 style={{ margin: 0 }}>{value}</h2>
      <p style={{ margin: 0, fontSize: "13px", color: "#ffecec" }}>{label}</p>
    </div>
  );
}

/* ================= Button Styles ================= */

const primaryBtn = {
  background: "#8b0000",
  color: "#fff",
  border: "none",
  padding: "12px 18px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "15px",
};

const secondaryBtn = {
  background: "#e9e9e9",
  color: "#333",
  border: "none",
  padding: "12px 18px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "15px",
};

const outlineBtn = {
  background: "#fff",
  color: "#8b0000",
  border: "1px solid #8b0000",
  padding: "12px 18px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "15px",
};
const footerLinkStyle = {
  color: "#ffecec",
  fontSize: "13px",
  textDecoration: "none",
  fontWeight: "500",
};

export default Home;
