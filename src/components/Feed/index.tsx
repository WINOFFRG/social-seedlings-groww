import styles from './feed.module.css';
import { PhotoPost } from '../Post';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { useLoadItems } from '@/hooks/useLoadMore';
import { useStore } from '@/store';
import { unsplashFetch } from '@/utils';
import { InfiniteScroll } from '../InfiniteScroll';
import { useCallback } from 'react';

export function HomeFeed() {
    const posts = useStore((state) => state.posts);

    const getMoreItems = useCallback((page: number) => {
        return async () => {
            return unsplashFetch(`/photos`, `page=${page}`);
        };
    }, []);

    const { loading, items, hasNextPage, error, loadMore } = useLoadItems(
        getMoreItems,
        posts,
    );

    const [elementRef] = useInfiniteScroll({
        loading,
        hasNextPage,
        onLoadMore: loadMore,
        disabled: !!error,
        rootMargin: '0px 0px 400px 0px',
    });

    return (
        <>
            <div className={styles.feedContainer}>
                {items.map((post, index) => {
                    return (
                        <PhotoPost key={`${post.id}:${index}`} post={post} />
                    );
                })}
            </div>
            <InfiniteScroll ref={elementRef} loading={loading} error={error} />
        </>
    );
}
