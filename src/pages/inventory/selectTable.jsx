import useFetch from "../../components/useFetch";
import SelectDoubleTable from "../../components/input/selectDoubleTable";

const InventorySelectTable = ({ value = [], onChange, label }) => {
    const { data: items, loading, error } = useFetch("http://localhost:8000/api/items");

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
        <SelectDoubleTable
            items={items}
            columns={columns}
            value={value}
            onChange={onChange}
            searchKeys={["sku", "name"]}
        />
    );
};

export default InventorySelectTable;
