import ModalForm from "../../components/modalForm";

const ProductCreateForm = ({ showModal, onClose }) => {
    const validateField = (name, value, form, forSubmit = false) => {
        switch (name) {

        }
    };

    const onSubmit = (e) => {
        alert("created Product!");
    };

    const addProductFields = [
        {
            name: "isVariable", label: "Variable Product", type: "checkbox", variant: "switch", defaultValue: false,
            customOnChange: (form, newVal) => ({ isVariable: newVal })
        },
        { name: "name", label: "Product Name", type: "text" },
        {
            row: true,
            fields: [
                { name: "price", label: "Price", type: "number", step: 0.01, prefix: "$", autoFixDecimals: true, showWhen: form => !form.isVariable },
                { name: "sku", label: "SKU", type: "text", flex: 3, placeholder: "SKU12345", showWhen: form => !form.isVariable },
            ]
        },
        { name: "description", label: "Description", type: "textarea" },
        { name: "category", label: "Category", type: "select", options: [{ "value": "", "label": "No category" }, { "value": "test", "label": "Candy" }] },
        { name: "image", label: "Image", type: "image", showWhen: form => !form.isVariable },
        { name: "inventoryItems", label: "Link Inventory Items", type: "inventory-select", showWhen: form => !form.isVariable}

    ];

    return <ModalForm
        open={showModal}
        onClose={onClose}
        title="Add New Product"
        fields={addProductFields}
        submitLabel="Add Item"
        onSubmit={onSubmit}
        validateField={validateField}
        size="lg"
    />

};


export default ProductCreateForm;