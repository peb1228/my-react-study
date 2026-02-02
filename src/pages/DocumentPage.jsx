import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

export default function DocumentPage() {
    const navigate = useNavigate();

    const [documents] = useState([
        { id: 1, title: "2024 Q1 마케팅 전략 기획안", description: "내년도 상반기 주요 채널 확장 전략 및 예산안 포함...", author: "김철수", department: "마케팅팀", date: "2023.10.24", time: "오후 2:30", type: "work" },
        { id: 2, title: "신규 서비스 아이디어 브레인스토밍", description: "AI 기반 자동화 툴 기능 제안 및 타겟 유저 분석", author: "이영희", department: "기획팀", date: "2023.10.22", time: "오전 11:15", type: "idea" },
        { id: 3, title: "겨울 제주도 여행 일정", description: "3박 4일 코스, 맛집 리스트 및 숙소 예약 정보", author: "김철수", department: "마케팅팀", date: "2023.10.20", time: "오후 8:40", type: "personal" },
        { id: 4, title: "주간 업무 보고서 (10월 3주차)", description: "팀별 KPI 달성 현황 및 이슈 사항 정리", author: "박지민", department: "운영팀", date: "2023.10.18", time: "오후 5:00", type: "work" },
        { id: 5, title: "기존 데이터 테스트 5", description: "데이터가 충분할 때의 레이아웃 확인용", author: "관리자", department: "개발팀", date: "2023.10.15", time: "오후 1:00", type: "work" },
    ]);

    const [activeTab, setActiveTab] = useState("전체");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState("최신순");
    const [currentPage, setCurrentPage] = useState(1);

    // 24인치 한 화면에 맞추기 위해 한 페이지당 노출 개수를 5~6개로 유지하는 것이 좋습니다.
    const itemsPerPage = 5;

    const filteredDocs = useMemo(() => {
        let result = documents.filter(doc => {
            const matchesTab = activeTab === "전체" ||
                (activeTab === "업무" && doc.type === "work") ||
                (activeTab === "개인" && doc.type === "personal") ||
                (activeTab === "아이디어" && doc.type === "idea");
            const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                doc.author.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesTab && matchesSearch;
        });

        return result.sort((a, b) => {
            if (sortOrder === "최신순") return new Date(b.date) - new Date(a.date);
            if (sortOrder === "제목순") return a.title.localeCompare(b.title);
            return 0;
        });
    }, [documents, activeTab, searchQuery, sortOrder]);

    const totalPages = Math.ceil(filteredDocs.length / itemsPerPage);
    const currentItems = filteredDocs.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        /* [핵심 수정] min-h-screen 대신 h-full과 overflow-hidden 적용 */
        <div className="h-full w-full bg-[#FBFBF9] text-gray-900 font-sans overflow-hidden flex flex-col">
            <main className="flex-1 flex flex-col max-w-[1200px] mx-auto w-full p-6 md:p-10 space-y-6 min-h-0">

                {/* 헤더 섹션: shrink-0으로 높이 고정 */}
                <header className="flex justify-between items-end shrink-0">
                    <div className="space-y-1">
                        <h2 className="text-3xl font-black tracking-tight text-gray-900">문서 보관함</h2>
                    </div>
                    <button
                        onClick={() => navigate("/document/new")}
                        className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg transition-all active:scale-95 text-sm"
                    >
                        <span className="material-symbols-outlined text-sm">add</span>
                        <span>새 문서 작성</span>
                    </button>
                </header>

                {/* 검색/필터 및 탭: shrink-0으로 높이 고정 */}
                <section className="space-y-4 shrink-0">
                    <div className="relative group">
                        <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500">search</span>
                        <input
                            className="w-full h-14 pl-14 pr-6 bg-white rounded-2xl border-none shadow-sm ring-1 ring-gray-200 focus:ring-2 focus:ring-orange-500/50 text-base transition-all"
                            placeholder="찾으시는 문서 제목이나 작성자를 입력하세요"
                            value={searchQuery}
                            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                        />
                    </div>

                    <nav className="flex gap-2 overflow-x-auto no-scrollbar py-1">
                        {["전체", "업무", "개인", "아이디어"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
                                className={`px-6 py-2 rounded-lg font-bold text-xs transition-all ${activeTab === tab
                                    ? "bg-orange-500 text-white shadow-md shadow-orange-100"
                                    : "bg-white text-gray-400 hover:bg-gray-50 ring-1 ring-gray-100"
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </nav>
                </section>

                {/* [핵심 수정] 테이블 영역: flex-1과 min-h-0으로 남은 공간을 모두 차지하게 함 */}
                <div className="flex-1 min-h-0 bg-white rounded-[2rem] shadow-sm ring-1 ring-gray-100 overflow-hidden flex flex-col">
                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        <table className="w-full text-left border-collapse">
                            <thead className="sticky top-0 z-10 bg-gray-50/90 backdrop-blur-sm border-b border-gray-100">
                                <tr className="text-[10px] font-black uppercase text-gray-400 tracking-wider">
                                    <th className="p-5 pl-8 w-16 text-center">No.</th>
                                    <th className="p-5">문서 정보</th>
                                    <th className="p-5 text-center">작성자</th>
                                    <th className="p-5 text-center">날짜</th>
                                    <th className="p-5 w-16"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {currentItems.map((doc, idx) => (
                                    <tr key={doc.id} className="group hover:bg-orange-50/30 transition-all cursor-pointer">
                                        <td className="p-4 pl-8 text-center font-mono text-xs text-gray-300 group-hover:text-orange-400">
                                            {(currentPage - 1) * itemsPerPage + idx + 1}
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${getIconStyle(doc.type).bg}`}>
                                                    <span className={`material-symbols-outlined text-xl ${getIconStyle(doc.type).text}`}>
                                                        {getIconStyle(doc.type).name}
                                                    </span>
                                                </div>
                                                <div className="flex flex-col min-w-0">
                                                    <span className="text-sm font-bold text-gray-900 truncate group-hover:text-orange-600">{doc.title}</span>
                                                    <span className="text-xs text-gray-400 truncate max-w-[250px]">{doc.description}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-center">
                                            <div className="inline-flex flex-col">
                                                <span className="text-sm font-bold text-gray-700">@{doc.author}</span>
                                                <span className="text-[9px] font-black text-orange-400 uppercase">{doc.department}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-center">
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold text-gray-600 font-mono">{doc.date}</span>
                                                <span className="text-[10px] text-gray-300">{doc.time}</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <button className="text-gray-300 hover:text-orange-500">
                                                <span className="material-symbols-outlined text-xl">more_horiz</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* 페이지네이션 UI: 하단에 고정 */}
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
            </main>
        </div>
    );
}

function getIconStyle(type) {
    switch (type) {
        case 'work': return { name: 'article', bg: 'bg-indigo-50', text: 'text-indigo-500' };
        case 'idea': return { name: 'lightbulb', bg: 'bg-amber-50', text: 'text-amber-500' };
        case 'personal': return { name: 'person', bg: 'bg-emerald-50', text: 'text-emerald-500' };
        default: return { name: 'folder', bg: 'bg-gray-50', text: 'text-gray-500' };
    }
}