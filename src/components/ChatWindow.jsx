import { useState } from "react";

export default function ChatWindow({ messages, onSend }) {
    const [input, setInput] = useState("");

    const handleSubmit = () => {
        if (!input.trim()) return;
        onSend(input);
        setInput("");
    };

    return (
        <main className="flex-1 flex flex-col">

            {/* ================= HEADER ================= */}
            <header className="border-b px-6 py-4">
                <h2 className="text-lg font-bold">AiDOT</h2>
                <p className="text-xs text-green-600">● Online</p>
            </header>

            {/* ================= CHAT BODY ================= */}
            <section className="flex-1 overflow-y-auto px-10 py-6">
                <div className="max-w-4xl space-y-8">

                    {messages.map((msg) =>
                        msg.role === "ai" ? (
                            /* ================= AI MESSAGE ================= */
                            <div key={msg.id} className="flex gap-4 items-start">
                                <div className="w-10 h-10 rounded-full bg-gray-300" />

                                <div className="max-w-[80%]">
                                    <p className="text-xs text-textSub mb-1">
                                        AI 비서
                                    </p>

                                    <div className="bg-surface px-5 py-3 rounded-2xl rounded-tl-none">
                                        <p className="whitespace-normal break-words leading-relaxed">
                                            {msg.content}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            /* ================= USER MESSAGE ================= */
                            <div
                                key={msg.id}
                                className="flex gap-4 items-start justify-end"
                            >
                                <div className="max-w-[80%] text-right">
                                    <p className="text-xs text-textSub mb-1">나</p>

                                    <div className="bg-primary text-white px-5 py-3 rounded-2xl rounded-tr-none">
                                        <p className="whitespace-normal break-words leading-relaxed">
                                            {msg.content}
                                        </p>
                                    </div>
                                </div>

                                <div className="w-10 h-10 rounded-full bg-primary" />
                            </div>
                        )
                    )}
                </div>
            </section>

            {/* ================= INPUT ================= */}
            <footer className="border-t px-6 py-4">
                <div className="max-w-4xl flex items-center gap-3">
                    <textarea
                        className="flex-1 resize-none border rounded-xl px-4 py-3 focus:outline-none"
                        placeholder="메시지를 입력하세요..."
                        rows={1}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                handleSubmit();
                            }
                        }}
                    />

                    <button
                        className="bg-primary text-white w-12 h-12 rounded-xl font-bold"
                        onClick={handleSubmit}
                    >
                        →
                    </button>
                </div>
            </footer>

        </main>
    );
}
