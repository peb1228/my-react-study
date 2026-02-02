import Card from "../../components/ui/Card";
import { PrimaryButton } from "../../components/ui/Button";

export default function AdminUserPage() {
    // 임시 사용자 데이터
    const users = [
        { id: 1, name: "이철수", email: "chulsoo@example.com", dept: "개발팀", role: "팀장", status: "활성" },
        { id: 2, name: "김영희", email: "younghee@example.com", dept: "디자인팀", role: "팀원", status: "활성" },
        { id: 3, name: "박민수", email: "minsoo@example.com", dept: "마케팅팀", role: "팀원", status: "정지" },
        { id: 4, name: "최지우", email: "jiwoo@example.com", dept: "개발팀", role: "팀원", status: "활성" },
    ];

    return (
        <div className="space-y-8">
            <header className="flex justify-between items-end">
                <div>
                    <p className="text-xs text-orange-500 font-semibold">CONTROL TOWER</p>
                    <h1 className="text-2xl font-bold">사용자 관리</h1>
                </div>
                <div className="flex gap-3">
                    <input
                        type="text"
                        placeholder="이름 또는 이메일 검색"
                        className="px-4 py-2 border rounded-xl text-sm focus:outline-orange-500 w-64"
                    />
                    <PrimaryButton>사용자 초대</PrimaryButton>
                </div>
            </header>

            <Card className="overflow-hidden p-0">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="p-4 pl-6 text-sm font-semibold text-gray-600">사용자</th>
                            <th className="p-4 text-sm font-semibold text-gray-600">소속 부서</th>
                            <th className="p-4 text-sm font-semibold text-gray-600">직책</th>
                            <th className="p-4 text-sm font-semibold text-gray-600">상태</th>
                            <th className="p-4 pr-6 text-right text-sm font-semibold text-gray-600">관리</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="p-4 pl-6">
                                    <div className="font-medium text-gray-900">{user.name}</div>
                                    <div className="text-xs text-gray-400">{user.email}</div>
                                </td>
                                <td className="p-4 text-gray-600 text-sm">{user.dept}</td>
                                <td className="p-4 text-gray-600 text-sm">{user.role}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-lg text-xs font-bold ${user.status === "활성"
                                            ? "bg-blue-100 text-blue-600"
                                            : "bg-red-100 text-red-600"
                                        }`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td className="p-4 pr-6 text-right">
                                    <button className="text-sm text-gray-400 hover:text-orange-500 font-medium transition-colors mr-3">수정</button>
                                    <button className="text-sm text-gray-400 hover:text-red-500 font-medium transition-colors">정지</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
        </div>
    );
}