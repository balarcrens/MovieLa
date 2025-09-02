import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { ChevronRight, Download, Film } from 'lucide-react';
import Loader from "../Loader";
import AdBanner from "../AdBanner";
import { Helmet } from "react-helmet"

const DB_URL = import.meta.env.VITE_DB_URL;

export default function MovieDetail() {
    const { slug } = useParams();
    const [movie, setMovie] = useState(null);
    const [related, setRelated] = useState([]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        axios.get(`${DB_URL}/api/v1/movie/slug/${slug}`).then((res) => {
            const data = res.data.movie;
            setMovie(data);

            if (data.categories && data.categories.length > 0) {
                axios
                    .get(`${DB_URL}/api/v1/movie/category/${data.categories[0]}`)
                    .then((res2) => {
                        const filtered = res2.data.movies
                            .filter((m) => m.slug !== data.slug) // remove same movie
                            .slice(0, 5); // take only 5
                        setRelated(filtered);
                    });
            }
        });
    }, [slug]);

    if (!movie) {
        return <Loader />;
    }

    return (
        <div className="bg-black min-h-screen text-white px-2 sm:px-4 py-8">
            <Helmet>
                <title>{movie.movie_name} - Download HD Movie | Enjoy</title>
                <meta name="description" content={movie.description} />
                <meta name="keywords" content={movie.keywords?.join(", ")} />
            </Helmet>

            <div className="max-w-4xl mx-auto mb-6 text-sm flex items-center space-x-2 text-gray-400">
                <Link to="/" className="hover:text-white font-medium">
                    Home
                </Link>
                <ChevronRight size={16} className="text-gray-500" />
                <span className="text-white font-semibold">{movie.movie_name}</span>
            </div>

            {/* Title and Poster */}
            <div className="text-center mb-6">
                <p className="font-bold py-2 bg-[#141414] rounded max-w-4xl mx-auto italic text-2xl mb-2">
                    <Film className="inline-block mb-1.5" /> Download {movie.movie_name} ({movie.releaseDate || "2025"}) Hindi [{movie.quality || "HD"}]
                </p>
                <p className="text-blue-400 italic text-xl sm:text-2xl font-semibold">
                    Watch {movie.movie_name} Full Movie in Hindi Download Free on{" "}
                    <Link to="/" className="text-blue-500 font-bold underline">MovieLa</Link> !
                </p>

                <div className="relative group w-fit mx-auto my-4 max-h-[500px] sm:h-[500px]">
                    {/* Backdrop on hover */}
                    <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 group-hover:scale-107 transition-all duration-500 bg-cover bg-center blur-sm brightness-50 rounded"
                        style={{ backgroundImage: `url(${movie.posterUrl})` }}
                    ></div>

                    {/* Poster image */}
                    <img src={movie.posterUrl}
                        alt={`${movie.movie_name} Poster`}
                        className="relative z-10 rounded object-cover max-h-[500px] sm:h-[500px]"
                    />
                </div>

                {/* How to Downlaod link */}
                <Link
                    to={`/movie/how-to-download`}
                    rel="noopener noreferrer"
                    className="block text-blue-400 font-bold text-2xl"
                >
                    [ How To Download <Download className="inline-block mb-1.5" /> ]
                </Link>
            </div>

            {/* Movie Info Section */}
            <div className="border-t border-gray-700 py-6 max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-4 text-center">
                    {movie.movie_name} <span className="text-xl">(Full Movie Details)</span>
                </h1>

                <div className="grid sm:grid-cols-2 gap-4 text-[#A3A3A3] text-sm p-4 rounded-lg shadow">
                    <p><span className="font-semibold text-white">IMDb Rating:</span> ⭐ {movie.rating || "N/A"}/10</p>
                    <p><span className="font-semibold text-white">Genre:</span> {movie.categories?.join(", ") || "N/A"}</p>
                    <p><span className="font-semibold text-white">Stars:</span> {movie.actors?.join(", ") || "N/A"}</p>
                    <p><span className="font-semibold text-white">Director:</span> {movie.director || "N/A"}</p>
                    <p><span className="font-semibold text-white">Release Date:</span> {movie.releaseDate || "N/A"}</p>
                    <p><span className="font-semibold text-white">Duration:</span> {movie.duration || "N/A"}</p>
                    <p><span className="font-semibold text-white">Language:</span> {movie.language || "Hindi (ORG-2.0)"}</p>
                    <p><span className="font-semibold text-white">Quality:</span> {movie.quality || "HD 720p"}</p>
                    <p><span className="font-semibold text-white">File Size:</span> {movie.size || "N/A"}</p>
                </div>
            </div>

            {/* Describe Section */}
            <div className="border-t border-gray-700 py-4 max-w-4xl mx-auto text-center">
                {/* Description */}
                <div className="border-t border-gray-700 py-6 max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold text-center mb-3">📖 Movie Description</h2>
                    <p className="text-[#A3A3A3] leading-relaxed text-sm">
                        {movie.description || "No description available. Stay tuned for updates!"}
                    </p>
                </div>

                {/* Story Line */}
                <div className="border-t border-gray-700 py-6 max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold text-center mb-3">🎬 Storyline</h2>
                    <p className="text-[#A3A3A3] leading-relaxed text-sm">
                        {movie.summary || "No storyline has been provided for this movie yet."}
                    </p>
                </div>
            </div>

            {/* Screenshots */}
            {movie.screenshots?.length > 0 && (
                <>
                    <h2 className="text-lg font-semibold text-center py-2 border-t-3 flex flex-col border-gray-700 text-white mb-2">
                        <span className="text-amber-600 text-xl sm:text-3xl">[ SCREENSHOTS ]</span>
                    </h2>
                    <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-4">
                        {movie.screenshots.map((url, index) => (
                            <div key={index} className="flex justify-center items-center">
                                <img
                                    src={url}
                                    alt={`${movie.movie_name} Screenshot ${index + 1}`}
                                    className="rounded-sm transition-transform duration-300"
                                    loading="lazy"
                                />
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* Download Section */}
            <div className="mt-6 text-center">
                <div className="space-y-2 max-w-4xl mx-auto">
                    <h2 className="text-lg font-semibold py-2 border-t-3 flex flex-col border-gray-700 text-white mb-2">
                        <span className="text-amber-600 text-xl sm:text-3xl">[ DOWNLOAD LINKS ]</span>
                        <span className="text-white">Download {movie.movie_name} Full Movie in Hindi | HD</span>
                    </h2>
                    <div className="text-blue-400 py-2 border-y-3 border-gray-700 font-bold text-2xl">
                        <Link
                            to={`https://t.me/movieladownloadbot?start=${movie.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {movie.movie_name} 720p x264 [{movie.size}]
                        </Link>
                    </div>
                </div>
            </div>

            {/* Trailer */}
            {movie.trailer_link ?
                (<div className="mt-10 text-center">
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
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>) : (
                    <p className="text-gray-400">Trailer not available.</p>
                )
            }

            {/* Review Section */}
            {movie.review && (
                <div className="border-t text-center border-gray-700 py-6 max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold text-center mb-3">⭐ Review</h2>
                    <p className="text-[#A3A3A3] leading-relaxed text-sm">{movie.review}</p>
                </div>
            )}

            {/* Keywords / Tags Section */}
            {movie.keywords?.length > 0 && (
                <div className="border-t border-gray-700 py-6 max-w-4xl mx-auto text-center">
                    <h2 className="text-xl font-bold mb-2">🏷️ Tags & Keywords</h2>
                    <div className="flex flex-wrap gap-2 justify-center">
                        {movie.keywords.map((keyword, i) => (
                            <span key={i} className="bg-gray-800 text-gray-300 px-3 py-1 text-sm rounded-full">
                                {keyword}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {related.length > 0 && (
                <div className="border-t border-gray-700 py-8 max-w-5xl mx-auto">
                    <h2 className="text-2xl font-bold mb-4 text-center text-amber-500">
                        🎥 You May Also Like
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                        {related.map((m) => (
                            <Link key={m.slug} to={`/movie/slug/${m.slug}`} className="block group">
                                <div className="overflow-hidden rounded-lg shadow-md">
                                    <img
                                        src={m.posterUrl}
                                        alt={m.movie_name}
                                        className="w-full h-75 object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <p className="mt-2 group-hover:text-white text-gray-400">
                                    {m.movie_name}
                                </p>
                                <p className="mt-2 text-sm leading-snug line-clamp-2 group-hover:text-white/70 text-gray-400">
                                    {m.description}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            <div className="max-w-4xl mx-auto text-center mt-8 text-gray-400 text-sm leading-relaxed">
                <p>
                    <span className="text-white font-semibold">MovieLa</span> brings you the latest Bollywood, Hollywood, and South Indian movies.
                    Browse by category, rating, and enjoy high-quality streaming and downloads in 720p.
                </p>
            </div>

            <div className="my-6">
                <AdBanner />
            </div>
        </div>
    );
}