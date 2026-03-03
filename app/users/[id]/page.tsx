'use client';

import { useEffect, useState, use } from "react";
import Link from "next/link";
import Spinner from "@/components/Spinner";

interface User {
  id: number | string;
  name: string;
  email: string;
  role: string;
  created_at?: string;
}

export default function UserDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/users/${id}`);
        if (!res.ok) throw new Error("User not found");
        
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) return (
    <div className="flex justify-center p-20">
      <Spinner />
    </div>
  );

  if (error || !user) return (
    <div className="p-8 text-center">
      <p className="text-red-500 font-medium">User not found or API error.</p>
      <Link href="/users" className="text-indigo-600 hover:underline mt-4 inline-block">
        ← Back to Users
      </Link>
    </div>
  );

  return (
    <div className="p-8 bg-slate-50 min-h-screen flex justify-center items-start">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 w-full max-w-xl">
        <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-4">
          <h1 className="text-2xl font-bold text-slate-900">User Profile</h1>
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
            user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
          }`}>
            {user.role}
          </span>
        </div>

        <div className="space-y-6">
          <DetailRow label="System ID" value={`#${user.id}`} />
          <DetailRow label="Full Name" value={user.name} />
          <DetailRow label="Email Address" value={user.email} />
          <DetailRow label="Account Type" value={user.role.charAt(0).toUpperCase() + user.role.slice(1)} />
        </div>

        <div className="mt-10 pt-6 border-t border-slate-100 flex justify-between items-center">
          <Link
            href="/users"
            className="text-slate-500 hover:text-indigo-600 text-sm font-medium transition"
          >
            ← Back to Users List
          </Link>
          <Link
            href={`/users/edit/${user.id}`}
            className="bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition text-sm"
          >
            Edit Profile
          </Link>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string, value: string }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-tight mb-1">
        {label}
      </label>
      <p className="text-slate-900 font-medium text-lg">{value}</p>
    </div>
  );
}