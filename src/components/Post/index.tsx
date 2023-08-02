import styles from './post.module.css';
import Image from 'next/image';
import {
    CommentsIcon,
    HeartIcon,
    RibbonSave,
    ShareIcon,
    DottedIcon,
} from '../Icons';
import { forwardRef, useRef, useState } from 'react';
import { Blurhash } from 'react-blurhash';
import { ProfileIcon } from '../ProfileIcon';
import { cache, formatNumberWithCommas, hexToRGBA, timeAgo } from '@/utils';
import { Post, UserPhoto } from '@/types';
import Link from 'next/link';
import { useStore } from '@/store';
import { useIsClient } from '@/hooks/useIsClient';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useTrackVisibility } from 'react-intersection-observer-hook';

interface PostProps {
    post: Post | UserPhoto;
    withMeta?: boolean;
    size?: number;
    height?: number;
    width?: number;
}

interface MetaProps {
    post: Post | UserPhoto;
}

// eslint-disable-next-line react/display-name
export const PhotoPost = forwardRef<HTMLImageElement, PostProps>(
    ({ post, withMeta = true, size = 400, width, height, ...props }, ref) => {
        const [isPostLoaded, setIsPostLoaded] = useState(false);
        const isMobile = useMediaQuery('(max-width: 768px)');
        const [rootRef, { wasEverVisible }] = useTrackVisibility({
            threshold: 0.3,
        });

        return (
            <article
                className={`${styles.Illustration} ${
                    wasEverVisible ? styles.Illustration__animated : ''
                }`}
                ref={rootRef}
            >
                {withMeta && <PostHeader post={post} />}
                <div className={styles.postImage__wrapper}>
                    <Image
                        ref={ref}
                        loading="lazy"
                        src={isMobile ? post.urls.small : post.urls.regular}
                        alt={post.alt_description ?? 'Post Image'}
                        width={width ?? size}
                        height={height ?? size}
                        onLoadingComplete={() => {
                            setIsPostLoaded(true);
                        }}
                        style={{
                            opacity: isPostLoaded ? 1 : 0,
                            zIndex: isPostLoaded ? 1 : -1,
                        }}
                        className={`${styles.postImage} ${
                            !withMeta ? styles.postImage__withMeta : ''
                        }`}
                        {...props}
                    />
                    <Blurhash
                        className={`${styles.postBlurHash} ${
                            !withMeta ? styles.postImage__withMeta : ''
                        }`}
                        hash={post.blur_hash}
                        height={height ?? size}
                        width={width ?? size}
                        style={{
                            objectFit: 'cover',
                            opacity: isPostLoaded ? 0 : 1,
                            transition: 'opacity 0.3s ease-in-out',
                        }}
                        resolutionX={32}
                        resolutionY={32}
                        punch={1}
                    />
                </div>
                {withMeta && <PostFooter post={post} />}
            </article>
        );
    },
);

export function PostHeader({ post }: MetaProps) {
    const theme = useStore((state) => state.theme);
    const isClient = useIsClient();

    return (
        <header
            className={styles.postHeader}
            style={{
                ...(isClient && {
                    background:
                        theme === 'dark'
                            ? `linear-gradient(90deg, ${post.color}, transparent)`
                            : hexToRGBA(post.color, 0.2),
                }),
            }}
        >
            <Link
                className={styles.postHeader__leftSection}
                href={post.user.username ? `/user/${post.user.username}` : '/'}
                onClick={() => {
                    cache.set(post.user.username, post.user);
                }}
            >
                <ProfileIcon size={42} user={post.user} withLink={false} />
                <div>
                    <div className={styles.postHeader__userInfo}>
                        <span>{post.user.name}</span>
                        &nbsp; &bull; &nbsp;
                        <span>{timeAgo(post.created_at)} ago</span>
                    </div>
                    <span className={styles.postHeader__subtitle}>
                        {post.user.location}
                    </span>
                </div>
            </Link>
            <div className={styles.postHeader__rightSection}>
                <button
                    className={`${styles.postFooter__iconButton} ${styles.moreButton}`}
                    aria-label="More options"
                    aria-disabled="true"
                >
                    <DottedIcon />
                </button>
            </div>
        </header>
    );
}

export function PostFooter({ post }: MetaProps) {
    const isClient = useIsClient();
    const likedPosts = useStore((state) => state.likedPosts);
    const addLikedPost = useStore((state) => state.addLikedPost);
    const removeLikedPost = useStore((state) => state.removeLikedPost);
    const [isLiked, setIsLiked] = useState(likedPosts.includes(post.id));

    return (
        <footer
            className={styles.postFooter__stacked}
            style={{
                backgroundColor: hexToRGBA(post.color, 0.2),
            }}
        >
            <div className={styles.postFooter__iconSection}>
                <div className={styles.postFooter__leftSection}>
                    <button
                        className={`${styles.postFooter__iconButton} ${styles.likeButton}`}
                        onClick={() => {
                            setIsLiked(!isLiked);

                            if (isLiked) {
                                removeLikedPost(post.id);
                            } else {
                                addLikedPost(post.id);
                            }
                        }}
                        aria-label="Like post"
                    >
                        {isClient && <HeartIcon liked={isLiked} />}
                    </button>
                    <button
                        className={`${styles.postFooter__iconButton} ${styles.commentButton}`}
                        aria-label="Comment on post"
                        aria-disabled="true"
                        disabled
                    >
                        <CommentsIcon />
                    </button>
                    <button
                        className={`${styles.postFooter__iconButton} ${styles.shareButton}`}
                        aria-label="Share post"
                        aria-disabled="true"
                        disabled
                    >
                        <ShareIcon />
                    </button>
                </div>
                <div className={styles.postFooter__rightSection}>
                    <button
                        className={`${styles.postFooter__iconButton} ${styles.saveButton}`}
                        aria-label="Save post"
                        aria-disabled="true"
                        disabled
                    >
                        <RibbonSave />
                    </button>
                </div>
            </div>
            <div className={styles.postLikes}>
                {isClient && (
                    <span>
                        {formatNumberWithCommas(
                            isLiked ? post.likes + 1 : post.likes,
                        )}{' '}
                        {post.likes < 2 ? 'like' : 'likes'}
                    </span>
                )}
            </div>
            <div className={styles.postCaption}>
                {post.description ?? post.alt_description}
            </div>
        </footer>
    );
}
