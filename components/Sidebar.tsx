'use client';
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Admin {
  name: string;
}

export default function Sidebar() {
  const router = useRouter();
  const [admin, setAdmin] = useState<Admin | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("admin");
    if (stored) setAdmin(JSON.parse(stored));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("admin");
    router.push("/login");
  };

  return (
    <aside className="w-64 bg-white border-r border-slate-200 p-6 space-y-6 min-h-screen">
      <h2 className="text-2xl font-bold text-indigo-600 mb-4">GoPark Admin</h2>
      {admin && (
        <div className="mb-6 p-4 bg-indigo-50 rounded-lg shadow-sm text-slate-700">
          Welcome, <span className="font-semibold">{admin.name}</span>!
        </div>
      )}
      <nav className="space-y-3">
        <Link href="/dashboard" className="block p-4 border rounded-lg hover:bg-indigo-50 text-black">Dashboard</Link>
        <Link href="/users" className="block p-4 border rounded-lg hover:bg-indigo-50 text-black">Users</Link>
        <Link href="/parkings" className="block p-4 border rounded-lg hover:bg-indigo-50 text-black">Parkings</Link>
        <button onClick={handleLogout} className="w-full p-4 bg-red-500 text-white rounded-lg mt-10">Logout</button>
      </nav>
    </aside>
  );
}