import { useState } from "react";
import axios from "axios";

const DB_URL = "https://moviela-server.onrender.com";

export default function AddMovie() {
    const [formData, setFormData] = useState({
        movie_name: "",
        fileid: "",
        description: "",
        rating: "",
        trailer_link: "",
        summary: "",
        duration: "",
        size: "",
        categories: [],
        posterUrl: "",
        screenshots: [""]
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCategoryChange = (e) => {
        setFormData({ ...formData, categories: e.target.value.split(",").map(c => c.trim()) });
    };

    const handleScreenshotChange = (index, value) => {
        const updated = [...formData.screenshots];
        updated[index] = value;
        setFormData({ ...formData, screenshots: updated });
    };

    const addScreenshotField = () => {
        setFormData({ ...formData, screenshots: [...formData.screenshots, ""] });
    };

    const removeScreenshotField = (index) => {
        const updated = formData.screenshots.filter((_, i) => i !== index);
        setFormData({ ...formData, screenshots: updated });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = {
                ...formData,
                screenshots: formData.screenshots.filter(s => s.trim() !== "")
            };

            await axios.post(`${DB_URL}/api/v1/movie/add`, payload);
            setMessage("✅ Movie added successfully!");
            setFormData({
                movie_name: "",
                fileid: "",
                description: "",
                rating: "",
                trailer_link: "",
                summary: "",
                duration: "",
                size: "",
                categories: [],
                posterUrl: "",
                screenshots: [""]
            });
        } catch (error) {
            console.error(error);
            setMessage("❌ Failed to add movie");
        }
    };

    return (
        <div className="max-w-2xl mx-auto my-10 bg-[#1a1a1a] p-6 rounded-xl shadow-lg text-white">
            <h1 className="text-2xl font-bold mb-4">Add Movie</h1>

            {message && <p className="mb-4">{message}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                {["movie_name", "fileid", "description", "rating", "trailer_link", "summary", "duration", "size", "posterUrl"].map((field) => (
                    <div key={field}>
                        <label className="block mb-1 capitalize">{field.replace("_", " ")}</label>
                        <input
                            type="text"
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                            className="w-full p-2 rounded bg-[#2a2a2a] border border-gray-600"
                        />
                    </div>
                ))}

                {/* Categories */}
                <div>
                    <label className="block mb-1">Categories</label>
                    <input
                        type="text"
                        value={formData.categories.join(", ")}
                        onChange={handleCategoryChange}
                        className="w-full p-2 rounded bg-[#2a2a2a] border border-gray-600"
                        placeholder="Action, Comedy, Sci-Fi"
                    />
                </div>

                {/* Screenshots */}
                <div>
                    <label className="block mb-1">Screenshots</label>
                    {formData.screenshots.map((screenshot, index) => (
                        <div key={index} className="flex gap-2 mb-2">
                            <input
                                type="text"
                                value={screenshot}
                                onChange={(e) => handleScreenshotChange(index, e.target.value)}
                                className="w-full p-2 rounded bg-[#2a2a2a] border border-gray-600"
                                placeholder="Screenshot image URL"
                            />
                            {formData.screenshots.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeScreenshotField(index)}
                                    className="bg-red-500 px-2 rounded text-white"
                                >
                                    ❌
                                </button>
                            )}
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addScreenshotField}
                        className="bg-blue-500 px-3 py-1 rounded text-white mt-2"
                    >
                        ➕ Add Screenshot
                    </button>
                </div>

                <button
                    type="submit"
                    className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded"
                >
                    Add Movie
                </button>
            </form>
        </div>
    );
}
