// 'use client';

// import { useState, useEffect } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import Link from "next/link";

// export default function DashboardWrapper({ children }: { children: React.ReactNode }) {
//   const [admin, setAdmin] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();
//   const pathname = usePathname();

//   useEffect(() => {
//     const stored = localStorage.getItem("admin");
//     const adminData = stored ? JSON.parse(stored) : null;
//     setAdmin(adminData);
    
//     // If no admin and not on login page, send to login
//     if (!adminData && pathname !== "/login") {
//       router.push("/login");
//     }
//     setLoading(false);
//   }, [pathname, router]);

//   const handleLogout = () => {
//     localStorage.removeItem("admin");
//     setAdmin(null);
//     router.push("/login");
//   };

//   if (loading) return <div className="p-8">Loading...</div>;

//   // If we are on the login page, just show the login without the sidebar
//   if (pathname === "/login") return <>{children}</>;

//   // If logged in, show his sidebar structure
//   return (
//     <div className="flex min-h-screen bg-slate-50">
//       <aside className="w-64 bg-white border-r border-slate-200 p-6 space-y-6">
//         <h2 className="text-2xl font-bold text-indigo-600 mb-4">GoPark Admin</h2>
        
//         {admin && (
//           <div className="mb-6 p-4 bg-indigo-50 rounded-lg shadow-sm text-slate-700">
//             Welcome, <span className="font-semibold">{admin.name}</span>!
//           </div>
//         )}

//         <nav className="space-y-3">
//           <Link href="/dashboard" className="block p-4 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-indigo-100 transition-colors">
//             Dashboard
//           </Link>
//           <Link href="/users" className="block p-4 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-indigo-100 transition-colors">
//             Users
//           </Link>
//           <Link href="/parkings" className="block p-4 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-indigo-100 transition-colors">
//             Parkings
//           </Link>
//           <button onClick={handleLogout} className="w-full p-4 bg-red-500 text-white rounded-lg shadow-sm hover:bg-red-600 transition-colors">
//             Logout
//           </button>
//         </nav>
//       </aside>

//       <main className="flex-1 p-8">
//         {children}
//       </main>
//     </div>
//   );
// }