import Card from "../../components/ui/Card";
import { PrimaryButton, SecondaryButton } from "../../components/ui/Button";

export default function AdminDepartmentPage() {
    const departments = [
        { id: 1, name: "개발팀", head: "이개발", members: 12, status: "운영중" },
        { id: 2, name: "디자인팀", head: "최디자인", members: 5, status: "운영중" },
        { id: 3, name: "마케팅팀", head: "박마케", members: 8, status: "점검중" },
    ];

    return (
        <div className="space-y-8">
            <header className="flex justify-between items-end">
                <div>
                    <p className="text-xs text-orange-500 font-semibold">CONTROL TOWER</p>
                    <h1 className="text-2xl font-bold">부서 관리</h1>
                </div>
                <PrimaryButton>+ 새 부서 추가</PrimaryButton>
            </header>

            <Card className="overflow-hidden p-0">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="p-4 pl-6 text-sm font-semibold text-gray-600">부서명</th>
                            <th className="p-4 text-sm font-semibold text-gray-600">부서장</th>
                            <th className="p-4 text-sm font-semibold text-gray-600">인원 수</th>
                            <th className="p-4 text-sm font-semibold text-gray-600">상태</th>
                            <th className="p-4 pr-6 text-right text-sm font-semibold text-gray-600">관리</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {departments.map((dept) => (
                            <tr key={dept.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="p-4 pl-6 font-medium text-gray-900">{dept.name}</td>
                                <td className="p-4 text-gray-600">{dept.head}</td>
                                <td className="p-4 text-gray-600">{dept.members}명</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-lg text-xs font-bold ${dept.status === "운영중" ? "bg-green-100 text-green-600" : "bg-amber-100 text-amber-600"
                                        }`}>
                                        {dept.status}
                                    </span>
                                </td>
                                <td className="p-4 pr-6 text-right">
                                    <button className="text-sm text-gray-400 hover:text-orange-500 font-medium transition-colors">수정</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
        </div>
    );
}