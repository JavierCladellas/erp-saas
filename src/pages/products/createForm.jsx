import ModalForm from "../../components/modalForm";

const ProductCreateForm = ({ showModal, onClose }) => {
    const validateField = (name, value, form, forSubmit = false) => {
        switch (name) {
            case "name":
                return !value.trim() ? "Product name is required" : "";

            case "price":
                if (form?.isVariable) return ""; // Price not used for variable products
                if (value === "") return "Invalid price";

                const price = Number(value);
                if (isNaN(price) || price < 0) return "Invalid price";

                const decimalPart = value.toString().split(".")[1];
                if (decimalPart && decimalPart.length > 2) return "Invalid price";

                return "";

            case "sku":
                if (form?.isVariable) return ""; // SKU not used for variable products
                if (value.trim().length > 30) return "SKU cannot have more than 30 characters";
                return !value.trim() ? "SKU is required" : "";

            case "image":
                return "";

            case "inventoryItems":
                if (form?.isVariable) return ""; // Only required when not variable
                // Only validate on submit
                if (!forSubmit) return "";
                return (Array.isArray(value) && value.length > 0)
                    ? ""
                    : "Select at least 1 inventory item";

            default:
                return "";
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
        { name: "inventoryItems", label: "Link Inventory Items", type: "inventory-select", showWhen: form => !form.isVariable }

    ];

    return <ModalForm
        open={showModal}
        onClose={onClose}
        title="Add New Product"
        fields={addProductFields}
        submitLabel="Add Product"
        onSubmit={onSubmit}
        validateField={validateField}
        size="lg"
    />

};


export default ProductCreateForm;