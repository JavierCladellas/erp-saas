import { useState, useMemo } from "react";
import Table from "../../components/table";

const SelectDoubleTable = ({ items = [], value = [], columns, label, onChange, searchKeys = ["name", "sku"] }) => {
    const [search, setSearch] = useState("");
    const safeItems = Array.isArray(items) ? items : [];

    const matchesSearch = (item) => {
        const query = search.toLowerCase();
        return searchKeys.some(key => item[key]?.toString().toLowerCase().includes(query));
    };


    const selectedItems = useMemo(() => {
        return safeItems.filter(item => value.includes(item.id));
    }, [safeItems, value]);


    const filtered = useMemo(() => {
        return safeItems.filter(item => matchesSearch(item)).filter(item => !value.includes(item.id));
    }, [search, safeItems, value]);


    const toggleItem = (id) => {
        if (value.includes(id)) {
            onChange(value.filter(v => v !== id));
        } else {
            onChange([...value, id]);
        }
    };

    return (
        <div className="space-y-3">

            {label && <label className="block text-gray-700">{label}</label>}

            <input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full border rounded px-3 py-2" />

            {/* Selected Items */}
            {selectedItems.length > 0 && (
                <div className="border rounded-lg p-2 bg-gray-50">
                    <div className="text-sm font-medium mb-2 text-gray-700">
                        Selected Items ({selectedItems.length})
                    </div>

                    <div className="max-h-48 overflow-y-auto">
                        <Table
                            columns={columns}
                            data={selectedItems}
                            maxRows={5}
                            onRowClick={(row) => toggleItem(row.id)}
                            isRowSelected={() => true}
                        />
                    </div>
                </div>
            )}

            {/* Main Table */}
            <div className="max-h-72 overflow-y-auto border rounded-lg">
                <Table
                    columns={columns}
                    data={filtered}
                    maxRows={10}
                    onRowClick={(row) => toggleItem(row.id)}
                    isRowSelected={(row) => value.includes(row.id)}
                />
            </div>

        </div>
    );
};

export default SelectDoubleTable;
