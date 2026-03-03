// "use client";

// import { useState } from "react";
// import Link from "next/link";

// export default function AddParking() {
//   const [name, setName] = useState("");
//   const [location, setLocation] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");

//   const handleAddParking = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const response = await fetch("/api/parkings", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         name,
//         location,
//         description,
//         priceperhour: parseFloat(price),
//         slots: 10,
//         status: "available",
//       }),
//     });

//     if (response.ok) {
//       alert("Parking created successfully");
//       setName("");
//       setLocation("");
//       setDescription("");
//       setPrice("");
//     } else {
//       alert("Failed to create parking");
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.card}>
//         <h1>Add Parking</h1>

//         <form onSubmit={handleAddParking} style={styles.form}>
//           <input
//             type="text"
//             placeholder="Parking Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//             style={styles.input}
//           />

//           <input
//             type="text"
//             placeholder="Location"
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//             required
//             style={styles.input}
//           />

//           <input
//             type="text"
//             placeholder="Description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             style={styles.input}
//           />

//           <input
//             type="number"
//             step="0.01"
//             placeholder="Price per hour"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//             required
//             style={styles.input}
//           />

//           <button type="submit" style={styles.button}>
//             Create Parking
//           </button>
//         </form>

//         <Link href="/" style={styles.back}>
//           ← Back to Dashboard
//         </Link>
//       </div>
//     </div>
//   );
// }

// const styles: any = {
//   container: {
//     minHeight: "100vh",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     background: "#f5f7fa",
//   },
//   card: {
//     background: "white",
//     padding: "40px",
//     borderRadius: "12px",
//     width: "400px",
//     boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
//   },
//   form: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "15px",
//     marginTop: "20px",
//   },
//   input: {
//     padding: "10px",
//     borderRadius: "8px",
//     border: "1px solid #ddd",
//   },
//   button: {
//     padding: "10px",
//     background: "#0070f3",
//     color: "white",
//     border: "none",
//     borderRadius: "8px",
//     cursor: "pointer",
//   },
//   back: {
//     display: "block",
//     marginTop: "20px",
//     fontSize: "14px",
//     textDecoration: "none",
//     color: "#0070f3",
//   },
// };

'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AddParkingPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [slots, setSlots] = useState("");
  const [status, setStatus] = useState("Active");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const newParking = {
      name,
      slots: Number(slots),
      status,
    };

    try {
      const res = await fetch("/api/parkings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newParking),
      });

      if (!res.ok) throw new Error("Failed to add parking");

      // Clear the Next.js cache so the Dashboard shows the new parking
      router.refresh();
      // Redirect to the dashboard or a dedicated parkings list
      router.push("/dashboard"); 
      
    } catch (err: any) {
      setError(err.message);
      setSubmitting(false);
      console.error("Error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 flex justify-center items-start">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 w-full max-w-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Add New Parking</h1>
          <Link href="/dashboard" className="text-sm text-slate-500 hover:text-indigo-600">
            Cancel
          </Link>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Parking Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Underground Level 1"
              className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none text-black"
            />
          </div>

          {/* Slots */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Number of Slots
            </label>
            <input
              type="number"
              required
              value={slots}
              onChange={(e) => setSlots(e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none text-black"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none text-black bg-white"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-indigo-600 text-white px-5 py-3 rounded-xl hover:bg-indigo-700 transition font-semibold disabled:bg-slate-300"
          >
            {submitting ? "Processing..." : "Create Parking"}
          </button>
        </form>
      </div>
    </div>
  );
}