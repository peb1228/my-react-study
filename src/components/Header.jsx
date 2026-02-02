import { Link } from "react-router-dom";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-[#FFF8EE]">
            <div className="mx-auto w-full max-w-[1400px]">

                {/* 헤더 */}
                <header className="flex items-center justify-between px-8 py-6">
                    <h1 className="font-black text-lg text-orange-500">
                        Ai DOT.
                    </h1>

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 font-black text-xl">
                        <span className="text-primary">AI</span>
                        <span>Ai DOT.</span>
                    </Link>

                    <div className="flex items-center gap-4">
                        {/* 로그인 */}
                        <Link
                            to="/login"
                            className="text-sm font-semibold text-gray-700 hover:text-orange-500 transition"
                        >
                            로그인
                        </Link>

                        {/* 회원가입 */}
                        <Link
                            to="/signup"
                            className="px-4 py-2 text-sm font-bold bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
                        >
                            무료 시작
                        </Link>
                    </div>
                </header>

            </div>
        </div>
    );
}
