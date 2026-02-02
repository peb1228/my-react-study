import { Cpu, Database, HardDrive, Users } from "lucide-react";

export default function AdminDashboardPage() {
    return (
        <>
            {/* 헤더 */}
            <header className="mb-6">
                <div className="text-xs text-orange-500 font-semibold">
                    CONTROL TOWER
                </div>
                <h1 className="text-2xl font-bold">시스템 통합 대시보드</h1>
            </header>

            {/* 상태 바 */}
            <div className="bg-white rounded-xl p-4 flex gap-6 items-center mb-8">
                <Status label="CPU LOAD" value="0.3%" icon={<Cpu />} />
                <Status label="RAM USAGE" value="41.2%" icon={<Database />} />
                <Status label="DISK SPACE" value="4.7%" icon={<HardDrive />} />
            </div>

            {/* KPI 카드 */}
            <div className="grid grid-cols-4 gap-6 mb-10">
                <Kpi title="전체 사용자" value="3" />
                <Kpi title="운영 부서" value="3" />
                <Kpi title="오늘 접속자" value="3" />
                <Kpi title="누적 로그" value="62" />
            </div>

            {/* 차트 영역 */}
            <div className="grid grid-cols-2 gap-8">
                <div className="bg-white rounded-xl p-6">
                    부서별 인원 분포 (도넛 차트)
                </div>
                <div className="bg-white rounded-xl p-6">
                    부서별 시스템 사용량 (바 차트)
                </div>
            </div>
        </>
    );
}

function Status({ label, value, icon }) {
    return (
        <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-lg">{icon}</div>
            <div>
                <div className="text-xs text-gray-400">{label}</div>
                <div className="font-semibold">{value}</div>
            </div>
        </div>
    );
}

function Kpi({ title, value }) {
    return (
        <div className="bg-white rounded-xl p-6">
            <div className="text-sm text-gray-500">{title}</div>
            <div className="text-2xl font-bold mt-2">{value}</div>
        </div>
    );
}
