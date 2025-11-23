import { useState, Fragment } from "react";
import PaginationControls from "./paginationControls";
import { FaChevronRight } from "react-icons/fa";

const Table = ({ columns, data, maxRows = 15, subRowsKey, subColumns }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [expandedRows, setExpandedRows] = useState({});
    const totalPages = Math.ceil(data.length / maxRows);

    const paginatedData = data.slice((currentPage - 1) * maxRows, currentPage * maxRows);

    const toggleRow = (rowId) => {
        setExpandedRows(prev => ({ ...prev, [rowId]: !prev[rowId] }));
    };

    const hasSubRows = (row) => {
        // robust check: ensures it's an array and has items
        return subRowsKey && Array.isArray(row[subRowsKey]) && row[subRowsKey].length > 0;
    };

    return (
        <div className="bg-white rounded-xl shadow overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 table-auto">
                <thead className="bg-gray-50">
                    <tr>
                        {columns.map((col) => (
                            <th
                                key={col.key}
                                scope="col"
                                className={`px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${col.width || ""}`}
                            >
                                <div
                                    className={
                                        col.align === "center"
                                            ? "text-center"
                                            : col.align === "right"
                                                ? "text-right"
                                                : "text-left"
                                    }
                                >
                                    {col.label}
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-100">
                    {paginatedData.map((row) => (
                        <Fragment key={row.id}>
                            {/* Main Row */}
                            <tr
                                className={`hover:bg-gray-50 transition ${hasSubRows(row) ? "cursor-pointer" : ""}`}
                                onClick={() => hasSubRows(row) && toggleRow(row.id)}
                            >
                                {columns.map((col, colIdx) => (
                                    <td key={col.key} className={`px-4 py-3 whitespace-nowrap`}>
                                        {col.render ? (
                                            <div
                                                className={`flex items-center gap-2 ${col.align === "center"
                                                    ? "justify-center"
                                                    : col.align === "right"
                                                        ? "justify-end"
                                                        : ""
                                                    }`}
                                            >
                                                {/* spacer for chevron - reserves space so header won't jump */}
                                                {colIdx === 0 && (
                                                    <span className="inline-flex items-center w-4 mr-1 flex-shrink-0">
                                                        {hasSubRows(row) ? (
                                                            <button
                                                                type="button"
                                                                onClick={(e) => { e.stopPropagation(); toggleRow(row.id); }}
                                                                aria-expanded={!!expandedRows[row.id]}
                                                                aria-controls={`subrows-${row.id}`}
                                                                className="p-0 m-0 focus:outline-none"
                                                            >
                                                                <FaChevronRight
                                                                    className={`transition-transform duration-200 ${expandedRows[row.id] ? "rotate-90" : "rotate-0"}`}
                                                                />
                                                            </button>
                                                        ) : (
                                                            // keep empty element so spacing is stable
                                                            <span className="inline-block w-4" />
                                                        )}
                                                    </span>
                                                )}

                                                {col.render(row[col.key], row)}
                                            </div>
                                        ) : (
                                            row[col.key]
                                        )}
                                    </td>
                                ))}

                            </tr>

                            {/* Sub-rows container (nested table) */}
                            {hasSubRows(row) && expandedRows[row.id] && (
                                <tr className="bg-gray-50">
                                    <td colSpan={columns.length} className="p-0">
                                        <div id={`subrows-${row.id}`} className="w-full">
                                            <table className="w-full divide-y divide-gray-200 table-auto">
                                                <thead className="bg-gray-100">
                                                    <tr>
                                                        {subColumns.map((col) => (
                                                            <th
                                                                key={col.key}
                                                                scope="col"
                                                                className={`px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider ${col.align === "center"
                                                                    ? "text-center"
                                                                    : col.align === "right"
                                                                        ? "text-right"
                                                                        : "text-left"
                                                                    }`}
                                                            >
                                                                {col.label}
                                                            </th>
                                                        ))}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {row[subRowsKey].map((subRow, idx) => (
                                                        <tr key={idx} className="bg-gray-50">
                                                            {subColumns.map((col) => (
                                                                <td key={col.key} className={`px-4 py-2 whitespace-nowrap`}>
                                                                    {col.render ? (
                                                                        <div
                                                                            className={
                                                                                col.align === "center"
                                                                                    ? "flex justify-center gap-2"
                                                                                    : col.align === "right"
                                                                                        ? "flex justify-end gap-2"
                                                                                        : "flex gap-2"
                                                                            }
                                                                        >
                                                                            {col.render(subRow[col.key], subRow)}
                                                                        </div>
                                                                    ) : (
                                                                        subRow[col.key]
                                                                    )}
                                                                </td>
                                                            ))}
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </Fragment>
                    ))}
                </tbody>
            </table>

            {totalPages > 1 &&
                <PaginationControls currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                />
            }
        </div>
    );
};

export default Table;