import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Plus, Search, MoreVertical, Trash2 } from 'lucide-react';

export default function ChatPage() {
    const [conversations, setConversations] = useState([
        {
            id: 1,
            title: "주간 회의 일정 정리",
            messages: [
                { id: 1, role: "ai", time: "10:00", content: "안녕하세요. 주간 회의 정리를 도와드릴까요?" },
                { id: 2, role: "user", time: "10:02", content: "이번 주 팀 회의 일정을 정리해줘." },
                { id: 3, role: "ai", time: "10:03", isList: true, content: "정리된 내용입니다.", list: ["목적: 공유", "소요: 60분"] }
            ]
        },
        {
            id: 2,
            title: "마케팅 캠페인 초안",
            messages: [
                { id: 1, role: "ai", time: "11:00", content: "마케팅 캠페인 아이디어를 제안해 드릴까요?" }
            ]
        },
    ]);

    const [activeId, setActiveId] = useState(1);
    const [input, setInput] = useState("");
    const scrollRef = useRef(null);

    const activeChat = conversations.find(c => c.id === activeId) || conversations[0];

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [activeChat.messages]);

    const handleSend = () => {
        if (!input.trim()) return;
        const newMessage = {
            id: Date.now(),
            role: "user",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            content: input
        };
        setConversations(prev => prev.map(chat =>
            chat.id === activeId ? { ...chat, messages: [...chat.messages, newMessage] } : chat
        ));
        setInput("");
    };

    return (
        /* 전체 화면 고정 및 브라우저 스크롤 제거 */
        <div className="flex h-screen w-full bg-white text-[#1c140d] overflow-hidden font-sans">

            {/* 1. Sidebar: 높이 100% 고정 */}
            <aside className="w-72 bg-[#f4ede7] border-r border-gray-200 flex flex-col p-6 shrink-0 h-full">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-8 h-8 bg-[#f27f0d] rounded-full shrink-0" />
                    <h1 className="text-lg font-bold uppercase tracking-wider">Ai DOT.</h1>
                </div>

                <button
                    onClick={() => { }}
                    className="w-full bg-[#f27f0d] text-white rounded-xl h-12 font-semibold shadow-lg mb-6 shrink-0 flex items-center justify-center gap-2"
                >
                    <Plus size={18} />
                    새 업무 대화
                </button>

                {/* 사이드바 목록 영역만 내부 스크롤 허용 (전체 스크롤 방지) */}
                <div className="space-y-2 overflow-y-auto flex-1 pr-2 custom-scrollbar">
                    {conversations.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => setActiveId(item.id)}
                            className={`p-4 rounded-xl text-sm cursor-pointer transition-all ${activeId === item.id ? 'bg-white font-bold text-[#f27f0d]' : 'hover:bg-white/50 text-gray-600'}`}
                        >
                            <span className="truncate block">{item.title}</span>
                        </div>
                    ))}
                </div>

                <div className="mt-auto pt-4 border-t border-gray-200/50 flex items-center gap-3 shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gray-300 shrink-0" />
                    <div className="text-sm">
                        <p className="font-bold">김철수 과장</p>
                        <p className="text-[10px] text-green-600 font-bold uppercase">Premium</p>
                    </div>
                </div>
            </aside>

            {/* 2. Main Chat: flex-col로 상단-중앙-하단 배치 */}
            <main className="flex-1 flex flex-col h-full bg-white overflow-hidden">
                {/* Header: 고정 높이 */}
                <header className="h-20 border-b border-gray-100 px-8 flex items-center justify-between shrink-0">
                    <div>
                        <h2 className="text-xl font-black tracking-tight">{activeChat.title}</h2>
                        <div className="text-[10px] text-gray-400 font-bold uppercase">{activeChat.messages.length} Messages</div>
                    </div>
                </header>

                {/* Messages Area: 여기가 핵심입니다. flex-1과 min-h-0으로 남는 공간을 차지하게 함 */}
                <section ref={scrollRef} className="flex-1 overflow-y-auto p-6 md:p-10 min-h-0 bg-gray-50/30">
                    <div className="max-w-4xl mx-auto space-y-6">
                        <AnimatePresence mode="popLayout">
                            {activeChat.messages.map((msg) => (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    key={msg.id}
                                    className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                                >
                                    <div className="w-9 h-9 rounded-full bg-gray-200 shrink-0 flex items-center justify-center text-xs font-bold">
                                        {msg.role === 'user' ? '나' : 'AI'}
                                    </div>
                                    <div className={`max-w-[70%] ${msg.role === 'user' ? 'text-right' : ''}`}>
                                        <div className={`px-5 py-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-[#f27f0d] text-white' : 'bg-white border border-gray-100'}`}>
                                            {msg.content}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </section>

                {/* Footer (Input): 하단 고정 */}
                <footer className="p-6 bg-white border-t border-gray-100 shrink-0">
                    <div className="max-w-4xl mx-auto flex items-center gap-4 bg-gray-50 p-2 rounded-2xl border border-gray-200">
                        <textarea
                            rows="1"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="메시지를 입력하세요..."
                            className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-3 resize-none"
                        />
                        <button onClick={handleSend} className="w-10 h-10 bg-[#f27f0d] text-white rounded-xl flex items-center justify-center shrink-0">
                            <Send size={18} />
                        </button>
                    </div>
                </footer>
            </main>
        </div>
    );
}