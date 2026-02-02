import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, X } from "lucide-react";

export default function SignupPage() {
    const navigate = useNavigate();

    const [department, setDepartment] = useState("");
    const [isDeptModalOpen, setIsDeptModalOpen] = useState(false);
    const [isAddingDept, setIsAddingDept] = useState(false);
    const [newDept, setNewDept] = useState("");

    const [departments, setDepartments] = useState([
        "개발팀", "기획팀", "디자인팀", "인사팀", "재무팀", "영업팀", "운영팀",
    ]);

    const handleAddDepartment = () => {
        if (!newDept.trim()) return;
        if (departments.includes(newDept)) {
            alert("이미 존재하는 부서입니다.");
            return;
        }
        setDepartments([...departments, newDept]);
        setDepartment(newDept);
        setNewDept("");
        setIsAddingDept(false);
        setIsDeptModalOpen(false);
    };

    const handleSignup = () => {
        localStorage.setItem("signupUserId", "sampleUser");
        localStorage.setItem("signupDepartment", department);
        localStorage.removeItem("isLoggedIn");
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-[#FFF6EB] flex items-center justify-center px-6 py-12 relative overflow-hidden font-sans">
            {/* 배경 장식 */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-200/30 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-300/20 rounded-full blur-[120px]" />

            <div className="relative w-full max-w-[500px]">
                {/* 뒤로가기 버튼 */}
                <button
                    onClick={() => navigate("/login")}
                    className="flex items-center gap-2 text-gray-500 hover:text-orange-600 transition-colors mb-6 font-medium group"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    로그인으로 돌아가기
                </button>

                <div className="bg-white/80 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(255,145,0,0.15)] border border-white">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-black text-gray-900 mb-2 tracking-tighter">회원가입</h1>
                        <p className="text-gray-500 font-medium text-sm">Ai DOT.과 함께 스마트하게 시작하세요.</p>
                    </div>

                    <div className="space-y-5">
                        {/* 이메일 */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5 ml-1">이메일</label>
                            <input
                                type="email"
                                placeholder="example@dot.com"
                                className="w-full bg-gray-50/50 border-2 border-gray-100 p-3.5 rounded-2xl focus:border-orange-400 focus:bg-white outline-none transition-all"
                            />
                        </div>

                        {/* 이름 & 연락처 그리드 */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1.5 ml-1">이름</label>
                                <input
                                    type="text"
                                    placeholder="성함"
                                    className="w-full bg-gray-50/50 border-2 border-gray-100 p-3.5 rounded-2xl focus:border-orange-400 focus:bg-white outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1.5 ml-1">연락처</label>
                                <input
                                    type="text"
                                    placeholder="010-0000-0000"
                                    className="w-full bg-gray-50/50 border-2 border-gray-100 p-3.5 rounded-2xl focus:border-orange-400 focus:bg-white outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* 비밀번호 */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5 ml-1">비밀번호</label>
                            <input
                                type="password"
                                placeholder="영문, 숫자 포함 8자 이상"
                                className="w-full bg-gray-50/50 border-2 border-gray-100 p-3.5 rounded-2xl focus:border-orange-400 focus:bg-white outline-none transition-all"
                            />
                        </div>

                        {/* 부서 선택 */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5 ml-1">소속 부서</label>
                            <button
                                type="button"
                                onClick={() => setIsDeptModalOpen(true)}
                                className={`w-full p-4 text-left rounded-2xl border-2 transition-all ${department
                                    ? "border-orange-400 bg-white text-gray-900 font-bold"
                                    : "border-gray-100 bg-gray-50/50 text-gray-400"
                                    } hover:border-orange-300`}
                            >
                                {department || "부서를 선택해 주세요"}
                            </button>
                        </div>

                        {/* 가입 완료 버튼: 주황색 강조 */}
                        <button
                            onClick={handleSignup}
                            disabled={!department}
                            className="w-full bg-orange-500 text-white py-5 rounded-2xl font-black text-lg hover:bg-orange-600 shadow-xl shadow-orange-200 hover:shadow-orange-300 transition-all active:scale-[0.98]"

                        >
                            가입 완료하기
                        </button>
                    </div>
                </div>
            </div>

            {/* ================= 부서 선택 모달 ================= */}
            {isDeptModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsDeptModalOpen(false)} />

                    <div className="relative w-full max-w-sm bg-white rounded-[2.5rem] shadow-2xl p-8 z-10 border border-orange-50 animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-black text-gray-900">부서 선택</h2>
                            <button onClick={() => setIsDeptModalOpen(false)} className="bg-gray-100 p-1.5 rounded-full text-gray-400 hover:text-orange-500 transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <ul className="grid grid-cols-2 gap-2.5 mb-6 max-h-60 overflow-auto pr-1">
                            {departments.map((dept) => (
                                <li key={dept}>
                                    <button
                                        onClick={() => {
                                            setDepartment(dept);
                                            setIsDeptModalOpen(false);
                                        }}
                                        className={`w-full text-center px-3 py-3 rounded-xl text-sm font-bold transition-all ${department === dept
                                            ? "bg-orange-500 text-white shadow-lg shadow-orange-100"
                                            : "bg-orange-50/50 text-orange-700 hover:bg-orange-100"
                                            }`}
                                    >
                                        {dept}
                                    </button>
                                </li>
                            ))}
                        </ul>

                        {/* 부서 추가 버튼: 주황색 테두리와 텍스트 강조 */}
                        {!isAddingDept ? (
                            <button
                                onClick={() => setIsAddingDept(true)}
                                className="w-full py-3.5 rounded-xl border-2 border-dashed border-orange-300 bg-orange-50/30 text-orange-600 text-sm font-extrabold hover:bg-orange-50 hover:border-orange-500 transition-all flex items-center justify-center gap-2 group"
                            >
                                <Plus className="w-4 h-4 group-hover:scale-125 transition-transform" />
                                부서 직접 추가
                            </button>
                        ) : (
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={newDept}
                                    autoFocus
                                    onChange={(e) => setNewDept(e.target.value)}
                                    placeholder="부서명 입력"
                                    className="flex-1 px-4 py-2.5 rounded-xl border-2 border-orange-200 focus:border-orange-500 outline-none text-sm font-bold"
                                />
                                <button
                                    onClick={handleAddDepartment}
                                    className="px-5 rounded-xl bg-orange-500 text-white text-sm font-black hover:bg-orange-600 shadow-md shadow-orange-100 transition-all"
                                >
                                    추가
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}