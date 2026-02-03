import { Link, useSearchParams } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from "react";
import { SkeletonCard } from "../Skeleton";
import { Download } from "lucide-react";
import AdBanner from "../AdBanner";

const DB_URL = import.meta.env.VITE_DB_URL;

const Home = () => {
    return (
        <div className="bg-[#0f0f0f] min-h-screen py-5 px-2 sm:px-4 text-white">
            <MovieCards />
            {/* <AdBanner /> */}
        </div>
    );
};

const MovieCards = () => {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const [searchParams] = useSearchParams();
    const query = searchParams.get("search");

    useEffect(() => {
        setIsLoading(true);

        axios
            .get(`${DB_URL}/api/v1/movie/getmovie?page=${page}&limit=20${query ? `&search=${query}` : ""}`)
            .then((res) => {
                setMovies(res.data.movies);
                setTotalPages(res.data.totalPages);
                setIsLoading(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
            })
            .catch((err) => {
                console.error("Error fetching movies:", err.message);
                setIsLoading(false);
            });
    }, [page, query]);

    return (
        <div className="max-w-7xl mx-auto">
            <nav className="text-sm text-gray-400 mb-4">
                <Link to="/" className="hover:text-white">Home</Link> /
                <span className="ml-1">Movies</span>
            </nav>

            {/* Movies Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-6">
                {isLoading
                    ? Array.from({ length: 20 }).map((_, i) => <SkeletonCard key={i} />)
                    : movies.map((movie, index) => (
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

            {/* Pagination Controls */}
            <div className="flex justify-center items-center gap-4 mt-6">
                <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="px-4 py-2 bg-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-600"
                >
                    Prev
                </button>

                <span className="text-gray-300">
                    Page {page} of {totalPages}
                </span>

                <button
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                    className="px-4 py-2 bg-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-600"
                >
                    Next
                </button>
            </div>
        </div>
    );
};


export default Home;
