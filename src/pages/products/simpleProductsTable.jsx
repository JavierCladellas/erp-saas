import CheckboxField from "../../components/input/checkbox";
import Table from "../../components/table";
import TableActions from "../../components/tableActions";

const SimpleProductsTable = ({ simpleProducts }) => {
    const simpleColumns = [
        {
            key: "image_url", label: "Image", width: "w-16", align: "center",
            render: (value) => {
                return <img src={value ? `http://localhost:8000/api/${value}` : "https://via.placeholder.com/50"} alt="product" className="w-12 h-12 rounded-lg object-cover" />;
            },
        },
        {
            key: "sku", label: "SKU", width: "w-16",
            render: (_, row) => row.variants?.[0]?.sku || "—"
        },
        {
            key: "name", label: "Name", width: "w-16",
            render: (value) => <div className="truncate max-w-80" title={value}>{value}</div>
        },
        {
            key: "category", label: "Category", width: "w-20",
            render: (_, row) => row.category?.name || "—"
        },
        {
            key: "description", label: "Description", width: "w-16",
            render: (value) => <div className="truncate max-w-60" title={value}>{value}</div>
        },
        {
            key: "items", label: "Items", width: "w-2", align: "center",
            render: (value) => value?.length
        },
        {
            key: "visible", label: "Visible", width: "w-16", align: "center",
            render: (_, row) => (<CheckboxField variant="switch" name="" checked={!!row.visibility} />)
        },
        {
            key: "featured", label: "Featured", width: "w-16", align: "center",
            render: (_, row) => (
                <button className={`text-xl transition ${row.featured ? "text-yellow-400" : "text-gray-300"}`}>
                    ★
                </button>
            )
        },
        {
            key: "price", label: "Price", width: "w-16", align: "right",
            render: (_, row) => row.variants?.length === 1 ? `$${row.variants[0].price.toFixed(2)}` : "—"
        },
        {
            key: "has_stock", label: "", width: "w-4", align: "center",
            render: (value) => (
                <div className={value === true ? "text-green-500 text-sm" : "text-red-500 text-sm"}>
                    {value === true ? "In stock" : "Out of stock"}
                </div>
            )
        },
        {
            key: "actions", label: "", width: "w-10", align: "right",
            render: (_, row) => (
                <TableActions
                    onEdit={() => alert(`Edit ${row.name}`)}
                    onDelete={() => alert(`Delete ${row.name}`)}
                />
            ),
        }
    ];

    const simpleSubColumns = [
        {
            key: "image_url", label: "Image", width: "w-16", align: "center",
            render: (value) => {
                return <img src={value ? `http://localhost:8000/api/${value}` : "https://via.placeholder.com/50"} alt="product" className="w-12 h-12 rounded-lg object-cover" />;
            },
        },
        { key: "sku", label: "SKU", width: "w-24" },
        {
            key: "name", label: "Name", width: "w-40",
            render: (value) => <div className="truncate max-w-xs" title={value}>{value}</div>
        },
        {
            key: "description", label: "Description", width: "w-40",
            render: (value) => <div className="truncate max-w-xs" title={value}>{value}</div>
        },
        {
            key: "stock", label: "Stock", width: "w-16", align: "left",
            render: (value) => <span className={value === 0 ? "text-red-500 font-semibold" : ""}>{value}</span>,
        },
    ];

    return (
        <Table columns={simpleColumns} data={simpleProducts} maxRows={7} />
    )

}

export default SimpleProductsTable;