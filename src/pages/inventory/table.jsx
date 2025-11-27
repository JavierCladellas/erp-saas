import Table from "../../components/table";
import TableActions from "../../components/tableActions";
import { useState } from "react";
import ItemEditForm from "./editForm";
import ItemDeleteForm from "./deleteForm";


const InventoryTable = ({ data }) => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

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
                    onEdit={() => {
                        setSelectedItem(row);
                        setShowEditModal(true);
                    }}
                    onDelete={() => {
                        setSelectedItem(row);
                        setShowDeleteModal(true);
                    }}
                />
            ),
        },
    ];

    return <>
        <Table columns={columns} data={data} />;
        <ItemEditForm showModal={showEditModal} onClose={() => setShowEditModal(false)} item={selectedItem}/>
        <ItemDeleteForm showModal={showDeleteModal} onClose={()=> setShowDeleteModal(false)} item={selectedItem} />
    </>

}

export default InventoryTable;