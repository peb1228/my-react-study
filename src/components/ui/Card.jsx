import React from "react";

export default function Card({
    children,
    className = "",
    title,
    description,
}) {
    return (
        <div
            className={`bg-white rounded-2xl border border-gray-200 p-6 ${className}`}
        >
            {(title || description) && (
                <div className="mb-4">
                    {title && (
                        <h3 className="text-lg font-semibold">{title}</h3>
                    )}
                    {description && (
                        <p className="text-sm text-gray-500 mt-1">
                            {description}
                        </p>
                    )}
                </div>
            )}

            {children}
        </div>
    );
}
