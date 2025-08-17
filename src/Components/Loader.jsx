import loaderGif from "/assets/loader.gif";

const Loader = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#0f0f0f]">
            <img src={loaderGif} alt="Loading..." className="w-40 h-40" />
        </div>
    );
};

export default Loader;