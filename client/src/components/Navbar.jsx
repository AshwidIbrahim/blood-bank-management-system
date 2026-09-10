import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // ✅ admin / donor

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // ✅ common style for all links
  const linkStyle = ({ isActive }) => ({
    color: isActive ? "#8b0000" : "#fff",
    backgroundColor: isActive ? "#fff" : "transparent",
    padding: "6px 12px",
    borderRadius: "4px",
    textDecoration: "none",
    marginRight: "20px",
    fontWeight: isActive ? "bold" : "normal",
    border: "1px solid transparent",
  });

  // ✅ Decide dashboard route based on role
  const dashboardPath = role === "admin" ? "/admin" : "/donor";

  return (
    <nav
      style={{
        background: "#8b0000",
        padding: "12px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "#fff",
      }}
    >
      {/* Left side - Brand */}
      <div style={{ fontSize: "18px", fontWeight: "bold" }}>
        <NavLink to="/" style={{ color: "#fff", textDecoration: "none" }}>
          Blood Bank System
        </NavLink>
      </div>

      {/* Right side - Links */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <NavLink to="/" style={linkStyle}>
          Home
        </NavLink>

        <NavLink to="/about" style={linkStyle}>
          About
        </NavLink>

        <NavLink to="/contact" style={linkStyle}>
          Contact
        </NavLink>

        {/* ✅ Dashboard link only when logged in */}
        {token && (
          <NavLink to={dashboardPath} style={linkStyle}>
            Dashboard
          </NavLink>
        )}

        {/* ✅ Request + Track ONLY for public (not logged in) */}
        {!token && (
          <>
            <NavLink to="/request-blood" style={linkStyle}>
              Request Blood
            </NavLink>

            <NavLink to="/track-request" style={linkStyle}>
              Track Request
            </NavLink>
          </>
        )}

        {!token ? (
          <>
            <NavLink to="/login" style={linkStyle}>
              Login
            </NavLink>

            <NavLink to="/register" style={linkStyle}>
              Register
            </NavLink>
          </>
        ) : (
          <navlink
            onClick={handleLogout}
            style={{
              background: "transparent",
              color: "#fff",
              border: "none",
              padding: "6px 12px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Logout
          </navlink>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
