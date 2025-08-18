/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("auth-token")) {
            navigate("/");
        } else {
            navigate("/movie/admin/dashboard");
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await axios.post("https://moviela-server.onrender.com/api/v1/auth/login", {
                username,
                password
            });

            // save token in localStorage
            localStorage.setItem("auth-token", res.data.token);

            // redirect to add movie page
            navigate("/movie/addmovie");

        } catch (err) {
            console.error("Login error:", err.message);
            if (err.response) {
                setError(err.response.data.message || "Invalid username or password");
            } else if (err.request) {
                setError("No response from server");
            } else {
                setError("Error: " + err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
            <div className="relative w-96 p-8 rounded-2xl shadow-2xl backdrop-blur-md bg-white/10 border border-white/20">
                <h2 className="text-2xl font-bold text-center text-white mb-6">
                    Login
                </h2>

                {error && (
                    <p className="text-red-400 text-sm mb-4 text-center">{error}</p>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        autoComplete="username"
                        className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                        className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition duration-300 shadow-lg hover:shadow-blue-500/50 disabled:opacity-50"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
}