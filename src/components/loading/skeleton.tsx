import { twMerge } from 'tailwind-merge';

export function Skeleton({ className }: { className?: string }) {
    return <div className={twMerge('skeleton bg-base-300', className)} aria-hidden="true" />;
}

export function ArticleSkeleton() {
    return (
        <div className="prose prose-neutral mx-auto mt-6 sm:mt-8 px-4 sm:px-0 text-justify">
            <Skeleton className="h-8 sm:h-10 w-2/3 mb-4 sm:mb-6" />
            <Skeleton className="h-4 sm:h-5 w-full mb-2 sm:mb-3" />
            <Skeleton className="h-4 sm:h-5 w-11/12 mb-2 sm:mb-3" />
            <Skeleton className="h-4 sm:h-5 w-10/12 mb-2 sm:mb-3" />
            <Skeleton className="h-48 sm:h-64 w-full mt-4 sm:mt-6" />
        </div>
    );
}

export function CardSkeleton() {
    return (
        <div className="card border rounded-lg p-3 sm:p-4">
            <Skeleton className="h-24 sm:h-32 w-full mb-3 sm:mb-4" />
            <Skeleton className="h-5 sm:h-6 w-3/4 mb-2" />
            <Skeleton className="h-3 sm:h-4 w-1/2" />
        </div>
    );
}


