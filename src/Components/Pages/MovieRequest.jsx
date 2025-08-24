import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const DB_URL = import.meta.env.VITE_DB_URL;

const MovieRequest = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const res = await axios.post(`${DB_URL}/api/v1/requests`, data);

            if (res) {
                toast.success("Movie request submitted successfully!");
                reset();
            } else {
                toast.error("Failed to submit request.");
            }
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong!");
        }
    };

    return (
        <>
            <div className="bg-[#0f0f0f] text-white px-2 sm:px-4 py-8">
                <div className="max-w-4xl mx-auto mb-6 text-sm flex items-center space-x-2 text-gray-400">
                    <Link to="/" className="hover:text-white font-medium">
                        Home
                    </Link>
                    <ChevronRight size={16} className="text-gray-500" />
                    <span className="text-white font-semibold">Movie Request</span>
                </div>

                <div className="rounded-2xl mx-auto p-4 sm:p-8 w-full max-w-4xl bg-[#0f0f0f]">
                    <h2 className="text-2xl font-bold mb-6 text-center">
                        🎬 <span className="text-yellow-400">Request</span> for Movie
                    </h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Movie Name */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Movie Name</label>
                            <input
                                type="text"
                                {...register("movie_name", { required: "Movie name is required" })}
                                className="w-full bg-zinc-900 border border-gray-700 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-yellow-400"
                            />
                            {errors.movie_name && <p className="text-red-500 text-sm">{errors.movie_name.message}</p>}
                        </div>

                        {/* User Name */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Your Name</label>
                            <input
                                type="text"
                                {...register("user_name", { required: "Name is required" })}
                                className="w-full bg-zinc-900 border border-gray-700 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.user_name && <p className="text-red-500 text-sm">{errors.user_name.message}</p>}
                        </div>

                        {/* Email (Optional) */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Email (optional)</label>
                            <input
                                type="email"
                                {...register("user_email")}
                                className="w-full bg-zinc-900 border border-gray-700 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Reference Link (Optional) */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Link (optional)</label>
                            <input
                                type="url"
                                {...register("link")}
                                className="w-full bg-zinc-900 border border-gray-700 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Comment (Optional) */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-1">Comment (optional)</label>
                            <textarea
                                {...register("comment")}
                                rows="3"
                                className="w-full bg-zinc-900 border border-gray-700 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-blue-500"
                            ></textarea>
                        </div>

                        {/* Submit */}
                        <div className="md:col-span-2">
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                            >
                                Submit Request
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default MovieRequest;
