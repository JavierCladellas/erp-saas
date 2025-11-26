const NumberField = ({ label, name, value, onChange, min, max, step = 1, externalError, prefix, autoFixDecimals, readOnly }) => {

    const handleBlur = (e) => {
        let val = e.target.value;
        if (val === "") return;

        let num = Number(val);
        if (isNaN(num)) return;

        if (autoFixDecimals) {
            val = num.toFixed(2);
            onChange({ target: { name, value: val } });
        }
    };

    const readOnlyStyle = readOnly ? "bg-gray-100 text-gray-500 cursor-not-allowed" : "";

    return (
        <div className="w-full">
            <label className="block text-gray-700 mb-1">{label}</label>

            <div className="relative">
                {prefix && (
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                        {prefix}
                    </span>
                )}
                <input type="number" name={name} value={value} min={min} max={max} step={step} onChange={onChange} readOnly={readOnly} onBlur={handleBlur}
                    className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500
                        ${prefix ? "pl-8 text-right" : ""}
                        ${externalError ? "border-red-500" : "border-gray-300"}
                        ${readOnlyStyle}
                        appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
                />
            </div>

            {externalError && <p className="text-red-500 text-sm mt-1">{externalError}</p>}
        </div>
    );
};

export default NumberField;
