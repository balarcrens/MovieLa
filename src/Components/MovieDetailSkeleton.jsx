import Skeleton from "./UI/skeleton";

export default function MovieDetailSkeleton() {
    return (
        <div className="bg-black min-h-screen text-white px-2 sm:px-4 py-8 animate-pulse">

            {/* Breadcrumb */}
            <div className="max-w-4xl mx-auto mb-6">
                <Skeleton className="h-4 w-48" />
            </div>

            {/* Title */}
            <div className="max-w-4xl mx-auto text-center space-y-3 mb-6">
                <Skeleton className="h-8 w-3/4 mx-auto" />
                <Skeleton className="h-6 w-1/2 mx-auto" />
            </div>

            {/* Poster */}
            <div className="flex justify-center mb-6">
                <Skeleton className="h-[500px] w-[330px] rounded-lg" />
            </div>

            {/* Info Grid */}
            <div className="max-w-4xl mx-auto">
                <Skeleton className="h-6 w-[250px] mx-auto mb-4" />

                <div className="grid sm:grid-cols-2 gap-4 p-4">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <Skeleton key={i} className="h-4 w-full" />
                    ))}
                </div>
            </div>

            {/* Description */}
            <div className="max-w-4xl mx-auto mt-6 space-y-2">
                <Skeleton className="h-6 w-56 mx-auto" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-11/12" />
                <Skeleton className="h-4 w-10/12" />
            </div>

            {/* Screenshots */}
            <div className="max-w-4xl mx-auto mt-6 grid sm:grid-cols-2 gap-4">
                <Skeleton className="h-52 w-full" />
                <Skeleton className="h-52 w-full" />
            </div>

            {/* Download Buttons */}
            <div className="max-w-4xl mx-auto mt-6 space-y-3">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
            </div>

            {/* Related Movies */}
            <div className="max-w-4xl mx-auto mt-10">
                <Skeleton className="h-6 w-56 mx-auto mb-4" />
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Skeleton key={i} className="h-52 w-full rounded" />
                    ))}
                </div>
            </div>

        </div>
    );
}
