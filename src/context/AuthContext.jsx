import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    // ✅ 서버에서 내려온 값이라고 가정
    const [role] = useState("ADMIN"); // USER | ADMIN
    const [mode, setMode] = useState("admin"); // admin | user

    const switchToAdmin = () => {
        if (role === "ADMIN") setMode("admin");
    };

    const switchToUser = () => {
        if (role === "ADMIN") setMode("user");
    };

    return (
        <AuthContext.Provider
            value={{
                role,
                mode,
                isAdmin: role === "ADMIN",
                isAdminMode: mode === "admin",
                switchToAdmin,
                switchToUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
