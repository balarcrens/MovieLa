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

                const data = res.data?.data || [];
                setRequests(data);
            } catch (error) {
                console.error(error);
                toast.error("Failed to fetch user requests");
            } finally {
                setLoading(false);
            }
        };
        fetchRequests();
    }, []);

    return (
        <div className="min-h-screen bg-[#111] p-3 md:p-6">
            <h1 className="text-2xl font-bold text-yellow-400 mb-6">User Requests</h1>
            {loading ? (
                <p className="text-gray-400">Loading...</p>
            ) : requests.length === 0 ? (
                <p className="text-gray-400">No requests found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border border-gray-700 rounded-lg">
                        <thead className="bg-[#1a1a1a] text-gray-300">
                            <tr>
                                <th className="p-3 border-b border-gray-700">#</th>
                                <th className="p-3 border-b border-gray-700">User</th>
                                <th className="p-3 border-b border-gray-700">Email</th>
                                <th className="p-3 border-b border-gray-700">Request</th>
                                <th className="p-3 border-b border-gray-700">Comment</th>
                                <th className="p-3 border-b border-gray-700">Link</th>
                                <th className="p-3 border-b border-gray-700">Date</th>
                                <th className="p-3 border-b border-gray-700">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((req, index) => (
                                <tr key={req._id} className="border-b border-gray-700 hover:bg-[#222]">
                                    <td className="p-3">{index + 1}</td>
                                    <td className="p-3">{req.user_name}</td>
                                    <td className="p-3">{req.user_email}</td>
                                    <td className="p-3">{req.movie_name}</td>
                                    <td className="p-3">{req.comment || "—"}</td>
                                    <td className="p-3">
                                        {req.link ? (
                                            <a href={req.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline" title={req.link} >
                                                {req.link.length > 40 ? req.link.slice(0, 40) + "..." : req.link}
                                            </a>
                                        ) : ("—")}
                                    </td>
                                    <td className="p-3">{new Date(req.createdAt).toLocaleDateString()}</td>
                                    <td className="p-3">
                                        <button
                                            className="bg-yellow-500 hover:bg-yellow-400 text-black px-3 py-1 rounded-lg transition"
                                            onClick={async () => {
                                                try {
                                                    await axios.delete(`${DB_URL}/api/v1/requests/${req._id}`, {
                                                        headers: { "auth-token": localStorage.getItem("auth-token") }
                                                    });
                                                    setRequests(requests.filter(r => r._id !== req._id));
                                                    toast.success("Request deleted!");
                                                } catch (err) {
                                                    console.error(err);
                                                    toast.error("Failed to delete request");
                                                }
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
