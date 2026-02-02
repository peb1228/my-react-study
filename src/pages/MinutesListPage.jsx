import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// 경로 수정: 알려주신 src/layouts/PageFrame.jsx 기준
import PageFrame from "../layouts/PageFrame";
import { PrimaryButton } from "../components/ui/Button";

export default function MinutesListPage() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    // 24인치 해상도(1080p)에서 스크롤 없이 버튼과 페이지네이션이 다 보이도록 4개로 설정
    const itemsPerPage = 4;

    // 1. 데이터 정의
    const [minutes] = useState([
        {
            id: 1,
            title: "Q3 마케팅 전략 기획 및 예산안 검토",
            status: "completed",
            date: "2024-03-01",
            time: "오전 10:30",
            duration: "1시간 20분",
            summary: "3분기 주요 KPI 설정 및 소셜 미디어 캠페인 예산 배정에 대한 논의가 주를 이루었습니다.",
            participants: ["김철수", "이영희", "박지민", "최두식"],
            type: "strategy"
        },
        {
            id: 2,
            title: "신규 서비스 'DOT AI' 기능 명세 확정",
            status: "processing",
            progress: 70,
            date: "2024-03-02",
            time: "오후 02:00",
            duration: "45분",
            summary: "AI가 회의 내용을 분석하고 있습니다. 주요 기능 리스트업 완료 및 우선순위 조정 중...",
            participants: ["강민호", "박수진"],
            type: "dev"
        },
        {
            id: 3,
            title: "UX/UI 디자인 리뷰 (외부 파트너사 협의)",
            status: "draft",
            date: "2024-03-03",
            time: "오후 04:15",
            duration: "30분",
            summary: "녹음 파일이 업로드되지 않았습니다. 수동으로 회의록을 작성해주세요.",
            participants: ["정재헌"],
            type: "design"
        },
        {
            id: 4,
            title: "주간 업무 보고 (10월 4주차)",
            status: "completed",
            date: "2024-03-04",
            time: "오전 09:00",
            duration: "50분",
            summary: "지난주 성과 지표 확인 및 이번 주 목표 설정이 완료되었습니다.",
            participants: ["김철수", "박지민"],
            type: "work"
        }
    ]);

    // 2. 검색 및 페이지네이션 로직 (에러 해결 부분)
    const filteredMinutes = minutes.filter(m =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.participants.some(p => p.includes(searchQuery))
    );

    const totalPages = Math.ceil(filteredMinutes.length / itemsPerPage);
    const currentItems = filteredMinutes.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <PageFrame>
            <div className="flex-1 flex flex-col space-y-6 min-h-0">

                {/* 헤더 섹션: 타이틀과 '새 회의록 작성' 버튼을 명시적으로 배치 */}
                <div className="flex justify-between items-end shrink-0">
                    <div>
                        <h2 className="text-3xl font-black tracking-tight text-gray-900">회의록 목록</h2>
                        <p className="text-sm text-gray-500 mt-1">참여한 회의의 AI 요약과 기록을 확인하세요.</p>
                    </div>
                    {/* 버튼이 안 보였던 문제를 해결하기 위해 여기에 직접 배치 */}
                    <PrimaryButton
                        onClick={() => navigate("/minutes/new")}
                        className="flex items-center gap-2 shadow-lg bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl transition-all active:scale-95"
                    >
                        <span className="material-symbols-outlined text-[20px]">add</span>
                        <span className="font-bold">새 회의록 작성</span>
                    </PrimaryButton>
                </div>

                {/* 검색 바 섹션 */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 shrink-0">
                    <div className="relative w-full">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">search</span>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-sm focus:ring-2 focus:ring-orange-500/20 outline-none"
                            placeholder="회의 제목 또는 참여자 검색..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setCurrentPage(1);
                            }}
                        />
                    </div>
                </div>

                {/* 리스트 섹션: flex-1과 overflow-y-auto로 이 영역만 내부 스크롤 발생 */}
                <div className="flex-1 overflow-y-auto min-h-0 pr-2 custom-scrollbar space-y-4">
                    {currentItems.map((m) => (
                        <div
                            key={m.id}
                            onClick={() => navigate(`/minutes/${m.id}`)}
                            className="group bg-white rounded-xl p-5 border border-gray-100 hover:border-orange-500/30 hover:shadow-md transition-all cursor-pointer relative overflow-hidden shrink-0"
                        >
                            <div className="absolute top-0 left-0 w-1.5 h-full bg-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="flex flex-col md:flex-row md:items-center gap-6">
                                <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${m.status === 'completed' ? 'bg-orange-50 text-orange-500' : 'bg-gray-50 text-gray-400'}`}>
                                    <span className="material-symbols-outlined text-xl">
                                        {m.status === 'completed' ? 'auto_awesome' : 'mic_off'}
                                    </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <StatusBadge status={m.status} />
                                        <span className="text-[11px] text-gray-400">{m.duration}</span>
                                    </div>
                                    <h3 className="text-base font-bold text-gray-900 group-hover:text-orange-600 truncate">
                                        {m.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                                        {m.summary}
                                    </p>
                                </div>
                                <div className="text-right shrink-0 min-w-[100px]">
                                    <p className="text-xs font-bold text-gray-900">{m.date}</p>
                                    <p className="text-[10px] text-gray-400">{m.time}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 페이지네이션 섹션: 하단 고정 */}
                <div className="p-4 bg-gray-50/50 flex justify-center items-center gap-2 border-t border-gray-100 shrink-0">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(p => p - 1)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center bg-white shadow-sm ring-1 ring-gray-200 disabled:opacity-30"
                    >
                        <span className="material-symbols-outlined text-sm">chevron_left</span>
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`w-8 h-8 rounded-lg font-mono text-xs font-bold transition-all ${currentPage === i + 1
                                ? "bg-gray-900 text-white"
                                : "bg-white text-gray-400 hover:bg-gray-100"
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(p => p + 1)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center bg-white shadow-sm ring-1 ring-gray-200 disabled:opacity-30"
                    >
                        <span className="material-symbols-outlined text-sm">chevron_right</span>
                    </button>
                </div>
            </div>
        </PageFrame>
    );
}

function StatusBadge({ status }) {
    const map = {
        completed: { label: "요약 완료", className: "bg-emerald-50 text-emerald-700 border-emerald-100" },
        processing: { label: "처리 중", className: "bg-blue-50 text-blue-700 border-blue-100" },
        draft: { label: "초안", className: "bg-gray-100 text-gray-600 border-gray-200" },
    };
    const s = map[status] || map.draft;
    return (
        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${s.className}`}>
            {s.label}
        </span>
    );
}