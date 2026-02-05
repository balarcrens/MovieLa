import { useContext } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaTelegram } from "react-icons/fa";
import { Link } from "react-router-dom";
import AuthContext from "../Context/AuthContext";

const Footer = () => {
    const { loggedIn, logout } = useContext(AuthContext);

    return (
        <footer className="bg-[#111] text-gray-300 py-10">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* Logo */}
                <div>
                    <h2 className="text-2xl font-bold text-white mb-3">Moviela</h2>
                    <p className="text-sm text-gray-200">
                        Your trusted source for high-quality movies & web series downloads.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link></li>
                        <li><Link to="/terms-conditions" className="hover:text-white">Terms & Conditions</Link></li>
                    </ul>
                </div>

                {/* Categories */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Categories</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/movie/category/action" className="hover:text-white">Action</Link></li>
                        <li><Link to="/movie/category/horror" className="hover:text-white">Horror</Link></li>
                        <li><Link to="/movie/category/comedy" className="hover:text-white">Comedy</Link></li>
                        <li><Link to="/movie/category/romance" className="hover:text-white">Romance</Link></li>
                    </ul>
                </div>

                {/* Social & Auth */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
                    <div className="flex space-x-4 text-xl">
                        <FaFacebook />
                        <FaTwitter />
                        <FaInstagram />
                        <FaTelegram />
                    </div>

                    <p className="text-sm mt-4">Email: balarcrens@gmail.com</p>

                    {!loggedIn && (
                        <Link
                            to="/movie/admin/login"
                            className="block mt-2 text-sm hover:text-white"
                        >
                            Login
                        </Link>
                    )}

                    {loggedIn && (
                        <>
                            <Link
                                to="/movie/admin"
                                className="block mt-2 text-sm hover:text-white"
                            >
                                Dashboard
                            </Link>

                            <button
                                onClick={logout}
                                className="block mt-1 text-sm text-red-400 hover:text-red-300"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </div>

            <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm">
                © {new Date().getFullYear()} Moviela. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;