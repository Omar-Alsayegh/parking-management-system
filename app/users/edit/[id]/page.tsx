'use client';

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation"; // Next.js version of useNavigate
import Link from "next/link";

export default function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
  // 1. Resolve the ID from params
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("User");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // 2. Fetch existing data on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/users/${id}`);
        if (!res.ok) throw new Error("User not found");
        const data = await res.json();
        
        setName(data.name);
        setEmail(data.email);
        setRole(data.role);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  // 3. Handle the PUT update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);

    const updatedUser = { name, email, role };

    try {
      const res = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });

      if (!res.ok) throw new Error("Failed to update user");

      // Clear Next.js cache so the list shows new info
      router.refresh(); 
      // Redirect back to users list
      router.push("/users");
    } catch (err) {
      console.error("Update error:", err);
      alert("Error updating user. Check if the API is awaiting params!");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="p-10 text-center font-medium">Loading User Data...</div>;

  return (
    <div className="p-8 bg-slate-50 min-h-screen flex justify-center items-start text-black">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 w-full max-w-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Edit User</h1>
          <Link href="/users" className="text-sm text-slate-400 hover:text-indigo-600">
            Cancel
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-slate-200 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-slate-200 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-slate-200 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={updating}
            className="w-full bg-indigo-600 text-white px-5 py-3 rounded-xl hover:bg-indigo-700 transition font-semibold disabled:bg-slate-300"
          >
            {updating ? "Saving Changes..." : "Update User"}
          </button>
        </form>
      </div>
    </div>
  );
}