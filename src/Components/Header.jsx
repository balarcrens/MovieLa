import { useState } from "react";
import { Menu, X, ChevronDown, SearchIcon } from "lucide-react";
import logo from "/assets/logo.png";
import { Link } from "react-router-dom";

const genres = ["Action", "Comedy", "Drama", "Horror", "Sci-Fi"];
const movies = ["Latest", "Popular", "Top Rated", "Upcoming"];
const extraLinks = [
    { name: "Home", to: "/" },
    { name: "About", to: "/about" },
    { name: "Blog", to: "/blog" },
    { name: "Contact", to: "/contact" },
];

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [showGenres, setShowGenres] = useState(false);
    const [showMovies, setShowMovies] = useState(false);

    return (
        <>
            {/* Top Header: Logo + Search */}
            <header className="bg-white dark:bg-gray-900 shadow-md fixed w-full top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img src={logo} alt="Logo" className="h-10 w-10 rounded-full object-cover" />
                        <span className="text-2xl font-extrabold text-gray-800 dark:text-white">MovieLa</span>
                    </div>

                    <div className="hidden md:flex w-1/3">
                        <div className="flex w-full backdrop-blur-lg bg-white/10 dark:bg-gray-700/20 border border-white/30 dark:border-gray-500/30 rounded-xl overflow-hidden shadow-md">
                            <input
                                type="text"
                                placeholder="Search movies, genres..."
                                className="w-full px-4 py-2 bg-transparent focus:outline-none"
                            />
                            <button className="px-4 hover:text-blue-300">
                                <SearchIcon size={18} />
                            </button>
                        </div>
                    </div>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden text-gray-800 dark:text-white"
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Bottom Nav */}
                <div className="hidden md:flex justify-center gap-8 py-3 border-t border-gray-200 dark:border-gray-800">
                    {/* Movies Dropdown */}
                    <div
                        onMouseEnter={() => setShowMovies(true)}
                        onClick={() => setShowMovies(false)}
                        className="relative group cursor-pointer"
                    >
                        <div className="flex items-center gap-1 text-gray-700 dark:text-gray-300 font-medium hover:text-blue-600 dark:hover:text-blue-400">
                            Movies <ChevronDown size={16} />
                        </div>
                        {showMovies && (
                            <div className="absolute top-8 left-0 bg-white dark:bg-gray-800 shadow-lg rounded-lg py-2 w-40">
                                {movies.map((item) => (
                                    <Link
                                        key={item}
                                        to={`#${item.toLowerCase()}`}
                                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                                    >
                                        {item}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Genres Dropdown */}
                    <div
                        onMouseEnter={() => setShowGenres(true)}
                        onClick={() => setShowGenres(false)}
                        className="relative group cursor-pointer"
                    >
                        <div className="flex items-center gap-1 text-gray-700 dark:text-gray-300 font-medium hover:text-blue-600 dark:hover:text-blue-400">
                            Genres <ChevronDown size={16} />
                        </div>
                        {showGenres && (
                            <div className="absolute top-8 left-0 bg-white dark:bg-gray-800 shadow-lg rounded-lg py-2 w-40">
                                {genres.map((genre) => (
                                    <Link
                                        key={genre}
                                        to={`#${genre.toLowerCase()}`}
                                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                                    >
                                        {genre}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Extra Menu Items */}
                    {extraLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.to}
                            className="text-gray-700 dark:text-gray-300 font-medium hover:text-blue-600 dark:hover:text-blue-400"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            </header>

            {/* Mobile Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full w-3/4 bg-white dark:bg-gray-800 z-50 transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                    } transition-transform duration-300 ease-in-out md:hidden shadow-lg`}
            >
                <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                        <img src={logo} alt="Logo" className="h-8 w-8 rounded-full object-cover" />
                        <span className="text-lg font-bold text-gray-900 dark:text-white">Moviela</span>
                    </div>
                    <button onClick={() => setIsOpen(false)}>
                        <X className="text-gray-800 dark:text-white" size={24} />
                    </button>
                </div>
                <nav className="flex flex-col px-6 py-4 gap-4">
                    <div className="font-bold text-gray-500 dark:text-gray-400">Movies</div>
                    {movies.map((item) => (
                        <Link
                            key={item}
                            to={`#${item.toLowerCase()}`}
                            className="text-gray-700 dark:text-gray-200 ml-5 hover:text-blue-600 dark:hover:text-blue-400"
                        >
                            {item}
                        </Link>
                    ))}

                    <div className="mt-4 font-bold text-gray-500 dark:text-gray-400">Genres</div>
                    {genres.map((genre) => (
                        <Link
                            key={genre}
                            to={`#${genre.toLowerCase()}`}
                            className="text-gray-700 dark:text-gray-200 ml-5 hover:text-blue-600 dark:hover:text-blue-400"
                        >
                            {genre}
                        </Link>
                    ))}

                    {extraLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.to}
                            className="mt-1 text-gray-700 font-bold dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Spacer */}
            <div className="h-16 md:h-28"></div>
        </>
    );
}