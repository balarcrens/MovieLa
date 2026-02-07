/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from "axios";
import { FaCopy, FaFilm } from "react-icons/fa";

const DB_URL = import.meta.env.VITE_DB_URL;

export default function AdminFiles() {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [copiedId, setCopiedId] = useState(null);

    const DUMMY_FILES = [
        {
            _id: "1",
            fileid: "IK_MVL_9xA2P1",
            createdAt: new Date(),
            movie: {
                movie_name: "Jolly LLB 3",
                type: "Movie",
            },
        },
        {
            _id: "2",
            fileid: "IK_MVL_7KQ92Z",
            createdAt: new Date(),
            movie: {
                movie_name: "Pushpa 2: The Rule",
                type: "Movie",
            },
        },
        {
            _id: "3",
            fileid: "IK_MVL_1AB92M",
            createdAt: new Date(),
            movie: {
                movie_name: "Mirzapur Season 3",
                type: "Web Series",
            },
        },
    ];

    const authHeader = {
        headers: {
            "auth-token": localStorage.getItem("auth-token")
        }
    };

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const res = await axios.get(
                    `${DB_URL}/api/v1/files/all`,
                    authHeader
                );

                if (res.data && res.data.length > 0) {
                    setFiles(res.data);
                } else {
                    setFiles(DUMMY_FILES);
                }
            } catch (err) {
                console.warn(err.message);
                setFiles(DUMMY_FILES);
            } finally {
                setLoading(false);
            }
        };

        fetchFiles();
    }, []);


    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setCopiedId(text);

        setTimeout(() => {
            setCopiedId(null);
        }, 1500);
    };

    if (loading) {
        return (
            <div className="text-center py-10 text-gray-400">
                Loading files...
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                    <h2 className="text-2xl font-bold text-yellow-400">
                        File Manager
                    </h2>
                    <p className="text-sm text-gray-400">
                        All uploaded file IDs mapped to movies
                    </p>
                </div>

                <span className="px-3 py-1 text-xs rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 w-fit">
                    Total Files: {files.length}
                </span>
            </div>

            {/* File List */}
            <div className="space-y-4">
                {files.map(file => (
                    <div key={file._id}
                        className="group bg-[#1a1a1a] border border-gray-800 rounded-2xl p-5 hover:border-yellow-500/40 transition"
                    >
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                            {/* Movie Info */}
                            <div className="flex-1">
                                <p className="flex items-center gap-2 font-semibold text-white text-lg">
                                    <FaFilm className="text-yellow-400" />
                                    {file.movie?.movie_name}
                                </p>

                                <div className="flex flex-wrap items-center gap-3 mt-1">
                                    <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300">
                                        {file.movie?.type}
                                    </span>

                                    <span className="text-xs text-gray-500">
                                        Added {new Date(file.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>

                            {/* File ID */}
                            <div onClick={() => copyToClipboard(file.fileid)}
                                className="relative group flex items-center gap-3 bg-[#111] border border-gray-700 rounded-xl px-4 py-2 cursor-pointer hover:border-yellow-500/50 transition"
                            >
                                <code className="text-sm text-gray-300 tracking-wide select-none">
                                    {file.fileid}
                                </code>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        copyToClipboard(file.fileid);
                                    }}
                                    className="text-yellow-400 hover:text-yellow-300 transition"
                                >
                                    <FaCopy />
                                </button>

                                {/* Tooltip */}
                                <span className={`absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs px-2 py-1 rounded-md border pointer-events-none transition-all duration-200
                                        ${copiedId === file.fileid
                                        ? "bg-green-500/10 border-green-500/30 text-green-400 opacity-100"
                                        : "bg-[#111] border-gray-700 text-gray-300 opacity-0 group-hover:opacity-100"
                                    }`}
                                >
                                    {copiedId === file.fileid ? "Copied!" : "Click to copy"}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}