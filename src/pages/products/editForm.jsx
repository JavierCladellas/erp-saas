import ModalForm from "../../components/modalForm";


const ProductEditForm = ({showModal, onClose, product }) => {

    const productViewFields = [
        { name: "name", label: "Product Name", type: "text", defaultValue:product?.name },
        {
            row: true,
            fields: [
                { name: "price", label: "Price", type: "number", prefix: "$", autoFixDecimals: true, defaultValue:product?.price },
                { name: "sku", label: "SKU", type: "text", flex: 3, placeholder: "SKU12345", defaultValue:product?.sku },
            ]
        },
        { name: "description", label: "Description", type: "textarea", defaultValue:product?.description },
        { name: "category", label: "Category", type: "select", defaultValue:product?.category.name },
        { name: "image", label: "Image", type: "image", defaultValue:"http://localhost:8000/api/"+product?.image_url },
        { name: "inventoryItems", label: "Link Inventory Items", type: "inventory-select", defaultValue:product?.items }
    ];

    return <ModalForm
        open={showModal}
        onClose={onClose}
        title={`${product?.sku} - ${product?.name}`}
        fields={productViewFields}
        submitLabel="Edit"
        closeLabel="Close"
        size="xl"
    />


}

export default ProductEditForm;