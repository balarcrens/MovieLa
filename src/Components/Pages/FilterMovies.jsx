import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { SkeletonCard } from "../Skeleton";
import { ChevronRight, Download, SearchX } from "lucide-react";
import { Helmet } from "react-helmet-async";
import Skeleton from "../UI/skeleton";
// import AdBanner from "../AdBanner";

const DB_URL = import.meta.env.VITE_DB_URL;

export default function FilterMovies() {
    const { filter } = useParams();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setMovies([]);

        let params = {};
        if (["latest", "popular", "rating"].includes(filter.toLowerCase())) {
            params.sortBy = filter.toLowerCase();
        } else {
            params.industry = filter.charAt(0).toUpperCase() + filter.slice(1).toLowerCase();
        }

        axios.get(`${DB_URL}/api/v1/movie/filter`, { params })
            .then(res => {
                setMovies(res.data.movies || []);
                setLoading(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
            })
            .catch(() => setLoading(false));
    }, [filter]);

    if (loading) {
        return (
            <div className="bg-[#0f0f0f] min-h-screen py-5 px-2 sm:px-4 text-white">
                <div className="max-w-7xl mx-auto mb-5">
                    <Skeleton className="h-4 w-28" />
                </div>
                <div className="max-w-7xl mx-auto mb-5">
                    <Skeleton className="h-6 w-44" />
                </div>
                <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-6">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <SkeletonCard key={i} />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#0f0f0f] min-h-screen py-5 px-2 sm:px-4 text-white">
            <Helmet>
                {/* Title */}
                <title>
                    {`${filter.charAt(0).toUpperCase() + filter.slice(1)} Movies Download & Watch Online in HD | Moviela`}
                </title>

                {/* Description */}
                <meta name="description"
                    content={`Browse and watch the latest ${filter} movies in HD quality. Explore top-rated ${filter} films, cast details, storylines and download options on Moviela.`}
                />

                {/* Robots */}
                <meta name="robots" content="index, follow" />

                {/* Canonical */}
                <link rel="canonical"
                    href={`https://moviela.vercel.app/movie/filter/${filter}`}
                />

                {/* Open Graph */}
                <meta property="og:title"
                    content={`${filter.charAt(0).toUpperCase() + filter.slice(1)} Movies | Moviela`}
                />
                <meta property="og:description"
                    content={`Watch and download the best ${filter} movies online in HD quality on Moviela.`}
                />
                <meta property="og:url"
                    content={`https://moviela.vercel.app/movie/filter/${filter}`}
                />
                <meta property="og:type" content="website" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
            </Helmet>

            <div className="max-w-7xl mx-auto">

                {/* Breadcrumb */}
                <div className="mx-auto mb-3 flex items-center text-sm text-gray-400 gap-2">
                    <Link to="/" className="hover:text-white">Home</Link>
                    <ChevronRight size={14} />
                    <span className="text-white font-medium">
                        {filter.charAt(0).toUpperCase() + filter.slice(1).toLowerCase()}
                    </span>
                </div>

                {/* Title */}
                <h1 className="text-xl font-bold mb-4">
                    🎬 <span className="text-yellow-500">
                        {filter.charAt(0).toUpperCase() + filter.slice(1).toLowerCase()}
                    </span>{" "} Movies
                </h1>

                {/* Movies Grid */}
                {movies.length === 0 ? (
                    // No Movie Found
                    <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-[#1a1a1a] rounded-2xl border border-gray-800 shadow-xl my-6">
                        <div className="w-20 h-20 bg-gray-800/50 rounded-full flex items-center justify-center mb-5">
                            <SearchX size={40} className="text-gray-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">No Movies Found</h3>
                        <p className="text-gray-400 max-w-md mb-6">
                            We couldn't find any <span className="text-yellow-400 font-semibold">{filter}</span> movies right now. Try exploring different categories or checking out our latest releases.
                        </p>
                        <div className="flex gap-4">
                            <Link to="/" className="px-6 py-2 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition">
                                Home
                            </Link>
                            <Link to="/movie/filter/popular" className="px-6 py-2 bg-[#222] text-white font-semibold rounded-lg hover:bg-[#333] transition border border-gray-700">
                                View Popular
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-6">
                        {movies.map((movie, index) => (
                            <div
                                key={index}
                                className="relative bg-[#1a1a1a] rounded-2xl group overflow-hidden border border-[#2a2a2a] hover:border-yellow-500 shadow-md hover:shadow-yellow-500/30 transition-all duration-300"
                            >
                                <Link to={`/movie/${movie.slug}`} state={{
                                    from: "filter",
                                    label: filter.toLowerCase(),
                                    path: `/movie/filter/${filter.toLowerCase()}`
                                }}>
                                    <div className="relative w-full aspect-[2/3] overflow-hidden">
                                        <img
                                            src={movie.posterUrl}
                                            alt={movie.movie_name}
                                            loading="lazy"
                                            decoding="async"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent"></div>
                                        <div className="absolute bottom-2 left-2 right-2 flex flex-wrap gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            {movie.categories?.map((category, i) => (
                                                <span key={i} className="px-1.5 py-1 text-xs text-white bg-white/20 backdrop-blur-sm rounded-md">
                                                    {category}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="p-4 text-sm space-y-2">
                                        <p className="font-semibold text-white leading-tight line-clamp-2">
                                            {movie.movie_name}
                                        </p>
                                        <p className="text-gray-400 text-xs leading-snug line-clamp-2">
                                            {movie.description}
                                        </p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-yellow-400 text-xs font-semibold">
                                                {movie.rating === 0 ? "N/A" : movie.rating} / 10 ⭐
                                            </span>
                                            <Download size={14} />
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* <AdBanner /> */}
        </div>
    );
}