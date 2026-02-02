import React from 'react';
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from 'lucide-react';

export default function LoginPage({ onLoginSuccess }) {
    const navigate = useNavigate();

    const handleLogin = () => {
        onLoginSuccess();
        navigate("/home");
    };

    return (
        <div className="min-h-screen bg-[#FFF6EB] flex items-center justify-center px-6 relative overflow-hidden">

            {/* 배경 장식 요소 */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-200/30 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-300/20 rounded-full blur-[120px]" />

            <div className="relative w-full max-w-[450px]">
                {/* 뒤로가기 버튼 */}
                <button
                    onClick={() => navigate("/")}
                    className="flex items-center gap-2 text-gray-500 hover:text-orange-600 transition-colors mb-8 font-medium group"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    메인으로 돌아가기
                </button>

                <div className="bg-white/80 backdrop-blur-xl p-10 md:p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(255,145,0,0.1)] border border-white">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-black text-gray-900 mb-3 tracking-tighter">
                            반가워요! <span className="text-orange-500">Ai DOT.</span> 입니다
                        </h1>
                        <p className="text-gray-500 font-medium">서비스 이용을 위해 로그인을 해주세요.</p>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">이메일</label>
                            <input
                                className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl focus:border-orange-400 focus:bg-white outline-none transition-all placeholder:text-gray-400"
                                placeholder="이메일을 입력하세요"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">비밀번호</label>
                            <input
                                type="password"
                                className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl focus:border-orange-400 focus:bg-white outline-none transition-all placeholder:text-gray-400"
                                placeholder="비밀번호를 입력하세요"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end mt-3 mb-8">
                        <button className="text-sm font-semibold text-gray-400 hover:text-orange-500 transition-colors">
                            비밀번호를 잊으셨나요?
                        </button>
                    </div>

                    {/* 🔽 변경된 주황색 버튼 섹션 */}
                    <button
                        onClick={handleLogin}
                        className="w-full bg-orange-500 text-white py-5 rounded-2xl font-black text-lg hover:bg-orange-600 shadow-xl shadow-orange-200 hover:shadow-orange-300 transition-all active:scale-[0.98]"
                    >
                        로그인
                    </button>

                    <div className="mt-10 pt-8 border-t border-gray-100 text-center">
                        <p className="text-gray-500 font-medium">
                            아직 계정이 없으신가요?{" "}
                            <Link
                                to="/signup"
                                className="text-orange-500 font-bold hover:underline underline-offset-4 ml-2"
                            >
                                회원가입
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}