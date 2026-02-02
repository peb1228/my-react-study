export default function InfoRow({ label, value }) {
    return (
        <div className="flex justify-between items-center py-3 border-b last:border-b-0">
            <span className="text-sm text-gray-500">{label}</span>
            <span className="font-semibold">{value}</span>
        </div>
    );
}
