// src/components/ui/PageFrame.jsx
import React from 'react';

// PageFrame.jsx 주요 수정 부분
export default function PageFrame({ children, variant = "default" }) {
    return (
        <main
            className={`
                /* h-screen보다는 min-h-screen을 권장합니다 (콘텐츠가 길어질 경우 대비) */
                min-h-screen w-full bg-zinc-50 flex flex-col
                /* 1800px은 24인치(1920px)에서 거의 꽉 차는 크기입니다. 
                   여백을 주려면 1400px ~ 1600px 정도로 조절해 보세요. */
                ${variant === "fluid" ? "px-8 py-4" : "max-w-[1600px] mx-auto px-6 py-4"}
            `}
        >
            <div className="flex-1 flex flex-col">
                {children}
            </div>
        </main>
    );
}