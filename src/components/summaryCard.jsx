const SummaryCard = ({ icon, label, value, color }) => (
  <div className="bg-white p-5 rounded-xl shadow flex items-center gap-4">
    <div className={`text-3xl ${color}`}>{icon}</div>
    <div>
      <div className="text-gray-500 text-sm">{label}</div>
      <div className="text-xl font-semibold">{value}</div>
    </div>
  </div>
);

export default SummaryCard;
