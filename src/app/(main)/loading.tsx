import { Spinner } from '@blog/components/loading/spinner';

export default function LoadingMain() {
    return (
        <div className="flex items-center justify-center min-h-[30vh]">
            <Spinner size="md" />
        </div>
    );
}


