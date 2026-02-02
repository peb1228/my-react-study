import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageFrame } from "../components/PageFrame";
import Card from "../components/ui/Card";
import { PrimaryButton, SecondaryButton } from "../components/ui/Button";

export default function SchedulePage() {
    const navigate = useNavigate();
    const today = new Date();

    const [currentMonth, setCurrentMonth] = useState(
        new Date(today.getFullYear(), today.getMonth(), 1)
    );
    const [selectedDate, setSelectedDate] = useState(today);

    // 샘플 일정 데이터
    const [schedules] = useState({
        "2024-03-10": [
            { id: 1, time: "09:00", title: "팀 주간 회의", type: "meeting" },
            { id: 2, time: "14:00", title: "기획안 리뷰", type: "work" },
        ],
        "2024-03-12": [
            { id: 3, time: "10:00", title: "고객 미팅", type: "meeting" },
        ],
    });

    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const days = [];
    for (let i = 0; i < firstDay.getDay(); i++) days.push(null);
    for (let d = 1; d <= lastDay.getDate(); d++) {
        days.push(new Date(year, month, d));
    }

    const selectedKey = formatDateKey(selectedDate);
    const daySchedules = schedules[selectedKey] || [];

    const prevMonth = () => setCurrentMonth(new Date(year, month - 1, 1));
    const nextMonth = () => setCurrentMonth(new Date(year, month + 1, 1));

    return (
        <PageFrame
            title="나의 일정"
            subtitle="달력에서 일정을 관리하고 AI의 요약을 확인하세요."
            rightAction={
                /* 상단에는 '새 일정 추가' 버튼만 남깁니다 */
                <PrimaryButton onClick={() => navigate("/schedule/create")}>
                    + 새 일정 추가
                </PrimaryButton>
            }
        >
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">

                {/* ================= 좌측: 달력 ================= */}
                <Card>
                    {/* 사진에서 요청하신 버튼 위치 섹션 */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="text-xl font-bold text-gray-800">
                            {year}년 {month + 1}월
                        </div>

                        {/* 화살표 이동 버튼 그룹 */}
                        <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-100">
                            <button
                                onClick={prevMonth}
                                className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all text-gray-500 hover:text-orange-500"
                            >
                                <span className="material-symbols-outlined text-xl block">chevron_left</span>
                            </button>
                            <div className="w-[1px] h-4 bg-gray-200 mx-1"></div>
                            <button
                                onClick={nextMonth}
                                className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all text-gray-500 hover:text-orange-500"
                            >
                                <span className="material-symbols-outlined text-xl block">chevron_right</span>
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-7 gap-2 text-center text-sm mb-4 text-gray-400 font-medium border-b border-gray-50 pb-4">
                        {["일", "월", "화", "수", "목", "금", "토"].map((d) => (
                            <div key={d} className={d === "일" ? "text-red-400" : d === "토" ? "text-blue-400" : ""}>
                                {d}
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 gap-3 mt-4">
                        {days.map((date, idx) => {
                            if (!date) return <div key={`empty-${idx}`} />;

                            const key = formatDateKey(date);
                            const isSelected = isSameDay(date, selectedDate);
                            const hasSchedule = schedules[key];

                            return (
                                <button
                                    key={key}
                                    onClick={() => setSelectedDate(date)}
                                    className={`
                                        h-20 rounded-2xl border transition-all flex flex-col items-center justify-center gap-1
                                        ${isSelected
                                            ? "bg-orange-50 border-orange-400 shadow-sm ring-1 ring-orange-400/20"
                                            : "bg-white border-gray-100 hover:border-gray-200 hover:bg-gray-50/50"}
                                    `}
                                >
                                    <span className={`text-sm ${isSelected ? "font-bold text-orange-600" : "text-gray-700"}`}>
                                        {date.getDate()}
                                    </span>
                                    {hasSchedule && (
                                        <span className="w-1.5 h-1.5 bg-orange-400 rounded-full shadow-[0_0_4px_rgba(251,146,60,0.5)]" />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </Card>

                {/* ================= 우측 영역 (이전과 동일) ================= */}
                <div className="space-y-6">
                    <Card>
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-lg text-gray-900">
                                {formatKoreanDate(selectedDate)} 상세 일정
                            </h3>
                            <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-lg font-bold">
                                {daySchedules.length}건
                            </span>
                        </div>

                        {daySchedules.length === 0 ? (
                            <div className="py-16 text-center border-2 border-dashed border-gray-50 rounded-2xl">
                                <span className="material-symbols-outlined text-gray-200 text-5xl mb-2 block">event_busy</span>
                                <p className="text-sm text-gray-400 font-medium">등록된 일정이 없습니다.</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {daySchedules.map((item) => (
                                    <div
                                        key={item.id}
                                        className="w-full flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-white hover:border-orange-200 transition-all cursor-pointer group"
                                    >
                                        <div className="text-xs font-bold text-orange-500 px-2 py-1 bg-orange-50 rounded-lg">
                                            {item.time}
                                        </div>
                                        <div className="font-semibold text-gray-700 group-hover:text-gray-900 truncate text-sm">
                                            {item.title}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </Card>


                </div>
            </div>
        </PageFrame>
    );
}

// 유틸리티 함수 (이전과 동일)
function formatDateKey(date) {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function isSameDay(a, b) {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function formatKoreanDate(date) {
    return `${date.getMonth() + 1}월 ${date.getDate()}일`;
}