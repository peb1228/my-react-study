export function PageFrame({
    title,
    subtitle,
    rightAction,
    children,
    variant = "center",
    withHeader = true, // 🔥 추가
}) {
    return (
        <div className={withHeader ? "px-8 pt-4 pb-8" : "px-8 py-8"}>
            {/* 헤더 영역 */}
            {(title || rightAction) && (
                <div className="flex items-center justify-between mb-6">
                    <div>
                        {title && (
                            <h1 className="text-2xl font-black">{title}</h1>
                        )}
                        {subtitle && (
                            <p className="text-sm text-gray-500 mt-1">
                                {subtitle}
                            </p>
                        )}
                    </div>
                    {rightAction}
                </div>
            )}

            {/* 콘텐츠 */}
            <div
                className={
                    variant === "center"
                        ? "max-w-5xl mx-auto"
                        : "w-full"
                }
            >
                {children}
            </div>
        </div>
    );
}
