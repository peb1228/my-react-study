import { useState, useRef } from "react";
import PageFrame from "../layouts/PageFrame";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import { PrimaryButton, SecondaryButton } from "../components/ui/Button";

/**
 * MyPage
 * - 프로필 정보 수정 및 부서 선택 모달 기능
 * - 추가 기능: 프로필 이미지 변경, 알림 설정, 계정 활동 요약
 */
export default function MyPage() {
    const [isEdit, setIsEdit] = useState(false);
    const [isDeptModal, setIsDeptModal] = useState(false);
    const fileInputRef = useRef(null);

    const [user, setUser] = useState({
        name: "김철수",
        email: "kim@example.com",
        phone: "010-1234-5678",
        department: "마케팅팀",
        profileImg: null,
        joinDate: "2024.01.15",
        position: "과장"
    });

    const departments = ["마케팅팀", "개발팀", "디자인팀", "인사팀", "영업팀", "기획팀"];

    const handleImageClick = () => {
        if (isEdit) fileInputRef.current.click();
    };

    return (
        <PageFrame
            title="마이페이지"
            subtitle="내 프로필 정보를 관리하고 보안 설정을 변경하세요."
        >
            <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">

                {/* ===== 좌측: 프로필 요약 카드 ===== */}
                <div className="space-y-6">
                    <Card className="text-center">
                        <div className="relative w-24 h-24 mx-auto mb-4 group">
                            <div
                                onClick={handleImageClick}
                                className={`w-full h-full rounded-full bg-orange-100 flex items-center justify-center text-3xl font-bold text-orange-600 border-4 border-white shadow-md overflow-hidden ${isEdit ? "cursor-pointer hover:opacity-80 transition" : ""}`}
                            >
                                {user.profileImg ? <img src={user.profileImg} alt="profile" /> : user.name[0]}
                            </div>
                            {isEdit && (
                                <div className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow-sm border border-gray-100">
                                    <span className="material-symbols-outlined text-sm block text-gray-600">photo_camera</span>
                                </div>
                            )}
                            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">{user.name}</h3>
                        <p className="text-sm text-gray-500 mb-4">{user.department} · {user.position}</p>

                        <div className="flex flex-col gap-2">
                            <PrimaryButton onClick={() => setIsEdit(!isEdit)}>
                                {isEdit ? "저장 완료" : "프로필 수정"}
                            </PrimaryButton>
                            {isEdit && (
                                <SecondaryButton onClick={() => setIsEdit(false)}>
                                    취소
                                </SecondaryButton>
                            )}
                        </div>
                    </Card>

                    {/* 활동 요약 카드 (추가 기능) */}
                    <Card className="bg-gray-50/50 border-none">
                        <h4 className="text-sm font-bold text-gray-700 mb-4">계정 요약</h4>
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">가입일</span>
                                <span className="font-medium">{user.joinDate}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">작성 회의록</span>
                                <span className="font-medium text-orange-600">12개</span>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* ===== 우측: 상세 설정 영역 ===== */}
                <div className="space-y-6">
                    {/* 기본 정보 설정 */}
                    <Card>
                        <div className="flex items-center gap-2 mb-6">
                            <span className="material-symbols-outlined text-orange-500">person</span>
                            <h3 className="font-bold text-lg">기본 정보</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input label="이메일" value={user.email} disabled className="bg-gray-50" />

                            <Input
                                label="이름"
                                value={user.name}
                                disabled={!isEdit}
                                onChange={(e) => setUser({ ...user, name: e.target.value })}
                            />

                            <Input
                                label="연락처"
                                value={user.phone}
                                disabled={!isEdit}
                                placeholder="010-0000-0000"
                                onChange={(e) => setUser({ ...user, phone: e.target.value })}
                            />

                            <div>
                                <label className="text-sm font-bold text-gray-700 block mb-2">부서</label>
                                <div className="flex gap-2">
                                    <div className="flex-1 px-4 py-2.5 bg-gray-50 border rounded-xl text-gray-600 text-sm font-medium">
                                        {user.department}
                                    </div>
                                    {isEdit && (
                                        <SecondaryButton onClick={() => setIsDeptModal(true)}>
                                            변경
                                        </SecondaryButton>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* 알림 설정 (추가 기능) */}
                    <Card>
                        <div className="flex items-center gap-2 mb-6">
                            <span className="material-symbols-outlined text-orange-500">notifications</span>
                            <h3 className="font-bold text-lg">알림 설정</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between py-2">
                                <div>
                                    <p className="font-semibold text-gray-800">회의록 분석 완료 알림</p>
                                    <p className="text-sm text-gray-500">AI가 회의록 분석을 마치면 푸시 알림을 보냅니다.</p>
                                </div>
                                <div className="w-12 h-6 bg-orange-500 rounded-full relative cursor-pointer">
                                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* 보안 설정 */}
                    <Card className="border-red-50 bg-red-50/10">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-bold text-gray-900">계정 보안</h3>
                                <p className="text-sm text-gray-500">비밀번호를 정기적으로 변경하여 계정을 보호하세요.</p>
                            </div>
                            <SecondaryButton className="text-red-500 border-red-200 hover:bg-red-50">
                                비밀번호 변경
                            </SecondaryButton>
                        </div>
                    </Card>
                </div>
            </div>

            {/* ===== 부서 선택 모달 ===== */}
            {isDeptModal && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <Card className="w-full max-w-sm shadow-2xl animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-xl text-gray-900">부서 선택</h3>
                            <button onClick={() => setIsDeptModal(false)} className="text-gray-400 hover:text-gray-600">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-2 mb-6">
                            {departments.map((dept) => (
                                <button
                                    key={dept}
                                    className={`
                                        p-3 rounded-xl text-sm font-semibold transition-all border
                                        ${user.department === dept
                                            ? "bg-orange-50 border-orange-400 text-orange-600"
                                            : "bg-white border-gray-100 hover:border-orange-200 text-gray-600"}
                                    `}
                                    onClick={() => {
                                        setUser({ ...user, department: dept });
                                        setIsDeptModal(false);
                                    }}
                                >
                                    {dept}
                                </button>
                            ))}
                        </div>

                        <SecondaryButton className="w-full" onClick={() => setIsDeptModal(false)}>
                            취소
                        </SecondaryButton>
                    </Card>
                </div>
            )}
        </PageFrame>
    );
}