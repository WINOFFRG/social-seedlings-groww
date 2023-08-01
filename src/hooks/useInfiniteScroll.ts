import { useEffect } from 'react';
import {
    useTrackVisibility,
    IntersectionObserverHookArgs,
    IntersectionObserverHookRefCallback as UseInfiniteScrollHookRefCallback,
    IntersectionObserverHookRootRefCallback as UseInfiniteScrollHookRootRefCallback,
} from 'react-intersection-observer-hook';

export {
    UseInfiniteScrollHookRefCallback,
    UseInfiniteScrollHookRootRefCallback,
};

export type UseInfiniteScrollHookResult = [
    UseInfiniteScrollHookRefCallback,
    { rootRef: UseInfiniteScrollHookRootRefCallback },
];

export type UseInfiniteScrollHookArgs = Pick<
    IntersectionObserverHookArgs,
    'rootMargin'
> & {
    loading: boolean;
    hasNextPage: boolean;
    onLoadMore: VoidFunction;
    disabled?: boolean;
    delayInMs?: number;
};

function useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore,
    rootMargin,
    disabled,
    delayInMs = 100,
}: UseInfiniteScrollHookArgs): UseInfiniteScrollHookResult {
    const [ref, { rootRef, isVisible }] = useTrackVisibility({
        rootMargin,
    });

    const shouldLoadMore = !disabled && !loading && isVisible && hasNextPage;

    useEffect(() => {
        if (shouldLoadMore) {
            const timer = setTimeout(() => {
                onLoadMore();
            }, delayInMs);
            return () => {
                clearTimeout(timer);
            };
        }
    }, [onLoadMore, shouldLoadMore, delayInMs]);

    return [ref, { rootRef }];
}

export default useInfiniteScroll;
