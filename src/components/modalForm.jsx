import { useState } from "react";
import Button from "./button";
import InputFactory from "./input/inputFactory";
import Modal from "./modal";


const ModalForm = ({ open, onClose, onFormChange, title, fields, onSubmit, submitLabel = "Submit", validateField }) => {
    const [formData, setFormData] = useState(() => {
        const initialData = {};
        fields.forEach((field) => {
            if (field.row && Array.isArray(field.fields))
                field.fields.forEach(sub => { initialData[sub.name] = sub.defaultValue ?? ""; });
            else
                initialData[field.name] = field.defaultValue ?? "";
        });
        return initialData;
    });
    const [errors, setErrors] = useState({});

    const validateAll = (forSubmit = true) => {
        const newErrors = {};
        Object.keys(formData).forEach((key) => {
            const error = validateField?.(key, formData[key], formData, forSubmit);
            if (error) newErrors[key] = error;
        });

        fields.forEach((field) => {
            if (field.row && Array.isArray(field.fields)) {
                field.fields.forEach((sub) => {
                    if (!(sub.name in formData)) {
                        const error = validateField?.(sub.name, "", formData,forSubmit);
                        if (error) newErrors[sub.name] = error;
                    }
                });
            } else if (!(field.name in formData)) {
                const error = validateField?.(field.name, "", formData,forSubmit);
                if (error) newErrors[field.name] = error;
            }
        });

        setErrors(newErrors);
        return newErrors;
    };


    const extractValue = (valOrEvent) => {
        if (valOrEvent?.target) {
            const { type, checked, value } = valOrEvent.target;
            return type === "checkbox" ? checked : value;
        }
        return valOrEvent;
    };

    const handleChange = (field, valOrEvent) => {
        const value = extractValue(valOrEvent);

        if (field.customOnChange) {
            setFormData(prev => {
                const updated = field.customOnChange(prev, value);
                return { ...prev, ...updated };
            });
        }
        else {
            setFormData((prev) => ({ ...prev, [field.name]: value }));
        }

        if (validateField) {
            const fieldError = validateField(field.name, value, { ...formData, [field.name]: value }, false);
            setErrors(prev => ({ ...prev, [field.name]: fieldError }));
        }

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateAll(true);
        if (Object.keys(validationErrors).length > 0) return;

        const hasFile = fields.some((f) => f.type === "file" || f.type === "image");
        let payload = hasFile ? new FormData() : {};

        if (hasFile)
            Object.entries(formData).forEach(([key, val]) => payload.append(key, val));
        else
            payload = formData;

        onSubmit(payload);
        setFormData({});
        setErrors({});
        onClose();
    };


    const shouldShow = (field) => {
        return !field.showWhen || field.showWhen(formData);
    };


    return (
        <Modal open={open} onClose={onClose} title={title}>
            <form onSubmit={handleSubmit} onChange={onFormChange} className="space-y-5 mt-2">
                {fields.map((field, idx) =>
                    field.row && Array.isArray(field.fields) ? (
                        <div key={`row-${idx}`} className="flex gap-4">
                            {field.fields
                                .filter(sub => shouldShow(sub))
                                .map(sub => (
                                    <div key={sub.name} style={{ flex: sub.flex ?? 1 }}>
                                        <InputFactory {...sub} value={formData[sub.name] ?? ""} externalError={errors[sub.name]} handleChange={(ev) => handleChange(sub, ev)} />
                                    </div>
                                ))}
                        </div>
                    ) : shouldShow(field) ? (
                        <div key={field.name} className="flex flex-col gap-1">
                            <InputFactory {...field} value={formData[field.name] ?? ""} externalError={errors[field.name]} handleChange={(ev) => handleChange(field, ev)} />
                        </div>
                    ) : null
                )}
                <div className="flex justify-end gap-3 border-t pt-4">
                    <Button variant="secondary" onClick={onClose} type="button"> Cancel </Button>
                    <Button variant="primary" type="submit"> {submitLabel} </Button>
                </div>
            </form>
        </Modal>
    );
};

export default ModalForm;
