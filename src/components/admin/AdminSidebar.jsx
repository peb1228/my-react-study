import { NavLink, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    Building2,
    Settings,
    Home,
    LogOut,
} from "lucide-react";

export default function AdminSidebar() {
    const navigate = useNavigate();

    const menuClass = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
     transition
     ${isActive
            ? "bg-orange-500 text-white shadow"
            : "text-gray-600 hover:bg-orange-100"
        }`;

    return (
        <aside className="w-64 bg-white border-r flex flex-col px-5 py-6">
            {/* 로고 */}
            <div className="flex items-center gap-3 px-5 mb-9">
                <div className="flex items-center justify-center rounded-full bg-primary/10 w-20 h-20">
                    <img
                        src="/hero-bot.png"
                        alt="DOT AI 아이콘"
                        className="w-20 h-20 object-contain"
                    />
                </div>
                <span className="font-black text-lg">Ai DOT.</span>
            </div>

            {/* 메인 메뉴 */}
            <nav className="flex flex-col gap-2">
                <NavLink to="/admin" end className={menuClass}>
                    <LayoutDashboard size={18} />
                    대시보드
                </NavLink>

                <NavLink to="/admin/users" className={menuClass}>
                    <Building2 size={18} />
                    부서 관리
                </NavLink>

                <NavLink to="/admin/settings" className={menuClass}>
                    <Settings size={18} />
                    설정
                </NavLink>
            </nav>

            {/* SERVICE */}
            <div className="mt-8 mb-4">
                <p className="text-xs text-gray-400 tracking-widest">SERVICE</p>
            </div>

            <button
                onClick={() => navigate("/home")} // "/HomePage.jsx" 대신 라우터에 설정된 경로인 "/"를 입력합니다.
                className="flex items-center gap-3 px-4 py-3 rounded-xl
               text-sm text-gray-600 hover:bg-orange-100 transition-colors"
            >
                <Home size={18} />
                사용자 홈으로 이동
            </button>

            {/* 하단 관리자 카드 */}
            <div className="mt-auto pt-6">
                <div className="flex items-center justify-between p-4 rounded-2xl border bg-orange-50">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-orange-500 text-white
                            flex items-center justify-center font-bold">
                            관
                        </div>
                        <div>
                            <p className="text-sm font-semibold">관리자</p>
                            <p className="text-xs text-orange-500 font-bold">ADMIN</p>
                        </div>
                    </div>

                    <button
                        onClick={() => navigate("/")}
                        className="text-gray-500 hover:text-orange-500"
                        title="관리자 모드 종료"
                    >
                        <LogOut size={18} />
                    </button>
                </div>

                <p className="mt-4 text-xs text-center text-gray-400">
                    © 2026 Ai DOT. ADMIN SYSTEM
                </p>
            </div>
        </aside>
    );
}
