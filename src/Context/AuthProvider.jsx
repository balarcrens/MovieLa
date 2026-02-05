import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { useNavigate } from "react-router-dom";

export const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Check token on first load
        setLoggedIn(!!localStorage.getItem("auth-token"));
    }, [navigate]);

    const login = (token) => {
        localStorage.setItem("auth-token", token);
        setLoggedIn(true);
        navigate("/movie/admin/");
    };

    const logout = () => {
        localStorage.removeItem("auth-token");
        setLoggedIn(false);
        navigate("/movie/admin/login");
    };

    return (
        <AuthContext.Provider value={{ loggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};