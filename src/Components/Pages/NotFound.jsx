import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] bg-[#0f0f0f] text-white px-4 text-center">
            <Helmet>
                <title>404 - Page Not Found | Moviela</title>
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            
            <h1 className="text-8xl md:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-yellow-400 to-yellow-600 mb-4 drop-shadow-lg">
                404
            </h1>
            <h2 className="text-2xl md:text-4xl font-bold mb-6">Oops! Page Not Found</h2>
            <p className="text-gray-400 mb-10 text-lg max-w-md">
                The movie or page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            
            <Link 
                to="/" 
                className="px-8 py-3 bg-yellow-500 text-black font-bold rounded-xl hover:bg-yellow-400 hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(234,179,8,0.4)]"
            >
                Return to Home
            </Link>
        </div>
    );
}
