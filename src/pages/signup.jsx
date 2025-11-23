import { useState } from "react";
import Button from "../components/button";
import CheckboxField from "../components/input/checkbox";
import {TextField} from  "../components/input/text";

const SignupForm = ({ onSuccess }) => {
    const [formData, setFormData] = useState({
        companyName: "",
        ownerName: "",
        email: "",
        password: "",
        confirmPassword: "",
        acceptTerms: false,
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === "checkbox" ? checked : value;

        setFormData((prev) => ({ ...prev, [name]: newValue }));

        const fieldError = validateField(name, newValue);
        setErrors((prev) => ({ ...prev, [name]: fieldError }));
    };

    const validateField = (name, value) => {
        switch (name) {
            case "companyName":
                return !value.trim() ? "Company name is required" : "";
            case "ownerName":
                return !value.trim() ? "Owner name is required" : "";
            case "email":
                return !value.includes("@") ? "Invalid email" : "";
            case "password":
                return value.length < 6 ? "Password must be at least 6 characters" : "";
            case "confirmPassword":
                return value !== formData.password ? "Passwords do not match" : "";
            case "acceptTerms":
                return !value ? "You must accept the terms of service" : "";
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
            console.log("Signup data:", formData);
            alert("Signup successful!");
            setFormData({
                companyName: "",
                ownerName: "",
                email: "",
                password: "",
                confirmPassword: "",
                acceptTerms: false,
            });
            setErrors({});

            onSuccess?.();
        }
    };

    return (
        <div className="mt-10 p-6 bg-white shadow-lg rounded-lg max-w-md mx-auto lg:mx-0 transition-all duration-500">
            <h3 className="text-2xl font-bold text-indigo-600 mb-4">Create Your Account</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <TextField
                    label="Company Name"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    externalError={errors.companyName}
                />
                <TextField
                    label="Owner Name"
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={handleChange}
                    externalError={errors.ownerName}
                />
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
                <TextField
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    externalError={errors.confirmPassword}
                />
                <CheckboxField
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleChange}
                    label={
                        <>
                            I accept the{" "}
                            <a href="/terms" className="text-indigo-600 underline">
                                Terms of Service
                            </a>
                        </>
                    }
                    externalError={errors.acceptTerms}
                />

                <Button type="submit" className="w-full">
                    Sign Up
                </Button>
            </form>
        </div>
    );
};

export default SignupForm;
