export default function HowToDownload() {
    const steps = [
        {
            step: 1,
            title: "Browse Movies",
            desc: "Go to the Movies page and explore the latest releases or search by category.",
            img: "https://res.cloudinary.com/djkyswpve/image/upload/v1756195437/step-1_sksjbg.jpg",
        },
        {
            step: 2,
            title: "Open Movie Detail",
            desc: "Click on a movie card to see details like poster, description, and quality options.",
            img: "https://res.cloudinary.com/djkyswpve/image/upload/v1756195437/step-2_hm4e0u.jpg",
        },
        {
            step: 3,
            title: "Click on Download Link",
            desc: "Click on the download link. [ Movie Name ] 720p x264 [ File Size ]",
            img: "https://res.cloudinary.com/djkyswpve/image/upload/v1756195437/step-3_lhyfd0.jpg",
        },
        {
            step: 4,
            title: "Bot Sends Movie",
            desc: "You’ll be redirected to Telegram. Our bot will send you the movie instantly.",
            img: "https://res.cloudinary.com/djkyswpve/image/upload/v1756195437/step-4_j0xfpb.jpg",
        },
        {
            step: 5,
            title: "Download & Enjoy",
            desc: "Save the movie directly from Telegram and start watching!",
            img: "https://res.cloudinary.com/djkyswpve/image/upload/v1756195437/step-5_qen2y1.jpg",
        },
    ];

    return (
        <div className="bg-black min-h-screen text-white py-12 px-2 sm:px-6">
            {/* Hero */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold"><span className="text-yellow-400">How to</span> Download Movies</h1>
                <p className="text-gray-400 mt-2 max-w-2xl mx-auto">
                    Follow these simple steps to download your favorite movies from Moviela.
                </p>
            </div>

            {/* Steps */}
            <div className="max-w-5xl mx-auto space-y-10">
                {steps.map((s) => (
                    <div
                        key={s.step}
                        className="bg-gray-900 rounded-2xl shadow-lg py-3 px-2 sm:p-6 flex flex-col md:flex-row md:items-start gap-6"
                    >
                        {/* Step Number */}
                        <div className="flex-shrink-0">
                            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-600 text-xl font-bold">
                                {s.step}
                            </div>
                        </div>

                        {/* Step Content */}
                        <div className="flex-1">
                            <h2 className="text-2xl font-semibold">{s.title}</h2>
                            <p className="text-gray-400 mt-2">{s.desc}</p>
                            <div className="mt-4">
                                <img
                                    src={s.img}
                                    alt={`Step ${s.step}`}
                                    className="rounded-lg border border-gray-700"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Note */}
            <div className="text-center mt-16 text-gray-500">
                <p>
                    Need help? Join our{" "}
                    <a
                        href="https://t.me/movieladownload"
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-400 hover:underline"
                    >
                        Telegram Support
                    </a>
                    .
                </p>
            </div>
        </div>
    );
}
