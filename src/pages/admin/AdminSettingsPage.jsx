import Card from "../../components/ui/Card";
import { PrimaryButton } from "../../components/ui/Button";

export default function AdminSettingsPage() {
    return (
        <div className="space-y-8">
            <header>
                <p className="text-xs text-orange-500 font-semibold">CONTROL TOWER</p>
                <h1 className="text-2xl font-bold">시스템 설정</h1>
            </header>

            <div className="max-w-4xl space-y-6">
                {/* 일반 설정 */}
                <Card>
                    <h3 className="font-bold text-lg mb-6 border-b pb-4">일반 설정</h3>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-semibold text-gray-800">시스템 이름</p>
                                <p className="text-sm text-gray-500">브라우저 탭과 헤더에 표시될 이름입니다.</p>
                            </div>
                            <input type="text" className="border rounded-xl px-4 py-2 w-64 focus:outline-orange-500" defaultValue="Ai DOT. ADMIN" />
                        </div>

                        <div className="flex items-center justify-between border-t pt-6">
                            <div>
                                <p className="font-semibold text-gray-800">언어 설정</p>
                                <p className="text-sm text-gray-500">관리자 화면의 기본 언어를 설정합니다.</p>
                            </div>
                            <select className="border rounded-xl px-4 py-2 w-64 focus:outline-orange-500">
                                <option>한국어 (Korean)</option>
                                <option>English</option>
                            </select>
                        </div>
                    </div>
                </Card>

                {/* 보안 및 권한 */}
                <Card>
                    <h3 className="font-bold text-lg mb-6 border-b pb-4">보안 및 권한</h3>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-semibold text-gray-800">2단계 인증 강제</p>
                                <p className="text-sm text-gray-500">모든 관리자 계정에 대해 2단계 인증을 필수화합니다.</p>
                            </div>
                            <div className="w-12 h-6 bg-gray-200 rounded-full relative cursor-pointer">
                                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between border-t pt-6">
                            <div>
                                <p className="font-semibold text-gray-800">로그인 시도 제한</p>
                                <p className="text-sm text-gray-500">5회 이상 실패 시 30분 동안 계정을 잠금 처리합니다.</p>
                            </div>
                            <div className="w-12 h-6 bg-orange-500 rounded-full relative cursor-pointer">
                                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                            </div>
                        </div>
                    </div>
                </Card>

                <div className="flex justify-end gap-3">
                    <PrimaryButton className="px-12">설정 저장</PrimaryButton>
                </div>
            </div>
        </div>
    );
}