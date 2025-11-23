import Table from "../../components/table";
import TableActions from "../../components/tableActions";


const InventoryTable = ({ data }) => {

    const columns = [
        {
            key: "image_url", label: "Image", width: "w-16", align: "center",
            render: (value) => <img src={`http://localhost:8000/api/${value}`} alt="product" className="w-12 h-12 rounded-lg object-cover" />,
        },
        { key: "sku", label: "SKU", width: "w-16" },
        {
            key: "name", label: "Product Name", width: "w-16",
            render: (value) => (<div className="truncate max-w-xs" title={value}> {value}</div>)
        },
        {
            key: "stock", label: "Stock", width: "w-16", align: "left",
            render: (value) => <span className={value < 5 ? "text-red-500 font-semibold" : ""}>{value}</span>,
        },
        {
            key: "description", label: "Description", width: "w-20",
            render: (value) => (<div className="truncate max-w-xs" title={value}> {value}</div>)
        },
        {
            key: "actions", label: "", width: "w-10", align: "right",
            render: (_, row) => (
                <TableActions
                    onEdit={() => alert(`Edit ${row.name}`)}
                    onDelete={() => alert(`Delete ${row.name}`)}
                />
            ),
        },
    ];

    return <Table columns={columns} data={data} />;

}

export default InventoryTable;