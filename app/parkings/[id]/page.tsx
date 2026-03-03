'use client';

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";

interface Parking {
  id: number | string;
  name: string;
  slots: number;
  status: string;
}

export default function ParkingDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const router = useRouter();

  const [parking, setParking] = useState<Parking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchParking = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/parkings/${id}`);
        if (!res.ok) throw new Error("Parking not found");
        
        const data = await res.json();
        setParking(data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchParking();
  }, [id]);

  if (loading) return (
    <div className="flex justify-center p-20">
      <Spinner />
    </div>
  );

  if (error || !parking) return (
    <div className="p-8 text-center bg-slate-50 min-h-screen">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 inline-block">
        <p className="text-red-500 font-medium mb-4">Parking zone not found.</p>
        <Link href="/parkings" className="text-indigo-600 hover:underline">
          ← Back to Parkings
        </Link>
      </div>
    </div>
  );

  return (
    <div className="p-8 bg-slate-50 min-h-screen flex justify-center items-start">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 w-full max-w-xl">
        <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-4">
          <h1 className="text-2xl font-bold text-slate-900">Parking Details</h1>
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
            parking.status.toLowerCase() === 'active' 
              ? 'bg-emerald-100 text-emerald-700' 
              : 'bg-slate-100 text-slate-600'
          }`}>
            {parking.status}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <DetailBlock label="Location Name" value={parking.name} />
          <DetailBlock label="Total Slots" value={`${parking.slots} Spaces`} />
          <DetailBlock label="Internal ID" value={`#${parking.id}`} />
          <DetailBlock label="Operational Status" value={parking.status} />
        </div>

        <div className="mt-10 pt-6 border-t border-slate-100 flex justify-between items-center">
          <Link
            href="/parkings"
            className="text-slate-500 hover:text-indigo-600 text-sm font-medium transition"
          >
            ← Back to List
          </Link>
          <div className="space-x-3">
            <button
              onClick={() => router.push(`/parkings/edit/${parking.id}`)}
              className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-200 transition text-sm font-medium"
            >
              Edit Zone
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailBlock({ label, value }: { label: string, value: string }) {
  return (
    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
      <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
        {label}
      </label>
      <p className="text-slate-900 font-semibold text-lg">{value}</p>
    </div>
  );
}