import { useEffect, useRef, useState } from "react";
import { Menu, X, ChevronDown, SearchIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logo from "/favicon.ico";

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

    const navigate = useNavigate();
    const headerRef = useRef(null);

    const handleSearch = () => {
        if (!query.trim()) return;
        navigate(`/?search=${encodeURIComponent(query.trim())}`);
        setTimeout(() => {
            setSidebarOpen(false);
            setMobileMenu(null);
        }, 150);
    };

    const closeSidebarAfterNav = () => {
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
            }
        };
        document.addEventListener("keydown", esc);
        return () => document.removeEventListener("keydown", esc);
    }, []);

    // Reset mobile menus when sidebar closes
    useEffect(() => {
        if (!sidebarOpen) setMobileMenu(null);
    }, [sidebarOpen]);

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
                    <div className="hidden md:flex w-1/3">
                        <div className="flex w-full bg-gray-700/20 border border-gray-600/30 rounded-xl overflow-hidden">
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                                placeholder="Search movies, genres..."
                                className="w-full px-4 py-2 bg-transparent text-white focus:outline-none"
                            />
                            <button
                                onClick={handleSearch}
                                className="px-4 text-gray-300 hover:text-blue-400"
                            >
                                <SearchIcon size={18} />
                            </button>
                        </div>
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
                    <div className="px-4 py-4">
                        <div className="flex bg-gray-700/20 border border-gray-600/30 rounded-xl overflow-hidden">
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                                placeholder="Search movies..."
                                className="w-full px-4 py-2 bg-transparent text-white focus:outline-none"
                            />
                            <button onClick={handleSearch} className="px-4 text-white">
                                <SearchIcon size={18} />
                            </button>
                        </div>
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