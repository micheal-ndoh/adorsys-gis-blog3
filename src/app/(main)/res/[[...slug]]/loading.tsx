import { Container } from '@blog/components/container';
import { ArticleSkeleton } from '@blog/components/loading/skeleton';

export default function LoadingRes() {
    return (
        <Container>
            <ArticleSkeleton />
        </Container>
    );
}


