import React from "react";

// 1. 기본이 되는 공통 Button 컴포넌트 (내부용/커스텀용)
export default function Button({
    children,
    type = "button",
    variant = "primary",
    size = "md",
    disabled = false,
    className = "",
    ...props
}) {
    const base = "inline-flex items-center justify-center rounded-xl font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2";

    const variants = {
        primary: "bg-orange-500 text-white hover:bg-orange-600 focus:ring-orange-400",
        secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-300",
        outline: "border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-300",
        danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-400",
    };

    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-sm",
        lg: "px-5 py-3 text-base",
    };

    return (
        <button
            type={type}
            disabled={disabled}
            className={`${base} ${variants[variant]} ${sizes[size]} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}

// 2. 다른 파일에서 { PrimaryButton, SecondaryButton }으로 부를 수 있게 내보내기
export const PrimaryButton = (props) => <Button {...props} variant="primary" />;
export const SecondaryButton = (props) => <Button {...props} variant="secondary" />;
export const DangerButton = (props) => <Button {...props} variant="danger" />;