import { Link, useSearchParams } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from "react";
import { SkeletonCard } from "../Skeleton";
import { ChevronRight, Download, SearchX } from "lucide-react";
import { Helmet } from "react-helmet-async";
// import AdBanner from "../AdBanner";

const DB_URL = import.meta.env.VITE_DB_URL;

const Home = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    
    return (
        <>
            <Helmet>
                {/* Primary SEO */}
                <title>Moviela – Download & Watch Latest Movies in HD</title>
                <meta
                    name="description"
                    content="Moviela lets you explore, watch and download the latest Bollywood, Hollywood and regional movies in HD quality. Browse by category, rating and release year."
                />

                {/* Robots */}
                <meta name="robots" content="index, follow" />

                {/* Canonical */}
                <link rel="canonical" href="https://moviela.vercel.app/" />

                {/* Open Graph */}
                <meta property="og:title" content="Moviela – Latest Movies Download & Watch Online" />
                <meta property="og:description" content="Browse the latest movies, top rated films and popular categories on Moviela." />
                <meta property="og:url" content="https://moviela.vercel.app/" />
                <meta property="og:type" content="website" />

                {/* Optional: Twitter */}
                <meta name="twitter:card" content="summary_large_image" />

                {/* Sitelinks Search Box Schema */}
                <script type="application/ld+json">
                    {`
                    {
                      "@context": "https://schema.org",
                      "@type": "WebSite",
                      "name": "Moviela",
                      "url": "https://moviela.vercel.app/",
                      "potentialAction": {
                        "@type": "SearchAction",
                        "target": "https://moviela.vercel.app/?search={search_term_string}",
                        "query-input": "required name=search_term_string"
                      }
                    }
                    `}
                </script>
            </Helmet>

            <h1 className="sr-only">Moviela - Download & Watch Latest Movies in HD</h1>

            <div className="bg-[#0f0f0f] min-h-screen pb-10 text-white">
                {!searchParams.get("search") && <TopCarousel />}
                <div className="px-2 sm:px-4">
                    <MovieCards searchParams={searchParams} setSearchParams={setSearchParams} />
                </div>
            </div>
        </>
    );
};

const TopCarousel = () => {
    const [carouselMovies, setCarouselMovies] = useState([]);

    useEffect(() => {
        axios.get(`${DB_URL}/api/v1/movie/getmovie?page=1&limit=20`)
            .then(res => setCarouselMovies(res.data.movies))
            .catch(err => console.log(err));
    }, []);

    if (carouselMovies.length === 0) return null;

    // Create a double array for seamless loop
    const doubled = [...carouselMovies, ...carouselMovies];

    return (
        <div className="w-full overflow-hidden py-5 bg-[#141414] border-b border-[#222]">
            <h2 className="text-xl font-bold text-yellow-500 mb-4 px-4 sm:px-8 max-w-7xl mx-auto flex items-center gap-2">
                🔥 Trending Now
            </h2>
            <div className="flex animate-scrollX gap-4 px-4">
                {doubled.map((movie, idx) => (
                    <Link key={idx} to={`/movie/${movie.slug}`} className="flex-shrink-0 w-32 sm:w-44 relative group border border-gray-800 rounded-xl overflow-hidden shadow-lg bg-black">
                        <img 
                            src={movie.posterUrl} 
                            alt={movie.movie_name} 
                            className="w-full h-48 sm:h-64 object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition duration-500"
                            onError={(e) => { e.target.src = 'https://via.placeholder.com/300x450/11:444?text=No+Poster' }}
                            loading="lazy"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent pt-10 pb-3 px-3">
                            <p className="text-xs sm:text-sm font-bold text-white truncate drop-shadow-md">
                                {movie.movie_name}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

const MovieCards = ({ searchParams, setSearchParams }) => {
    const [movies, setMovies] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const query = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1", 10);

    useEffect(() => {
        setIsLoading(true);

        axios
            .get(`${DB_URL}/api/v1/movie/getmovie?page=${page}&limit=20${query ? `&search=${query}` : ""}`)
            .then((res) => {
                setMovies(res.data.movies);
                setTotalPages(res.data.totalPages);
                setIsLoading(false);
                setError(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
            })
            .catch((err) => {
                console.error("Error fetching movies:", err.message);
                setIsLoading(false);
                setError(true);
            });
    }, [page, query]);

    if (error) {
        return (
            <div className="max-w-md mx-auto mt-20 p-8 rounded-2xl border border-red-500/20 bg-[#1a1a1a] shadow-2xl text-center">
                <h3 className="text-2xl font-bold text-red-500 mb-3">Network Error</h3>
                <p className="text-gray-400 mb-6">Failed to connect to the Moviela servers. Please check your connection or try again later.</p>
                <button onClick={() => window.location.reload()} className="px-6 py-2 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition">
                    Retry Connection
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto py-4">
            <div className="mx-auto mb-3 flex items-center text-sm text-gray-400 gap-2">
                <p className="hover:text-white">Home</p>
                <ChevronRight size={14} />
                <p className="hover:text-white">Movies</p>
            </div>

            {/* Movies Grid */}
            {!isLoading && movies.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-[#1a1a1a] rounded-2xl border border-gray-800 shadow-xl my-6">
                    <div className="w-20 h-20 bg-gray-800/50 rounded-full flex items-center justify-center mb-5">
                        <SearchX size={40} className="text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">No Movies Found</h3>
                    <p className="text-gray-400 max-w-md mb-6">
                        {query ? `We couldn't find any movies matching "${query}".` : "No movies are currently available."} Try searching with different keywords or explore our popular releases.
                    </p>
                    <div className="flex gap-4">
                        {query && (
                            <button onClick={() => setSearchParams({})} className="px-6 py-2 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition">
                                Clear Search
                            </button>
                        )}
                        <Link to="/movie/filter/popular" className="px-6 py-2 bg-[#222] text-white font-semibold rounded-lg hover:bg-[#333] transition border border-gray-700">
                            View Popular
                        </Link>
                    </div>
                </div>
            ) : (
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
                                        decoding="async"
                                        onError={(e) => { e.target.src = 'https://via.placeholder.com/300x450/111/444?text=No+Poster' }}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent"></div>
                                    <div className="absolute bottom-2 left-2 right-2 flex flex-wrap gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        {/* <p className="font-semibold text-xs text-white w-full leading-tight ml-1 line-clamp-2">
                                            {movie.movie_name}
                                        </p> */}
                                        {movie.categories?.map((category, i) => (
                                            <span key={i} className="px-1.5 py-1 text-xs text-white bg-white/20 backdrop-blur-sm rounded-md">
                                                {category}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-4 text-sm space-y-2">
                                    <p className="font-semibold text-white leading-tight line-clamp-1">
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

            {/* Pagination Controls */}
            {(!isLoading && totalPages > 1 && movies.length > 0) && (
                <div className="flex justify-center items-center gap-4 mt-6">
                    <button
                        disabled={page <= 1}
                        onClick={() => setSearchParams(prev => { prev.set("page", page - 1); return prev; })}
                        className="px-4 py-2 bg-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-600 transition"
                    >
                        Prev
                    </button>

                    <span className="text-gray-300 font-medium">
                        Page {page} of {totalPages}
                    </span>

                    <button
                        disabled={page >= totalPages}
                        onClick={() => setSearchParams(prev => { prev.set("page", page + 1); return prev; })}
                        className="px-4 py-2 bg-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-600 transition"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};


export default Home;
