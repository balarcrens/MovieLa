import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Download, Film } from 'lucide-react';

export default function MovieDetail() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3000/api/v1/movie/${id}`).then((res) => {
            setMovie(res.data.movie);
        });
    }, [id]);

    if (!movie) return <div className="text-center p-8">Loading...</div>;

    return (
        <div className="bg-black min-h-screen text-white px-2 sm:px-4 py-8">
            {/* Title and Poster */}
            <div className="text-center mb-6">
                <p className="font-bold py-2 bg-[#141414] rounded max-w-4xl mx-auto italic text-2xl mb-2">
                    <Film className="inline-block mb-1.5" /> Download {movie.movie_name} ({movie.releaseDate || "2025"}) Hindi [{movie.quality || "HD"}]
                </p>
                <p className="text-blue-400 italic text-xl sm:text-2xl font-semibold">
                    Watch {movie.movie_name} Full Movie in Hindi Download Free on{" "}
                    <Link to="/" className="text-blue-500 font-bold underline">MovieLa</Link> !
                </p>
                <img
                    src={movie.posterUrl}
                    alt={movie.movie_name}
                    className="mx-auto my-4 md:max-h-[500px] sm:h-[500px] object-cover"
                />
                <Link
                    to={`https://t.me/movieladownloadbot?start=${movie.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-blue-400 font-bold text-2xl"
                >
                    [ How To Download <Download className="inline-block mb-1.5" /> ]
                </Link>
            </div>

            {/* Movie Info */}
            <div className="border-t border-gray-700 py-4 max-w-4xl mx-auto text-center">
                <h1 className="text-2xl font-bold mb-2">{movie.movie_name} <span className="italic text-xl">(Full Movie)</span></h1>
                <div className="text-[#A3A3A3]">
                    <p><span className="text-lg">IMDb Rating:</span> {movie.rating || "N/A"}/10</p>
                    <p><span className="text-lg">Genre:</span> {movie.categories?.join(", ") || "N/A"}</p>
                    <p><span className="text-lg">Stars:</span> {movie.actors || "N/A"}</p>
                    <p><span className="text-lg">Director:</span> {movie.director || "N/A"}</p>
                    <p><span className="text-lg">Language:</span> {movie.language || "Hindi (ORG-2.0)"}</p>
                    <p><span className="text-lg">Quality:</span> {movie.quality || "HD 1080p | 720p | 480p"}</p>
                </div>
            </div>

            {/* Describe Section */}
            <div className="border-t border-gray-700 pt-4 max-w-4xl mx-auto text-center">
                {/* Description */}
                <div className="flex flex-col my-5">
                    <h1 className="text-xl sm:text-2xl font-bold">Download {movie.movie_name} Full Movie <span className="text-red-500"> - Description - </span></h1>
                    <div className="text-[#A3A3A3]">
                        DESCRIPTION : {movie.description}
                    </div>
                </div>

                {/* Story Line */}
                <div className="flex flex-col my-5">
                    <h1 className="text-xl sm:text-2xl font-bold">Download {movie.movie_name} Full Movie <span className="text-red-500"> - Story Line - </span></h1>
                    <div className="text-[#A3A3A3]">
                        STORY LINE : {movie.description}
                    </div>
                </div>
            </div>

            {/* Download Section */}
            <div className="mt-6 text-center">
                <div className="space-y-2 max-w-4xl mx-auto">
                    <h2 className="text-lg font-semibold py-2 border-t-3 flex flex-col border-gray-700 text-white mb-2">
                        <span className="text-amber-600 text-xl sm:text-3xl">[ DOWNLOAD LINKS ]</span>
                        <span className="text-white">Download {movie.movie_name} Full Movie in Hindi | HD</span>
                    </h2>
                    <div className="text-blue-400 py-2 border-y-3 border-gray-700 font-bold text-2xl">
                        <Link to={`https://t.me/movieladownloadbot?start=${movie.slug}`}
                            target="_blank"
                            rel="noopener noreferrer" >
                            {movie.name} 720p x264 [{movie.size}]
                        </Link>
                    </div>
                </div>
            </div>

            {/* Trailer */}
            <div className="mt-10 text-center">
                <h2 className=" text-xl sm:text-2xl font-semibold mb-2 text-red-500">
                    Download Son of Sardaar 2 Full Movie Hindi HD | Watch Online Full Trailer
                </h2>
                <div className="w-full flex justify-center">
                    <div className="w-full sm:w-[800px] h-[300px] sm:h-[500px]">
                        <iframe
                            className="w-full h-full rounded"
                            src={`https://www.youtube.com/embed/${movie.trailer_link}`}
                            title="YouTube video player"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
}
