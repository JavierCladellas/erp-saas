import ModalForm from "../../components/modalForm";

const ItemEditForm = ({ showModal, onClose, item }) => {

    const validateField = (name, value, form, forSubmit = false) => {
        switch (name) {
            case "name":
                return !value.trim() ? "Name is required" : "";
            case "sku":
                if (value.trim().length > 30) return "SKU cannot have more than 30 characters";
                return !value.trim() ? "SKU is required" : "";
            case "stock":
                const num = Number(value);
                return value === "" || isNaN(num) || num < 0 || !Number.isInteger(num) ? "Invalid stock" : "";
            default:
                return "";
        }
    };



    const onSubmit = (e) => {
        alert("Editted Item!");
    };

    const addItemFields = [
        { name: "name", label: "Item Name", type: "text", defaultValue: item?.name },
        {
            row: true,
            fields: [
                { name: "sku", label: "SKU", type: "text", flex: 3, placeholder: "SKU12345", defaultValue: item?.sku },
                { name: "stock", label: "Stock", type: "number", flex: 1, defaultValue: 1, defaultValue: item?.stock }
            ],
        },
        { name: "description", label: "Description", type: "textarea", defaultValue: item?.description },
        { name: "image", label: "Image", type: "image", defaultValue: "http://localhost:8000/api/"+item?.image_url },
    ];



    return (
        <ModalForm
            open={showModal}
            onClose={onClose}
            title={`${item?.sku} - ${item?.name}`}
            fields={addItemFields}
            submitLabel="Edit Item"
            onSubmit={onSubmit}
            validateField={validateField}
        />
    )


};


export default ItemEditForm;