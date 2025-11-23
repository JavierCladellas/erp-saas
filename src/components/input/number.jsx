const NumberField = ({ label, name, value, onChange, min, max, step = 1, externalError }) => {
    return (
        <div className="w-full">
            <label className="block text-gray-700 mb-1">{label}</label>

            <input type="number" name={name} value={value} min={min} max={max} step={step} onChange={onChange}
                className={` w-full px-3 py-[6px] bg-white border text-center rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${externalError ? "border-red-500" : "border-gray-300"} appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
            />

            {externalError && <p className="text-red-500 text-sm mt-1">{externalError}</p>}
        </div>
    );
};

export default NumberField;
