import { useState } from "react";
import { Info } from "lucide-react";

const ImageUploadField = ({ name, value, onChange, externalError, tooltip, label }) => {
    const [preview, setPreview] = useState(value || null);
    const [dragging, setDragging] = useState(false);

    const handleFile = (file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
            onChange?.({ target: { name, value: file } });
        };
        reader.readAsDataURL(file);
    };

    const onDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) handleFile(file);
    };

    return (
        <div className="w-full flex flex-col gap-1">
            <label className="text-gray-700 font-medium flex items-center gap-1">
                {label}
                {tooltip && (
                    <span className="group relative">
                        <Info className="w-4 h-4 text-gray-400 cursor-pointer" />
                        <span className="absolute -top-10 left-1/2 -translate-x-1/2 hidden group-hover:block px-2 py-1 text-xs bg-gray-800 text-white rounded-md shadow-lg whitespace-nowrap">
                            {tooltip}
                        </span>
                    </span>
                )}
            </label>

            <div
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={onDrop}
                className={` border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-all ${dragging ? "border-indigo-500 bg-indigo-50" : "border-gray-300"} ${externalError ? "border-red-500" : ""} `}            >
                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id={name}
                    onChange={(e) => handleFile(e.target.files[0])}
                />
                <label htmlFor={name} className="cursor-pointer block">
                    {preview ? (<img src={preview} className="w-full max-h-60 object-contain rounded-lg mx-auto" alt="Preview" />
                    ) : (
                        <div className="text-gray-500 flex flex-col items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 opacity-60 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5V17a2 2 0 002 2h14a2 2 0 002-2v-.5m-9-12v12m0-12L8.5 7.5M12 4.5l3.5 3" />
                            </svg>
                            <span>Click or drag an image here</span>
                        </div>
                    )}

                </label>
            </div>

            {externalError && <p className="text-red-500 text-sm">{externalError}</p>}
        </div>
    );
};

export default ImageUploadField;