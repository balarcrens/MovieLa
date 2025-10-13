import { useEffect, useState } from "react";

export default function InstallButton() {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isInstalled, setIsInstalled] = useState(false);

    useEffect(() => {
        const beforeInstallHandler = (e) => {
            console.log("Install prompt event captured");
            setDeferredPrompt(e);
        };

        const installedHandler = () => {
            setIsInstalled(true);
            setDeferredPrompt(null);
            console.log("App installed!");
        };

        window.addEventListener("beforeinstallprompt", beforeInstallHandler);
        window.addEventListener("appinstalled", installedHandler);

        return () => {
            window.removeEventListener("beforeinstallprompt", beforeInstallHandler);
            window.removeEventListener("appinstalled", installedHandler);
        };
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User choice: ${outcome}`);
        setDeferredPrompt(null);
    };

    if (!deferredPrompt || isInstalled) return null;

    return (
        <div className="fixed bottom-4 right-4 z-50 group cursor-pointer">
            {/* Ping effect */}
            <div className="absolute w-12 h-12 group-hover:hidden rounded-full transition-all duration-300 bg-purple-600 opacity-70 animate-ping"></div>

            <button onClick={handleInstallClick}
                className="flex items-center bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full shadow-xl overflow-hidden transition-all duration-300 ease-in-out w-12 group-hover:w-42 h-12 relative"
            >
                {/* Icon stays perfectly centered in circle */}
                <div className="flex items-center justify-center w-12 h-12 flex-shrink-0">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16v4h16v-4M12 4v12m0 0l-4-4m4 4l4-4"
                        />
                    </svg>
                </div>

                {/* Text appears on hover */}
                <div className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    <p className="font-semibold text-sm leading-4">Download App</p>
                </div>
            </button>
        </div>
    );
}