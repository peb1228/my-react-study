import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { PageFrame } from "../components/PageFrame";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import { PrimaryButton, SecondaryButton } from "../components/ui/Button";

export default function MinutesCreatePage() {
    const navigate = useNavigate();

    // 상태 관리
    const [title, setTitle] = useState("");
    const [participants, setParticipants] = useState(""); // 참여자 추가
    const [visibility, setVisibility] = useState("team");
    const [isRecording, setIsRecording] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);
    const fileInputRef = useRef(null);

    // 녹음 시작/중지 핸들러 (실제 미디어 장치 연결 로직은 여기에 구현)
    const toggleRecording = () => {
        setIsRecording(!isRecording);
        if (!isRecording) {
            console.log("녹음 시작...");
        } else {
            console.log("녹음 중지 및 임시 저장");
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) setUploadedFile(file);
    };

    const handleSave = () => {
        if (!title || (!uploadedFile && !isRecording)) {
            alert("회의 제목과 음성 파일(또는 녹음)이 필요합니다.");
            return;
        }
        alert("회의록 생성이 시작되었습니다. AI가 분석을 완료하면 알림을 보내드립니다.");
        navigate("/minutes");
    };

    return (
        <PageFrame
            title="새 회의 기록하기"
            subtitle="실시간 녹음을 시작하거나 저장된 회의 음성 파일을 업로드하세요."
            rightAction={
                <div className="flex gap-2">
                    <SecondaryButton onClick={() => navigate("/minutes")}>취소</SecondaryButton>
                    <PrimaryButton onClick={handleSave}>분석 시작하기</PrimaryButton>
                </div>
            }
        >
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">

                <div className="space-y-6">
                    {/* 1. 회의 기본 정보 */}
                    <Card>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">회의 제목</label>
                                <Input
                                    placeholder="예: Q3 마케팅 전략 기획 및 예산안 검토"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">참여자</label>
                                <Input
                                    placeholder="참여한 팀원 이름을 입력하세요 (쉼표로 구분)"
                                    value={participants}
                                    onChange={(e) => setParticipants(e.target.value)}
                                />
                            </div>
                        </div>
                    </Card>

                    {/* 2. 음성 입력 섹션 (핵심 기능) */}
                    <Card className="overflow-hidden">
                        <div className="flex flex-col items-center py-10 space-y-6">
                            {/* 녹음 버튼 애니메이션 */}
                            <div className="relative">
                                {isRecording && (
                                    <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-25"></span>
                                )}
                                <button
                                    onClick={toggleRecording}
                                    className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center transition-all ${isRecording ? "bg-red-500 shadow-red-200" : "bg-primary shadow-orange-200"
                                        } shadow-2xl text-white`}
                                >
                                    <span className="material-symbols-outlined text-4xl">
                                        {isRecording ? "stop" : "mic"}
                                    </span>
                                </button>
                            </div>

                            <div className="text-center">
                                <h4 className="font-bold text-lg">
                                    {isRecording ? "회의 내용을 녹음 중입니다..." : "실시간 회의 녹음"}
                                </h4>
                                <p className="text-sm text-gray-500 mt-1">
                                    녹음 버튼을 누르면 AI가 대화를 인식하기 시작합니다.
                                </p>
                            </div>

                            <div className="w-full flex items-center gap-4">
                                <div className="flex-1 h-[1px] bg-gray-100"></div>
                                <span className="text-xs text-gray-400 font-medium">OR</span>
                                <div className="flex-1 h-[1px] bg-gray-100"></div>
                            </div>

                            {/* 파일 업로드 영역 */}
                            <div
                                onClick={() => fileInputRef.current.click()}
                                className="w-full border-2 border-dashed border-gray-200 rounded-2xl p-8 flex flex-col items-center hover:bg-gray-50 cursor-pointer transition-colors"
                            >
                                <span className="material-symbols-outlined text-gray-400 text-3xl mb-2">cloud_upload</span>
                                <p className="text-sm font-medium text-gray-600">
                                    {uploadedFile ? uploadedFile.name : "기존 음성 파일 업로드 (mp3, m4a, wav)"}
                                </p>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="audio/*"
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>
                    </Card>
                </div>

                {/* 3. 공유 설정 (우측 사이드바) */}
                <Card className="h-fit sticky top-6">
                    <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-xl">share</span>
                        공유 설정
                    </h4>

                    <div className="space-y-2">
                        <ShareOption
                            label="🔒 나만 보기"
                            desc="작성자 본인만 확인 가능"
                            active={visibility === "private"}
                            onClick={() => setVisibility("private")}
                        />
                        <ShareOption
                            label="🏢 내 부서"
                            desc="마케팅팀 팀원과 공유"
                            active={visibility === "team"}
                            onClick={() => setVisibility("team")}
                        />
                        <ShareOption
                            label="🌐 전체 공유"
                            desc="사내 전 구성원 공개"
                            active={visibility === "company"}
                            onClick={() => setVisibility("company")}
                        />
                    </div>
                </Card>
            </div>
        </PageFrame>
    );
}

/* ===== 공유 옵션 컴포넌트 개선 ===== */
function ShareOption({ label, desc, active, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`
                w-full text-left px-4 py-3 rounded-xl border transition-all
                ${active
                    ? "bg-orange-50 border-primary ring-1 ring-primary"
                    : "bg-white border-gray-100 hover:border-gray-200 hover:bg-gray-50"}
            `}
        >
            <div className="font-bold text-sm text-gray-900">{label}</div>
            <div className="text-[11px] text-gray-500 mt-0.5">{desc}</div>
        </button>
    );
}