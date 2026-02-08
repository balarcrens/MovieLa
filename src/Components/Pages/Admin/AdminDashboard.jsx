/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import MovieForm from "./MovieForm";
import AdminFiles from "./AdminFiles";
import UserRequests from "./UserRequests";
import {
    FaPlus,
    FaHome,
    FaClipboardList,
    FaSignOutAlt,
    FaFolderOpen
} from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DB_URL = import.meta.env.VITE_DB_URL;

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState("dashboard");
    const [movies, setMovies] = useState([]);
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!localStorage.getItem("auth-token")) {
            navigate("/");
        }
    }, []);

    const menuItems = [
        { name: "Dashboard", icon: <FaHome />, key: "dashboard" },
        { name: "Add Movie", icon: <FaPlus />, key: "add-movie" },
        { name: "Files", icon: <FaFolderOpen />, key: "files" },
        { name: "User Requests", icon: <FaClipboardList />, key: "userrequests" },
    ];

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("auth-token");
        navigate("/"); // or "/admin/login"
    };

    const authHeader = {
        headers: {
            "auth-token": localStorage.getItem("auth-token")
        }
    };

    useEffect(() => {
        const getData = async () => {
            try {
                setLoading(true);

                const [moviesRes, requestsRes] = await Promise.all([
                    axios.get(`${DB_URL}/api/v1/movie/getmovie`, authHeader),
                    axios.get(`${DB_URL}/api/v1/requests`, authHeader)
                ]);

                setMovies(moviesRes.data.movies || []);
                setRequests(requestsRes.data?.data || []);
            } catch (err) {
                console.error("Dashboard fetch error:", err.message);
            } finally {
                setLoading(false);
            }
        };

        getData();
    }, []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            // Ignore shortcuts when typing in input / textarea
            const tag = e.target.tagName.toLowerCase();
            if (tag === "input" || tag === "textarea" ||
                e.target.isContentEditable
            ) return;

            // D → Dashboard
            if (e.key.toLowerCase() === "d") {
                setActiveTab("dashboard");
            }

            // A → Add Movie
            if (e.key.toLowerCase() === "a") {
                setActiveTab("add-movie");
            }

            if (e.key.toLowerCase() === "f") {
                setActiveTab("files");
            }

            // R → User Requests
            if (e.key.toLowerCase() === "r") {
                setActiveTab("userrequests");
            }

            if (e.key.toLowerCase() === "l") {
                handleLogout();
            }
        };
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <div className="flex min-h-screen bg-[#111] text-white">
            {/* SIDEBAR */}
            <aside className="w-18 md:w-64 bg-[#1a1a1a] border-r border-gray-800 flex flex-col">
                {/* Logo */}
                <div className="h-16 hidden md:flex items-center justify-center border-b border-gray-800">
                    <span className="text-xl font-bold text-yellow-400">
                        Moviela
                    </span>
                </div>

                {/* Menu */}
                <nav className="flex-1 px-3 md:px-4 py-4 space-y-2">
                    {menuItems.map(item => (
                        <button key={item.key} onClick={() => setActiveTab(item.key)}
                            className={`relative w-full flex items-center gap-3 justify-center md:justify-start px-0 md:px-4 py-2.5 rounded-lg transition group ${activeTab === item.key
                                ? "bg-yellow-500 text-black shadow-md"
                                : "text-gray-300 hover:bg-[#262626] hover:text-white"
                                }`}
                        >
                            {/* Active Indicator */}
                            {activeTab === item.key && (
                                <span className="absolute left-0 top-2 bottom-2 w-1 bg-black rounded-r" />
                            )}

                            <span className="text-base md:text-lg">
                                {item.icon}
                            </span>

                            <span className="hidden md:flex items-center gap-2 font-medium">
                                {item.name}

                                {/* Hint */}
                                {(item.key === "dashboard" ||
                                    item.key === "add-movie" ||
                                    item.key === "files" ||
                                    item.key === "userrequests") && (
                                        <kbd className="ml-1 px-1.5 py-0.5 text-xs font-medium border rounded opacity-0 group-hover:opacity-100 transition-opacity bg-white/20 border-white/30 text-white"
                                        >
                                            {item.key === "dashboard" && "D"}
                                            {item.key === "add-movie" && "A"}
                                            {item.key === "files" && "F"}
                                            {item.key === "userrequests" && "R"}
                                        </kbd>
                                    )}
                            </span>
                        </button>
                    ))}
                </nav>
                <div className="px-3 md:px-4 py-3 border-t border-gray-800">
                    <button
                        onClick={handleLogout}
                        className="relative w-full flex items-center gap-3 justify-center md:justify-start px-0 md:px-4 py-2.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition group"
                    >
                        <FaSignOutAlt className="text-base md:text-lg" />

                        <span className="hidden md:flex items-center gap-2 font-medium">
                            Logout
                            <kbd className="ml-1 px-1.5 py-0.5 text-xs border rounded opacity-0 group-hover:opacity-100 transition bg-white/10 border-white/20 text-white">
                                L
                            </kbd>
                        </span>
                    </button>
                </div>

                {/* Footer */}
                <div className="hidden md:block text-white/90 text-xs text-center py-4 border-t border-gray-800">
                    © 2025 Moviela Admin
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1 p-4 md:p-6 overflow-y-auto">
                {activeTab === "dashboard" && (
                    loading ? (
                        <DashboardSkeleton />
                    ) : (
                        <div className="max-w-5xl mx-auto space-y-6">
                            {/* Welcome */}
                            <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-6 shadow-xl">
                                <h2 className="text-3xl font-bold text-yellow-400 mb-2">
                                    Welcome, Admin 👋
                                </h2>
                                <p className="text-gray-400">
                                    Manage movies, review user requests, and keep
                                    Moviela updated with the latest content.
                                </p>
                            </div>

                            {/* QUICK LINKS (DASHBOARD) */}
                            <div>
                                <h3 className="text-lg font-semibold mb-3 text-gray-200">
                                    Quick Actions
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <button onClick={() => setActiveTab("add-movie")}
                                        className="relative flex items-center gap-4 bg-[#1a1a1a] border border-gray-800 rounded-xl p-5 hover:bg-[#262626] transition text-left group"
                                    >
                                        <FaPlus className="text-yellow-400 text-2xl" />

                                        <div className="flex-1">
                                            <p className="font-semibold">Add New Movie</p>
                                            <p className="text-sm text-gray-400">
                                                Upload and manage movies
                                            </p>
                                        </div>

                                        {/* Hint */}
                                        <span className="hidden sm:absolute bottom-3 right-4 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200 select-none"
                                        >
                                            Press <kbd className="px-1.5 py-0.5 bg-[#111] border border-gray-700 rounded text-xs">A</kbd>
                                        </span>
                                    </button>

                                    <button onClick={() => setActiveTab("userrequests")}
                                        className="relative flex items-center gap-4 bg-[#1a1a1a] border border-gray-800 rounded-xl p-5 hover:bg-[#262626] transition text-left group"
                                    >
                                        <FaClipboardList className="text-yellow-400 text-2xl" />

                                        <div className="flex-1">
                                            <p className="font-semibold">User Requests</p>
                                            <p className="text-sm text-gray-400">
                                                Review pending requests
                                            </p>
                                        </div>

                                        {/* Hint */}
                                        <span className="hidden sm:absolute bottom-3 right-4  text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200 select-none"
                                        >
                                            Press <kbd className="px-1.5 py-0.5 bg-[#111] border border-gray-700 rounded text-xs">R</kbd>
                                        </span>
                                    </button>

                                    <button
                                        onClick={() => setActiveTab("files")}
                                        className="relative flex items-center gap-4 bg-[#1a1a1a] border border-gray-800 rounded-xl p-5 hover:bg-[#262626] transition text-left group"
                                    >
                                        <FaFolderOpen className="text-yellow-400 text-2xl" />

                                        <div className="flex-1">
                                            <p className="font-semibold">Manage Files</p>
                                            <p className="text-sm text-gray-400">
                                                View all uploaded file IDs
                                            </p>
                                        </div>

                                        <span className="hidden sm:absolute bottom-3 right-4 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition">
                                            Press <kbd className="px-1.5 py-0.5 bg-[#111] border border-gray-700 rounded text-xs">F</kbd>
                                        </span>
                                    </button>
                                </div>
                            </div>

                            {/* STATS */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="bg-[#111] border border-gray-800 rounded-xl p-4">
                                    <p className="text-sm text-gray-400">
                                        Total Movies
                                    </p>
                                    <p className="text-2xl transition-all duration-300 font-bold text-yellow-400">
                                        {loading ? 0 : movies.length}
                                    </p>
                                </div>
                                <div className="bg-[#111] border border-gray-800 rounded-xl p-4">
                                    <p className="text-sm text-gray-400">
                                        User Requests
                                    </p>
                                    <p className="text-2xl transition-all duration-300 font-bold text-yellow-400">
                                        {loading ? 0 : requests.length}
                                    </p>
                                </div>
                                <div className="bg-[#111] border border-gray-800 rounded-xl p-4">
                                    <p className="text-sm text-gray-400">
                                        Status
                                    </p>
                                    <p className="text-2xl font-bold text-green-400">
                                        Live
                                    </p>
                                </div>
                            </div>
                        </div>
                    )
                )}
                {activeTab === "add-movie" && <MovieForm />}
                {activeTab === "files" && <AdminFiles />}
                {activeTab === "userrequests" && <UserRequests />}
            </main>
        </div>
    );
}

const DashboardSkeleton = () => {
    return (
        <div className="max-w-5xl mx-auto space-y-6 animate-pulse">
            {/* Welcome skeleton */}
            <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-6">
                <div className="h-8 w-56 bg-gray-700 rounded mb-3" />
                <div className="h-4 w-3/4 bg-gray-700 rounded" />
            </div>

            {/* Quick actions */}
            <div>
                <div className="h-5 w-32 bg-gray-700 rounded mb-3" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[1, 2].map(i => (
                        <div
                            key={i}
                            className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-5"
                        >
                            <div className="h-6 w-6 bg-gray-700 rounded mb-4" />
                            <div className="h-4 w-40 bg-gray-700 rounded mb-2" />
                            <div className="h-3 w-56 bg-gray-700 rounded" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[1, 2, 3].map(i => (
                    <div
                        key={i}
                        className="bg-[#111] border border-gray-800 rounded-xl p-4"
                    >
                        <div className="h-3 w-24 bg-gray-700 rounded mb-2" />
                        <div className="h-7 w-16 bg-gray-700 rounded" />
                    </div>
                ))}
            </div>
        </div>
    );
}
