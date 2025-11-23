const PageHeader = ({ title, actionLabel, onAction }) => (
  <div className="flex items-center justify-between">
    <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
    {actionLabel && (
      <button
        onClick={onAction}
        className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
      >
        {actionLabel}
      </button>
    )}
  </div>
);

export default PageHeader;
