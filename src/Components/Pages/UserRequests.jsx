import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const DB_URL = import.meta.env.VITE_DB_URL;

export default function UserRequests() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const res = await axios.get(`${DB_URL}/api/v1/requests`, {
                    headers: { "auth-token": localStorage.getItem("auth-token") }
                });

                setRequests(res.data?.data || []);
            } catch (error) {
                console.error(error);
                toast.error("Failed to fetch user requests");
            } finally {
                setLoading(false);
            }
        };
        fetchRequests();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${DB_URL}/api/v1/requests/${id}`, {
                headers: { "auth-token": localStorage.getItem("auth-token") }
            });
            setRequests(prev => prev.filter(r => r._id !== id));
            toast.success("Request deleted!");
        } catch (err) {
            console.error(err);
            toast.error("Failed to delete request");
        }
    };

    return (
        <div className="bg-[#111] p-3 md:p-6">
            <h1 className="text-2xl font-bold text-yellow-400 mb-6">
                User Requests
            </h1>

            {loading ? (
                <p className="text-gray-400">Loading...</p>
            ) : requests.length === 0 ? (
                <p className="text-gray-400">No requests found.</p>
            ) : (
                <>
                    <div className="space-y-4 md:hidden">
                        {requests.map((req, index) => (
                            <div
                                key={req._id}
                                className="bg-[#1a1a1a] border border-gray-700 rounded-xl p-4 space-y-2"
                            >
                                <p className="text-sm text-gray-400">
                                    #{index + 1} • {new Date(req.createdAt).toLocaleDateString()}
                                </p>

                                <p><span className="text-gray-400">User:</span> {req.user_name}</p>
                                <p><span className="text-gray-400">Email:</span> {req.user_email || "—"}</p>
                                <p><span className="text-gray-400">Movie:</span> {req.movie_name}</p>
                                <p><span className="text-gray-400">Comment:</span> {req.comment || "—"}</p>

                                {req.link && (
                                    <a
                                        href={req.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-400 text-sm break-all"
                                    >
                                        {req.link}
                                    </a>
                                )}

                                <button
                                    onClick={() => handleDelete(req._id)}
                                    className="mt-2 bg-yellow-500 hover:bg-yellow-400 text-black px-3 py-1 rounded-lg transition"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full text-left border border-gray-700 rounded-lg">
                            <thead className="bg-[#1a1a1a] text-gray-300">
                                <tr>
                                    <th className="p-3">#</th>
                                    <th className="p-3">User</th>
                                    <th className="p-3">Email</th>
                                    <th className="p-3">Request</th>
                                    <th className="p-3">Comment</th>
                                    <th className="p-3">Link</th>
                                    <th className="p-3">Date</th>
                                    <th className="p-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requests.map((req, index) => (
                                    <tr
                                        key={req._id}
                                        className="border-t border-gray-700 hover:bg-[#222]"
                                    >
                                        <td className="p-3">{index + 1}</td>
                                        <td className="p-3">{req.user_name}</td>
                                        <td className="p-3">{req.user_email || "—"}</td>
                                        <td className="p-3">{req.movie_name}</td>
                                        <td className="p-3">{req.comment || "—"}</td>
                                        <td className="p-3">
                                            {req.link ? (
                                                <a
                                                    href={req.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-400 hover:underline"
                                                >
                                                    {req.link.length > 40
                                                        ? req.link.slice(0, 40) + "..."
                                                        : req.link}
                                                </a>
                                            ) : "—"}
                                        </td>
                                        <td className="p-3">
                                            {new Date(req.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="p-3">
                                            <button
                                                onClick={() => handleDelete(req._id)}
                                                className="bg-yellow-500 hover:bg-yellow-400 text-black px-3 py-1 rounded-lg transition"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
}