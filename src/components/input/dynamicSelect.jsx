import { useState, useEffect, useRef } from "react";
import { FaTrash } from "react-icons/fa";
import SearchableDropdown from "./dropdown";

const DynamicSelectField = ({
    name,
    label,
    rowsDefinition = [
        { fieldName: "key", placeholder: "Select key" },
        { fieldName: "value", placeholder: "Select value" },
    ],
    optionsMap = {},
    defaultValue = [],
    onChange,
    externalError,
    allowCustom = true,
    readOnly = false
}) => {
    const [rows, setRows] = useState(
        defaultValue.length > 0 ? defaultValue : [{ key: "", value: "" }]
    );

    const inputClass =
        "border rounded-md px-3 py-2 w-full focus:outline-none " +
        (readOnly ? "bg-gray-100 cursor-default" : "");

    const prevRef = useRef("");

    useEffect(() => {
        const mappedValue = rows.map((row) => ({
            key: row.key === "__other__" ? row.keyCustom : row.key,
            value:
                row.value === "__other__" || row.key === "__other__"
                    ? row.valueCustom
                    : row.value,
        }));

        const mappedStr = JSON.stringify(mappedValue);
        if (mappedStr !== prevRef.current) {
            onChange?.({ target: { name, value: mappedValue } });
            prevRef.current = mappedStr;
        }
    }, [rows, name, onChange]);

    const addRow = () => {
        if (readOnly) return;
        setRows((prev) => [...prev, { key: "", value: "" }]);
    };

    const deleteRow = (index) => {
        if (readOnly) return;
        setRows((prev) => prev.filter((_, i) => i !== index));
    };

    const updateRow = (index, field, value) => {
        if (readOnly) return;

        setRows((prev) =>
            prev.map((row, i) =>
                i === index
                    ? {
                          ...row,
                          [field]: value,
                          ...(field === rowsDefinition[0].fieldName
                              ? { [rowsDefinition[1].fieldName]: "" }
                              : {}),
                      }
                    : row
            )
        );
    };

    return (
        <div className="form-col">
            {label && <label className="block mb-1 text-gray-700">{label}</label>}

            <div className="space-y-2">
                {rows.map((row, idx) => {
                    const selectedKey = row[rowsDefinition[0].fieldName];
                    const dependentOptions = optionsMap[selectedKey] || [];

                    const showCustomKeyInput =
                        allowCustom && selectedKey === "__other__";
                    const showCustomValueInput =
                        showCustomKeyInput ||
                        (allowCustom &&
                            row[rowsDefinition[1].fieldName] === "__other__");

                    return (
                        <div key={idx} className="flex items-center gap-2">
                            {/* --- KEY FIELD --- */}
                            {showCustomKeyInput ? (
                                <input
                                    type="text"
                                    placeholder="Enter custom key"
                                    value={row.keyCustom || ""}
                                    readOnly={readOnly}
                                    className={inputClass}
                                    onChange={(e) =>
                                        updateRow(idx, "keyCustom", e.target.value)
                                    }
                                />
                            ) : (
                                <SearchableDropdown
                                    name={`${rowsDefinition[0].fieldName}-${idx}`}
                                    value={selectedKey}
                                    options={[
                                        ...(allowCustom
                                            ? [
                                                  {
                                                      value: "__other__",
                                                      label: "Custom...",
                                                  },
                                              ]
                                            : []),
                                        ...(rowsDefinition[0].options || []),
                                    ]}
                                    placeholder={rowsDefinition[0].placeholder}
                                    onChange={(e) =>
                                        updateRow(
                                            idx,
                                            rowsDefinition[0].fieldName,
                                            e.target.value
                                        )
                                    }
                                    disabled={readOnly}
                                    readOnly={readOnly}
                                    className={inputClass}
                                    noFocusRing={true}
                                />
                            )}

                            {/* --- VALUE FIELD --- */}
                            {showCustomValueInput ? (
                                <input
                                    type="text"
                                    placeholder="Enter custom value"
                                    value={row.valueCustom || ""}
                                    readOnly={readOnly}
                                    className={inputClass}
                                    onChange={(e) =>
                                        updateRow(idx, "valueCustom", e.target.value)
                                    }
                                />
                            ) : (
                                <SearchableDropdown
                                    name={`${rowsDefinition[1].fieldName}-${idx}`}
                                    value={row[rowsDefinition[1].fieldName]}
                                    options={[
                                        ...dependentOptions,
                                        ...(allowCustom
                                            ? [{ value: "__other__", label: "Other…" }]
                                            : []),
                                    ]}
                                    placeholder={rowsDefinition[1].placeholder}
                                    disabled={readOnly || !selectedKey}
                                    readOnly={readOnly}
                                    onChange={(e) =>
                                        updateRow(
                                            idx,
                                            rowsDefinition[1].fieldName,
                                            e.target.value
                                        )
                                    }
                                    className={inputClass}
                                    noFocusRing={true}
                                />
                            )}

                            {/* DELETE BUTTON */}
                            {!readOnly && (
                                <button
                                    type="button"
                                    onClick={() => deleteRow(idx)}
                                    className="p-2 text-red-500 hover:text-red-700"
                                >
                                    <FaTrash />
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* ADD ROW BUTTON */}
            {!readOnly && (
                <button
                    type="button"
                    onClick={addRow}
                    className="mt-2 px-2 py-1 text-indigo-600 hover:text-indigo-800"
                >
                    + Add Row
                </button>
            )}

            {externalError && (
                <p className="text-red-500 text-sm mt-1">{externalError}</p>
            )}
        </div>
    );
};

export default DynamicSelectField;