import loaderGif from "/assets/loader.gif";

const Loader = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-[#0f0f0f]">
            <img src={loaderGif} alt="Loading..." className="w-60 h-60" />
        </div>
    );
};

export default Loader;
