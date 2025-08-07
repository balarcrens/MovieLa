import { useEffect, useState } from "react";
import loaderGif from "/assets/loader.gif";

const Loader = () => {
    const [dots, setDots] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prev) => (prev.length < 3 ? prev + "." : ""));
        }, 500); // every 0.5s add a dot or reset
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#0f0f0f]">
            <img src={loaderGif} alt="Loading..." className="w-40 h-40" />
            <p className="-mt-10 text-white text-lg font-medium">Loading{dots}</p>
        </div>
    );
};

export default Loader;