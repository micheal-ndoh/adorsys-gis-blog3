import { Container } from '@blog/components/container';
import { ArticleSkeleton, Skeleton } from '@blog/components/loading/skeleton';

export default function LoadingBlog() {
    return (
        <Container>
            <div className="mb-8">
                <Skeleton className="h-64 w-full" />
            </div>
            <ArticleSkeleton />
        </Container>
    );
}


