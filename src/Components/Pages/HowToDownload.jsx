import { Helmet } from "react-helmet";

export default function HowToDownload() {
    const steps = [
        {
            step: 1,
            title: "Browse Movies",
            desc: "Explore the latest releases or search by category on Moviela.",
            img: "https://ik.imagekit.io/crens07/How%20to%20Download/step-1_how_to_download.jpg",
        },
        {
            step: 2,
            title: "Open Movie Detail",
            desc: "Click on a movie card to see details like poster, description, and ratings.",
            img: "https://ik.imagekit.io/crens07/How%20to%20Download/step-2_how_to_download.jpg",
        },
        {
            step: 3,
            title: "Check Available Sources",
            desc: "See links to legal streaming platforms or official trailers. Moviela only provides information, not pirated content.",
            img: "https://ik.imagekit.io/crens07/How%20to%20Download/step-3_how_to_download.jpg",
        },
        {
            step: 4,
            title: "Read Reviews & Ratings",
            desc: "Check user reviews and ratings to decide which movie to watch next.",
            img: "https://ik.imagekit.io/crens07/How%20to%20Download/step-4_how_to_download.jpg",
        },
        {
            step: 5,
            title: "Enjoy Responsibly",
            desc: "Use official platforms to watch movies legally and safely.",
            img: "https://ik.imagekit.io/crens07/How%20to%20Download/step-5_how_to_download.jpg",
        },
    ];

    return (
        <div className="bg-black min-h-screen text-white py-12 px-2 sm:px-6">
            {/* Helmet for SEO / AdSense */}
            <Helmet>
                <title>How to Download Movies | Moviela</title>
                <meta name="description" content="Learn how to explore and watch movies legally on Moviela. Follow simple steps to browse, read reviews, and enjoy films safely." />
                <meta name="robots" content="index, follow" />
            </Helmet>

            {/* Hero */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold"><span className="text-yellow-400">How to</span> Download Movies</h1>
                <p className="text-gray-400 mt-2 max-w-2xl mx-auto">
                    Follow these simple steps to explore movie details and enjoy films legally.
                </p>
            </div>

            {/* Steps */}
            <div className="max-w-5xl mx-auto space-y-10">
                {steps.map((s) => (
                    <div
                        key={s.step}
                        className="bg-gray-900 rounded-2xl shadow-lg py-3 px-2 sm:p-6 flex flex-col md:flex-row md:items-start gap-6"
                    >
                        <div className="flex-shrink-0">
                            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-600 text-xl font-bold">
                                {s.step}
                            </div>
                        </div>
                        <div className="flex-1">
                            <h2 className="text-2xl font-semibold">{s.title}</h2>
                            <p className="text-gray-400 mt-2">{s.desc}</p>
                            <div className="mt-4">
                                <img
                                    src={s.img}
                                    alt={`How to download movies on Moviela – Step ${s.step}`}
                                    loading="lazy"
                                    decoding="async"
                                    className="rounded-lg border border-gray-700 w-full max-w-3xl"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Note */}
            <div className="text-center mt-16 text-gray-500">
                <p>
                    For legal streaming updates, visit official sources or check movie reviews on our platform.
                </p>
            </div>
        </div>
    );
}