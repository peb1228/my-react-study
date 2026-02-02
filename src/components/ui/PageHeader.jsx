// src/components/ui/PageHeader.jsx
export default function PageHeader({ label, title, description }) {
    return (
        <div className="mb-6">
            {label && (
                <span className="text-xs font-semibold text-orange-500 uppercase">
                    {label}
                </span>
            )}
            <h1 className="text-2xl font-bold mt-1">{title}</h1>
            {description && (
                <p className="text-sm text-gray-500 mt-1">{description}</p>
            )}
        </div>
    );
}
