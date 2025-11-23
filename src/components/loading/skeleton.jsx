const SkeletonTable = ({nRows= 10}) => {
    return (
        <div className="bg-white rounded-xl shadow overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        {Array(6).fill(0).map((_, i) => (
                            <th key={i} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                    {Array(nRows).fill(0).map((_, i) => (
                        <tr key={i}>
                            {Array(6).fill(0).map((_, j) => (
                                <td key={j} className="px-4 py-3">
                                    <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

const SkeletonCard = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow flex items-center gap-6 animate-pulse">
      <div className="w-14 h-14 bg-gray-200 rounded-full"></div>
      <div className="flex-1 space-y-3">
        <div className="h-5 bg-gray-200 rounded w-3/4"></div>
        <div className="h-7 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  );
};


export {SkeletonTable, SkeletonCard};