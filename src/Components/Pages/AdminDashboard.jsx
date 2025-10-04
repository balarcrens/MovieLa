import { useState } from "react";
import AddMovie from "./AddMovie";
import { FaFilm, FaPlus, FaHome } from "react-icons/fa";
import UserRequests from "./UserRequests";

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState("dashboard");

    const menuItems = [
        { name: "Dashboard", icon: <FaHome />, key: "dashboard" },
        { name: "Add Movie", icon: <FaPlus />, key: "add-movie" },
        { name: "User Requests", icon: <FaFilm />, key: "userrequests" },
    ];

    return (
        <div className="flex min-h-screen bg-[#111] text-white">
            {/* Sidebar */}
            <aside className="w-16 md:w-64 bg-[#1a1a1a] flex flex-col justify-between transition-width duration-300">
                <div className="flex flex-col h-full">
                    <nav className="flex flex-col gap-4 py-6 px-1 md:px-0">
                        {menuItems.map(item => (
                            <button
                                key={item.key}
                                className={`flex items-center justify-center gap-3 p-3 rounded-lg hover:bg-yellow-500 hover:text-black transition ${activeTab === item.key ? "bg-yellow-500 text-black" : "text-white"
                                    }`}
                                onClick={() => setActiveTab(item.key)}
                            >
                                {item.icon}
                                <span className="hidden md:inline">{item.name}</span>
                            </button>
                        ))}
                    </nav>
                </div>
                <div className="hidden md:block text-gray-400 text-sm mt-8 px-3">
                    © 2025 Moviela
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-2 md:p-4">
                {activeTab === "dashboard" && (
                    <div className="text-yellow-400 text-center text-3xl font-bold">Welcome to Admin Dashboard</div>
                )}
                {activeTab === "add-movie" && <AddMovie />}
                {activeTab === "userrequests" && <UserRequests />}
            </main>
        </div>
    );
}
