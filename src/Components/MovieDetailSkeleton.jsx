import Skeleton from "./UI/skeleton";

export default function MovieDetailSkeleton() {
    return (
        <div className="bg-black min-h-screen text-white px-3 sm:px-5 py-8">
            {/* ================= BREADCRUMB ================= */}
            <div className="max-w-5xl mx-auto mb-5">
                <Skeleton className="h-4 w-64" />
            </div>

            {/* ================= HERO SECTION ================= */}
            <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 mb-12">
                {/* Poster */}
                <div className="flex justify-center">
                    <Skeleton className="h-[460px] w-[300px] rounded-xl" />
                </div>

                {/* Info */}
                <div className="md:col-span-2 space-y-4">
                    <Skeleton className="h-10 w-3/4" />

                    <div className="flex flex-wrap gap-3">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <Skeleton key={i} className="h-4 w-20" />
                        ))}
                    </div>

                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-11/12" />
                        <Skeleton className="h-4 w-10/12" />
                    </div>

                    <div className="flex gap-4 pt-2">
                        <Skeleton className="h-10 w-40 rounded-lg" />
                        <Skeleton className="h-10 w-40 rounded-lg" />
                    </div>
                </div>
            </div>

            {/* ================= DETAILS ================= */}
            <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-4 mb-10">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div
                        key={i}
                        className="bg-[#141414] border border-white/5 rounded-lg p-4 space-y-2"
                    >
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-5 w-3/4" />
                    </div>
                ))}
            </div>

            {/* ================= DESCRIPTION ================= */}
            <section className="max-w-4xl mx-auto space-y-8 mb-12">
                <div className="space-y-3">
                    <Skeleton className="h-7 w-48" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-11/12" />
                    <Skeleton className="h-4 w-10/12" />
                </div>

                <div className="space-y-3">
                    <Skeleton className="h-7 w-48" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-11/12" />
                    <Skeleton className="h-4 w-10/12" />
                </div>
            </section>

            {/* ================= SCREENSHOTS ================= */}
            <div className="max-w-5xl mx-auto mb-12">
                <Skeleton className="h-8 w-48 mx-auto mb-5" />
                <div className="grid sm:grid-cols-2 gap-4">
                    <Skeleton className="h-52 w-full rounded-lg" />
                    <Skeleton className="h-52 w-full rounded-lg" />
                </div>
            </div>

            {/* ================= DOWNLOAD ================= */}
            <div className="max-w-4xl mx-auto my-10 px-3">
                <div className="border border-gray-700 rounded-md overflow-hidden">
                    <Skeleton className="h-14 w-full" />
                    <div className="py-6 flex flex-col items-center gap-3">
                        <Skeleton className="h-4 w-64" />
                        <Skeleton className="h-6 w-80" />
                    </div>
                </div>
            </div>

            {/* ================= TRAILER ================= */}
            <div className="max-w-4xl mx-auto my-10 space-y-3">
                <Skeleton className="h-7 w-3/4 mx-auto" />
                <Skeleton className="h-[350px] w-full rounded-lg" />
            </div>

            {/* ================= RELATED ================= */}
            <div className="max-w-5xl mx-auto mb-12">
                <Skeleton className="h-8 w-56 mx-auto mb-6" />
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Skeleton key={i} className="h-56 w-full rounded-lg" />
                    ))}
                </div>
            </div>
        </div>
    );
}