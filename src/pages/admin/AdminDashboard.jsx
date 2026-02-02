export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            {/* 헤더 */}
            <header>
                <p className="text-xs text-orange-500 font-semibold">CONTROL TOWER</p>
                <h1 className="text-2xl font-bold">시스템 통합 대시보드</h1>
            </header>

            {/* 시스템 상태 */}
            <section className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex gap-8 text-sm">
                    <div>🟢 SERVER LIVE</div>
                    <div>CPU LOAD: 0.4%</div>
                    <div>RAM USAGE: 41.2%</div>
                    <div>DISK SPACE: 4.7%</div>
                </div>
            </section>

            {/* 카드 */}
            <section className="grid grid-cols-4 gap-6">
                {[
                    ["전체 사용자", 3],
                    ["운영 부서", 3],
                    ["오늘 접속자", 3],
                    ["누적 로그", 62],
                ].map(([title, value]) => (
                    <div key={title} className="bg-white p-6 rounded-2xl shadow-sm">
                        <p className="text-sm text-gray-500">{title}</p>
                        <p className="text-2xl font-bold mt-2">{value}</p>
                    </div>
                ))}
            </section>

            {/* 차트 영역 (placeholder) */}
            <section className="grid grid-cols-2 gap-6">
                <div className="bg-white h-80 rounded-2xl flex items-center justify-center">
                    부서별 인원 분포 (도넛 차트)
                </div>
                <div className="bg-white h-80 rounded-2xl flex items-center justify-center">
                    부서별 시스템 사용량 (바 차트)
                </div>
            </section>
        </div>
    );
}
