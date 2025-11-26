import { useState } from "react";
import CheckboxField from "../../components/input/checkbox";
import Table from "../../components/table";
import TableActions from "../../components/tableActions";
import VariantView from "./variantView";


const VariableProductsTable = ({ variableProducts }) => {
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleSubRowClick = (variant) => {
        setSelectedVariant(variant);
        setShowModal(true);
    };

    const variableColumns = [
        {
            key: "image_url",
            label: "Image",
            width: "w-16",
            align: "center",
            render: (_, row) => {
                const img = row?.variants?.[0].image_url;
                return <img src={img ? `http://localhost:8000/api/${img}` : "https://via.placeholder.com/50"} alt="product" className="w-12 h-12 rounded-lg object-cover" />;
            },
        },
        {
            key: "name",
            label: "Name",
            width: "w-20",
            render: (value) => <div className="truncate max-w-xs" title={value}>{value}</div>
        },
        {
            key: "category",
            label: "Category",
            width: "w-20",
            render: (_, row) => row.category?.name || "—"
        },
        {
            key: "description",
            label: "Description",
            width: "w-40",
            render: (value) => <div className="truncate max-w-xs" title={value}>{value}</div>
        },
        {
            key: "visible",
            label: "Visible",
            width: "w-16",
            align: "center",
            render: (_, row) => (<CheckboxField variant="switch" name="" checked={!!row.visibility} />)
        },
        {
            key: "variants",
            label: "Variantes",
            width: "w-8",
            align: "center",
            render: (value) => value?.length
        },
        {
            key: "actions",
            label: "",
            width: "w-10",
            align: "right",
            render: (_, row) => (
                <TableActions
                    onEdit={() => alert(`Edit ${row.name}`)}
                    onDelete={() => alert(`Delete ${row.name}`)}
                />
            ),
        }
    ];
    const variableSubColumns = [
        {
            key: "image_url", label: "Image", width: "w-16", render: (_, v) => (
                <img src={v.image_url ? `http://localhost:8000/api/${v.image_url}` : "https://via.placeholder.com/40"} alt={v.name} className="w-10 h-10 rounded object-cover" />
            )
        },
        { key: "name", label: "Name", width: "w-16", render: (value) => <div className="truncate max-w-xs" title={value}>{value}</div> },
        { key: "sku", label: "SKU", width: "w-16", render: (value) => value },
        { key: "attributes", label: "Attributes", width: "w-40", render: (_, v) => v.variant_attributes.map(attr => `${attr.attribute.name}: ${attr.attribute_value.value}`).join(", ") },
        { key: "price", label: "Price ($)", width: "w-16", align: "right", render: (value) => `$${value?.toFixed(2)}` },
        { key: "has_stock", label: "Stock", width: "w-16", align: "center", render: (value) => <div className={value === true ? "text-green-500" : "text-red-500"}>{value === true ? "In stock" : "Out of stock"}</div> },
        {
            key: "actions",
            label: "",
            width: "w-10",
            align: "right",
            render: (_, row) => (
                <TableActions
                    onEdit={() => alert(`Edit ${row.name}`)}
                    onDelete={() => alert(`Delete ${row.name}`)}
                />
            ),
        }
    ];

    return (
        <>
            <Table columns={variableColumns} data={variableProducts} maxRows={7} subRowsKey={"variants"} subColumns={variableSubColumns} onSubRowClick={handleSubRowClick}/>
            <VariantView
                showModal={showModal}
                onClose={() => setShowModal(false)}
                variant={selectedVariant}
            />
        </>
    )
};

export default VariableProductsTable;