import { FaFacebook, FaTwitter, FaInstagram, FaTelegram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-[#111] text-gray-300 py-10">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Logo and description */}
                <div>
                    <h2 className="text-2xl font-bold text-white mb-3">Moviela</h2>
                    <p className="text-sm">Your trusted source for high-quality movies & web series downloads. Fast, clean & always updated.</p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/" className="hover:text-white">Home</Link></li>
                        <li><Link to="/aboutus" className="hover:text-white">About Us</Link></li>
                        <li><Link to="/genres" className="hover:text-white">Genres</Link></li>
                        <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
                    </ul>
                </div>

                {/* Categories */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Categories</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/bollywood" className="hover:text-white">Bollywood</Link></li>
                        <li><Link to="/hollywood" className="hover:text-white">Hollywood</Link></li>
                        <li><Link to="/south-dubbed" className="hover:text-white">South Dubbed</Link></li>
                        <li><Link to="/web-series" className="hover:text-white">Web Series</Link></li>
                    </ul>
                </div>

                {/* Social & Contact */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
                    <div className="flex space-x-4 text-xl">
                        <Link to="#" className="hover:text-white"><FaFacebook /></Link>
                        <Link to="#" className="hover:text-white"><FaTwitter /></Link>
                        <Link to="#" className="hover:text-white"><FaInstagram /></Link>
                        <Link to="#" className="hover:text-white"><FaTelegram /></Link>
                    </div>
                    <p className="text-sm mt-4">Email: support@moviela.in</p>
                </div>
            </div>

            <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} Moviela. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
