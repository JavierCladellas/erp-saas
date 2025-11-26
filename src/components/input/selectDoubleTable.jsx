import { useState, useMemo } from "react";
import Table from "../../components/table";

const SelectDoubleTable = ({ items = [], value = [], columns, label, onChange, searchKeys = ["name", "sku"], externalError, readOnly = false }) => {

    const normalizedValue = Array.isArray(value)
        ? value.map(v => (typeof v === "object" ? v.id : v))
        : [];

    const [search, setSearch] = useState("");
    const safeItems = Array.isArray(items) ? items : [];

    const matchesSearch = (item) => {
        const query = search.toLowerCase();
        return searchKeys.some(key => item[key]?.toString().toLowerCase().includes(query));
    };

    const selectedItems = useMemo(
        () => safeItems.filter(item => normalizedValue.includes(item.id)),
        [safeItems, normalizedValue]
    );

    const filtered = useMemo(
        () => safeItems
            .filter(matchesSearch)
            .filter(item => !normalizedValue.includes(item.id)),
        [search, safeItems, normalizedValue]
    );

    const toggleItem = (id) => {
        if (readOnly) return;

        if (normalizedValue.includes(id)) {
            onChange(normalizedValue.filter(v => v !== id));
        } else {
            onChange([...normalizedValue, id]);
        }
    };

    const readOnlyContainer = readOnly ? "bg-gray-100 opacity-70 cursor-not-allowed" : "";

    return (
        <div className="space-y-3">

            {label && <label className="block text-gray-700">{label}</label>}

            {!readOnly && (
                <input
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className={`w-full border rounded px-3 py-2 ${externalError ? "border-red-500" : "border-gray-300"}`}
                />
            )}

            {selectedItems.length > 0 && (
                <div className={`border rounded-lg p-2 bg-gray-50 ${readOnlyContainer}`}>
                    <div className="text-sm font-medium mb-2 text-gray-700">
                        Selected Items ({selectedItems.length})
                    </div>

                    <div className="max-h-48 overflow-y-auto">
                        <Table
                            columns={columns}
                            data={selectedItems}
                            maxRows={5}
                            onRowClick={readOnly ? null : (row) => toggleItem(row.id)}
                            isRowSelected={() => !readOnly}
                            rowClassName={readOnly ? "cursor-not-allowed bg-gray-100 hover:bg-gray-100" : ""}
                        />
                    </div>
                </div>
            )}

            {!readOnly && (
                <div className={`${!readOnly ? "max-h-72 overflow-y-auto" : ""} border rounded-lg ${readOnlyContainer} ${externalError ? "border-red-500" : "border-gray-300"}`} >
                    <Table
                        columns={columns}
                        data={filtered}
                        maxRows={5}
                        onRowClick={readOnly ? null : (row) => toggleItem(row.id)}
                        isRowSelected={() => false}
                    />
                </div>
            )}

            {externalError && (
                <p className="text-red-500 text-sm mt-1">{externalError}</p>
            )}
        </div>
    );
};

export default SelectDoubleTable;