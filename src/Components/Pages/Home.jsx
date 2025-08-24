import { Link, useSearchParams } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from "react";
import Loader from "../Loader";
import { Download } from "lucide-react";
import AdBanner from '../AdBanner'

const DB_URL = import.meta.env.VITE_DB_URL;

const Home = () => {
    return (
        <div className="bg-[#0f0f0f] min-h-screen py-5 px-2 sm:px-4 text-white">
            <div className="max-w-7xl mx-auto text-center mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                    Find Your Next <span className="text-yellow-400">Favourite Movie</span>
                </h1>
                <p className="text-gray-400 mt-2">
                    Search, browse, and download the latest movies & web series instantly.
                </p>
            </div>
            <MovieCards />
            <AdBanner />
        </div>
    );
};

const MovieCards = () => {
    const [movies, setMovies] = useState([]);
    const [searchParams] = useSearchParams();
    const query = searchParams.get("search");
    const [isloading, setisLoading] = useState(false);

    useEffect(() => {
        setisLoading(true);
        axios
            .get(`${DB_URL}/api/v1/movie/getmovie${query ? `?search=${query}` : ""}`)
            .then((res) => {
                setMovies(res.data.movies);
                setisLoading(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
            })
            .catch((err) => {
                console.error("Error fetching movies:", err.message);
                setisLoading(false);
            });
    }, [query]);

    if (isloading) {
        return <Loader />;
    }

    return (
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-6">
                {movies.map((movie, index) => (
                    <div
                        key={index}
                        className="relative bg-[#1a1a1a] rounded-2xl group overflow-hidden border border-[#2a2a2a] hover:border-yellow-500 shadow-md hover:shadow-yellow-500/30 transition-all duration-300"
                    >
                        <Link to={`/movie/${movie._id}`}>
                            {/* Poster */}
                            <div className="relative w-full aspect-[2/3] overflow-hidden">
                                <img
                                    src={movie.posterUrl}
                                    alt={movie.movie_name}
                                    loading="lazy"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />

                                {/* Gradient overlay */}
                                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent"></div>

                                <div className="absolute bottom-2 left-2 right-2 flex flex-wrap gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    {movie.categories?.map((category, i) => (
                                        <span key={i}
                                            className="px-1.5 py-1 text-xs text-white bg-white/20 backdrop-blur-sm rounded-md"
                                        >
                                            {category}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Details */}
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
        </div>
    );
};

export default Home;
