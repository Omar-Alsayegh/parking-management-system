'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AddParkingPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [totalSlots, setTotalSlots] = useState(""); 
  const [status, setStatus] = useState("Active");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const newParking = {
      name,
      total_slots: Number(totalSlots),
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

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to add parking");
      }

      router.refresh(); 
      router.push("/dashboard"); 
      
    } catch (err: any) {
      setError(err.message);
      setSubmitting(false);
      console.error("Error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 flex justify-center items-start text-black">
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
              className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Total Slots
            </label>
            <input
              type="number"
              required
              value={totalSlots}
              onChange={(e) => setTotalSlots(e.target.value)}
              placeholder="0"
              className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-indigo-600 text-white px-5 py-3 rounded-xl hover:bg-indigo-700 transition font-semibold disabled:bg-slate-300"
          >
            {submitting ? "Creating..." : "Create Parking"}
          </button>
        </form>
      </div>
    </div>
  );
}