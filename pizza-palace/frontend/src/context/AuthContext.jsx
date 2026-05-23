import { useState } from "react";
import { AuthContext } from "./auth-context";

export function AuthProvider({ children }) {
    const savedUser = localStorage.getItem("pizza_user");
    const savedToken = localStorage.getItem("pizza_token");

    const [user, setUser] = useState(savedUser ? JSON.parse(savedUser) : null);
    const [token, setToken] = useState(savedToken || null);

    function login(userData, userToken) {
        localStorage.setItem("pizza_user", JSON.stringify(userData));
        localStorage.setItem("pizza_token", userToken);

        setUser(userData);
        setToken(userToken);
    }

    function logout() {
        localStorage.removeItem("pizza_user");
        localStorage.removeItem("pizza_token");

        setUser(null);
        setToken(null);
    }

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}