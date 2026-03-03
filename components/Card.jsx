export default function Card({ title, value, icon, color = "bg-white" }) {
  return (
    <div className={`${color} p-6 rounded-2xl shadow-sm flex items-center space-x-4`}>
      {icon && <div className="text-3xl">{icon}</div>}
      <div>
        <p className="text-sm text-slate-500">{title}</p>
        <p className="text-2xl font-bold text-slate-900">{value}</p>
      </div>
    </div>
  );
}