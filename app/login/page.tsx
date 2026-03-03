'use client'; 

import { useState } from "react";
import { useRouter } from "next/navigation"; 

export default function Login() {
  const router = useRouter(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/users"); 
      const usersData = await res.json();

      const admin = usersData.find(
        (a: any) =>
          a.email.toLowerCase().trim() === email.toLowerCase().trim() &&
          a.role === "admin" 
      );

      if (admin) {

        localStorage.setItem("admin", JSON.stringify(admin));
        router.push("/"); 
      } else {
        setError("Invalid email or unauthorized role");
      }
    } catch (err) {
      console.error(err);
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "100px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2 className="text-2xl font-bold mb-6">Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label>Email</label>
          <input
            type="email"
            className="text-black" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px", border: "1px solid #ddd" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>Password</label>
          <input
            type="password"
            className="text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px", border: "1px solid #ddd" }}
          />
        </div>
        {error && <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>}
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px",
            width: "100%",
            background: loading ? "#999" : "#4f46e5",
            color: "white",
            borderRadius: "6px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}