import { useEffect, useRef, useState } from "react";
import { Menu, X, ChevronDown, SearchIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logo from "/favicon.ico";
import axios from "axios";

const DB_URL = import.meta.env.VITE_DB_URL;

const genres = [
    "Action", "Drama",
    "Comedy", "Romance",
    "Thriller", "Horror",
    "Sci-Fi", "Adventure",
    "Animation", "Mystery",
    "Sports", "Crime", "History"
];

const movies = ["Latest", "Popular", "Rating"];

const industries = [
    "Bollywood",
    "Hollywood",
    "Tollywood",
    "South",
    "Kollywood",
    "Gujarati",
    "Other",
];

const links = [
    { name: "Home", to: "/" },
    { name: "Movie Request", to: "/movierequest" },
];

export default function Header() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [desktopMenu, setDesktopMenu] = useState(null); // desktop dropdowns
    const [mobileMenu, setMobileMenu] = useState(null);   // mobile accordion
    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showResults, setShowResults] = useState(false);

    const navigate = useNavigate();
    const headerRef = useRef(null);

    const handleSearch = () => {
        if (!query.trim()) return;
        setShowResults(false);
        navigate(`/?search=${encodeURIComponent(query.trim())}`);
        setTimeout(() => {
            setSidebarOpen(false);
            setMobileMenu(null);
        }, 150);
    };

    const closeSidebarAfterNav = () => {
        setShowResults(false);
        setTimeout(() => {
            setSidebarOpen(false);
            setMobileMenu(null);
        }, 150);
    };

    const toggleDesktopMenu = (menu) => {
        setDesktopMenu(desktopMenu === menu ? null : menu);
    };

    const toggleMobileMenu = (menu) => {
        setMobileMenu(mobileMenu === menu ? null : menu);
    };

    // Close desktop dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (headerRef.current && !headerRef.current.contains(e.target)) {
                setDesktopMenu(null);
                setShowResults(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Close everything on ESC
    useEffect(() => {
        const esc = (e) => {
            if (e.key === "Escape") {
                setDesktopMenu(null);
                setMobileMenu(null);
                setSidebarOpen(false);
                setShowResults(false);
            }
        };
        document.addEventListener("keydown", esc);
        return () => document.removeEventListener("keydown", esc);
    }, []);

    // Reset mobile menus when sidebar closes
    useEffect(() => {
        if (!sidebarOpen) {
            setMobileMenu(null);
            setShowResults(false);
        }
    }, [sidebarOpen]);

    // Live search debounce
    useEffect(() => {
        const fetchSearch = async () => {
            if (!query.trim() || query.length < 2) {
                setSearchResults([]);
                return;
            }
            try {
                setIsSearching(true);
                const res = await axios.get(`${DB_URL}/api/v1/movie/getmovie?search=${encodeURIComponent(query.trim())}`);
                setSearchResults(res.data.movies?.slice(0, 5) || []);
            } catch (err) {
                console.error("Search error:", err);
                setSearchResults([]);
            } finally {
                setIsSearching(false);
            }
        };

        const timeoutId = setTimeout(() => {
            fetchSearch();
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [query]);

    return (
        <>
            {/* HEADER */}
            <header
                ref={headerRef}
                className="fixed top-0 w-full z-50 bg-gray-900 border-b border-gray-800"
            >
                {/* TOP BAR */}
                <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
                    {/* LOGO */}
                    <Link to="/" className="flex items-center gap-3">
                        <img src={logo} alt="MovieLa Logo" className="h-9 w-9 rounded-full" />
                        <span className="text-xl font-extrabold text-white">
                            MovieLa
                        </span>
                    </Link>

                    {/* SEARCH (DESKTOP) */}
                    <div className="hidden md:flex w-1/3 relative">
                        <div className="flex w-full bg-gray-700/20 border border-gray-600/30 rounded-xl overflow-hidden focus-within:border-gray-500 transition-colors">
                            <input
                                value={query}
                                onChange={(e) => {
                                    setQuery(e.target.value);
                                    if(e.target.value.length > 0) setShowResults(true);
                                }}
                                onFocus={() => {
                                    if(query.length > 0) setShowResults(true);
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") handleSearch();
                                }}
                                placeholder="Search movies, genres..."
                                className="w-full px-4 py-2 bg-transparent text-white focus:outline-none"
                            />
                            <button
                                onClick={handleSearch}
                                className="px-4 text-gray-300 hover:text-yellow-400 transition"
                            >
                                <SearchIcon size={18} />
                            </button>
                        </div>

                        {/* DESKTOP SEARCH DROPDOWN */}
                        {showResults && (query.trim().length >= 2) && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-[#1a1a1a] border border-gray-700 rounded-xl shadow-2xl overflow-hidden z-50">
                                {isSearching ? (
                                    <div className="p-4 text-center text-gray-400 text-sm">Searching...</div>
                                ) : searchResults.length > 0 ? (
                                    <div className="flex flex-col">
                                        {searchResults.map((m) => (
                                            <Link
                                                key={m._id}
                                                to={`/movie/${m.slug}`}
                                                onClick={() => {
                                                    setShowResults(false);
                                                    setQuery("");
                                                }}
                                                className="flex items-center gap-3 p-3 hover:bg-[#262626] transition border-b border-gray-800"
                                            >
                                                {m.poster && (
                                                    <img src={m.poster} alt={m.movie_name} className="w-10 h-14 object-cover rounded" />
                                                )}
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-semibold text-white truncate">{m.movie_name}</p>
                                                    <p className="text-xs text-gray-400">{m.releaseDate?.substring(0,4)} • {m.type}</p>
                                                </div>
                                            </Link>
                                        ))}
                                        <button 
                                            onClick={handleSearch}
                                            className="p-3 bg-[#111] text-center text-sm text-yellow-500 font-semibold hover:bg-[#1a1a1a] transition"
                                        >
                                            View all results
                                        </button>
                                    </div>
                                ) : (
                                    <div className="p-4 text-center text-gray-400 text-sm">No results found</div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* MOBILE MENU BUTTON */}
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="md:hidden text-white"
                    >
                        <Menu size={26} />
                    </button>
                </div>

                {/* DESKTOP NAV */}
                <nav className="hidden md:flex justify-center gap-8 py-3 text-gray-300">
                    {links.map((link) => (
                        <Link
                            key={link.name}
                            to={link.to}
                            className="hover:text-blue-400 font-medium"
                        >
                            {link.name}
                        </Link>
                    ))}

                    {/* MOVIES */}
                    <div className="relative">
                        <button
                            onClick={() => toggleDesktopMenu("movies")}
                            className="flex items-center gap-1 hover:text-blue-400 font-medium"
                        >
                            Movies
                            <ChevronDown
                                size={16}
                                className={`transition ${desktopMenu === "movies" ? "rotate-180" : ""}`}
                            />
                        </button>

                        {desktopMenu === "movies" && (
                            <div className="absolute left-0 top-8 bg-gray-800 rounded-xl shadow-2xl w-44 overflow-hidden">
                                {movies.map((item) => (
                                    <Link
                                        key={item}
                                        to={`/movie/filter/${item.toLowerCase()}`}
                                        onClick={() => setDesktopMenu(null)}
                                        className="block px-4 py-2 hover:bg-gray-700"
                                    >
                                        {item}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* INDUSTRY */}
                    <div className="relative">
                        <button
                            onClick={() => toggleDesktopMenu("industries")}
                            className="flex items-center gap-1 hover:text-blue-400 font-medium"
                        >
                            Industry
                            <ChevronDown
                                size={16}
                                className={`transition ${desktopMenu === "industries" ? "rotate-180" : ""}`}
                            />
                        </button>

                        {desktopMenu === "industries" && (
                            <div className="absolute left-0 top-8 bg-gray-800 rounded-xl shadow-2xl w-44 overflow-hidden">
                                {industries.map((item) => (
                                    <Link
                                        key={item}
                                        to={`/movie/filter/${item.toLowerCase()}`}
                                        onClick={() => setDesktopMenu(null)}
                                        className="block px-4 py-2 hover:bg-gray-700"
                                    >
                                        {item}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* GENRES */}
                    <div className="relative">
                        <button
                            onClick={() => toggleDesktopMenu("genres")}
                            className="flex items-center gap-1 hover:text-blue-400 font-medium"
                        >
                            Genres
                            <ChevronDown
                                size={16}
                                className={`transition ${desktopMenu === "genres" ? "rotate-180" : ""}`}
                            />
                        </button>

                        {desktopMenu === "genres" && (
                            <div className="absolute left-0 top-8 bg-gray-800 rounded-xl shadow-2xl w-44 overflow-hidden">
                                {genres.map((category) => (
                                    <Link
                                        key={category}
                                        to={`/movie/category/${category.toLowerCase()}`}
                                        onClick={() => setDesktopMenu(null)}
                                        className="block px-4 py-2 hover:bg-gray-700"
                                    >
                                        {category}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </nav>
            </header>

            {/* MOBILE SIDEBAR */}
            <div
                className={`fixed inset-0 z-50 bg-black/60 transition-opacity ${sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
            >
                <aside
                    className={`fixed left-0 top-0 h-full w-3/4 bg-gray-900 transform transition-transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                        }`}
                >
                    {/* HEADER */}
                    <div className="flex items-center justify-between px-4 py-4 border-b border-gray-800">
                        <div className="flex items-center gap-3">
                            <img src={logo} alt="Logo" className="h-8 w-8 rounded-full" />
                            <span className="text-lg font-bold text-white">MovieLa</span>
                        </div>
                        <button onClick={() => setSidebarOpen(false)}>
                            <X className="text-white" size={24} />
                        </button>
                    </div>

                    {/* MOBILE SEARCH */}
                    <div className="px-4 py-4 relative">
                        <div className="flex bg-gray-700/20 border border-gray-600/30 rounded-xl overflow-hidden">
                            <input
                                value={query}
                                onChange={(e) => {
                                    setQuery(e.target.value);
                                    if(e.target.value.length > 0) setShowResults(true);
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") handleSearch();
                                }}
                                placeholder="Search movies..."
                                className="w-full px-4 py-2 bg-transparent text-white focus:outline-none"
                            />
                            <button onClick={handleSearch} className="px-4 text-white hover:text-yellow-400">
                                <SearchIcon size={18} />
                            </button>
                        </div>
                        
                        {/* MOBILE SEARCH DROPDOWN */}
                        {showResults && (query.trim().length >= 2) && (
                            <div className="absolute top-full mt-1 left-4 right-4 bg-[#1a1a1a] border border-gray-700 rounded-xl shadow-2xl overflow-hidden z-50">
                                {isSearching ? (
                                    <div className="p-4 text-center text-gray-400 text-sm">Searching...</div>
                                ) : searchResults.length > 0 ? (
                                    <div className="flex flex-col">
                                        {searchResults.map((m) => (
                                            <Link
                                                key={m._id}
                                                to={`/movie/${m.slug}`}
                                                onClick={() => {
                                                    setShowResults(false);
                                                    setSidebarOpen(false);
                                                    setQuery("");
                                                }}
                                                className="flex items-center gap-3 p-3 hover:bg-[#262626] border-b border-gray-800"
                                            >
                                                {m.poster && (
                                                    <img src={m.poster} alt={m.movie_name} className="w-10 h-14 object-cover rounded" />
                                                )}
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-semibold text-white truncate">{m.movie_name}</p>
                                                    <p className="text-xs text-gray-400">{m.releaseDate?.substring(0,4)} • {m.type}</p>
                                                </div>
                                            </Link>
                                        ))}
                                        <button 
                                            onClick={handleSearch}
                                            className="p-3 bg-[#111] w-full text-center text-sm text-yellow-500 font-semibold hover:bg-[#1a1a1a] transition"
                                        >
                                            View all results
                                        </button>
                                    </div>
                                ) : (
                                    <div className="p-4 text-center text-gray-400 text-sm">No results found</div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* MOBILE NAV */}
                    <div className="px-6 py-4 space-y-6 overflow-y-auto">
                        {links.map((link) => (
                            <Link
                                key={link.name}
                                to={link.to}
                                onClick={closeSidebarAfterNav}
                                className="block text-gray-200 font-medium"
                            >
                                {link.name}
                            </Link>
                        ))}

                        {/* MOVIES */}
                        <div>
                            <button
                                onClick={() => toggleMobileMenu("movies")}
                                className="w-full flex justify-between text-gray-300 font-semibold"
                            >
                                Movies
                                <ChevronDown
                                    className={`transition ${mobileMenu === "movies" ? "rotate-180" : ""}`}
                                />
                            </button>
                            {mobileMenu === "movies" && (
                                <div className="mt-2 ml-3 space-y-2">
                                    {movies.map((item) => (
                                        <Link
                                            key={item}
                                            to={`/movie/filter/${item.toLowerCase()}`}
                                            onClick={closeSidebarAfterNav}
                                            className="block text-gray-400"
                                        >
                                            {item}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* INDUSTRY */}
                        <div>
                            <button
                                onClick={() => toggleMobileMenu("industries")}
                                className="w-full flex justify-between text-gray-300 font-semibold"
                            >
                                Industry
                                <ChevronDown
                                    className={`transition ${mobileMenu === "industries" ? "rotate-180" : ""}`}
                                />
                            </button>
                            {mobileMenu === "industries" && (
                                <div className="mt-2 ml-3 space-y-2">
                                    {industries.map((item) => (
                                        <Link
                                            key={item}
                                            to={`/movie/filter/${item.toLowerCase()}`}
                                            onClick={closeSidebarAfterNav}
                                            className="block text-gray-400"
                                        >
                                            {item}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* GENRES */}
                        <div>
                            <button
                                onClick={() => toggleMobileMenu("genres")}
                                className="w-full flex justify-between text-gray-300 font-semibold"
                            >
                                Genres
                                <ChevronDown
                                    className={`transition ${mobileMenu === "genres" ? "rotate-180" : ""}`}
                                />
                            </button>
                            {mobileMenu === "genres" && (
                                <div className="mt-2 ml-3 space-y-2">
                                    {genres.map((category) => (
                                        <Link
                                            key={category}
                                            to={`/movie/category/${category.toLowerCase()}`}
                                            onClick={closeSidebarAfterNav}
                                            className="block text-gray-400"
                                        >
                                            {category}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </aside>
            </div>

            {/* HEADER SPACER */}
            <div className="h-13 md:h-26" />
        </>
    );
}