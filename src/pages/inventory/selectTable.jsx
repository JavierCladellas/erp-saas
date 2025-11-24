import { useState, useMemo } from "react";
import Table from "../../components/table";
import CheckboxField from "../../components/input/checkbox";
import useFetch from "../../components/useFetch";

const InventorySelectTable = ({ value = [], onChange, label }) => {
    const { data: items, loading, error } = useFetch("http://localhost:8000/api/items");

    const [search, setSearch] = useState("");

    const filtered = useMemo(() => {
        return items.filter(item =>
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.sku.toLowerCase().includes(search.toLowerCase())
        );
    }, [search, items]);

    const toggleItem = (id) => {
        if (value.includes(id)) {
            onChange(value.filter(v => v !== id));
        } else {
            onChange([...value, id]);
        }
    };
    const columns = [
        {
            key: "image_url", label: "Image", width: "w-16", align: "center",
            render: val => (
                <img
                    src={val ? `http://localhost:8000/api/${val}` : "https://via.placeholder.com/50"}
                    className="w-12 h-12 rounded object-cover"
                />
            )
        },
        { key: "sku", label: "SKU", width: "w-20" },
        {
            key: "name", label: "Name", width: "w-30",
            render: v => <div className="truncate max-w-xs" title={v}>{v}</div>
        },
        { key: "stock", label: "Stock", width: "w-20" },
    ];


    return (
        <div className="space-y-2">
            <label className="block text-gray-700 mb-1">{label}</label>
            <input placeholder="Search items..." value={search} onChange={(e) => setSearch(e.target.value)}
                className="w-full border rounded px-3 py-2"
            />

            <div className="max-h-72 overflow-y-auto border rounded-lg">
                <Table columns={columns} data={filtered} maxRows={10}
                    onRowClick={(row) => toggleItem(row.id)}
                    isRowSelected={(row) => value.includes(row.id)} />
            </div>

            <div className="text-sm text-gray-600">
                Selected: <strong>{value.length}</strong>
            </div>
        </div>
    );
};

export default InventorySelectTable;
