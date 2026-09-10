import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser({ email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("user", JSON.stringify(res.data.user));


      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/donor");
      }
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
  <div className="page-center">
    <div className="card">
      <h2 className="title">Blood Bank Login</h2>
      <p style={{ 
  textAlign: "center", 
  color: "#777", 
  marginBottom: "20px",
  fontSize: "14px"
}}>
  Online Blood Bank & Donor Management System
</p>


      <form onSubmit={handleSubmit}>
        <input
          className="input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="btn" type="submit">Login</button>
      </form>

      <div className="link">
        Don’t have an account? <Link to="/register">Register</Link>
        <p style={{ fontSize: "12px", color: "#999", marginTop: "15px" }}>
  Secure login • Authorized access only
</p>
      </div>
    </div>
    
  </div>
  
);

}

export default Login;
