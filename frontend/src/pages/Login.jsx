import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/users/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", background: "#222", borderRadius: "8px" }}>
      <h2 style={{ color: "cyan" }}>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px",
            background: "cyan",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
      <p style={{ marginTop: "10px" }}>
        Belum punya akun? <Link to="/register" style={{ color: "cyan" }}>Register</Link>
      </p>
    </div>
  );
}
