/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const DB_URL = import.meta.env.VITE_DB_URL;

export default function AddMovie() {
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem("auth-token")) {
            navigate("/");
        }
    }, []);

    const [formData, setFormData] = useState({
        type: "Movie",
        movie_name: "",
        fileid: "",
        description: "",
        rating: "",
        trailer_link: "",
        summary: "",
        duration: "",
        size: "",
        categories: "",
        releaseDate: "",
        industry: "",
        director: "",
        actors: "",
        language: "",
        keywords: "",
        meta_description: "",
        review: "",
    });

    const [episodes, setEpisodes] = useState([]);
    const [posterFile, setPosterFile] = useState(null);
    const [screenshotsCount, setScreenshotsCount] = useState(6);
    const [screenshotsFiles, setScreenshotsFiles] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const categoryOptions = [
        "Action", "Drama", "Comedy", "Romance", "Thriller", "Horror", "Sci-Fi", "Adventure", "Animation", "Mystery", "Sports", "Crime", "History"
    ];

    const [posterPreview, setPosterPreview] = useState(null);
    const [screenshotsPreview, setScreenshotsPreview] = useState([]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleEpisodeChange = (index, e) => {
        const { name, value } = e.target;
        const updatedEpisodes = [...episodes];
        updatedEpisodes[index] = { ...updatedEpisodes[index], [name]: value };
        setEpisodes(updatedEpisodes);
    };

    const addEpisode = () => {
        setEpisodes([...episodes, { episode_number: "", title: "", duration: "", size: "", fileid: "", releaseDate: "" }]);
    };

    const removeEpisode = (index) => {
        setEpisodes(episodes.filter((_, i) => i !== index));
    };

    const handleScreenshotChange = (index, file) => {
        const updated = [...screenshotsFiles];
        updated[index] = file;
        setScreenshotsFiles(updated);

        const previews = [...screenshotsPreview];
        previews[index] = file ? URL.createObjectURL(file) : null;
        setScreenshotsPreview(previews);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();

            for (let key in formData) {
                if (key !== "categories") {
                    data.append(key, formData[key]);
                }
                if (formData.type === "WebSeries" && key === "fileid") continue;
            }

            selectedCategories.forEach((cat) => data.append("categories", cat));

            if (formData.actors) {
                let actors = formData.actors
                    .split(",")
                    .map(a => a.trim())
                    .filter(Boolean); // remove empty strings

                let uniqueActors = [...new Set(actors)]; // remove duplicates

                uniqueActors.forEach(actor => data.append("actors", actor));
            }

            if (formData.keywords) {
                let keywords = formData.keywords
                    .split(",")
                    .map(k => k.trim())
                    .filter(Boolean);

                let uniqueKeywords = [...new Set(keywords)]; // remove duplicates

                uniqueKeywords.forEach(keyword => data.append("keywords", keyword));
            }

            if (posterFile) {
                data.append("poster", posterFile);
            }
            screenshotsFiles.forEach((file) => {
                if (file) data.append("screenshots", file);
            });

            // Episodes only if WebSeries
            if (formData.type === "WebSeries" && episodes.length > 0) {
                data.append("episodes", JSON.stringify(episodes));
            }

            await axios.post(`${DB_URL}/api/v1/movie/add`, data, {
                headers: { "Content-Type": "multipart/form-data", "auth-token": localStorage.getItem("auth-token") },
            });

            toast.success(`${formData.type} added successfully!`);

            // Reset form
            setFormData({
                type: "Movie",
                movie_name: "",
                fileid: "",
                description: "",
                rating: "",
                trailer_link: "",
                summary: "",
                duration: "",
                size: "",
                categories: "",
                releaseDate: "",
                industry: "",
                actors: "",
                director: "",
                language: "",
                keywords: "",
                meta_description: "",
                review: "",
            });
            setEpisodes([]);
            setPosterFile(null);
            setScreenshotsFiles([]);
            setScreenshotsCount(6);
            setPosterPreview(null);
            setScreenshotsPreview([]);
            setSelectedCategories([]);
        } catch (error) {
            console.error(error);
            toast.error("Failed to add content");
        }
    };

    return (
        <div className="min-h-screen bg-[#111] p-3 md:p-10">
            <div className="max-w-6xl mx-auto bg-[#111] rounded-2xl p-1 sm:p-8 border-gray-800">
                <h1 className="text-2xl font-bold text-center mb-8 text-yellow-400 tracking-wide">
                    + Add New {formData.type}
                </h1>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6" encType="multipart/form-data">
                    {/* Movie Type */}
                    <div className="flex flex-col">
                        <label className="mb-1 text-sm tracking-wide text-gray-300">Type</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="p-3 rounded-lg bg-[#1f1f1f] text-white border border-gray-700"
                        >
                            <option value="Movie">Movie</option>
                            <option value="WebSeries">WebSeries</option>
                        </select>
                    </div>

                    {formData.type === "Movie" && (
                        <>
                            {["fileid", "duration", "size", "releaseDate"].map((field) => (
                                <div key={field} className="flex flex-col">
                                    <label className="mb-1 capitalize text-sm tracking-wide text-gray-300">
                                        {field.replace("_", " ")}
                                    </label>
                                    <input
                                        type="text"
                                        name={field}
                                        value={formData[field]}
                                        onChange={handleChange}
                                        className="p-3 rounded-lg bg-[#1f1f1f] text-white border border-gray-700"
                                    />
                                </div>
                            ))}
                        </>
                    )}

                    {/* Basic fields */}
                    {[
                        "movie_name", "rating", "trailer_link",
                        "industry", "director", "language",
                        "meta_description", "review"
                    ].map((field) => (
                        <div key={field} className="flex flex-col">
                            <label className="mb-1 capitalize text-sm tracking-wide text-gray-300">
                                {field.replace("_", " ")}
                            </label>
                            <input
                                type="text"
                                name={field}
                                value={formData[field]}
                                onChange={handleChange}
                                className="p-3 rounded-lg bg-[#1f1f1f] text-white border border-gray-700"
                            />
                        </div>
                    ))}

                    {/* Actors */}
                    <div className="flex flex-col md:col-span-2">
                        <label className="mb-1 text-sm tracking-wide text-gray-300">Actors (comma separated)</label>
                        <input
                            type="text"
                            name="actors"
                            value={formData.actors}
                            onChange={handleChange}
                            placeholder="Actor1, Actor2, Actor3"
                            className="p-3 rounded-lg bg-[#1f1f1f] text-white border border-gray-700"
                        />
                    </div>

                    {/* Keywords */}
                    <div className="flex flex-col md:col-span-2">
                        <label className="mb-1 text-sm tracking-wide text-gray-300">Keywords (comma separated)</label>
                        <input
                            type="text"
                            name="keywords"
                            value={formData.keywords}
                            onChange={handleChange}
                            placeholder="Action, Thriller, HD"
                            className="p-3 rounded-lg bg-[#1f1f1f] text-white border border-gray-700"
                        />
                    </div>

                    {/* Categories */}
                    <div className="flex flex-col md:col-span-2">
                        <label className="mb-2 text-sm tracking-wide text-gray-300">Categories</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                            {categoryOptions.map((cat) => (
                                <label key={cat} className="flex items-center gap-2 bg-[#1f1f1f] px-3 py-2 rounded-lg border border-gray-700 cursor-pointer hover:border-yellow-400 transition">
                                    <input
                                        type="checkbox"
                                        value={cat}
                                        checked={selectedCategories.includes(cat)}
                                        onChange={(e) =>
                                            e.target.checked
                                                ? setSelectedCategories([...selectedCategories, cat])
                                                : setSelectedCategories(selectedCategories.filter((c) => c !== cat))
                                        }
                                        className="accent-yellow-500"
                                    />
                                    <span className="text-gray-300">{cat}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* WebSeries Episodes */}
                    {formData.type === "WebSeries" && (
                        <div className="md:col-span-2">
                            <h2 className="text-yellow-400 font-bold text-lg mb-3">Episodes</h2>
                            {episodes.map((ep, index) => (
                                <div key={index} className="grid grid-cols-1 md:grid-cols-7 gap-3 mb-4 bg-[#1f1f1f] p-3 rounded-lg border border-gray-700">
                                    {["episode_number", "title", "duration", "size", "fileid", "releaseDate"].map((field) => (
                                        <input
                                            key={field}
                                            type="text"
                                            name={field}
                                            value={ep[field] || ""}
                                            onChange={(e) => handleEpisodeChange(index, e)}
                                            placeholder={field}
                                            className="p-2 rounded bg-[#111] text-white border border-gray-600"
                                        />
                                    ))}
                                    <button type="button" onClick={() => removeEpisode(index)} className="text-red-400 font-bold">X</button>
                                </div>
                            ))}
                            <button type="button" onClick={addEpisode} className="bg-yellow-500 px-4 py-2 rounded-lg text-black font-bold">+ Add Episode</button>
                        </div>
                    )}

                    {/* Description + Summary */}
                    <div className="flex flex-col md:col-span-2">
                        <label className="mb-1 text-sm tracking-wide text-gray-300">Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} rows="3" className="p-3 rounded-lg bg-[#1f1f1f] border text-white border-gray-700"></textarea>
                    </div>
                    <div className="flex flex-col md:col-span-2">
                        <label className="mb-1 text-sm tracking-wide text-gray-300">Summary</label>
                        <textarea name="summary" value={formData.summary} onChange={handleChange} rows="3" className="p-3 rounded-lg bg-[#1f1f1f] border text-white border-gray-700"></textarea>
                    </div>

                    {/* Poster Upload */}
                    <div className="flex flex-col">
                        <label className="mb-1 text-sm tracking-wide text-gray-300">Poster</label>
                        <input type="file" accept="image/*" onChange={(e) => {
                            setPosterFile(e.target.files[0]);
                            setPosterPreview(e.target.files[0] ? URL.createObjectURL(e.target.files[0]) : null);
                        }} className="p-3 rounded-lg bg-[#1f1f1f] border border-gray-700 text-gray-400" />
                        {posterPreview && <img src={posterPreview} alt="Poster" className="mt-3 w-40 h-60 object-cover rounded-lg border border-gray-700" />}
                    </div>

                    {/* Screenshots Count */}
                    <div className="flex flex-col">
                        <label className="mb-1 text-sm tracking-wide text-gray-300">Number of Screenshots</label>
                        <input type="number" min="1" value={screenshotsCount} onChange={(e) => {
                            const count = parseInt(e.target.value, 10);
                            setScreenshotsCount(count);
                            setScreenshotsFiles(Array(count).fill(null));
                            setScreenshotsPreview(Array(count).fill(null));
                        }} className="p-3 rounded-lg bg-[#1f1f1f] border border-gray-700 text-gray-400" />
                    </div>

                    {/* Screenshot Inputs */}
                    <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {Array.from({ length: screenshotsCount }).map((_, index) => (
                            <div key={index} className="flex flex-col">
                                <label className="mb-1 text-sm tracking-wide text-gray-300">Screenshot {index + 1}</label>
                                <input type="file" accept="image/*" onChange={(e) => handleScreenshotChange(index, e.target.files[0])} className="p-3 rounded-lg bg-[#1f1f1f] border border-gray-700 text-gray-400" />
                                {screenshotsPreview[index] && <img src={screenshotsPreview[index]} alt={`Screenshot ${index + 1}`} className="mt-3 w-full h-40 object-cover rounded-lg border border-gray-700" />}
                            </div>
                        ))}
                    </div>

                    {/* Submit */}
                    <div className="md:col-span-2 flex justify-center mt-6">
                        <button type="submit" className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-10 py-3 rounded-xl transition-all duration-300">
                            ➕ Add {formData.type}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}