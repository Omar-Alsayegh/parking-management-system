'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Spinner from "@/components/Spinner";

export default function ParkingsPage() {
  const [parkings, setParkings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchParkings = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/parkings');
        if (!res.ok) throw new Error("Failed to fetch parkings");
        
        const data = await res.json();
        setParkings(data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchParkings();
  }, []);

  const deleteParking = async (id: number) => {
    if (!confirm("Are you sure you want to delete this parking location?")) return;

    try {
      const res = await fetch(`/api/parkings/${id}`, { method: 'DELETE' });
      
      if (!res.ok) throw new Error("Delete failed");

      // Immediate UI update
      setParkings(prev => prev.filter(p => p.id !== id));
      
      // Sync Next.js server cache
      router.refresh();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete. Make sure the API route exists at /api/parkings/[id]");
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Parking Management</h1>
            <p className="text-slate-500 text-sm">Monitor and manage all parking zones</p>
          </div>
          <Link
            href="/add-parking"
            className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition shadow-sm"
          >
            + Add Parking
          </Link>
        </div>

        <div className="overflow-hidden border border-slate-100 rounded-xl">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-4 px-6 font-semibold">Location Name</th>
                <th className="py-4 px-6 font-semibold">Total Slots</th>
                <th className="py-4 px-6 font-semibold">Status</th>
                <th className="py-4 px-6 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {parkings.map(parking => (
                <tr key={parking.id} className="hover:bg-slate-50/80 transition group">
                  <td className="py-4 px-6 font-medium text-slate-800">{parking.name}</td>
                  <td className="py-4 px-6">
                    <span className="bg-slate-100 px-3 py-1 rounded-full text-sm text-slate-700">
                      {parking.slots} spots
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                      parking.status === 'Active' || parking.status === 'active'
                        ? 'bg-emerald-50 text-emerald-700' 
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        parking.status === 'Active' || parking.status === 'active' ? 'bg-emerald-500' : 'bg-slate-400'
                      }`} />
                      {parking.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right space-x-3">
                    <button
                      onClick={() => router.push(`/parkings/${parking.id}`)}
                      className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                    >
                      View
                    </button>
                    <button
                      onClick={() => deleteParking(parking.id)}
                      className="text-red-400 hover:text-red-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {parkings.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-slate-400 italic">
                    No parking zones registered yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}