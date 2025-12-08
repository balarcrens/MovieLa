import Skeleton from "./UI/skeleton";

export function SkeletonCard() {
    return (
        <div className="relative bg-[#1a1a1a] rounded-2xl overflow-hidden border border-[#2a2a2a] animate-pulse">
            {/* Poster Skeleton */}
            <div className="w-full aspect-[2/3]">
                <Skeleton className="w-full h-full rounded-2xl" />
            </div>

            {/* Info Skeleton */}
            <div className="p-4 space-y-2">
                <Skeleton className="h-4 w-3/4 rounded" />
                <Skeleton className="h-4 w-full rounded" />
                <div className="flex justify-between items-center mt-2">
                    <Skeleton className="h-4 w-10 rounded" />
                    <Skeleton className="h-4 w-6 rounded" />
                </div>
            </div>
        </div>
    );
}