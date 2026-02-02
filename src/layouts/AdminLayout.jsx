import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";

export default function AdminLayout() {
    return (
        // AdminLayout.jsx 주요 수정 부분
        <div className="flex min-h-screen bg-gray-50">
            <AdminSidebar />
            {/* p-8 대신 화면 크기에 따른 유동적인 패딩을 줄 수 있습니다 */}
            <main className="flex-1 p-6 lg:p-10">
                <Outlet />
            </main>
        </div>
    );
}
