import { FaFacebook, FaTwitter, FaInstagram, FaTelegram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-[#111] text-gray-300 py-10">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Logo and description */}
                <div>
                    <h2 className="text-2xl font-bold text-white mb-3">Moviela</h2>
                    <p className="text-sm text-gray-200">
                        Your trusted source for high-quality movies & web series downloads.
                        Fast, clean & always updated.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link to="/privacy-policy" aria-label="Privacy Policy" className="hover:text-white" >
                                Privacy Policy
                            </Link>
                        </li>
                        <li>
                            <Link to="/terms-conditions" aria-label="Terms and Conditions" className="hover:text-white" >
                                Terms & Conditions
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Categories */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Categories</h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link to="/movie/category/action" aria-label="Action Movies" className="hover:text-white" >
                                Action
                            </Link>
                        </li>
                        <li>
                            <Link to="/movie/category/horror" aria-label="Horror Movies" className="hover:text-white" >
                                Horror
                            </Link>
                        </li>
                        <li>
                            <Link to="/movie/category/comedy" aria-label="Comedy Movies" className="hover:text-white" >
                                Comedy
                            </Link>
                        </li>
                        <li>
                            <Link to="/movie/category/romance" aria-label="Romance Movies" className="hover:text-white" >
                                Romance
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Social & Contact */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
                    <div className="flex space-x-4 text-xl">
                        <Link to="#" aria-label="Facebook" className="hover:text-white">
                            <FaFacebook aria-hidden="true" />
                        </Link>
                        <Link to="#" aria-label="Twitter" className="hover:text-white">
                            <FaTwitter aria-hidden="true" />
                        </Link>
                        <Link to="#" aria-label="Instagram" className="hover:text-white">
                            <FaInstagram aria-hidden="true" />
                        </Link>
                        <Link to="#" aria-label="Telegram" className="hover:text-white">
                            <FaTelegram aria-hidden="true" />
                        </Link>
                    </div>

                    <p className="text-sm mt-4 text-gray-200">
                        Email: balarcrens@gmail.com
                    </p>

                    <p className="text-sm mt-1.5">
                        <Link
                            to="/movie/admin/login"
                            aria-label={localStorage.getItem("auth-token") ? "Logout" : "Login"}
                            className="hover:text-white"
                        >
                            {localStorage.getItem("auth-token") ? "logout" : "login"}
                        </Link>
                    </p>

                    {localStorage.getItem("auth-token") && (
                        <p className="text-sm mt-1.5">
                            <Link
                                to="/movie/admin/add"
                                aria-label="Add Movie"
                                className="hover:text-white"
                            >
                                movie
                            </Link>
                        </p>
                    )}
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-200">
                © {new Date().getFullYear()} Moviela. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
