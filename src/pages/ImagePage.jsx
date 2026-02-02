import { useState } from "react";
import { PageFrame } from "../components/PageFrame";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import { PrimaryButton, SecondaryButton } from "../components/ui/Button";

export default function ImagePage() {
    const [prompt, setPrompt] = useState("");
    const [negativePrompt, setNegativePrompt] = useState(""); // 추가: 제외할 요소
    const [ratio, setRatio] = useState("1:1");
    const [style, setStyle] = useState("realistic");
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState([]); // 추가: 생성 이력

    const handleGenerate = () => {
        if (!prompt.trim()) {
            alert("프롬프트를 입력하세요.");
            return;
        }

        setLoading(true);
        setImageUrl(null);

        // 더미 생성 로직
        setTimeout(() => {
            const newImg = `https://via.placeholder.com/600x600.png?text=${encodeURIComponent(style)}+Image+${Date.now()}`;
            setImageUrl(newImg);
            setHistory(prev => [newImg, ...prev].slice(0, 4)); // 최근 4개 저장
            setLoading(false);
        }, 1500);
    };

    // 프롬프트 추천 태그 클릭 핸들러
    const addTag = (tag) => setPrompt(prev => prev ? `${prev}, ${tag}` : tag);

    return (
        <PageFrame
            title="이미지 생성"
            subtitle="상상하는 장면을 텍스트로 묘사하면 AI가 고화질 이미지를 그려냅니다."
        >
            <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8">

                {/* ================= 좌측 컨트롤 (설정창) ================= */}
                <div className="space-y-6">
                    <Card className="h-fit">
                        <div className="space-y-6">
                            {/* 1. 프롬프트 입력 */}
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="text-sm font-bold text-gray-700">프롬프트</label>
                                    <span className="text-[11px] text-gray-400">영어 입력 권장</span>
                                </div>
                                <textarea
                                    className="w-full h-32 p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm resize-none"
                                    placeholder="예: 사이버펑크 스타일의 서울 밤거리, 네온사인, 비 내리는..."
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                />
                                {/* 추천 태그 */}
                                <div className="flex flex-wrap gap-1.5 mt-3">
                                    {["8k resolution", "highly detailed", "cinematic lighting", "masterpiece"].map(tag => (
                                        <button
                                            key={tag}
                                            onClick={() => addTag(tag)}
                                            className="px-2 py-1 bg-gray-50 hover:bg-gray-100 border border-gray-100 rounded text-[10px] text-gray-500 transition-colors"
                                        >
                                            + {tag}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* 2. 네거티브 프롬프트 */}
                            <div>
                                <label className="text-sm font-bold mb-2 block text-gray-700">제외할 요소 (Negative)</label>
                                <Input
                                    placeholder="이미지에서 빼고 싶은 것 (예: text, blurry, distorted)"
                                    value={negativePrompt}
                                    onChange={(e) => setNegativePrompt(e.target.value)}
                                    className="text-xs"
                                />
                            </div>

                            {/* 3. 이미지 비율 */}
                            <div>
                                <p className="text-sm font-bold mb-3 text-gray-700">이미지 비율</p>
                                <div className="grid grid-cols-3 gap-2">
                                    {["1:1", "4:3", "16:9"].map((r) => (
                                        <OptionButton key={r} active={ratio === r} onClick={() => setRatio(r)}>
                                            {r}
                                        </OptionButton>
                                    ))}
                                </div>
                            </div>

                            {/* 4. 스타일 선택 */}
                            <div>
                                <p className="text-sm font-bold mb-3 text-gray-700">아트 스타일</p>
                                <div className="grid grid-cols-2 gap-2">
                                    {["Realistic", "Anime", "3D Render", "Oil Painting"].map((s) => (
                                        <OptionButton key={s} active={style === s} onClick={() => setStyle(s)}>
                                            {s}
                                        </OptionButton>
                                    ))}
                                </div>
                            </div>

                            <PrimaryButton
                                onClick={handleGenerate}
                                className="w-full py-4 text-lg shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98]"
                            >
                                ✨ 이미지 생성하기
                            </PrimaryButton>
                        </div>
                    </Card>
                </div>

                {/* ================= 우측 결과 영역 ================= */}
                <div className="space-y-6">
                    <Card className="min-h-[500px] flex items-center justify-center relative overflow-hidden bg-gray-50/50">
                        {!imageUrl && !loading && (
                            <div className="text-center">
                                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="material-symbols-outlined text-gray-400 text-4xl">image</span>
                                </div>
                                <p className="text-gray-400 font-medium">왼쪽에서 설정을 마친 후 이미지를 생성해 보세요.</p>
                            </div>
                        )}

                        {loading && (
                            <div className="text-center z-10">
                                <div className="relative w-16 h-16 mx-auto mb-4">
                                    <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
                                    <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                                </div>
                                <p className="text-primary font-bold animate-pulse">AI가 화풍을 분석하여 그림을 그리는 중...</p>
                            </div>
                        )}

                        {imageUrl && (
                            <div className="w-full h-full flex flex-col items-center animate-in fade-in zoom-in duration-500">
                                <img
                                    src={imageUrl}
                                    alt="AI Generated"
                                    className="rounded-2xl shadow-2xl max-h-[480px] object-contain border-4 border-white"
                                />
                                <div className="flex gap-4 mt-8">
                                    <SecondaryButton className="flex items-center gap-2 px-6">
                                        <span className="material-symbols-outlined text-[20px]">download</span>
                                        고화질 저장
                                    </SecondaryButton>
                                    <SecondaryButton className="flex items-center gap-2 px-6">
                                        <span className="material-symbols-outlined text-[20px]">share</span>
                                        공유하기
                                    </SecondaryButton>
                                </div>
                            </div>
                        )}
                    </Card>

                    {/* 최근 생성 이력 */}
                    {history.length > 0 && (
                        <div>
                            <h3 className="text-sm font-bold text-gray-700 mb-3 ml-1">최근 생성된 이미지</h3>
                            <div className="flex gap-4">
                                {history.map((url, idx) => (
                                    <div key={idx} className="w-24 h-24 rounded-lg overflow-hidden border-2 border-white shadow-sm cursor-pointer hover:ring-2 hover:ring-primary transition-all">
                                        <img src={url} alt="history" className="w-full h-full object-cover" onClick={() => setImageUrl(url)} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </PageFrame>
    );
}

function OptionButton({ active, children, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`
                px-3 py-2.5 rounded-xl text-xs font-bold border transition-all
                ${active
                    ? "bg-primary text-white border-primary shadow-md"
                    : "bg-white border-gray-200 text-gray-500 hover:border-primary/50 hover:bg-gray-50"
                }
            `}
        >
            {children}
        </button>
    );
}