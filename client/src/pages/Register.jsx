import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ name, email, password });
      alert("Registration successful");
      navigate("/");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
  <div style={{
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#fff5f5"
  }}>
    <div style={{
      width: "380px",
      background: "#ffffff",
      padding: "30px",
      borderRadius: "10px",
      boxShadow: "0 8px 25px rgba(0,0,0,0.1)"
    }}>

      <h2 style={{ textAlign: "center", color: "#8b0000" }}>
        Blood Bank Registration
      </h2>

      <p style={{
        textAlign: "center",
        color: "#777",
        fontSize: "14px",
        marginBottom: "20px"
      }}>
        Create your account to donate or request blood
      </p>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "12px",
            borderRadius: "6px",
            border: "1px solid #ccc"
          }}
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "12px",
            borderRadius: "6px",
            border: "1px solid #ccc"
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "6px",
            border: "1px solid #ccc"
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            background: "#8b0000",
            color: "#fff",
            border: "none",
            padding: "10px",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Register
        </button>
      </form>

      <p style={{ textAlign: "center", marginTop: "15px" }}>
        Already have an account? <a href="/">Login</a>
      </p>

      <p style={{
        fontSize: "12px",
        color: "#999",
        textAlign: "center"
      }}>
        Registration is secure and monitored
      </p>

    </div>
  </div>
);

}

export default Register;
