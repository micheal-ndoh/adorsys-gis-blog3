import { twMerge } from 'tailwind-merge';

export function Skeleton({ className }: { className?: string }) {
    return <div className={twMerge('skeleton bg-base-300', className)} aria-hidden="true" />;
}

export function ArticleSkeleton() {
    return (
        <div className="prose prose-neutral lg:prose-xl mx-auto mt-8">
            <Skeleton className="h-10 w-2/3 mb-6" />
            <Skeleton className="h-5 w-full mb-3" />
            <Skeleton className="h-5 w-11/12 mb-3" />
            <Skeleton className="h-5 w-10/12 mb-3" />
            <Skeleton className="h-64 w-full mt-6" />
        </div>
    );
}

export function CardSkeleton() {
    return (
        <div className="card border rounded-lg p-4">
            <Skeleton className="h-32 w-full mb-4" />
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
        </div>
    );
}


