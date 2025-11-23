const CheckboxField = ({ name, value, onChange, label, externalError, variant = "classic" }) => {
    let variantStyle = null;

    switch (variant) {
        case "classic":
            variantStyle = (
                <>
                    <input type="checkbox" name={name} checked={value} onChange={onChange}
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
                    <label className="ml-2 text-gray-700">{label}</label>
                </>
            );
            break;
        case "switch":
            variantStyle = (
                <label className="inline-flex relative items-center cursor-pointer gap-3">
                    <input name={name} type="checkbox" checked={value} onChange={onChange} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-indigo-600 transition-all"></div>
                    {label && label}
                </label>
            )
            break;
        default:
            variantStyle = null;
    }
    return (
        <div>
            <div className="flex items-center"> {variantStyle} </div>
            {externalError && <p className="text-red-500 text-sm mt-1">{externalError}</p>}
        </div>
    );
};

export default CheckboxField;
