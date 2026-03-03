"use client";

import { useState } from "react";
import Link from "next/link";

export default function AddParking() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const handleAddParking = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/parkings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        location,
        description,
        priceperhour: parseFloat(price),
        slots: 10,
        status: "available",
      }),
    });

    if (response.ok) {
      alert("Parking created successfully");
      setName("");
      setLocation("");
      setDescription("");
      setPrice("");
    } else {
      alert("Failed to create parking");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1>Add Parking</h1>

        <form onSubmit={handleAddParking} style={styles.form}>
          <input
            type="text"
            placeholder="Parking Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={styles.input}
          />

          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            style={styles.input}
          />

          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={styles.input}
          />

          <input
            type="number"
            step="0.01"
            placeholder="Price per hour"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            style={styles.input}
          />

          <button type="submit" style={styles.button}>
            Create Parking
          </button>
        </form>

        <Link href="/" style={styles.back}>
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

const styles: any = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f7fa",
  },
  card: {
    background: "white",
    padding: "40px",
    borderRadius: "12px",
    width: "400px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginTop: "20px",
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },
  button: {
    padding: "10px",
    background: "#0070f3",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  back: {
    display: "block",
    marginTop: "20px",
    fontSize: "14px",
    textDecoration: "none",
    color: "#0070f3",
  },
};