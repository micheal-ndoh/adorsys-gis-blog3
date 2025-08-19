export function Spinner({ size = 'sm', label }: { size?: 'xs' | 'sm' | 'md' | 'lg'; label?: string }) {
    return (
        <div role="status" aria-live="polite" aria-label={label ?? 'Loading'}>
            <span className={`loading loading-${size}`} />
        </div>
    );
}


