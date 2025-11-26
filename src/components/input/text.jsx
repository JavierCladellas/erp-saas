const TextField = ({ label, name, value, onChange, type = "text", externalError, placeholder, readOnly }) => {
    const readOnlyStyle = readOnly ? "bg-gray-100 text-gray-500 cursor-not-allowed" : "";

    const baseClasses = `w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${externalError ? "border-red-500" : "border-gray-300"} ${readOnlyStyle}`;

    return (
        <div>
            <label className="block text-gray-700 mb-1">{label}</label>

            {type === "textarea" ? (
                <textarea name={name} value={value} onChange={onChange} placeholder={placeholder} readOnly={readOnly} className={baseClasses} />
            ) : (
                <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} readOnly={readOnly} className={baseClasses} />
            )}

            {externalError && <p className="text-red-500 text-sm mt-1">{externalError}</p>}
        </div>
    );
};

export { TextField };
