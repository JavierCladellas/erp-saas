import ModalForm from "../../components/modalForm";


const VariantView = ({showModal, onClose, variant }) => {

    const variantViewFields = [
        { name: "name", label: "Variant Name", type: "text", defaultValue:variant?.name, readOnly: true },
        {
            row: true,
            fields: [
                { name: "price", label: "Price", type: "number", prefix: "$", autoFixDecimals: true, defaultValue:variant?.price, readOnly: true },
                { name: "sku", label: "SKU", type: "text", flex: 3, placeholder: "SKU12345", defaultValue:variant?.sku, readOnly: true },
            ]
        },
        { name: "description", label: "Description", type: "textarea", defaultValue:variant?.description, readOnly: true },
        { name: "image", label: "Image", type: "image", defaultValue:"http://localhost:8000/api/"+variant?.image_url, readOnly: true },
        { name: "inventoryItems", label: "Link Inventory Items", type: "inventory-select", defaultValue:variant?.items, readOnly: true }
    ];

    return <ModalForm
        open={showModal}
        onClose={onClose}
        title={`Variant: ${variant?.sku} - ${variant?.name}`}
        fields={variantViewFields}
        submitLabel={null}
        closeLabel="Close"
        size="xl"
    />


}

export default VariantView;