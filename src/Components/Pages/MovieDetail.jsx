import { useEffect, useState, useRef } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import {
    ChevronRight,
    Download,
    Pencil,
    Plus,
    Trash2
} from "lucide-react";
import MovieDetailSkeleton from "../MovieDetailSkeleton";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
// import AdBanner from "../AdBanner";

const DB_URL = import.meta.env.VITE_DB_URL;

export default function MovieDetail() {
    const { slug } = useParams();
    const [movie, setMovie] = useState(null);
    const [related, setRelated] = useState([]);
    const [error, setError] = useState(false);
    const isAdmin = Boolean(localStorage.getItem("auth-token"));
    const location = useLocation();
    const state = location.state;

    const formatLabel = (text) =>
        text
            ?.replace(/-/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase());

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });

        axios.get(`${DB_URL}/api/v1/movie/slug/${slug}`).then((res) => {
            const data = res.data.movie;
            setMovie(data);

            if (data?.categories?.length > 0) {
                axios
                    .get(`${DB_URL}/api/v1/movie/category/${data.categories[0]}`)
                    .then((res2) => {
                        setRelated(
                            res2.data.movies
                                .filter((m) => m.slug !== data.slug)
                                .slice(0, 5)
                        );
                    });
            }
        }).catch(err => {
            console.error("Fetch Error:", err);
            setError(true);
        });
    }, [slug]);

    if (error) {
        return (
            <div className="bg-[#0f0f0f] min-h-screen text-white px-3 py-10">
                <div className="max-w-xl mx-auto mt-10 p-8 rounded-2xl border border-red-500/20 bg-[#1a1a1a] shadow-2xl text-center">
                    <h3 className="text-2xl font-bold text-red-500 mb-3">Network Error</h3>
                    <p className="text-gray-400 mb-6">Failed to retrieve movie details. Please check your connection or try again later.</p>
                    <button onClick={() => window.location.reload()} className="px-6 py-2 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition">
                        Retry Connection
                    </button>
                    <Link to="/" className="block mt-4 text-sm text-gray-400 hover:text-white transition">Return to Home</Link>
                </div>
            </div>
        );
    }

    if (!movie) return <MovieDetailSkeleton />;

    return (
        <div className="bg-black min-h-screen text-white px-3 sm:px-5 py-8">
            {/* ================= SEO ================= */}
            <Helmet>
                <title>{movie.movie_name} | Movie Details & Trailer | Moviela</title>
                <meta
                    name="description"
                    content={
                        movie.summary ||
                        `Explore details, cast, trailer, and related movies of ${movie.movie_name} on Moviela.`
                    }
                />
                <meta name="robots" content="index, follow" />
                <link
                    rel="canonical"
                    href={`https://moviela.vercel.app/movie/${movie.slug}`}
                />

                <meta property="og:title" content={movie.movie_name} />
                <meta property="og:description" content={movie.summary} />
                <meta property="og:type" content="video.movie" />
                <meta
                    property="og:url"
                    content={`https://moviela.vercel.app/movie/${movie.slug}`}
                />
                {movie.posterUrl && (
                    <>
                        <meta property="og:image" content={movie.posterUrl} />
                        <meta name="twitter:card" content="summary_large_image" />
                        <meta name="twitter:image" content={movie.posterUrl} />
                    </>
                )}
                
                <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Movie",
                    "name": movie.movie_name,
                    "image": movie.posterUrl,
                    "description": movie.summary || movie.description,
                    "director": movie.director ? { "@type": "Person", "name": movie.director } : undefined,
                    "actor": movie.actors?.map(actor => ({ "@type": "Person", "name": actor })),
                    "datePublished": movie.releaseDate,
                    "genre": movie.categories || []
                })}
                </script>
            </Helmet>

            {/* ================= BREADCRUMB ================= */}
            <div className="max-w-5xl mx-auto mb-5 flex items-center text-sm text-gray-400 gap-2">
                <Link to="/" className="hover:text-white">Home</Link>
                <ChevronRight size={14} />
                {state?.label && state?.path ? (
                    <Link
                        to={state.path}
                        className="hover:text-white font-medium"
                    >
                        {formatLabel(state.label)}
                    </Link>
                ) : (
                    <span className="hover:text-white font-medium">
                        Movies
                    </span>
                )}
                <ChevronRight size={14} />
                <span className="text-white font-medium">{movie.movie_name}</span>
            </div>

            {/* ================= HERO SECTION ================= */}
            <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 mb-12">
                {/* Poster */}
                <div className="flex justify-center">
                    <img
                        src={movie.posterUrl}
                        alt={movie.movie_name}
                        className="rounded-xl shadow-lg max-h-[460px] object-cover"
                        loading="lazy"
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/300x450/111/444?text=No+Poster' }}
                    />
                </div>

                {/* Info */}
                <div className="md:col-span-2 space-y-4">
                    <h1 className="text-3xl sm:text-4xl font-bold">
                        {movie.movie_name}
                    </h1>

                    <div className="flex flex-wrap gap-3 text-sm text-gray-400">
                        <span>⭐ {movie.rating || "N/A"} IMDb</span>
                        <span>• {movie.releaseDate}</span>
                        <span>• {movie.duration}</span>
                        <span>• {movie.language}</span>
                    </div>

                    <p className="text-gray-300 leading-relaxed">
                        {movie.summary || "Storyline will be updated soon."}
                    </p>

                    <div className="flex flex-wrap gap-4 pt-2">
                        <Link
                            to="/movie/how-to-download"
                            className="bg-yellow-500 text-black px-5 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition"
                        >
                            How to Download
                        </Link>

                        {movie.trailer_link && (
                            <a
                                href="#trailer"
                                className="border border-white/20 px-5 py-2 rounded-lg hover:bg-white/10 transition"
                            >
                                Watch Trailer
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {isAdmin && <AdminMovieFAB movie={movie} />}

            {/* ================= DETAILS ================= */}
            <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-4 mb-10">
                {[
                    ["Genre", movie.categories?.join(", ")],
                    ["Director", movie.director],
                    ["Stars", movie.actors?.join(", ")],
                    ["Quality", movie.quality],
                    ["File Size", movie.size],
                    ["Language", movie.language],
                ].map(([label, value]) => (
                    <div
                        key={label}
                        className="bg-[#141414] border border-white/5 rounded-lg p-4"
                    >
                        <p className="text-gray-400 text-sm">{label}</p>
                        <p className="font-medium">{value || "N/A"}</p>
                    </div>
                ))}
            </div>

            {/* ================= DESCRIPTION ================= */}
            <section className="max-w-4xl mx-auto space-y-8 mb-12">
                <div>
                    <h2 className="text-2xl font-semibold mb-2">📖 Description</h2>
                    <p className="text-gray-300 leading-relaxed">
                        {movie.description || "Description not available."}
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-2">🎬 Storyline</h2>
                    <p className="text-gray-300 leading-relaxed">
                        {movie.summary || "Storyline not available."}
                    </p>
                </div>
            </section>

            {/* ================= SCREENSHOTS ================= */}
            {movie.screenshots?.length > 0 && (
                <div className="max-w-5xl mx-auto mb-12">
                    <h2 className="text-2xl font-bold text-center mb-5 text-amber-500">
                        Screenshots
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {movie.screenshots.map((img, i) => (
                            <img
                                key={i}
                                src={img}
                                alt={`Screenshot ${i + 1}`}
                                className="rounded-lg object-cover w-full h-auto aspect-video"
                                loading="lazy"
                                onError={(e) => { e.target.src = 'https://via.placeholder.com/600x338/111/444?text=Image+Unavailable' }}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* ================= DOWNLOAD ================= */}
            <div className="max-w-4xl mx-auto my-10 px-3">
                <div className="border border-gray-700 bg-black rounded-md overflow-hidden">

                    {/* Header */}
                    <div className="bg-[#141414] border-b border-gray-700 py-3 text-center">
                        <h2 className="text-xl sm:text-2xl font-bold text-amber-500 tracking-wide">
                            ⬇ DOWNLOAD LINKS
                        </h2>
                    </div>

                    {/* Movie Download */}
                    {movie.type === "Movie" && (
                        <div className="py-6 text-center">
                            <p className="text-gray-400 text-sm mb-2">
                                Click below to download the full movie
                            </p>

                            <a
                                href={`https://t.me/movieladownloadbot?start=${movie.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block
                    text-blue-400 text-lg sm:text-xl font-semibold
                    hover:text-blue-300 underline underline-offset-4
                    transition"
                            >
                                {movie.movie_name} [{movie.quality || "HD"} – {movie.size || "720p"}]
                            </a>
                        </div>
                    )}

                    {/* Web Series Episodes */}
                    {movie.type === "WebSeries" && movie.episodes?.length > 0 && (
                        <div className="divide-y divide-gray-700">
                            {movie.episodes.map((ep) => (
                                <div
                                    key={ep.episode_number}
                                    className="py-3 px-4 text-center hover:bg-[#111] transition"
                                >
                                    <a
                                        href={`https://t.me/movieladownloadbot?start=episode_${movie.slug}_${ep.episode_number}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-400 text-base sm:text-lg font-medium hover:text-blue-300"
                                    >
                                        Episode {ep.episode_number}
                                        {ep.title && ` – ${ep.title}`}
                                        {ep.size && ` [${ep.size}]`}
                                    </a>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* No Links */}
                    {!movie.type && (
                        <div className="max-w-md mx-auto mt-6 p-6 rounded-2xl border border-gray-700 bg-gray-900/60 backdrop-blur text-center shadow-lg">
                            <h3 className="text-lg font-semibold text-white">
                                No Download Links Yet
                            </h3>

                            <p className="text-sm text-gray-400 mt-2">
                                This movie is currently unavailable for download.
                                Please check back later.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* ================= TRAILER ================= */}
            {movie.trailer_link ?
                (<div className="my-10 text-center" id="trailer">
                    <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-red-500">
                        Download <span className="text-white">{movie.movie_name}</span> Full Movie Hindi HD | Watch Online Full Trailer
                    </h2>
                    <div className="w-full flex justify-center">
                        <div className="w-full sm:w-[800px] aspect-video">
                            <iframe
                                className="w-full h-full rounded"
                                src={`https://www.youtube-nocookie.com/embed/${movie.trailer_link}`}
                                title="YouTube video player"
                                frameBorder="0"
                                loading="lazy"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>) : (
                    <p className="text-gray-400">Trailer not available.</p>
                )
            }

            {/* ================= RELATED ================= */}
            {related.length > 0 && (
                <div className="max-w-5xl mx-auto mb-12">
                    <h2 className="text-2xl font-bold text-center mb-6 text-amber-500">
                        You May Also Like
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                        {related.map((m) => (
                            <Link key={m.slug} to={`/movie/${m.slug}`} className="group relative overflow-hidden rounded-lg">
                                <img
                                    src={m.posterUrl}
                                    alt={m.movie_name}
                                    className="w-full h-48 sm:h-64 object-cover group-hover:scale-105 transition duration-300"
                                    loading="lazy"
                                    onError={(e) => { e.target.src = 'https://via.placeholder.com/300x450/111/444?text=No+Poster' }}
                                />
                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent pt-10 pb-2 px-2">
                                    <p className="text-xs font-bold text-white truncate drop-shadow-md">
                                        {m.movie_name}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* ================= FOOTER NOTE ================= */}
            <div className="text-center text-gray-500 text-sm max-w-4xl mx-auto">
                Moviela is a movie discovery platform providing information, trailers,
                and references to third-party sources.
            </div>

            {/* <AdBanner /> */}
        </div>
    );
}

function AdminMovieFAB({ movie }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const close = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener("mousedown", close);
        return () => document.removeEventListener("mousedown", close);
    }, []);

    const handleDelete = async () => {
        const confirm = await Swal.fire({
            title: "Delete this movie?",
            text: "This action cannot be undone",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            background: "#000",
            color: "#fff",
        });

        if (!confirm.isConfirmed) return;

        const toastId = toast.loading("Deleting movie...");
        try {
            await axios.delete(`${DB_URL}/api/v1/movie/delete/${movie._id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
                },
            });
            toast.success("Movie deleted", { id: toastId });
            window.location.href = "/";
        } catch {
            toast.error("Delete failed", { id: toastId });
        }
    };

    return (
        <div ref={ref} className="fixed bottom-5 right-6 z-50">
            {open && (
                <div className="absolute right-0 bottom-full mb-3 bg-black border border-white/10 rounded-xl overflow-hidden shadow-xl">
                    <Link
                        to={`/admin/movie/edit/${movie._id}`}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-white/10"
                    >
                        <Pencil size={16} /> Edit
                    </Link>
                    <button
                        onClick={handleDelete}
                        className="flex w-full items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10"
                    >
                        <Trash2 size={16} /> Delete
                    </button>
                </div>
            )}

            <button
                onClick={() => setOpen(!open)}
                className="w-12 h-12 rounded-full bg-yellow-500 text-black flex items-center justify-center shadow-lg"
            >
                <Plus
                    className={`transition-transform duration-200 ${open ? "rotate-45" : ""
                        }`}
                />
            </button>
        </div>
    );
}