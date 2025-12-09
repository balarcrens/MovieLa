import Skeleton from "./UI/skeleton";

export function SkeletonCard() {
    return (
        <div className="bg-[#1a1a1a] rounded-2xl overflow-hidden border border-[#2a2a2a]">

            {/* Poster Skeleton */}
            <div className="w-full aspect-[2/3]">
                <Skeleton className="w-full h-full rounded-none" />
            </div>

            {/* Text Area Skeleton */}
            <div className="p-4 space-y-3">
                <Skeleton className="h-4 w-[90%]" />
                <Skeleton className="h-3 w-[70%]" />

                <div className="flex justify-between items-center mt-2">
                    <Skeleton className="h-3 w-[40%]" />
                    <Skeleton className="h-4 w-4 rounded-full" />
                </div>
            </div>
        </div>
    );
}
