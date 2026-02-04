import { useState } from "react";
import AddMovie from "./AddMovie";
import UserRequests from "./UserRequests";
import {
    FaFilm,
    FaPlus,
    FaHome,
    FaClipboardList,
} from "react-icons/fa";

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState("dashboard");

    const menuItems = [
        { name: "Dashboard", icon: <FaHome />, key: "dashboard" },
        { name: "Add Movie", icon: <FaPlus />, key: "add-movie" },
        { name: "User Requests", icon: <FaFilm />, key: "userrequests" },
    ];

    return (
        <div className="flex h-screen bg-[#111] text-white">
            {/* SIDEBAR */}
            <aside className="w-18 md:w-64 bg-[#1a1a1a] border-r border-gray-800 flex flex-col">
                {/* Logo */}
                {/* <div className="h-16 flex items-center justify-center border-b border-gray-800"> */}
                    <span className="hidden md:block text-xl font-bold text-yellow-400">
                        Moviela
                    </span>
                    {/* <span className="md:hidden text-yellow-400 font-bold text-lg">M</span> */}
                {/* </div> */}

                {/* Menu */}
                <nav className="flex-1 px-3 md:px-4 py-4 space-y-2">
                    {menuItems.map(item => (
                        <button
                            key={item.key}
                            onClick={() => setActiveTab(item.key)}
                            className={`relative w-full flex items-center gap-3 justify-center md:justify-start px-0 md:px-4 py-2.5 rounded-lg transition
                                ${activeTab === item.key
                                    ? "bg-yellow-500 text-black shadow-md"
                                    : "text-gray-300 hover:bg-[#262626] hover:text-white"
                                }
                            `}
                        >
                            {/* Active Indicator (FIXED) */}
                            {activeTab === item.key && (
                                <span className="absolute left-0 top-2 bottom-2 w-1 bg-black rounded-r" />
                            )}

                            <span className="text-base md:text-lg">{item.icon}</span>
                            <span className="hidden md:inline font-medium">
                                {item.name}
                            </span>
                        </button>
                    ))}
                </nav>

                {/* Footer */}
                <div className="hidden md:block text-white/90 text-xs text-center py-4 border-t border-gray-800">
                    © 2025 Moviela Admin
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1 p-4 md:p-6 overflow-y-auto">
                {activeTab === "dashboard" && (
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
                                <button
                                    onClick={() => setActiveTab("add-movie")}
                                    className="flex items-center gap-4 bg-[#1a1a1a] border border-gray-800 rounded-xl p-5 hover:bg-[#262626] transition text-left"
                                >
                                    <FaPlus className="text-yellow-400 text-2xl" />
                                    <div>
                                        <p className="font-semibold">
                                            Add New Movie
                                        </p>
                                        <p className="text-sm text-gray-400">
                                            Upload and manage movies
                                        </p>
                                    </div>
                                </button>

                                <button
                                    onClick={() =>
                                        setActiveTab("userrequests")
                                    }
                                    className="flex items-center gap-4 bg-[#1a1a1a] border border-gray-800 rounded-xl p-5 hover:bg-[#262626] transition text-left"
                                >
                                    <FaClipboardList className="text-yellow-400 text-2xl" />
                                    <div>
                                        <p className="font-semibold">
                                            User Requests
                                        </p>
                                        <p className="text-sm text-gray-400">
                                            Review pending requests
                                        </p>
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* STATS */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="bg-[#111] border border-gray-800 rounded-xl p-4">
                                <p className="text-sm text-gray-400">
                                    Total Movies
                                </p>
                                <p className="text-2xl font-bold text-yellow-400">
                                    —
                                </p>
                            </div>
                            <div className="bg-[#111] border border-gray-800 rounded-xl p-4">
                                <p className="text-sm text-gray-400">
                                    User Requests
                                </p>
                                <p className="text-2xl font-bold text-yellow-400">
                                    —
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
                )}
                {activeTab === "add-movie" && <AddMovie />}
                {activeTab === "userrequests" && <UserRequests />}
            </main>
        </div>
    );
}