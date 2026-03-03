'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Card from "@/components/Card";
import Spinner from "@/components/Spinner";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<any[]>([]);
  const [admins, setAdmins] = useState<any[]>([]);
  const [parkings, setParkings] = useState<any[]>([]);
  const [userShowCount, setUserShowCount] = useState(3);
  const [adminShowCount, setAdminShowCount] = useState(3);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetching from your ready API endpoints
        const [resUsers, resParkings, resAdmins] = await Promise.all([
          fetch("/api/users"),
          fetch("/api/parkings"),
          fetch("/api/admins")
        ]);

        const usersData = await resUsers.json();
        const parkingsData = await resParkings.json();
        const adminsData = await resAdmins.json();

        setUsers(usersData);
        setParkings(parkingsData);
        setAdmins(adminsData);

        setLoading(false);
      } catch (err) {
        console.error("Dashboard Load Error:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Spinner />;

  // --- Fixed Stats Logic ---
  const totalUsers = users.length;
  const totalAdmins = admins.length;
  const totalParkings = parkings.length;

  // Normalizing "active" status to catch both "Active" and "active"
  const activeParkings = parkings.filter(
    (p) => p.status && p.status.toLowerCase() === "active"
  ).length;

  const latestAdmins = [...admins].slice(-adminShowCount).reverse();
  const latestParkings = [...parkings].slice(-3).reverse();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-slate-900">Dashboard Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card title="Total Users" value={totalUsers} icon="👤" color="bg-white" />
        <Card title="Admin Users" value={totalAdmins} icon="🛡️" color="bg-white" />
        <Card title="Total Parkings" value={totalParkings} icon="🅿️" color="bg-white" />
        <Card title="Active Parkings" value={activeParkings} icon="✅" color="bg-green-50 border-green-100" />
      </div>

      {/* Quick Actions */}
      <div className="flex space-x-4">
        <Link href="/register" className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition shadow-sm">
          + Add User
        </Link>
        <Link href="/add-parking" className="bg-white text-slate-700 border border-slate-200 px-5 py-2.5 rounded-xl hover:bg-slate-50 transition shadow-sm">
          + Add Parking
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Users Table */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-800">Recent Users</h2>
            <div className="flex bg-slate-100 p-1 rounded-lg">
              {[3, 5].map((n) => (
                <button
                  key={`ubtn-${n}`}
                  onClick={() => setUserShowCount(n)}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
                    userShowCount === n ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  Show {n}
                </button>
              ))}
            </div>
          </div>
          <table className="w-full text-left">
            <thead className="text-slate-400 text-xs uppercase tracking-wider border-b border-slate-50">
              <tr>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {users.slice(-userShowCount).reverse().map((u) => (
                <tr key={u.id} className="hover:bg-slate-50 transition cursor-pointer" onClick={() => router.push(`/users/${u.id}`)}>
                  <td className="py-3 px-4 font-medium text-slate-700">{u.name}</td>
                  <td className="py-3 px-4 text-slate-500">{u.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Admins Table */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Administrators</h2>
          <table className="w-full text-left">
            <thead className="text-slate-400 text-xs uppercase tracking-wider border-b border-slate-50">
              <tr>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {latestAdmins.map((a) => (
                <tr key={a.id} className="hover:bg-slate-50 transition cursor-pointer" onClick={() => router.push(`/users/${a.id}`)}>
                  <td className="py-3 px-4 font-medium text-slate-700">{a.name}</td>
                  <td className="py-3 px-4 text-slate-500">{a.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Parkings & Pie Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Latest Parkings</h2>
          <table className="w-full text-left">
            <thead className="text-slate-400 text-xs uppercase tracking-wider border-b border-slate-50">
              <tr>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {latestParkings.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50 transition cursor-pointer" onClick={() => router.push(`/parkings/${p.id}`)}>
                  <td className="py-3 px-4 font-medium text-slate-700">{p.name}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      p.status.toLowerCase() === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center">
          <h2 className="text-lg font-bold text-slate-800 mb-6 self-start">Parking Distribution</h2>
          <div className="w-full max-w-[220px]">
            <Pie
              data={{
                labels: ["Active", "Inactive"],
                datasets: [{
                  data: [activeParkings, totalParkings - activeParkings],
                  backgroundColor: ["#10b981", "#ef4444"],
                  borderWidth: 0,
                }],
              }}
              options={{
                plugins: {
                  legend: { position: 'bottom' }
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}