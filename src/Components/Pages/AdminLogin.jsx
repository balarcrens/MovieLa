import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const DB_URL = import.meta.env.VITE_DB_URL;

export default function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await axios.post(`${DB_URL}/api/v1/auth/login`, {
                username,
                password
            });

            // save token in localStorage
            localStorage.setItem("auth-token", res.data.token);

            // redirect to add movie page
            navigate("/movie/admin/add");

            toast.success("Login successfully !");

        } catch (err) {
            console.error("Login error:", err.message);
            if (err.response) {
                toast.error(err.response.data.message || "Invalid username or password");
            } else if (err.request) {
                toast.error("No response from server");
            } else {
                toast.error("Error: " + err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center min-h-screen justify-center bg-[#0f0f0f]">
            <div className="relative w-96 p-8 rounded-2xl shadow-2xl backdrop-blur-md bg-[#0f0f0f]">
                <h2 className="text-2xl font-bold text-center text-white mb-6">
                    Login
                </h2>

                <form onSubmit={handleLogin} className="space-y-4">
                    {/* UserName */}
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        autoComplete="username"
                        className="p-3 rounded-lg w-full bg-[#1f1f1f] border text-white border-gray-700 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none"
                        required
                    />

                    {/* Password */}
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                        className="p-3 rounded-lg w-full bg-[#1f1f1f] border text-white border-gray-700 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none"
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition duration-300 shadow-sm hover:shadow-blue-500/50 disabled:opacity-50"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
}