// import AdBanner from "../AdBanner";

export default function PrivacyPolicy() {
    return (
        <div className="bg-[#0f0f0f]">
            <div className="max-w-4xl mx-auto px-6 py-10 text-gray-200">
                <h1 className="text-3xl font-bold mb-6 text-yellow-400">Privacy Policy</h1>
                <p className="mb-4">
                    At <span className="font-semibold">Moviela</span>, accessible from our website, protecting the privacy of our visitors is a top priority.
                    This Privacy Policy outlines the types of information that may be collected and how we use it in compliance with Google AdSense policies.
                </p>

                <h2 className="text-xl text-yellow-400 font-semibold mt-6 mb-2">Information We Collect</h2>
                <p className="mb-4">
                    We may collect non-personal information such as browser type, device information, referring website, and pages visited.
                    We do not require you to provide personal details to browse or download movies.
                </p>

                <h2 className="text-xl text-yellow-400 font-semibold mt-6 mb-2">Cookies and Web Beacons</h2>
                <p className="mb-4">
                    Moviela uses cookies to enhance user experience and serve relevant ads.
                    Google, as a third-party vendor, uses cookies to serve ads on our site.
                    Users may opt out of personalized ads by visiting{" "}
                    <a
                        href="https://www.google.com/settings/ads/"
                        className="text-blue-400 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Google Ads Settings
                    </a>.
                </p>

                <h2 className="text-xl text-yellow-400 font-semibold mt-6 mb-2">Third-Party Privacy Policies</h2>
                <p className="mb-4">
                    Moviela’s Privacy Policy does not apply to advertisers or external websites.
                    We advise you to consult the respective Privacy Policies of third-party ad servers for more detailed information.
                </p>

                <h2 className="text-xl text-yellow-400 font-semibold mt-6 mb-2">Children’s Privacy</h2>
                <p className="mb-4">
                    Moviela does not knowingly collect any Personal Identifiable Information from children under the age of 13.
                    If you believe your child has provided such information, please contact us so we can promptly remove it.
                </p>

                <h2 className="text-xl text-yellow-400 font-semibold mt-6 mb-2">Consent</h2>
                <p className="mb-4">
                    By using our website, you hereby consent to our Privacy Policy and agree to its terms.
                </p>

                <h2 className="text-xl text-yellow-400 font-semibold mt-6 mb-2">Updates to This Policy</h2>
                <p className="mb-4">
                    We may update this Privacy Policy from time to time to reflect changes in practices or for other operational, legal, or regulatory reasons.
                    Any updates will be posted on this page.
                </p>

                <h2 className="text-xl text-yellow-400 font-semibold mt-6 mb-2">Contact Us</h2>
                <p>
                    If you have any questions or concerns about this Privacy Policy, you can contact us at:
                    <span className="block mt-2 font-semibold">support@moviela.com</span>
                </p>
            </div>

            {/* <AdBanner /> */}
        </div>
    );
}
