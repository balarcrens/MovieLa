/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function PushNotification() {
    const [subscribed, setSubscribed] = useState(false);

    const VAPID_PUBLIC_KEY =
        "BFe1RudNeKNpAQBRApLd6gsRafZOo1naKlbjAmK9Cu9tHc9ZxL3KgvLohloiFdiQVBL8ADu049KILSUwjIcjFgQ";

    const urlBase64ToUint8Array = (base64String) => {
        const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
        const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
        const rawData = window.atob(base64);
        return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
    };

    const subscribeUser = async () => {
        if ("serviceWorker" in navigator && "PushManager" in window) {
            try {
                const reg = await navigator.serviceWorker.register("/sw.js");
                const subscription = await reg.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
                });

                await fetch("https://moviela-server.onrender.com/api/v1/notifications/subscribe", {
                    method: "POST",
                    body: JSON.stringify(subscription),
                    headers: { "Content-Type": "application/json" },
                });

                setSubscribed(true);
                toast.success("Notifications enabled successfully!");
            } catch (err) {
                console.error("Failed to subscribe:", err);
                toast.error("Failed to enable notifications. Please try again.");
            }
        } else {
            toast.error("Push notifications are not supported in this browser.");
        }
    };

    // Detect mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    // Auto-subscribe on desktop only
    useEffect(() => {
        if (!isMobile) {
            subscribeUser();
        }
    }, []);

    return (
        <div className="bg-[#1a1a1a]">
            <Toaster position="top-right" reverseOrder={false} />
            {!isMobile && !subscribed && (
                <button
                    onClick={subscribeUser}
                    className="bg-[#1a1a1a] text-white p-2 rounded"
                >
                    Enable Notifications
                </button>
            )}
        </div>
    );
}
