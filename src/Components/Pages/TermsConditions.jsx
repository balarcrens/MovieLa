// import AdBanner from "../AdBanner";

export default function TermsConditions() {
    return (
        <>
            <Helmet>
                <title>Terms & Conditions | Moviela</title>

                <meta
                    name="description"
                    content="Read Moviela’s terms and conditions to understand the rules, responsibilities, and policies for using our website and services."
                />

                <meta name="robots" content="index, follow" />

                <link
                    rel="canonical"
                    href="https://moviela.vercel.app/terms-conditions"
                />

                {/* Open Graph (optional but recommended) */}
                <meta property="og:title" content="Terms & Conditions | Moviela" />
                <meta
                    property="og:description"
                    content="Review the terms and conditions governing the use of Moviela, including content policies, liability disclaimers, and third-party services."
                />
                <meta
                    property="og:url"
                    content="https://moviela.vercel.app/terms-conditions"
                />
                <meta property="og:type" content="website" />
            </Helmet>

            <div className="bg-[#0b0b0b] min-h-screen">
                <div className="max-w-4xl mx-auto px-5 sm:px-6 py-10 text-gray-300">

                    {/* Page Header */}
                    <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-yellow-400">
                        Terms & Conditions
                    </h1>
                    <p className="text-sm text-gray-400 mb-8">
                        Last updated: {new Date().getFullYear()}
                    </p>

                    <div className="space-y-8 leading-relaxed">

                        <section>
                            <p>
                                Welcome to <span className="font-semibold text-gray-100">Moviela</span>.
                                By accessing or using this website, you agree to comply with
                                and be bound by these Terms & Conditions. If you do not agree
                                with any part of these terms, please discontinue use of our
                                website.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-yellow-400 mb-2">
                                Use of the Website
                            </h2>
                            <p>
                                Moviela provides movie-related information, metadata, and
                                references sourced from publicly available platforms. You
                                agree to use this website only for lawful purposes and in a
                                manner that does not infringe the rights of others or restrict
                                their use of the website.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-yellow-400 mb-2">
                                Content & Intellectual Property
                            </h2>
                            <p>
                                All original content on Moviela, including website design,
                                layout, branding, and text, is owned by or licensed to us.
                                Unauthorized copying, reproduction, or redistribution of our
                                proprietary content is prohibited.
                            </p>
                            <p className="mt-2">
                                Media content such as posters, images, or references belongs
                                to their respective copyright owners. Moviela does not claim
                                ownership of any third-party media.
                            </p>
                        </section>

                        <section className="border border-yellow-500/20 bg-yellow-500/5 rounded-lg p-4">
                            <h2 className="text-xl font-semibold text-yellow-400 mb-2">
                                External Links & Third-Party Platforms
                            </h2>
                            <p>
                                Moviela may include links or references to third-party
                                platforms and services. We do not host, control, or manage
                                external websites and are not responsible for their content,
                                availability, or practices.
                            </p>
                            <p className="mt-2">
                                Users interact with third-party platforms at their own
                                discretion and risk.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-yellow-400 mb-2">
                                Disclaimer of Liability
                            </h2>
                            <p>
                                Moviela is provided on an “as-is” and “as-available” basis.
                                We make no warranties regarding accuracy, reliability, or
                                availability of the website.
                            </p>
                            <p className="mt-2">
                                We shall not be liable for any direct, indirect, incidental,
                                or consequential damages arising from the use of this website,
                                including issues related to third-party services, content, or
                                external links.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-yellow-400 mb-2">
                                Advertising & Google AdSense
                            </h2>
                            <p>
                                Moviela displays advertisements through third-party advertising
                                networks such as Google AdSense. These services may use cookies
                                and similar technologies to display relevant ads.
                            </p>
                            <p className="mt-2">
                                Users can manage ad personalization through Google Ads
                                Settings.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-yellow-400 mb-2">
                                Modifications to Terms
                            </h2>
                            <p>
                                We reserve the right to update or modify these Terms &
                                Conditions at any time. Changes will be effective immediately
                                upon posting. Continued use of the website constitutes
                                acceptance of the updated terms.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-yellow-400 mb-2">
                                Governing Law
                            </h2>
                            <p>
                                These Terms & Conditions shall be governed and interpreted in
                                accordance with applicable laws. Any disputes shall be subject
                                to the jurisdiction of the appropriate courts.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-yellow-400 mb-2">
                                Contact Information
                            </h2>
                            <p>
                                If you have any questions regarding these Terms & Conditions,
                                please contact us at:
                            </p>
                            <p className="mt-1 font-semibold text-gray-100">
                                support@moviela.com
                            </p>
                        </section>

                    </div>
                </div>

                {/* <AdBanner /> */}
            </div>
        </>
    );
}