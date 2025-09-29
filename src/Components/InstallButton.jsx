import { useEffect, useState } from "react";

export default function InstallButton() {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isInstalled, setIsInstalled] = useState(false);

    useEffect(() => {
        // Save install prompt event
        window.addEventListener("beforeinstallprompt", (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
        });

        // Detect app installation
        window.addEventListener("appinstalled", () => {
            setIsInstalled(true);
            setDeferredPrompt(null);
            console.log("App installed!");
        });
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User choice: ${outcome}`);
        setDeferredPrompt(null);
    };

    // Do not show button if app is already installed or not installable
    if (!deferredPrompt || isInstalled) return null;

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <button
                onClick={handleInstallClick}
                className="flex items-center space-x-2 px-5 py-3 bg-gradient-to-r from-purple-600 to-blue-500 hover:scale-105 transition-transform text-white font-semibold rounded-full shadow-lg"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v4h16v-4M12 4v12m0 0l-4-4m4 4l4-4" />
                </svg>
                <span>Download App</span>
            </button>
        </div>
    );
}