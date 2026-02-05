// import AdBanner from "../AdBanner";

export default function PrivacyPolicy() {
    return (
        <div className="bg-[#0b0b0b] min-h-screen">
            <div className="max-w-4xl mx-auto px-5 sm:px-6 py-10 text-gray-300">

                {/* Page Header */}
                <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-yellow-400">
                    Privacy Policy
                </h1>
                <p className="text-sm text-gray-400 mb-8">
                    Last updated: {new Date().getFullYear()}
                </p>

                <div className="space-y-8 leading-relaxed">

                    <section>
                        <p>
                            At <span className="font-semibold text-gray-100">Moviela</span>,
                            we respect your privacy and are committed to protecting it.
                            This Privacy Policy explains how we collect, use, and safeguard
                            information when you visit our website, in accordance with
                            applicable laws and Google AdSense policies.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-yellow-400 mb-2">
                            Information We Collect
                        </h2>
                        <p>
                            We may collect non-personal information such as browser type,
                            operating system, device information, IP address, referring
                            pages, and site activity. This information is used solely to
                            analyze trends, improve website performance, and enhance user
                            experience.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-yellow-400 mb-2">
                            Cookies and Advertising Technologies
                        </h2>
                        <p>
                            Moviela uses cookies and similar technologies to improve
                            functionality and display relevant advertisements. Google,
                            as a third-party vendor, may use cookies (including DART
                            cookies) to serve ads based on users’ visits to this and other
                            websites.
                        </p>
                        <p className="mt-2">
                            Users may opt out of personalized advertising by visiting{" "}
                            <a
                                href="https://www.google.com/settings/ads/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:underline"
                            >
                                Google Ads Settings
                            </a>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-yellow-400 mb-2">
                            Third-Party Privacy Policies
                        </h2>
                        <p>
                            Moviela’s Privacy Policy does not apply to other advertisers,
                            websites, or services that may be linked from our platform.
                            We encourage users to review the respective privacy policies
                            of third-party services for more information.
                        </p>
                    </section>

                    <section className="border border-yellow-500/20 bg-yellow-500/5 rounded-lg p-4">
                        <h2 className="text-xl font-semibold text-yellow-400 mb-2">
                            Copyright & Content Disclaimer
                        </h2>
                        <p>
                            Moviela does not host, upload, or store any media files on its
                            own servers. All content displayed on this website is sourced
                            from publicly available third-party platforms and is provided
                            for informational and discovery purposes only.
                        </p>
                        <p className="mt-2">
                            All trademarks, images, videos, and related media belong to
                            their respective owners. Moviela does not claim ownership of
                            any copyrighted content.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-yellow-400 mb-2">
                            DMCA & Copyright Infringement Policy
                        </h2>
                        <p>
                            Moviela respects the intellectual property rights of content
                            owners. If you believe that any content available on our
                            website infringes upon your copyright, you may submit a
                            takedown request.
                        </p>
                        <p className="mt-2">
                            Upon receipt of a valid notice, we will promptly review and
                            remove the reported content where appropriate.
                        </p>
                        <p className="mt-2 font-medium text-gray-100">
                            dmca@moviela.com
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-yellow-400 mb-2">
                            User Responsibility
                        </h2>
                        <p>
                            Users are responsible for how they access and use third-party
                            content referenced on Moviela. We do not control or endorse
                            external websites and are not liable for any actions taken by
                            users on third-party platforms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-yellow-400 mb-2">
                            Children’s Information
                        </h2>
                        <p>
                            Moviela does not knowingly collect any personal identifiable
                            information from children under the age of 13. If you believe
                            that a child has provided personal information on our website,
                            please contact us and we will take appropriate action.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-yellow-400 mb-2">
                            Consent
                        </h2>
                        <p>
                            By using our website, you hereby consent to this Privacy Policy
                            and agree to its terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-yellow-400 mb-2">
                            Contact Us
                        </h2>
                        <p>
                            If you have any questions, concerns, or requests regarding
                            this Privacy Policy, you may contact us at:
                        </p>
                        <p className="mt-1 font-semibold text-gray-100">
                            support@moviela.com
                        </p>
                    </section>

                </div>
            </div>

            {/* <AdBanner /> */}
        </div>
    );
}