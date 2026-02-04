import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { SkeletonCard } from "../Skeleton";
import { Download } from "lucide-react";
import { Helmet } from "react-helmet";
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
                <title>{`${filter.charAt(0).toUpperCase() + filter.slice(1)} Movies - Watch & Download Free HD`}</title>
                <meta name="description" content={`Enjoy the best collection of ${filter} movies. Stream or download HD movies online for free, only on Moviela.`} />
                <meta name="keywords" content={`${filter} movies, download ${filter} movies, watch ${filter} films, free ${filter} HD movies`} />
            </Helmet>

            <div className="max-w-7xl mx-auto">

                {/* Breadcrumb */}
                <nav className="text-sm text-gray-400 mb-3">
                    <Link to="/" className="text-gray-400">Home</Link>
                    <span className="mx-2">/</span>
                    <span className="text-white font-medium">
                        {filter.charAt(0).toUpperCase() + filter.slice(1).toLowerCase()}
                    </span>
                </nav>

                {/* Title */}
                <h2 className="text-xl font-bold mb-4">
                    🎬 <span className="text-yellow-500">
                        {filter.charAt(0).toUpperCase() + filter.slice(1).toLowerCase()}
                    </span>{" "} Movies
                </h2>

                {/* Movies Grid */}
                {movies.length === 0 ? (
                    // No Movie Found
                    <div className="text-center py-10">
                        <p className="text-gray-400 mb-4 text-lg">
                            😔 Sorry! No <span className="text-yellow-400 font-semibold">{filter}</span> movies found.
                        </p>

                        {/* Call-to-action links */}
                        <div className="flex flex-wrap justify-center gap-3">
                            <Link
                                to="/movie/filter/popular"
                                className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition"
                            >
                                Browse Popular Movies
                            </Link>
                            <Link
                                to="/movie/filter/latest"
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-400 transition"
                            >
                                See Latest Releases
                            </Link>
                        </div>

                        <p className="mt-6 text-sm text-gray-300 max-w-lg mx-auto">
                            Explore trending, latest, and top-rated movies across Bollywood, Hollywood, Tollywood, and more.
                            Stay entertained with the best HD movie downloads and streaming experience.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-6">
                        {movies.map((movie, index) => (
                            <div
                                key={index}
                                className="relative bg-[#1a1a1a] rounded-2xl group overflow-hidden border border-[#2a2a2a] hover:border-yellow-500 shadow-md hover:shadow-yellow-500/30 transition-all duration-300"
                            >
                                <Link to={`/movie/${movie.slug}`}>
                                    <div className="relative w-full aspect-[2/3] overflow-hidden">
                                        <img
                                            src={movie.posterUrl}
                                            alt={movie.movie_name}
                                            loading="lazy"
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