import ModalForm from "../../components/modalForm";


const ProductView = ({showModal, onClose, product }) => {

    const productViewFields = [
        { name: "name", label: "Product Name", type: "text", defaultValue:product?.name, readOnly: true },
        {
            row: true,
            fields: [
                { name: "price", label: "Price", type: "number", prefix: "$", autoFixDecimals: true, defaultValue:product?.price, readOnly: true },
                { name: "sku", label: "SKU", type: "text", flex: 3, placeholder: "SKU12345", defaultValue:product?.sku, readOnly: true },
            ]
        },
        { name: "description", label: "Description", type: "textarea", defaultValue:product?.description, readOnly: true },
        { name: "category", label: "Category", type: "select", defaultValue:product?.category.name, readOnly: true },
        { name: "image", label: "Image", type: "image", defaultValue:"http://localhost:8000/api/"+product?.image_url, readOnly: true },
        { name: "inventoryItems", label: "Link Inventory Items", type: "inventory-select", defaultValue:product?.items, readOnly: true }
    ];

    return <ModalForm
        open={showModal}
        onClose={onClose}
        title={`${product?.sku} - ${product?.name}`}
        fields={productViewFields}
        submitLabel={null}
        closeLabel="Close"
        size="xl"
    />


}

export default ProductView;