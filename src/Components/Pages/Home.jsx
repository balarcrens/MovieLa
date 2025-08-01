import React from "react";
import { Link } from "react-router-dom";

const movies = [
    {
        title: "28 Years Later (2025)",
        slug: "28-years-later",
        image: "/assets/28-years.png",
        quality: "WEB-DL 480p [410MB] || 720p [1GB] || 1080p [2.3GB]",
    },
    {
        title: "The Fantastic 4: First Steps (2025)",
        slug: "the-fantastic-4",
        image: "/assets/fantastic4.png",
        quality: "HDTS 480p [350MB] || 720p [970MB] || 1080p [2GB]",
    },
    {
        title: "Trigger (Season 1)",
        slug: "trigger",
        image: "/assets/trigger.png",
        quality: "HD 480p [180MB] || 720p [310MB] || 1080p [1.2GB]",
    },
    {
        title: "Pushpa The Rise",
        slug: "pushpa",
        image: "/assets/pushpa1.jpeg",
        quality: "HD 480p [180MB] || 720p [1.27GB] || 1080p [2.1GB]",
    },
    {
        title: "KGF",
        slug: "kgf",
        image: "/assets/kgf.png",
        quality: "WEB-DL 480p [400MB] || 720p [1.2GB] || 1080p [2.2GB]",
    },
    {
        title: "28 Years Later (2025)",
        slug: "28-years-later",
        image: "/assets/28-years.png",
        quality: "WEB-DL 480p [410MB] || 720p [1GB] || 1080p [2.3GB]",
    },
    {
        title: "The Fantastic 4: First Steps (2025)",
        slug: "the-fantastic-4",
        image: "/assets/fantastic4.png",
        quality: "HDTS 480p [350MB] || 720p [970MB] || 1080p [2GB]",
    },
    {
        title: "Trigger (Season 1)",
        slug: "trigger",
        image: "/assets/trigger.png",
        quality: "WeB-DL 480p [180MB] || 720p [310MB] || 1080p [1.2GB]",
    },
    {
        title: "Pushpa The Rise",
        slug: "pushpa",
        image: "/assets/pushpa1.jpeg",
        quality: "480p [180MB] || 720p [1.27GB] || 1080p [2.1GB]",
    },
    {
        title: "KGF",
        slug: "kgf",
        image: "/assets/kgf.png",
        quality: "WEB-DL 480p [400MB] || 720p [1.2GB] || 1080p [2.2GB]",
    },
];

const Home = () => {
    return (
        <div className="bg-[#0f0f0f] min-h-screen py-10 px-2 sm:px-4 text-white">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-yellow-400 text-center mb-10 tracking-wide">
                    🎬 Latest Movies
                </h1>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-6">
                    {movies.map((movie, index) => (
                        <div
                            key={index}
                            className="bg-[#1a1a1a] rounded-xl group overflow-hidden shadow-lg transition-transform duration-300 hover:shadow-xl border border-[#2a2a2a]"
                        >
                            <Link to={`https://t.me/movieladownloadbot?start=${movie.slug}`} target="_blank">
                                <div className="overflow-hidden h-60 sm:h-70 flex items-center justify-center">
                                    <img
                                        src={movie.image}
                                        alt={movie.title}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-115"
                                    />
                                </div>

                                <div className="p-4 text-sm space-y-2 p">
                                    <p className="font-semibold text-white leading-tight">
                                        {movie.title}
                                    </p>
                                    <p className="text-gray-400 text-xs leading-snug">
                                        {movie.quality}
                                    </p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
