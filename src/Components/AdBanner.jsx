import { useEffect, useRef } from "react";

function AdBanner() {
    const adRef = useRef(null);

    useEffect(() => {
        try {
            if (window.adsbygoogle && adRef.current) {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            }
        } catch (e) {
            console.error("AdSense error:", e);
        }
    }, []);

    return (
        <ins
            ref={adRef}
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-2791325015173516"
            data-ad-slot="2024123254"
            data-ad-format="auto"
            data-full-width-responsive="true"
        ></ins>
    );
}

export default AdBanner;