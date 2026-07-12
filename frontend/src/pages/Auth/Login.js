import React, { useState } from "react";
import { useAuth } from "../../store/AuthContext";

export default function Login() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      console.log("Backend Response:", data);

      // Save in AuthContext
      login(data.user, data.token);

    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">

      <h2>TransitOps Platform Login</h2>

      {error && (
        <div style={{ color: "red", marginBottom: 15 }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>

        <div>
          <label>Email</label>

          <input
            type="email"
            required
            placeholder="admin@transitops.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

        </div>

        <div>

          <label>Password</label>

          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

        </div>

        <button disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

      </form>

    </div>
  );
}