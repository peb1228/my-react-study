export default function ChatSidebar({
    conversations,
    activeId,
    onSelectChat,
    onNewChat,
}) {
    return (
        <aside className="w-72 bg-white border-r px-4 py-6 flex flex-col">
            <h1 className="text-lg font-bold mb-4">대화 기록</h1>
            <button
                onClick={onNewChat}
                className="mb-4 py-2 rounded-lg border border-dashed border-primary
                text-sm font-semibold text-primary hover:bg-primary/10 transition"
            >
                + 새 대화
            </button>

            <div className="flex-1 overflow-y-auto">
                {conversations.map((chat) => {
                    const isActive = chat.id === activeId;

                    return (
                        <button
                            key={chat.id}
                            onClick={() => onSelectChat(chat.id)}
                            className={`w-full text-left px-4 py-3 rounded-xl mb-1 text-sm transition
                            ${isActive
                                    ? "bg-primary/10 text-primary font-semibold"
                                    : "text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            <p className="truncate">{chat.title}</p>
                        </button>
                    );
                })}
            </div>
        </aside>
    );
}
