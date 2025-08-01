import { FaTelegramPlane } from "react-icons/fa";

export default function TelegramFloat() {
    const telegramUrl = "https://t.me/movieladownload";

    return (
        <div className="fixed bottom-4 left-4 z-50 group cursor-pointer">
            {/* Ping effect behind the button */}
            <div className="absolute w-12 h-12 group-hover:hidden rounded-full transition-all duration-300 bg-[#229ED9] opacity-70 animate-ping"></div>

            <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center bg-[#229ED9] text-white rounded-full shadow-xl overflow-hidden transition-all duration-300 ease-in-out w-12 group-hover:w-50 h-12 relative"
            >
                {/* Icon */}
                <div className="flex items-center justify-center w-12 h-12">
                    <FaTelegramPlane className="text-2xl ml-2.5 transition-all duration-300" />
                </div>

                {/* Text */}
                <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    <p className="font-semibold text-sm leading-4">Join Our Channel</p>
                    <p className="text-xs">@movieladownload</p>
                </div>
            </a>
        </div>
    );
}
