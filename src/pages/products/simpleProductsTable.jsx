import { useState } from "react";
import CheckboxField from "../../components/input/checkbox";
import Table from "../../components/table";
import TableActions from "../../components/tableActions";
import ProductView from "./productView";

const SimpleProductsTable = ({ simpleProducts }) => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleRowClick = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

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
            render: (_, row) => (
                <div onClick={(e) => e.stopPropagation()}>
                    <CheckboxField variant="switch" name="visible" checked={!!row.visibility} />
                </div>
            )
        },
        {
            key: "featured", label: "Featured", width: "w-16", align: "center",
            render: (_, row) => (
                <div onClick={(e) => e.stopPropagation()}>
                    <CheckboxField variant="star" name="featured" checked={!!row.featured} />
                </div>
            )
        },
        {
            key: "price", label: "Price ($)", width: "w-16", align: "right",
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

    return (<>
        <Table columns={simpleColumns} data={simpleProducts} maxRows={7} onRowClick={handleRowClick} />
        <ProductView
            showModal={showModal}
            onClose={() => setShowModal(false)}
            product={selectedProduct}
        />
    </>
    )

}

export default SimpleProductsTable;