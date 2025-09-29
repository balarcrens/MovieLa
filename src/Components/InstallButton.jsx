import { useEffect, useState } from "react";

export default function InstallButton() {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isInstalled, setIsInstalled] = useState(false);

    useEffect(() => {
        // Handler for beforeinstallprompt
        const handleBeforeInstallPrompt = (e) => {
            // Prevent Chrome's automatic banner
            e.preventDefault();
            setDeferredPrompt(e); // Save event to show manually
        };

        // Handler for appinstalled
        const handleAppInstalled = () => {
            setIsInstalled(true);
            setDeferredPrompt(null);
            console.log("App installed!");
        };

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        window.addEventListener("appinstalled", handleAppInstalled);

        // Cleanup
        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
            window.removeEventListener("appinstalled", handleAppInstalled);
        };
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;

        // Show the install prompt
        deferredPrompt.prompt();

        // Wait for user response
        const choice = await deferredPrompt.userChoice;
        console.log("User choice:", choice.outcome);

        // Clear the saved prompt
        setDeferredPrompt(null);
    };

    // Don't show button if app is already installed or prompt not available
    if (!deferredPrompt || isInstalled) return null;

    return (
        <div className="fixed bottom-20 right-4 z-50">
            <button
                onClick={handleInstallClick}
                className="flex items-center space-x-2 px-5 py-3 bg-gradient-to-r from-purple-600 to-blue-500 hover:scale-105 transition-transform text-white font-semibold rounded-full shadow-lg"
            >
                <span>Install App</span>
            </button>
        </div>
    );
}