import { useState } from "react";
import Button from "../components/button";
import {TextField} from  "../components/input/text";

const LoginForm = ({ onSuccess }) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        const fieldError = validateField(name, value);
        setErrors((prev) => ({ ...prev, [name]: fieldError }));
    };

    const validateField = (name, value) => {
        switch (name) {
            case "email":
                return !value.includes("@") ? "Invalid email" : "";
            case "password":
                return value.length === 0
            default:
                return "";
        }
    };

    const validateAll = () => {
        const newErrors = {};
        Object.keys(formData).forEach((key) => {
            const error = validateField(key, formData[key]);
            if (error) newErrors[key] = error;
        });
        setErrors(newErrors);
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateAll();
        if (Object.keys(validationErrors).length === 0) {
            console.log("Login data:", formData);
            alert("Login successful!");
            setFormData({ email: "", password: "" });
            setErrors({});
            onSuccess?.();
        }
    };

    return (
        <div className="mt-10 p-6 bg-white shadow-lg rounded-lg max-w-md mx-auto lg:mx-0 transition-all duration-500">
            <h3 className="text-2xl font-bold text-indigo-600 mb-4">Login to Your Account</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <TextField
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    externalError={errors.email}
                />
                <TextField
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    externalError={errors.password}
                />
                <Button type="submit" className="w-full" variant="primary">
                    Login
                </Button>
            </form>
        </div>
    );
};

export default LoginForm;
