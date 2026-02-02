import { useMemo, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PageFrame } from "../components/PageFrame";
import Card from "../components/ui/Card";
import { FileText, X, FileUp, Lock, Users, Globe, Settings } from 'lucide-react';

// 1. 공유 범위 정보 정의
const VIS_INFO = {
    private: {
        label: "🔒 나만 보기",
        desc: "작성자 본인만 조회 및 수정이 가능합니다.",
        icon: <Lock size={16} />,
    },
    team: {
        label: "🏢 내 부서",
        desc: "부서원 모두가 조회하고 편집할 수 있습니다.",
        icon: <Users size={16} />,
    },
    company: {
        label: "🌐 전체 공유",
        desc: "사내 모든 임직원이 이 문서를 열람할 수 있습니다.",
        icon: <Globe size={16} />,
    },
};

export default function DocumentEditorPage() {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    /* ===== 상태 관리 ===== */
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [visibility, setVisibility] = useState("private"); // 기본값: 나만 보기

    const currentUser = { name: "김철수", department: "마케팅팀" };

    /* ===== 핸들러 ===== */
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === "application/pdf") {
            setSelectedFile(file);
        } else {
            alert("PDF 파일만 업로드 가능합니다.");
        }
    };

    const handleSave = () => {
        if (!title) return alert("문서 제목을 입력해주세요.");

        // 최종 저장 데이터 구조
        const docData = {
            title,
            content,
            file: selectedFile,
            visibility, // 선택된 공유 설정 (private, team, company)
            author: currentUser.name,
            createdAt: new Date().toISOString()
        };

        console.log("Saving Document with Visibility:", docData);
        alert(`'${title}' 문서가 [${VIS_INFO[visibility].label}] 권한으로 저장되었습니다.`);
        navigate("/document");
    };

    return (
        <PageFrame
            title="문서 및 파일 등록"
            rightAction={
                <button onClick={handleSave} className="px-6 py-2 bg-orange-500 text-white rounded-xl font-bold shadow-lg hover:bg-orange-600 transition-all">
                    저장하기
                </button>
            }
        >
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">

                {/* 왼쪽: 파일 업로드 및 내용 입력 */}
                <div className="space-y-6">
                    <Card className="p-8 border-2 border-dashed border-gray-200 bg-gray-50 hover:border-orange-300 transition-colors">
                        <div className="flex flex-col items-center justify-center space-y-4">
                            {!selectedFile ? (
                                <>
                                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm text-orange-500">
                                        <FileUp size={32} />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-gray-900 font-bold">클릭하거나 PDF 파일을 드래그하세요</p>
                                        <p className="text-gray-500 text-sm">최대 용량 20MB</p>
                                    </div>
                                    <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".pdf" className="hidden" />
                                    <button onClick={() => fileInputRef.current.click()} className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-100">
                                        파일 선택
                                    </button>
                                </>
                            ) : (
                                <div className="w-full flex items-center justify-between p-4 bg-white rounded-2xl border border-orange-100 shadow-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-red-50 rounded-lg text-red-500"><FileText size={24} /></div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-900">{selectedFile.name}</p>
                                            <p className="text-xs text-gray-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                                        </div>
                                    </div>
                                    <button onClick={() => setSelectedFile(null)} className="p-2 hover:bg-gray-100 rounded-full text-gray-400"><X size={20} /></button>
                                </div>
                            )}
                        </div>
                    </Card>

                    <Card className="p-8 bg-white min-h-[400px]">
                        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="문서 제목을 입력하세요" className="w-full text-3xl font-black border-none focus:ring-0 mb-4 p-0" />
                        <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="파일에 대한 설명을 적어주세요..." className="w-full min-h-[300px] border-none focus:ring-0 text-lg p-0 resize-none" />
                    </Card>
                </div>

                {/* 오른쪽: 문서 설정 사이드바 */}
                <aside className="space-y-6">
                    <Card className="p-6 sticky top-6">
                        <div className="flex items-center gap-2 mb-6 text-gray-900">
                            <Settings size={20} className="text-gray-400" />
                            <h2 className="font-bold text-lg">문서 설정</h2>
                        </div>

                        {/* 공유 범위 선택 영역 */}
                        <div className="space-y-4">
                            <p className="text-sm font-bold text-gray-700">공유 범위 설정</p>
                            <div className="space-y-2">
                                {Object.keys(VIS_INFO).map((key) => {
                                    const info = VIS_INFO[key];
                                    const active = visibility === key;
                                    return (
                                        <button
                                            key={key}
                                            onClick={() => setVisibility(key)}
                                            className={`w-full text-left p-4 rounded-2xl border transition-all 
                                                ${active ? "border-orange-500 bg-orange-50 shadow-sm" : "border-gray-100 hover:border-gray-200 bg-white"}`}
                                        >
                                            <div className="flex items-center justify-between mb-1">
                                                <span className={`font-bold text-sm flex items-center gap-2 ${active ? "text-orange-700" : "text-gray-700"}`}>
                                                    {info.label}
                                                </span>
                                                {active && <div className="w-2 h-2 bg-orange-500 rounded-full" />}
                                            </div>
                                            <p className="text-[11px] text-gray-500 leading-tight">{info.desc}</p>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* 작성자 정보 요약 */}
                        <div className="mt-8 pt-6 border-t border-gray-100">
                            <p className="text-xs text-gray-400 mb-3 font-medium uppercase tracking-wider">작성자 정보</p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">
                                    {currentUser.name[0]}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-800">{currentUser.name}</p>
                                    <p className="text-[11px] text-gray-500">{currentUser.department}</p>
                                </div>
                            </div>
                        </div>
                    </Card>
                </aside>
            </div>
        </PageFrame>
    );
}