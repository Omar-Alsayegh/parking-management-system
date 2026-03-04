'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Spinner from "@/components/Spinner"; 

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [admins, setAdmins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [usersRes, adminsRes] = await Promise.all([
          fetch("/api/regularusers"),
          fetch("/api/admins")
        ]);

        const usersData = await usersRes.json();
        const adminsData = await adminsRes.json();

        setUsers(usersData);
        setAdmins(adminsData);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const deleteUser = async (id: number, isAdmin = false) => {
    if (!confirm(`Are you sure you want to delete this ${isAdmin ? 'admin' : 'user'}?`)) return;

    const endpoint = isAdmin ? "/api/admins" : "/api/users";
    
    try {
      const res = await fetch(`${endpoint}/${id}`, { method: "DELETE" });
      
      if (!res.ok) throw new Error("Delete failed");

      // Update local state for instant UI feedback
      if (isAdmin) {
        setAdmins(prev => prev.filter(a => a.id !== id));
      } else {
        setUsers(prev => prev.filter(u => u.id !== id));
      }
      
      router.refresh(); // Sync server state
    } catch (err) {
      console.error("Delete error:", err);
      alert("Could not delete. Check if the API supports DELETE at this ID.");
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="p-8 bg-slate-50 min-h-screen text-black">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
          <Link
            href="/register" 
            className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition"
          >
            + Add New User
          </Link>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <UserTable 
            title="Regular Users" 
            data={users} 
            onDelete={(id : number) => deleteUser(id, false)} 
            router={router} 
          />

          <UserTable 
            title="Admins" 
            data={admins} 
            onDelete={(id : number) => deleteUser(id, true)} 
            router={router} 
            isAdminTable
          />
        </div>
      </div>
    </div>
  );
}

function UserTable({ title, data, onDelete, router, isAdminTable = false }: any) {
  return (
    <div className="overflow-hidden">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        {title} <span className="text-sm font-normal text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{data.length}</span>
      </h2>
      <div className="border border-slate-200 rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase border-b border-slate-200">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((item: any) => (
              <tr key={item.id} className="hover:bg-slate-50 transition group">
                <td className="py-3 px-4 font-medium text-slate-800">{item.name}</td>
                <td className="py-3 px-4 text-slate-600 text-sm">{item.email}</td>
                <td className="py-3 px-4 text-right space-x-3">
                  <button
                    onClick={() => router.push(`/users/${item.id}`)}
                    className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                  >
                    View
                  </button>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="text-red-400 hover:text-red-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={3} className="py-8 text-center text-slate-400 italic">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}