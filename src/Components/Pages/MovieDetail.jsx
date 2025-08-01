import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function MovieDetail() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3000/api/v1/movie/${id}`)
            .then((res) => {
                const movie = res.data.movie;

                const bufferData = movie.poster_image?.data?.data;
                const contentType = movie.poster_image?.contentType || "image/jpeg";

                let posterUrl = "";
                if (bufferData) {
                    const binary = new Uint8Array(bufferData).reduce(
                        (str, byte) => str + String.fromCharCode(byte),
                        ""
                    );
                    posterUrl = `data:${contentType};base64,${btoa(binary)}`;
                }

                setMovie({ ...movie, posterUrl });
            })
            .catch(err => {
                console.error("Error fetching movie:", err.message);
            });
    }, [id]);


    if (!movie) return <div className="text-center text-white">Loading...</div>;

    return (
        <div className="max-w-5xl mx-auto p-4 text-white">
            {/* Movie Poster */}
            <div className="relative w-60 aspect-[2/3] overflow-hidden">
                <img
                    src={movie.posterUrl}
                    alt={movie.movie_name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent"></div>
            </div>

            {/* Movie Title and Description */}
            <h1 className="text-3xl font-bold mb-2">{movie.movie_name}</h1>
            <p className="text-sm text-gray-300 mb-4">{movie.description}</p>

            {/* Extra Details */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
                <span className="text-yellow-400 font-semibold">{movie.rating} ⭐</span>
                <span className="bg-yellow-500 text-black text-xs px-3 py-1 rounded-full">
                    {movie.category || "Action"}
                </span>
                <span className="text-gray-400 text-sm">
                    Released: {movie.releaseDate || "N/A"}
                </span>
            </div>

            {/* Download Link */}
            <a
                href={`https://t.me/movieladownloadbot?start=${movie.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md transition"
            >
                📥 Download via Telegram
            </a>
        </div>
    );
}
