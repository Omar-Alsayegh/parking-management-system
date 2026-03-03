// "use client";

// import { useState } from "react";
// import Link from "next/link";

// export default function Register() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleRegister = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const response = await fetch("/api/users", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ name, email, password, role: "admin" }),
//     });

//     if (response.ok) {
//       alert("User created successfully");
//       setName("");
//       setEmail("");
//       setPassword("");
//     } else {
//       alert("Failed to create user");
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.card}>
//         <h1>Create User</h1>

//         <form onSubmit={handleRegister} style={styles.form}>
//           <input
//             type="text"
//             placeholder="Full Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//             style={styles.input}
//           />

//           <input
//             type="email"
//             placeholder="Email Address"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             style={styles.input}
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             style={styles.input}
//           />

//           <button type="submit" style={styles.button}>
//             Create User
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
//     width: "350px",
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

export default function AddUserPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user"); 
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const bodyData = {
      name,
      email,
      role: role.toLowerCase(),
      password: role === "admin" ? password : null,
    };

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to create user");
      }

      router.refresh(); 
      router.push("/dashboard");
      
    } catch (err: any) {
      setError(err.message);
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 flex justify-center items-start">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 w-full max-w-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Add New User</h1>
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
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none text-black"
              placeholder="Full Name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none text-black"
              placeholder="email@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none text-black bg-white"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {role === "admin" && (
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Admin Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none text-black"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-indigo-600 text-white px-5 py-3 rounded-xl hover:bg-indigo-700 transition font-semibold disabled:bg-slate-300"
          >
            {submitting ? "Saving to Database..." : "Create User"}
          </button>
        </form>
      </div>
    </div>
  );
}