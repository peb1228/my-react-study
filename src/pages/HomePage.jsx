import { useNavigate } from "react-router-dom";
import { PageFrame } from "../components/PageFrame";
import Card from "../components/ui/Card";
import { MessageSquare, FileText, Image as ImageIcon, Calendar, User } from 'lucide-react';

export default function HomePage() {
    const navigate = useNavigate();

    const user = {
        name: "김철수",
        email: "kim@example.com",
        phone: "010-0000-0000",
        department: "마케팅",
    };

    return (
        <PageFrame
            title="메인 화면"
            subtitle="반가워요! 오늘 처리할 업무를 확인해보세요."
        >
            <div className="space-y-8 pb-10">
                {/* ================= 상단: 사용자 환영 섹션 ================= */}
                <div className="relative overflow-hidden bg-gradient-to-r from-orange-500 to-orange-400 rounded-[2.5rem] p-8 md:p-10 shadow-xl shadow-orange-100 text-white">
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-6 text-center md:text-left flex-col md:flex-row">
                            <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-inner">
                                <User className="w-10 h-10 text-white" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-black mb-1">{user.name} 님, 환영합니다! ✨</h2>
                                <p className="opacity-90 font-medium">{user.department} | {user.email}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => navigate('/mypage')}
                            className="px-6 py-3 bg-white text-orange-500 rounded-2xl font-bold hover:bg-orange-50 transition-colors shadow-lg"
                        >
                            내 프로필 관리
                        </button>
                    </div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                </div>

                {/* ================= 중간: 핵심 활동 요약 ================= */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard icon={<MessageSquare size={24} />} title="AI 대화" value="8" sub="이번 주 +2회" color="bg-blue-500" />
                    <StatCard icon={<FileText size={24} />} title="생성 문서" value="12" sub="이번 주 +1개" color="bg-purple-500" />
                    <StatCard icon={<ImageIcon size={24} />} title="이미지 생성" value="5" sub="이번 주 +3개" color="bg-pink-500" />
                    <StatCard icon={<Calendar size={24} />} title="오늘 일정" value="3" sub="확인 필요" color="bg-orange-500" />
                </div>

                {/* ================= 하단: 최근 업무 히스토리 및 계정 정보 (교체된 부분) ================= */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* 최근 업무 히스토리 */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-bold text-slate-800">최근 업무 히스토리</h3>
                            <button className="text-sm text-slate-400 hover:text-orange-500 transition-colors">전체보기</button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* 최근 AI 대화 */}
                            <HistoryCard
                                title="최근 AI 대화"
                                icon="chat"
                                iconColor="text-blue-500"
                                items={["마케팅 전략 정리", "보고서 요약 요청"]}
                            />
                            {/* 최근 문서 */}
                            <HistoryCard
                                title="최근 문서"
                                icon="folder"
                                iconColor="text-purple-500"
                                items={["2024 1분기 보고서", "서비스 기획안"]}
                            />
                        </div>
                    </div>

                    {/* 계정 정보 섹션 */}
                    <div className="space-y-4">
                        {/* 헤더 부분: 제목과 버튼을 한 줄에 배치 */}
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-slate-800">계정 정보</h3>
                            <button
                                className="px-4 py-1.5 bg-slate-50 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-100 transition-colors border border-slate-100 shadow-sm"
                            >
                                정보 수정하기
                            </button>
                        </div>

                        {/* 정보 카드 부분 */}
                        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm">
                            <div className="space-y-4">
                                <InfoField label="이메일" value={user.email} />
                                <InfoField label="이름" value={user.name} />
                                <InfoField label="연락처" value={user.phone} />
                                <InfoField label="부서" value={user.department} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageFrame>
    );
}

/* ================= 새로 정의된 하위 컴포넌트 (HTML 스타일 기반) ================= */

function HistoryCard({ title, icon, iconColor, items }) {
    return (
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <div className={`flex items-center space-x-2 mb-4 ${iconColor}`}>
                <span className="material-icons-outlined text-lg">{icon}</span>
                <h4 className="font-semibold text-slate-700">{title}</h4>
            </div>
            <ul className="space-y-3">
                {items.map((item, idx) => (
                    <li key={idx}>
                        <button className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors group">
                            <span className="text-sm text-slate-600 truncate pr-4">{item}</span>
                            <span className="material-icons-outlined text-slate-300 group-hover:text-orange-500 text-sm transition-colors">
                                chevron_right
                            </span>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function InfoField({ label, value }) {
    return (
        <div>
            <p className="text-xs text-slate-400 mb-1 uppercase tracking-wider">{label}</p>
            <p className="font-medium text-slate-800">{value}</p>
        </div>
    );
}

function StatCard({ title, value, sub, icon, color }) {
    return (
        <div className="bg-white p-7 rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-50 group hover:scale-105 transition-all duration-300 cursor-default">
            <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center text-white mb-5 shadow-lg shadow-gray-200 group-hover:rotate-6 transition-transform`}>
                {icon}
            </div>
            <p className="text-gray-500 font-bold text-sm">{title}</p>
            <div className="flex items-end justify-between mt-1">
                <p className="text-4xl font-black text-gray-900">{value}</p>
                <p className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-lg mb-1">{sub}</p>
            </div>
        </div>
    );
}