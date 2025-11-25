import { useState, useRef, useEffect } from "react";

const SearchableDropdown = ({
    label,
    name,
    value,
    onChange,
    options = [],
    placeholder = "Select…",
    externalError,
    className = "",
    readOnly
}) => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const containerRef = useRef(null);

    const selectedLabel = options.find((o) => o.value === value)?.label || "";

    // Close on outside click
    useEffect(() => {
        const handler = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setOpen(false);
                setSearch("");
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const filtered = options.filter((opt) => opt.label.toLowerCase().includes(search.toLowerCase()));

    const handleSelect = (option) => {
        if (readOnly) return; // 🚫 Prevent selection
        onChange?.({ target: { name, value: option.value } });
        setOpen(false);
        setSearch("");
    };

    return (
        <div className="relative w-full" ref={containerRef}>
            {label && <label className="block mb-1 text-gray-700">{label}</label>}

            <div className="relative w-full">
                {!open || readOnly ? (
                    <span
                        onClick={() => {
                            if (!readOnly) setOpen(true);
                        }}
                        className={`block w-full border rounded-md px-3 py-2 ${externalError ? "border-red-500" : "border-gray-300"
                            } text-gray-900 ${readOnly ? "bg-gray-100 cursor-default text-gray-500" : "cursor-pointer"
                            }`}
                    >
                        {selectedLabel || placeholder}
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                            ▾
                        </span>
                    </span>
                ) : (
                    <input
                        autoFocus
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder={selectedLabel || placeholder}
                        onClick={(e) => e.stopPropagation()}
                        disabled={readOnly} // 🛡️ Prevent editing
                        className={`w-full border rounded-md px-3 py-2 ${externalError ? "border-red-500" : "border-gray-300"
                            } outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900`}
                    />
                )}
            </div>

            {open && !readOnly && (
                <div className="absolute left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg mt-1 max-h-60 overflow-auto z-50">
                    {filtered.length === 0 ? (
                        <div className="px-3 py-2 text-gray-500 text-sm">No results</div>
                    ) : (
                        filtered.map((option) => (
                            <div
                                key={option.value}
                                onClick={() => handleSelect(option)}
                                className={`py-2 px-3 cursor-pointer hover:bg-indigo-100 rounded ${value === option.value ? "bg-indigo-100 font-medium" : ""
                                    }`}
                            >
                                {option.label}
                            </div>
                        ))
                    )}
                </div>
            )}

            {externalError && (<p className="text-red-500 text-sm mt-1">{externalError}</p>)}
        </div>
    );
};

export default SearchableDropdown;