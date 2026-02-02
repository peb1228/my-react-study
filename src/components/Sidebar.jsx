import { NavLink, useNavigate } from "react-router-dom";
import { Shield, LogOut } from "lucide-react";

export default function Sidebar() {
    const navigate = useNavigate();

    // 사용자 정보 가져오기 (데이터가 없을 경우를 대비해 빈 객체 {}를 기본값으로 설정)
    const user = JSON.parse(localStorage.getItem("user")) || {};
    const isAdmin = user?.isAdmin === true;

    // ✅ 로그아웃 핸들러
    const handleLogout = () => {
        localStorage.removeItem("user");   // 사용자 정보 제거
        navigate("/");                     // 홈 or 로그인 페이지로 이동
    };

    return (
        <aside className="w-64 bg-white border-r px-4 py-6 flex flex-col h-screen overflow-y-auto">
            {/* ================= 로고 ================= */}
            <div className="flex items-center gap-3 px-5 mb-9">
                <div className="flex items-center justify-center rounded-full bg-orange-50 w-17 h-17">
                    <img
                        src="/hero-bot.png"
                        alt="DOT AI 아이콘"
                        className="w-20 h-20 object-contain"
                    />
                </div>
                <span className="font-black text-lg">Ai DOT.</span>
            </div>

            {/* ================= 네비게이션 ================= */}
            <nav className="flex flex-col gap-1">
                <NavItem to="/home" label="메인 화면">
                    <HomeIcon />
                </NavItem>

                <NavItem to="/chat" label="에이닷 챗봇">
                    <ChatIcon />
                </NavItem>

                <NavItem to="/document" label="문서 보관함">
                    <DocumentIcon />
                </NavItem>

                <NavItem to="/minutes" label="회의록 분석">
                    <MicIcon />
                </NavItem>

                <NavItem to="/image" label="이미지 생성">
                    <ImageIcon />
                </NavItem>

                <NavItem to="/schedule" label="일정 관리">
                    <CalendarIcon />
                </NavItem>

                <NavItem to="/mypage" label="마이페이지">
                    <UserIcon />
                </NavItem>

                <div className="my-4 border-t" />

                <button
                    onClick={() => navigate("/admin")}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg border border-blue-400 text-blue-600 font-semibold hover:bg-blue-50 transition-colors"
                >
                    <Shield size={18} />
                    관리자
                </button>
            </nav>

            {/* 🔻 하단 사용자 카드 */}
            <div className="mt-auto pt-6">
                <div className="flex items-center justify-between p-4 rounded-2xl border bg-orange-50 shadow-sm">
                    <div className="flex items-center gap-3">
                        {/* 아바타 (user.name이 없을 경우 'Guest'의 'G' 표시) */}
                        <div className="w-9 h-9 rounded-full bg-orange-400 text-white flex items-center justify-center font-bold">
                            {user.name ? user.name[0] : "G"}
                        </div>

                        {/* 사용자 정보 (옵셔널 체이닝 ?. 사용으로 에러 방지) */}
                        <div className="overflow-hidden">
                            <p className="text-sm font-semibold truncate">
                                {user.name || "게스트"}
                            </p>
                            <p className="text-[10px] text-orange-500 font-black uppercase tracking-wider">
                                {isAdmin ? "관리자" : "일반 사용자"}
                            </p>
                        </div>
                    </div>

                    {/* 로그아웃 버튼 */}
                    <button
                        onClick={handleLogout}
                        className="text-gray-400 hover:text-orange-600 transition-colors flex-shrink-0"
                        title="로그아웃"
                    >
                        <LogOut size={18} />
                    </button>
                </div>

                <p className="mt-4 text-[10px] text-center text-gray-400 font-medium">
                    © 2026 Ai DOT. 관리 시스템
                </p>
            </div>
        </aside>
    );
}

/* ================= NavItem ================= */

function NavItem({ to, label, children }) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all
         ${isActive
                    ? "bg-orange-50 text-orange-600 font-bold shadow-sm shadow-orange-100"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }`
            }
        >
            <div className="w-6 h-6 flex items-center justify-center">{children}</div>
            <span className="text-sm">{label}</span>
        </NavLink>
    );
}

/* ================= 아이콘 컴포넌트들 (기존과 동일) ================= */
function HomeIcon() { return <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>; }
function ChatIcon() { return <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>; }
function DocumentIcon() { return <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>; }
function MicIcon() { return <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>; }
function ImageIcon() { return <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>; }
function CalendarIcon() { return <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>; }
function UserIcon() { return <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>; }