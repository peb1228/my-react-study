import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// MainLayout.jsx 수정 부분
function MainLayout() {
    const { isAdmin, isAdminMode } = useAuth();

    return (
        /* h-screen과 overflow-hidden으로 전체 화면 스크롤 제거 */
        // MainLayout.jsx
        <div className="flex h-screen overflow-hidden bg-[#FFF8EE]"> {/* h-screen, overflow-hidden 추가 */}
            <Sidebar />
            <div className="flex-1 flex flex-col min-h-0">
                <main className="flex-1 overflow-hidden flex flex-col items-center py-8 md:py-12 px-4">
                    {/* 하얀색 박스: h-full과 min-h-0을 사용하여 부모 크기에 맞춤 */}
                    <div className="w-full max-w-6xl bg-white shadow-md rounded-2xl flex flex-col h-full min-h-0 overflow-hidden">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}

export default MainLayout;