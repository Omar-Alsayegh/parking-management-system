'use client';

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Spinner from "@/components/Spinner";

export default function EditParkingPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const router = useRouter();

  const [name, setName] = useState("");
  const [slots, setSlots] = useState<string | number>(""); 
  const [status, setStatus] = useState("Active");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchParking = async () => {
      try {
        const res = await fetch(`/api/parkings/${id}`);
        if (!res.ok) throw new Error("Parking not found");
        const data = await res.json();
        
        setName(data.name || "");
        setSlots(data.total_slots ?? ""); 
        setStatus(data.status || "Active");
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchParking();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);

    const updatedParking = {
      name,
      total_slots: Number(slots),
      status,
    };

    try {
      const res = await fetch(`/api/parkings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedParking),
      });

      if (!res.ok) throw new Error("Failed to update parking");

      router.refresh(); 
      router.push("/dashboard"); 
    } catch (err) {
      console.error("Update error:", err);
      alert("Error updating parking zone.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="p-20 text-center"><Spinner /></div>;

  return (
    <div className="p-8 bg-slate-50 min-h-screen flex justify-center items-start text-black">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 w-full max-w-lg">
        <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
          <h1 className="text-2xl font-bold text-slate-900">Edit Parking Zone</h1>
          <Link href="/dashboard" className="text-sm text-slate-400 hover:text-indigo-600 transition">
            Cancel
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Zone Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-slate-200 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Total Slots</label>
            <input
              type="number"
              value={slots ?? ""} 
              onChange={(e) => setSlots(e.target.value)}
              className="w-full border border-slate-200 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Operational Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-slate-200 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={updating}
            className="w-full bg-indigo-600 text-white px-5 py-3 rounded-xl hover:bg-indigo-700 transition font-semibold disabled:bg-slate-300 shadow-sm"
          >
            {updating ? "Saving Changes..." : "Update Parking"}
          </button>
        </form>
      </div>
    </div>
  );
}