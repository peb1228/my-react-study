import React from "react";

export default function Input({
    label,
    value,
    onChange,
    type = "text",
    placeholder = "",
    disabled = false,
}) {
    return (
        <div className="flex flex-col gap-1">
            {label && (
                <label className="text-sm text-gray-600">
                    {label}
                </label>
            )}

            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                className={`px-4 py-2 rounded-xl border text-sm
          focus:outline-none focus:ring-2 focus:ring-orange-400
          ${disabled
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white"
                    }`}
            />
        </div>
    );
}
