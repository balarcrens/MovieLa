/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const DB_URL = import.meta.env.VITE_DB_URL;

export default function AddMovie() {
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("auth-token")) {
            console.log(localStorage.getItem("auth-token"));
        } else {
            navigate("/");
        }
    }, []);

    const [formData, setFormData] = useState({
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

    const [posterFile, setPosterFile] = useState(null);
    const [screenshotsCount, setScreenshotsCount] = useState(6);
    const [screenshotsFiles, setScreenshotsFiles] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const categoryOptions = [
        "Action",
        "Drama",
        "Comedy",
        "Romance",
        "Thriller",
        "Horror",
        "Sci-Fi",
        "Adventure",
    ];

    const [posterPreview, setPosterPreview] = useState(null);
    const [screenshotsPreview, setScreenshotsPreview] = useState([]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
            }

            selectedCategories.forEach((cat) => data.append("categories", cat));

            // Actors separate and store in array
            if (formData.actors) {
                formData.actors.split(",")
                    .map(a => a.trim())
                    .filter(a => a.length > 0)
                    .forEach(actor => data.append("actors", actor));
            }

            // Keywords separate and store in array
            if (formData.keywords) {
                formData.keywords.split(",")
                    .map(k => k.trim())
                    .filter(k => k.length > 0)
                    .forEach(keyword => data.append("keywords", keyword));
            }

            if (posterFile) {
                data.append("poster", posterFile);
            }
            screenshotsFiles.forEach((file) => {
                if (file) data.append("screenshots", file);
            });

            await axios.post(`${DB_URL}/api/v1/movie/add`, data, {
                headers: { "Content-Type": "multipart/form-data", "auth-token": localStorage.getItem("auth-token") },
            });

            toast.success("Movie added successfully!");

            // Reset form
            setFormData({
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
            setPosterFile(null);
            setScreenshotsFiles([]);
            setScreenshotsCount(6);
            setPosterPreview(null);
            setScreenshotsPreview([]);
            setSelectedCategories([]);
        } catch (error) {
            console.error(error);
            toast.error("Failed to add movie");
        }
    };

    return (
        <div className="min-h-screen bg-[#111] p-3 md:p-10">
            <div className="max-w-6xl mx-auto bg-[#111] rounded-2xl p-1 sm:p-8 border-gray-800">
                <h1 className="text-2xl font-bold text-center mb-8 text-yellow-400 tracking-wide">
                    + Add New Movie
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    encType="multipart/form-data"
                >
                    {[
                        "movie_name",
                        "fileid",
                        "rating",
                        "trailer_link",
                        "duration",
                        "size",
                        "industry",
                        "director",
                        "language",
                        "meta_description",
                        "review",
                        "releaseDate"
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
                                className="p-3 rounded-lg bg-[#1f1f1f] text-white border border-gray-700 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none"
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
                            className="p-3 rounded-lg bg-[#1f1f1f] text-white border border-gray-700 
                                focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none"
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
                            placeholder="Action, Thriller, 2025, HD"
                            className="p-3 rounded-lg bg-[#1f1f1f] text-white border border-gray-700 
                                focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none"
                        />
                    </div>

                    {/* Categories */}
                    <div className="flex flex-col md:col-span-2">
                        <label className="mb-2 text-sm tracking-wide text-gray-300">
                            Categories
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                            {categoryOptions.map((cat) => (
                                <label
                                    key={cat}
                                    className="flex items-center gap-2 bg-[#1f1f1f] px-3 py-2 rounded-lg border border-gray-700 cursor-pointer hover:border-yellow-400 transition"
                                >
                                    <input
                                        type="checkbox"
                                        value={cat}
                                        checked={selectedCategories.includes(cat)}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedCategories([...selectedCategories, cat]);
                                            } else {
                                                setSelectedCategories(selectedCategories.filter((c) => c !== cat));
                                            }
                                        }}
                                        className="accent-yellow-500"
                                    />
                                    <span className="text-gray-300">{cat}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Description */}
                    <div className="flex flex-col md:col-span-2">
                        <label className="mb-1 text-sm tracking-wide text-gray-300">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="3"
                            className="p-3 rounded-lg bg-[#1f1f1f] border text-white border-gray-700 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none"
                        ></textarea>
                    </div>

                    {/* Summary */}
                    <div className="flex flex-col md:col-span-2">
                        <label className="mb-1 text-sm tracking-wide text-gray-300">
                            Summary
                        </label>
                        <textarea
                            name="summary"
                            value={formData.summary}
                            onChange={handleChange}
                            rows="3"
                            className="p-3 rounded-lg bg-[#1f1f1f] text-white border border-gray-700 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none"
                        ></textarea>
                    </div>

                    {/* Poster Upload + Preview */}
                    <div className="flex flex-col">
                        <label className="mb-1 text-sm tracking-wide text-gray-300">
                            Poster
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                setPosterFile(e.target.files[0]);
                                setPosterPreview(e.target.files[0] ? URL.createObjectURL(e.target.files[0]) : null);
                            }}
                            className="p-3 rounded-lg bg-[#1f1f1f] border border-gray-700 text-gray-400"
                        />
                        {posterPreview && (
                            <img
                                src={posterPreview}
                                alt="Poster Preview"
                                className="mt-3 w-40 h-60 object-cover rounded-lg border border-gray-700"
                            />
                        )}
                    </div>

                    {/* Screenshots Count */}
                    <div className="flex flex-col">
                        <label className="mb-1 text-sm tracking-wide text-gray-300">
                            Number of Screenshots
                        </label>
                        <input
                            type="number"
                            min="1"
                            value={screenshotsCount}
                            onChange={(e) => {
                                const count = parseInt(e.target.value, 10);
                                setScreenshotsCount(count);
                                setScreenshotsFiles(Array(count).fill(null));
                                setScreenshotsPreview(Array(count).fill(null));
                            }}
                            className="p-3 rounded-lg bg-[#1f1f1f] border border-gray-700 text-gray-400"
                        />
                    </div>

                    {/* Screenshot Inputs + Preview */}
                    <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {Array.from({ length: screenshotsCount }).map((_, index) => (
                            <div key={index} className="flex flex-col">
                                <label className="mb-1 text-sm tracking-wide text-gray-300">
                                    Screenshot {index + 1}
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleScreenshotChange(index, e.target.files[0])}
                                    className="p-3 rounded-lg bg-[#1f1f1f] border border-gray-700 text-gray-400"
                                />
                                {screenshotsPreview[index] && (
                                    <img
                                        src={screenshotsPreview[index]}
                                        alt={`Screenshot ${index + 1}`}
                                        className="mt-3 w-full h-40 object-cover rounded-lg border border-gray-700"
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Submit Button */}
                    <div className="md:col-span-2 flex justify-center mt-6">
                        <button
                            type="submit"
                            className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-10 py-3 rounded-xl transition-all duration-300"
                        >
                            ➕ Add Movie
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
