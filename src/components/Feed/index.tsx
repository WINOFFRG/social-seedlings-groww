import { getPosts } from '@/api/posts';
import styles from './feed.module.css';
import { PhotoPost } from '../Post';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { useLoadItems } from '@/hooks/useLoadMore';
import { useStore } from '@/store';
import { LoadingDots } from '../Loading';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export function HomeFeed() {
    const posts = useStore((state) => state.posts);

    const getMoreItems = async (page, limit) => {
        const posts = await getPosts();
        return posts;
    };

    const { loading, items, hasNextPage, error, loadMore, page } = useLoadItems(
        getMoreItems,
        posts,
    );

    const isMobile = useMediaQuery('(min-width: 768px)');

    const [sentryRef] = useInfiniteScroll({
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
            <div className={styles.feedContainer__loadMore} ref={sentryRef}>
                {loading && <LoadingDots />}
                {error && 'Error'}
                {!hasNextPage && 'No more posts'}
            </div>
        </>
    );
}
