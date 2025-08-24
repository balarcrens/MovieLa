import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { ChevronRight, Download, Film } from 'lucide-react';
import Loader from "../Loader";
import AdBanner from "../AdBanner";

const DB_URL = import.meta.env.VITE_DB_URL;

export default function MovieDetail() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        axios.get(`${DB_URL}/api/v1/movie/${id}`).then((res) => {
            setMovie(res.data.movie);
        });
    }, [id]);

    if (!movie) {
        return <Loader />;
    }

    return (
        <div className="bg-black min-h-screen text-white px-2 sm:px-4 py-8">
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
                    <img
                        src={movie.posterUrl}
                        alt={movie.movie_name}
                        className="relative z-10 rounded object-cover max-h-[500px] sm:h-[500px]"
                    />
                </div>

                <Link
                    to={`https://t.me/movieladownloadbot?start=${movie.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-blue-400 font-bold text-2xl"
                >
                    [ How To Download <Download className="inline-block mb-1.5" /> ]
                </Link>
            </div>

            {/* Movie Info */}
            <div className="border-t border-gray-700 py-4 max-w-4xl mx-auto text-center">
                <h1 className="text-2xl font-bold mb-2">
                    {movie.movie_name} <span className="text-xl">(Full Movie)</span>
                </h1>
                <div className="text-[#A3A3A3]">
                    <p><span className="text-lg">IMDb Rating:</span> <span className="text-yellow-400">{movie.rating || "N/A"}</span>/10</p>
                    <p><span className="text-lg">Genre:</span> {movie.categories?.join(", ") || "N/A"}</p>
                    <p><span className="text-lg">Stars:</span> {movie.actors || "N/A"}</p>
                    <p><span className="text-lg">Director:</span> {movie.director || "N/A"}</p>
                    <p><span className="text-lg">Language:</span> {movie.language || "Hindi (ORG-2.0)"}</p>
                    <p><span className="text-lg">Quality:</span> {movie.quality || "HD 720p"}</p>
                </div>
            </div>

            {/* Describe Section */}
            <div className="border-t border-gray-700 py-4 max-w-4xl mx-auto text-center">
                {/* Description */}
                <div className="flex flex-col my-5">
                    <h1 className="text-lg sm:text-xl font-bold">
                        Download {movie.movie_name} Full Movie <span className="text-red-500"> - Description - </span>
                    </h1>
                    <div className="text-[#A3A3A3] text-sm">
                        DESCRIPTION : {movie.description}
                    </div>
                </div>

                {/* Story Line */}
                <div className="flex flex-col my-5">
                    <h1 className="text-lg sm:text-xl font-bold">
                        Download {movie.movie_name} Full Movie <span className="text-red-500"> - Story Line - </span>
                    </h1>
                    <div className="text-[#A3A3A3] text-sm">
                        STORY LINE : {movie.summary}
                    </div>
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
                                    alt={`Screenshot ${index + 1}`}
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
            <div className="mt-10 text-center">
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
            </div>

            <AdBanner />
        </div>
    );
}