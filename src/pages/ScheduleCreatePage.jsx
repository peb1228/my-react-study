import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageFrame } from "../components/PageFrame";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import { PrimaryButton, SecondaryButton } from "../components/ui/Button";

/**
 * ScheduleCreatePage
 * - 새로운 일정을 등록하는 페이지
 */
export default function ScheduleCreatePage() {
    const navigate = useNavigate();

    // 입력 상태 관리
    const [formData, setFormData] = useState({
        title: "",
        date: "2026-01-01",
        startTime: "09:00",
        endTime: "10:00",
        type: "work", // meeting, work, personal
        location: "",
        description: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        if (!formData.title.trim()) {
            alert("일정 제목을 입력해주세요.");
            return;
        }
        // 실제 구현 시 여기서 API 호출을 통해 데이터를 저장합니다.
        alert("새 일정이 등록되었습니다.");
        navigate("/schedule");
    };

    return (
        <PageFrame
            title="새 일정 추가"
            subtitle="새로운 일정을 등록하고 AI의 일정 최적화 제안을 받아보세요."
            rightAction={
                <div className="flex gap-2">
                    <SecondaryButton onClick={() => navigate("/schedule")}>
                        취소
                    </SecondaryButton>
                    <PrimaryButton onClick={handleSave} className="shadow-lg shadow-orange-200">
                        일정 저장
                    </PrimaryButton>
                </div>
            }
        >
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">

                {/* ===== 좌측: 일정 상세 입력 ===== */}
                <div className="space-y-6">
                    <Card>
                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">일정 제목</label>
                                <Input
                                    name="title"
                                    placeholder="무엇을 할 예정인가요?"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="text-lg"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">날짜</label>
                                    <Input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">시작 시간</label>
                                    <Input
                                        type="time"
                                        name="startTime"
                                        value={formData.startTime}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">종료 시간</label>
                                    <Input
                                        type="time"
                                        name="endTime"
                                        value={formData.endTime}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div>

                                <div className="relative">

                                    <Input
                                        name="location"
                                        placeholder="장소 또는 화상회의 링크"
                                        value={formData.location}
                                        onChange={handleChange}
                                        className="pl-10"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">메모</label>
                                <textarea
                                    name="description"
                                    rows="5"
                                    placeholder="상세 내용을 입력하세요..."
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-orange-500/20 outline-none resize-none transition-all"
                                />
                            </div>
                        </div>
                    </Card>
                </div>

                {/* ===== 우측: 설정 및 AI 제안 ===== */}
                <div className="space-y-6">
                    {/* 일정 유형 선택 */}
                    <Card>
                        <h4 className="font-bold mb-4 text-gray-900">일정 유형</h4>
                        <div className="grid grid-cols-1 gap-2">
                            {[
                                { id: "meeting", label: "🤝 회의", color: "blue" },
                                { id: "work", label: "💻 업무", color: "purple" },
                                { id: "personal", label: "☕ 개인", color: "orange" },
                            ].map((type) => (
                                <button
                                    key={type.id}
                                    onClick={() => setFormData(prev => ({ ...prev, type: type.id }))}
                                    className={`
                                        w-full text-left px-4 py-3 rounded-xl border-2 transition-all font-semibold
                                        ${formData.type === type.id
                                            ? `border-orange-500 bg-orange-50 text-orange-600`
                                            : "border-gray-50 bg-gray-50 text-gray-500 hover:border-gray-200"}
                                    `}
                                >
                                    {type.label}
                                </button>
                            ))}
                        </div>
                    </Card>


                </div>
            </div>
        </PageFrame>
    );
}