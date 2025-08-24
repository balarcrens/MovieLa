import { useEffect } from "react";

const AdBanner = () => {
    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            console.error("AdSense error", e);
        }
    }, []);

    return (
        <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-2791325015173516"
            data-ad-slot="8172045937"
            data-ad-format="fluid"
            data-ad-layout-key="-6t+ed+2i-1n-4w"
        ></ins>
    );
};

export default AdBanner;
