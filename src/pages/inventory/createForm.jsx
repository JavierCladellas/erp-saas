import ModalForm from "../../components/modalForm";

const ItemCreateForm = ({ showModal, onClose }) => {

    const validateField = (name, value, form, forSubmit = false) => {
        switch (name) {
            case "attributes":
                if (!form?.isVariant || !Array.isArray(value)) return "";
                const rowsToCheck = forSubmit ? value : value.filter(row => row.key?.trim() || row.value?.trim());
                for (let i = 0; i < rowsToCheck.length; i++) {
                    const row = rowsToCheck[i];
                    if (!row.key?.trim()) return `Attribute key required in row ${i + 1}`;
                    if (!row.value?.trim()) return `Attribute value required in row ${i + 1}`;
                }
                return "";
            case "name":
                return !value.trim() ? "Name is required" : "";
            case "sku":
                if (value.trim().length > 30) return "SKU cannot have more than 30 characters";
                return !value.trim() ? "SKU is required" : "";
            case "stock":
                const num = Number(value);
                return value === "" || isNaN(num) || num < 0 || !Number.isInteger(num) ? "Invalid stock" : "";
            case "price":
                if (value === "") return "Price is required";

                const price = Number(value);
                if (isNaN(price) || price < 0) return "Invalid price";

                const decimalPart = value.toString().split(".")[1];
                if (decimalPart && decimalPart.length > 2) return "Invalid price";

                return "";
            case "product":
                return (form?.isVariant && (!value || value === "")) ? "Product is required" : "";
            default:
                return "";
        }
    };



    const onSubmit = (e) => {
        alert("createAddItem!");
    };

    const availableAttributes = [
        { name: "Color", attribute_values: [{ value: "Red" }, { value: "Blue" }, { value: "Green" }] },
        { name: "Size", attribute_values: [{ value: "S" }, { value: "M" }, { value: "L" }] },
        { name: "Material", attribute_values: [{ value: "Cotton" }, { value: "Polyester" }] },
    ];


    const addItemFields = [
        { name: "name", label: "Item Name", type: "text" },
        {
            row: true,
            fields: [
                { name: "sku", label: "SKU", type: "text", flex: 3, placeholder: "SKU12345" },
                { name: "stock", label: "Stock", type: "number", flex: 1, defaultValue: 1 }
            ],
        },
        { name: "description", label: "Description", type: "textarea" },
        { name: "image", label: "Image", type: "image" },
        {
            row: true,
            fields: [
                { name: "isProduct", label: "Add as product", type: "checkbox", variant: "switch", defaultValue: true, customOnChange: (form, newVal) => ({ isProduct: newVal, isVariant: false }) },
                { name: "isVariant", label: "Add as variant", type: "checkbox", variant: "switch", defaultValue: false, customOnChange: (form, newVal) => ({ isVariant: newVal, isProduct: false }) },
            ]
        },
        {
            row: true,
            fields: [
                { name: "price", label: "Price", type: "number", flex:1,step: 0.01, prefix: "$", autoFixDecimals: true, showWhen: form => form.isProduct === true},
                { name: "category", label: "Category", type: "select", flex: 3, options: [{ "value": "", "label": "No category" }, { "value": "test", "label": "Candy" }], showWhen: form => form.isProduct === true },
            ]
        },
        {
            row: true,
            fields: [
                { name: "price", label: "Price", type: "number", flex:1, step: 0.01, prefix: "$", autoFixDecimals: true, showWhen: form => form.isVariant === true},
                { name: "product", label: "Product", type: "select", flex:3, options: [{ "value": "test", "label": "Brosse à dent" }], showWhen: form => form.isVariant === true },
            ]
        },

        {
            name: "attributes",
            label: "Attributes",
            type: "dynamic-select",
            showWhen: form => form.isVariant === true,
            allowCustom: true,
            rowsDefinition: [
                {
                    fieldName: "key",
                    placeholder: "Select attribute",
                    options: availableAttributes.map(att => ({ value: att.name, label: att.name }))
                },
                {
                    fieldName: "value",
                    placeholder: "Select value"
                }
            ],
            optionsMap: availableAttributes.reduce((acc, att) => {
                acc[att.name] = att.attribute_values.map(val => ({ value: val.value, label: val.value }));
                return acc;
            }, {}),
            defaultValue: [],
        }
    ];



    return (
        <ModalForm
            open={showModal}
            onClose={onClose}
            title="Add New Item"
            fields={addItemFields}
            submitLabel="Add Item"
            onSubmit={onSubmit}
            validateField={validateField}
        />
    )


};


export default ItemCreateForm;