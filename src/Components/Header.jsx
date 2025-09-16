import { useState } from "react";
import { Menu, X, ChevronDown, SearchIcon } from "lucide-react";
import logo from "/favicon.ico";
import { Link, useNavigate } from "react-router-dom";

const genres = ["Action", "Drama", "Comedy", "Romance", "Thriller", "Horror", "Sci-Fi", "Adventure"];
const movies = ["Latest", "Popular", "rating"];
const industries = ["Bollywood", "Hollywood", "Tollywood", "South", "Kollywood", "Gujarati", "Other"];
const Links = [
    { name: "Home", to: "/" },
    { name: "Movie Request", to: "/movierequest" },
];

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [showGenres, setShowGenres] = useState(false);
    const [showMovies, setShowMovies] = useState(false);
    const [showIndustries, setShowIndustries] = useState(false);
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = () => {
        if (query.trim() === "") {
            navigate("/");
        } else {
            navigate(`/?search=${encodeURIComponent(query.trim())}`);
        }
    }

    return (
        <>
            {/* Top Header: Logo + Search */}
            <header className="bg-gray-900 shadow-md fixed w-full top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                    <Link to="/" data-discover="true" aria-label="Home">
                        <div className="flex items-center gap-3 px-2" aria-hidden="true">
                            <img src={logo} alt="Logo" className="h-10 w-10 rounded-full object-cover" />
                            <span className="text-2xl font-extrabold text-white">MovieLa</span>
                        </div>
                    </Link>

                    {/* Search Bar */}
                    <div className="hidden md:flex w-1/3">
                        <div className="flex w-full backdrop-blur-lg text-white bg-gray-700/20 border border-gray-500/30 rounded-xl overflow-hidden shadow-md">
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") handleSearch();
                                }}
                                type="text"
                                placeholder="Search movies, genres..."
                                className="w-full px-4 py-2 text-white bg-transparent focus:outline-none"
                            />
                            <button onClick={handleSearch} className="px-4 hover:text-blue-300" aria-label="Search">
                                <SearchIcon size={18} />
                            </button>
                        </div>
                    </div>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden text-white"
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Bottom Nav */}
                <div className="hidden md:flex justify-center gap-8 py-3 border-t border-gray-800">
                    {Links.map((link) => (
                        <Link
                            key={link.name}
                            to={link.to}
                            data-discover="true" aria-label={link.name}
                            className="text-gray-300 font-medium hover:text-blue-400"
                        >
                            {link.name}
                        </Link>
                    ))}

                    {/* Movies Dropdown */}
                    <div
                        onClick={() => {
                            setShowMovies(!showMovies);
                            setShowGenres(false);
                            setShowIndustries(false);
                        }}
                        className="relative group cursor-pointer"
                        role="button"
                        aria-haspopup="true"
                        aria-expanded={showMovies}
                        aria-label="Movies Menu"
                    >
                        <div className="flex items-center gap-1 text-gray-300 font-medium hover:text-blue-400">
                            Movies <ChevronDown size={16} aria-hidden="true" />
                        </div>
                        {showMovies && (
                            <div
                                className="absolute top-8 left-0 bg-gray-800 shadow-lg rounded-lg py-2 w-40"
                                role="menu"
                                aria-label="Movies submenu"
                            >
                                {movies.map((item) => (
                                    <Link
                                        key={item}
                                        to={`/movie/filter/${item.toLowerCase()}`}
                                        className="block px-4 py-2 hover:bg-gray-700 text-gray-200"
                                        role="menuitem"
                                    >
                                        {item}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Industry Dropdown */}
                    <div
                        onClick={() => {
                            setShowIndustries(!showIndustries);
                            setShowGenres(false);
                            setShowMovies(false);
                        }}
                        className="relative group cursor-pointer"
                        role="button"
                        aria-haspopup="true"
                        aria-expanded={showIndustries}
                        aria-label="Industry Menu"
                    >
                        <div className="flex items-center gap-1 text-gray-300 font-medium hover:text-blue-400">
                            Industry <ChevronDown size={16} aria-hidden="true" />
                        </div>
                        {showIndustries && (
                            <div
                                className="absolute top-8 left-0 bg-gray-800 shadow-lg rounded-lg py-2 w-40"
                                role="menu"
                                aria-label="Industry submenu"
                            >
                                {industries.map((industry) => (
                                    <Link
                                        key={industry}
                                        to={`/movie/filter/${industry.toLowerCase()}`}
                                        className="block px-4 py-2 hover:bg-gray-700 text-gray-200"
                                        role="menuitem"
                                    >
                                        {industry}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Genres Dropdown */}
                    <div
                        onClick={() => { setShowGenres(!showGenres); setShowMovies(false); setShowIndustries(false); }}
                        className="relative group cursor-pointer" role="button" aria-haspopup="true" aria-expanded={showGenres} aria-label="Genres Menu">
                        <div className="flex items-center gap-1 text-gray-300 font-medium hover:text-blue-400">
                            Genres <ChevronDown size={16} aria-hidden="true" />
                        </div>
                        {showGenres && (
                            <div
                                className="absolute top-8 left-0 bg-gray-800 shadow-lg rounded-lg py-2 w-40"
                                role="menu"
                                aria-label="Genres submenu"
                            >
                                {genres.map((genre) => (
                                    <Link
                                        key={genre}
                                        to={`/movie/category/${genre.toLowerCase()}`}
                                        className="block px-4 py-2 hover:bg-gray-700 text-gray-200"
                                        role="menuitem"
                                    >
                                        {genre}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Mobile Sidebar */}
            <div
                className={`fixed top-0 left-0 h-screen w-3/4 bg-gray-900 z-50 transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                    } transition-transform duration-300 ease-in-out md:hidden shadow-xl flex flex-col`}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-4 pb-10 border-b border-gray-800">
                    <div className="flex items-center gap-3">
                        <img
                            src={logo}
                            alt="Logo"
                            className="h-9 w-9 rounded-full object-cover shadow-md"
                        />
                        <span className="text-xl font-extrabold text-white tracking-wide">Moviela</span>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 rounded-full hover:bg-gray-700 transition"
                    >
                        <X className="text-white" size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6 h-full">
                    {/* Main Links */}
                    <div className="flex flex-col gap-3">
                        {Links.map((link) => (
                            <Link
                                key={link.name}
                                to={link.to}
                                onClick={() => setIsOpen(false)}
                                data-discover="true" aria-label={link.name}
                                className="font-medium text-gray-200 hover:text-blue-400 transition"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Movies */}
                    <div>
                        <h3 className="text-sm font-bold uppercase text-gray-400 mb-2 cursor-pointer" onClick={() => setShowMovies(!showMovies)} >
                            Movies {showMovies ? "▲" : "▼"}
                        </h3>
                        {showMovies && (
                            <div className="flex flex-col gap-2 ml-3">
                                {movies.map((item) => (
                                    <Link key={item} to={`/movie/filter/${item.toLowerCase()}`} onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-blue-400 transition">
                                        {item}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Industry */}
                    <div>
                        <h3 className="text-sm font-bold uppercase text-gray-400 mb-2 cursor-pointer" onClick={() => setShowIndustries(!showIndustries)}>
                            Industry {showIndustries ? "▲" : "▼"}
                        </h3>
                        {showIndustries && (
                            <div className="flex flex-col gap-2 ml-3">
                                {industries.map((industry) => (
                                    <Link
                                        key={industry}
                                        to={`/movie/filter/${industry.toLowerCase()}`}
                                        onClick={() => setIsOpen(false)}
                                        className="text-gray-300 hover:text-blue-400 transition"
                                    >
                                        {industry}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Genres */}
                    <div>
                        <h3 className="text-sm font-bold uppercase text-gray-400 mb-2 cursor-pointer" onClick={() => setShowGenres(!showGenres)}>
                            Genres {showGenres ? "▲" : "▼"}
                        </h3>
                        {showGenres && (
                            <div className="flex flex-col gap-2 ml-3">
                                {genres.map((genre) => (
                                    <Link
                                        key={genre}
                                        to={`/movie/category/${genre.toLowerCase()}`}
                                        onClick={() => setIsOpen(false)}
                                        className="text-gray-300 hover:text-blue-400 transition"
                                    >
                                        {genre}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="md:hidden flex justify-end max-w-7xl mx-auto mt-15 bg-[#0f0f0f] px-1.5 sm:px-4 py-4">
                <div className="flex w-50% backdrop-blur-lg bg-gray-700/20 border border-gray-500/30 rounded-xl overflow-hidden shadow-md">
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleSearch();
                        }}
                        type="text"
                        placeholder="Search movies, genres..."
                        className="w-full px-4 py-2 bg-transparent text-white focus:outline-none"
                    />
                    <button onClick={handleSearch} className="px-4 text-white hover:text-blue-300" aria-label="Search">
                        <SearchIcon size={18} />
                    </button>
                </div>
            </div>

            {/* Spacer */}
            <div className="md:h-28"></div>
        </>
    );
}