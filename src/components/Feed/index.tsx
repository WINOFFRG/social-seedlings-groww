import styles from './feed.module.css';
import { PhotoPost } from '../Post';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { useLoadItems } from '@/hooks/useLoadMore';
import { useStore } from '@/store';
import { unsplashFetch } from '@/utils';
import { InfiniteScroll } from '../InfiniteScroll';
import { useCallback, useEffect, useState } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Posts } from '@/types';

export function HomeFeed({ posts }: { posts: Posts }) {
    const setPosts = useStore((state) => state.setPosts);

    const getMoreItems = useCallback((page: number) => {
        return async () => {
            return unsplashFetch(`/photos`, `page=${page}`);
        };
    }, []);

    const { loading, items, hasNextPage, error, loadMore } = useLoadItems(
        getMoreItems,
        posts,
    );

    useEffect(() => {
        setPosts(items);
    }, [items, setPosts]);

    const [elementRef] = useInfiniteScroll({
        loading,
        hasNextPage,
        onLoadMore: loadMore,
        disabled: !!error,
        rootMargin: '0px 0px 400px 0px',
    });

    const isMobile = useMediaQuery('(max-width: 768px)');
    const [newWidth, setNewWidth] = useState(400);

    useEffect(() => {
        if (isMobile) {
            setNewWidth(350);
        }
    }, [isMobile]);

    return (
        <div>
            <div className={styles.feedContainer}>
                {items.map((post, index) => {
                    // const newWidth = isMobile ? 300 : 400;
                    const newHeight = (newWidth * post.height) / post.width;

                    return (
                        <PhotoPost
                            key={`${post.id}:${index}`}
                            post={post}
                            height={newHeight}
                            width={newWidth}
                        />
                    );
                })}
            </div>
            {
                <InfiniteScroll
                    ref={elementRef}
                    loading={loading}
                    error={error}
                />
            }
        </div>
    );
}
