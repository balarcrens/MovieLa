/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Info, FileText, Film, Star, Plus } from "lucide-react";

const DB_URL = import.meta.env.VITE_DB_URL;

export default function MovieForm() {
    const { id: movieId } = useParams();
    const isEditMode = Boolean(movieId);

    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem("auth-token")) {
            navigate("/");
        }
    }, [navigate]);

    /* -------------------- STATE -------------------- */
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
    const [posterPreview, setPosterPreview] = useState(null);

    const [screenshotsCount, setScreenshotsCount] = useState(6);
    const [screenshotsFiles, setScreenshotsFiles] = useState([]);
    const [screenshotsPreview, setScreenshotsPreview] = useState([]);

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [categorySearch, setCategorySearch] = useState("");

    const [activeTab, setActiveTab] = useState("information");

    const categoryOptions = [
        "Action", "Drama", "Comedy", "Romance", "Thriller",
        "Horror", "Sci-Fi", "Adventure", "Animation",
        "Mystery", "Sports", "Crime", "History"
    ];

    /* -------------------- HANDLERS -------------------- */
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleEpisodeChange = (index, e) => {
        const { name, value } = e.target;
        const updated = [...episodes];
        updated[index] = { ...updated[index], [name]: value };
        setEpisodes(updated);
    };

    const addEpisode = () => {
        setEpisodes([
            ...episodes,
            { episode_number: "", title: "", duration: "", size: "", fileid: "", releaseDate: "" },
        ]);
    };

    const removeEpisode = (index) => {
        setEpisodes(episodes.filter((_, i) => i !== index));
    };

    const handleScreenshotChange = (index, file) => {
        const files = [...screenshotsFiles];
        files[index] = file;
        setScreenshotsFiles(files);

        const previews = [...screenshotsPreview];
        previews[index] = file ? URL.createObjectURL(file) : null;
        setScreenshotsPreview(previews);
    };

    /* -------------------- CLEANUP (NO MEMORY LEAK) -------------------- */
    useEffect(() => {
        return () => {
            if (posterPreview?.startsWith("blob:")) {
                URL.revokeObjectURL(posterPreview);
            }
            screenshotsPreview.forEach(p => {
                if (p?.startsWith("blob:")) URL.revokeObjectURL(p);
            });
        };
    }, [posterPreview, screenshotsPreview]);

    /* -------------------- LOAD MOVIE (EDIT) -------------------- */
    useEffect(() => {
        if (!isEditMode) return;

        const loadMovie = async () => {
            try {
                const res = await axios.get(`${DB_URL}/api/v1/movie/getmovie/${movieId}`, {
                    headers: { "auth-token": localStorage.getItem("auth-token") },
                });

                const movie = res.data.movie;

                setFormData({
                    type: movie.type || "Movie",
                    movie_name: movie.movie_name || "",
                    fileid: movie.fileid || "",
                    description: movie.description || "",
                    rating: movie.rating || "",
                    trailer_link: movie.trailer_link || "",
                    summary: movie.summary || "",
                    duration: movie.duration || "",
                    size: movie.size || "",
                    releaseDate: movie.releaseDate || "",
                    industry: movie.industry || "",
                    director: movie.director || "",
                    actors: movie.actors?.join(", ") || "",
                    language: movie.language || "",
                    keywords: movie.keywords?.join(", ") || "",
                    meta_description: movie.meta_description || "",
                    review: movie.review || "",
                });

                setSelectedCategories(movie.categories || []);
                setEpisodes(movie.episodes || []);
                setPosterPreview(movie.poster || null);
                setScreenshotsPreview(movie.screenshots || []);
                setScreenshotsCount(movie.screenshots?.length || 0);
            } catch {
                toast.error("Failed to load movie data");
            }
        };

        loadMovie();
    }, [movieId, isEditMode]);

    /* -------------------- SUBMIT -------------------- */
    const handleSubmit = async (e) => {
        e.preventDefault();

        /* ---- VALIDATION ---- */
        if (!formData.movie_name.trim()) {
            toast.error("Movie name is required");
            return;
        }

        if (selectedCategories.length === 0) {
            toast.error("Select at least one category");
            return;
        }

        if (formData.type === "WebSeries" && episodes.length === 0) {
            toast.error("Add at least one episode");
            return;
        }

        try {
            const data = new FormData();

            for (let key in formData) {
                if (["actors", "keywords"].includes(key)) continue;
                if (formData.type === "WebSeries" && key === "fileid") continue;
                if (isEditMode && !formData[key]) continue;
                data.append(key, formData[key]);
            }

            selectedCategories.forEach(c => data.append("categories", c));

            formData.actors &&
                [...new Set(formData.actors.split(",").map(a => a.trim()).filter(Boolean))]
                    .forEach(a => data.append("actors", a));

            formData.keywords &&
                [...new Set(formData.keywords.split(",").map(k => k.trim()).filter(Boolean))]
                    .forEach(k => data.append("keywords", k));

            if (posterFile) data.append("poster", posterFile);

            const hasNewScreenshots = screenshotsFiles.some(Boolean);
            if (!isEditMode || hasNewScreenshots) {
                screenshotsFiles.forEach(f => f && data.append("screenshots", f));
            }

            if (formData.type === "WebSeries") {
                data.append("episodes", JSON.stringify(episodes));
            }

            await axios({
                method: isEditMode ? "put" : "post",
                url: isEditMode
                    ? `${DB_URL}/api/v1/movie/update/${movieId}`
                    : `${DB_URL}/api/v1/movie/add`,
                data,
                headers: { "auth-token": localStorage.getItem("auth-token") },
            });

            toast.success(isEditMode ? "Updated successfully" : "Added successfully");

            if (!isEditMode) {
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
                    releaseDate: "",
                    industry: "",
                    director: "",
                    actors: "",
                    language: "",
                    keywords: "",
                    meta_description: "",
                    review: "",
                });
                setEpisodes([]);
                setPosterFile(null);
                setPosterPreview(null);
                setScreenshotsFiles([]);
                setScreenshotsPreview([]);
                setScreenshotsCount(6);
                setSelectedCategories([]);
            }
        } catch (err) {
            console.error(err);
            toast.error("Submission failed");
        }
    };

    /* -------------------- TABS -------------------- */
    const tabs = [
        { id: "information", label: "Information", icon: <Info className="w-4 h-4" /> },
        { id: "descriptive", label: "Descriptive / SEO", icon: <FileText className="w-4 h-4" /> },
        { id: "media", label: "Media", icon: <Film className="w-4 h-4" /> },
        { id: "review", label: "Review & Submit", icon: <Star className="w-4 h-4" /> },
    ];

    return (
        <div className="bg-[#111] p-1 md:p-6">
            <div className="max-w-6xl mx-auto bg-[#111] rounded-2xl p-1 border-gray-800">
                <h1 className="text-2xl font-bold text-center mb-8 text-yellow-400 tracking-wide">
                    <Plus className="inline mb-1" /> {isEditMode ? "Edit" : "Add New"} {formData.type}
                </h1>

                <div className="sticky top-0 z-30 -mx-4 px-4 mb-4 bg-[#0b0b0b] border-b border-gray-700 md:static md:mx-0 md:px-0 md:bg-transparent">
                    <div className="relative flex gap-2 overflow-x-auto no-scrollbar pb-3 md:flex-wrap md:overflow-visible">
                        {tabs.map((tab) => {
                            const isActive = activeTab === tab.id;

                            return (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`relative flex shrink-0 items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all
                                        ${isActive
                                            ? "text-yellow-400"
                                            : "text-gray-400 hover:text-yellow-400"
                                        }`}
                                >
                                    {tab.icon}
                                    <span className="whitespace-nowrap">
                                        {tab.label}
                                    </span>

                                    {isActive && (
                                        <motion.span
                                            layoutId="active-tab-indicator"
                                            className="absolute left-0 -bottom-[6px] h-[2px] w-full bg-yellow-500 rounded-full"
                                            transition={{ type: "spring", stiffness: 320, damping: 25 }}
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <motion.form onSubmit={handleSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6" encType="multipart/form-data">

                    {/* TAB 1: INFORMATION */}
                    <AnimatePresence mode="wait">
                        {activeTab === "information" && (
                            <motion.div
                                key="information"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6"
                            >
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

                                {/* Movie-specific fields */}
                                <AnimatePresence mode="wait">
                                    {formData.type === "Movie" && (
                                        <motion.div
                                            key="movie-fields"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6"
                                        >
                                            {["fileid", "duration", "size", "releaseDate"].map((field) => (
                                                <div key={field} className="flex flex-col">
                                                    <label className="mb-1 capitalize text-sm text-gray-300">
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
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Basic fields */}
                                {[
                                    "movie_name", "rating", "trailer_link",
                                    "industry", "director", "language",
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

                                {/* Categories */}
                                <div className="flex flex-col md:col-span-2">
                                    <label className="mb-2 text-sm tracking-wide text-gray-300">
                                        Categories
                                    </label>

                                    {/* Search */}
                                    <div className="flex flex-col sm:flex-row items-stretch gap-3 mb-4">
                                        <input type="text" placeholder="Search category..."
                                            value={categorySearch}
                                            onChange={(e) => setCategorySearch(e.target.value)}
                                            className="flex-1 min-h-11 sm:h-11 px-4 rounded-lg bg-[#1f1f1f] text-white border border-gray-700 focus:outline-none focus:border-yellow-400 transition"
                                        />

                                        <button type="button" onClick={() => setSelectedCategories([])}
                                            className="h-7 sm:h-10 px-5 rounded-lg bg-yellow-500 text-black font-semibold hover:bg-yellow-400 transition whitespace-nowrap"
                                        >
                                            Clear
                                        </button>
                                    </div>

                                    {/* Category List */}
                                    <div className="max-h-64 overflow-y-auto no-scrollbar pr-1">
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                                            {categoryOptions
                                                .filter((cat) =>
                                                    cat.toLowerCase().includes(categorySearch.toLowerCase())
                                                )
                                                .map((cat) => (
                                                    <label key={cat}
                                                        className={`flex items-center gap-2 px-2 py-2 rounded-lg border cursor-pointer transition
                                                            ${selectedCategories.includes(cat)
                                                                ? "border-yellow-400 bg-yellow-400/10"
                                                                : "border-gray-700 bg-[#1f1f1f] hover:border-yellow-400"
                                                            }`}
                                                    >
                                                        <input type="checkbox" checked={selectedCategories.includes(cat)}
                                                            onChange={(e) =>
                                                                e.target.checked
                                                                    ? setSelectedCategories([...selectedCategories, cat])
                                                                    : setSelectedCategories(
                                                                        selectedCategories.filter((c) => c !== cat)
                                                                    )
                                                            }
                                                            className="accent-yellow-500"
                                                        />
                                                        <span className="text-gray-300 text-sm truncate">
                                                            {cat}
                                                        </span>
                                                    </label>
                                                ))}
                                        </div>

                                        {categoryOptions.filter((cat) =>
                                            cat.toLowerCase().includes(categorySearch.toLowerCase())
                                        ).length === 0 && (
                                                <p className="text-sm text-gray-500 text-center py-6">
                                                    No categories found
                                                </p>
                                            )}
                                    </div>
                                </div>

                                {/* WebSeries Episodes */}
                                {formData.type === "WebSeries" && (
                                    <motion.div key="webseries-episodes"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.25 }}
                                        className="md:col-span-2"
                                    >
                                        <h2 className="text-yellow-400 font-bold text-lg mb-3">Episodes</h2>

                                        {episodes.map((ep, index) => (
                                            <motion.div key={index} layout="position"
                                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
                                                className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr_1fr_2fr_1.5fr_auto] gap-3 mb-4 bg-[#1f1f1f] p-3 rounded-lg border border-gray-700 items-center"
                                            >
                                                {["episode_number", "title", "duration",
                                                    "size", "fileid", "releaseDate",
                                                ].map((field) => (
                                                    <input key={field} type="text" name={field}
                                                        value={ep[field] || ""} onChange={(e) => handleEpisodeChange(index, e)}
                                                        placeholder={field}
                                                        className="p-2 rounded bg-[#111] text-white border border-gray-600 w-full"
                                                    />
                                                ))}

                                                <button type="button" onClick={() => removeEpisode(index)}
                                                    className="flex items-center justify-center w-9 h-9 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
                                                >
                                                    ✕
                                                </button>
                                            </motion.div>
                                        ))}

                                        <button type="button" onClick={addEpisode}
                                            className="bg-yellow-500 px-4 py-2 rounded-lg text-black font-bold"
                                        >
                                            + Add Episode
                                        </button>
                                    </motion.div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* TAB 2: DESCRIPTIVE / SEO */}
                    <AnimatePresence mode="wait">
                        {activeTab === "descriptive" && (
                            <motion.div
                                key="descriptive"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="md:col-span-2 grid grid-cols-1 gap-6"
                            >
                                {/* Keywords */}
                                <div className="flex flex-col">
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

                                {/* Meta Description */}
                                <div className="flex flex-col">
                                    <label className="mb-1 text-sm tracking-wide text-gray-300">Meta Description</label>
                                    <textarea name="meta_description" value={formData.meta_description} onChange={handleChange} rows="7" className="p-3 rounded-lg bg-[#1f1f1f] border text-white border-gray-700"></textarea>
                                </div>

                                {/* Description */}
                                <div className="flex flex-col">
                                    <label className="mb-1 text-sm tracking-wide text-gray-300">Description</label>
                                    <textarea name="description" value={formData.description} onChange={handleChange} rows="7" className="p-3 rounded-lg bg-[#1f1f1f] border text-white border-gray-700"></textarea>
                                </div>

                                {/* Summary */}
                                <div className="flex flex-col">
                                    <label className="mb-1 text-sm tracking-wide text-gray-300">Summary</label>
                                    <textarea name="summary" value={formData.summary} onChange={handleChange} rows="7" className="p-3 rounded-lg bg-[#1f1f1f] border text-white border-gray-700"></textarea>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* TAB 3: MEDIA */}
                    <AnimatePresence mode="wait">
                        {activeTab === "media" && (
                            <motion.div
                                key="media"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="md:col-span-2 grid grid-cols-1 gap-6"
                            >
                                {/* Poster Upload */}
                                <div className="flex flex-col">
                                    <label className="mb-1 text-sm tracking-wide text-gray-300">Poster</label>
                                    <input type="file" accept="image/*" onChange={(e) => {
                                        setPosterFile(e.target.files[0]);
                                        setPosterPreview(e.target.files[0] ? URL.createObjectURL(e.target.files[0]) : null);
                                    }} className="p-3 rounded-lg bg-[#1f1f1f] border border-gray-700 text-gray-400" />
                                    {posterPreview && <img src={posterPreview} alt="Poster" loading="lazy" decoding="async" className="mt-3 w-40 h-60 object-cover rounded-lg border border-gray-700" />}
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
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {Array.from({ length: screenshotsCount }).map((_, index) => (
                                        <div key={index} className="flex flex-col">
                                            <label className="mb-1 text-sm tracking-wide text-gray-300">Screenshot {index + 1}</label>
                                            <input type="file" accept="image/*" onChange={(e) => handleScreenshotChange(index, e.target.files[0])} className="p-3 rounded-lg bg-[#1f1f1f] border border-gray-700 text-gray-400" />
                                            {screenshotsPreview[index] && <img src={screenshotsPreview[index]} alt={`Screenshot ${index + 1}`} className="mt-3 w-full h-40 object-cover rounded-lg border border-gray-700" loading="lazy" decoding="async" />}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* TAB 4: REVIEW & SUBMIT */}
                    <AnimatePresence mode="wait">
                        {activeTab === "review" && (
                            <motion.div
                                key="review"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="md:col-span-2 grid grid-cols-1 gap-6"
                            >
                                {/* Review */}
                                <div className="flex flex-col">
                                    <label className="mb-1 text-sm tracking-wide text-gray-300">Review</label>
                                    <textarea name="review" value={formData.review} onChange={handleChange} rows="5" className="p-3 rounded-lg bg-[#1f1f1f] border text-white border-gray-700"></textarea>
                                </div>

                                {/* Summary of Data */}
                                <div className="bg-[#1f1f1f] p-4 rounded-lg border border-gray-700">
                                    <h3 className="text-yellow-400 font-bold mb-3">Content Summary</h3>
                                    <div className="text-gray-300 text-sm space-y-2">
                                        <p><span className="text-yellow-400">Type:</span> {formData.type}</p>
                                        <p><span className="text-yellow-400">Name:</span> {formData.movie_name || "Not provided"}</p>
                                        <p><span className="text-yellow-400">Categories:</span> {selectedCategories.length > 0 ? selectedCategories.join(", ") : "Not selected"}</p>
                                        <p><span className="text-yellow-400">Rating:</span> {formData.rating || "Not provided"}</p>
                                    </div>
                                </div>

                                {/* Submit */}
                                <div className="flex justify-center mt-6">
                                    <button type="submit" className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-10 py-3 rounded-xl transition-all duration-300">
                                        <Plus className="inline mr-2" />
                                        {isEditMode ? "Update" : "Add"} {formData.type}
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.form>
            </div>
        </div>
    );
}