import { TextField } from "./text";
import NumberInputField from "./number";
import CheckboxField from "./checkbox";
import ImageField from "./image";
import SearchableDropdown from "./dropdown";
import DynamicSelect from "./dynamicSelect";
import InventorySelectTable from "../../pages/inventory/selectTable";


const InputFactory = ({ type, handleChange, ...props }) => {
    const onChange = (e) => handleChange?.(e);

    switch (type) {
        case "number":
            return <NumberInputField {...props} onChange={onChange} />;
        case "checkbox":
            return <CheckboxField {...props} onChange={onChange} />;
        case "image":
            return <ImageField {...props} onChange={onChange} />;
        case "select":
            return <SearchableDropdown {...props} onChange={onChange} />
        case "dynamic-select":
            return <DynamicSelect {...props} onChange={handleChange} />;
        case "inventory-select":
            return <InventorySelectTable {...props} onChange = {onChange} />
        case "textarea":
        case "text":
        case "email":
        case "password":
        default:
            return <TextField {...props} type={type} onChange={onChange} />;
    }
};

export default InputFactory;
