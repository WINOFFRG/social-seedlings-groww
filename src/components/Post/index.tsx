import styles from './post.module.css';
import Image from 'next/image';
import {
    CommentsIcon,
    HeartIcon,
    RibbonSave,
    ShareIcon,
    SolarMenuDotsBoldDuotone,
} from '../Icons';
import { forwardRef, useState } from 'react';
import { Blurhash } from 'react-blurhash';
import { ProfileIcon } from '../ProfileIcon';
import { formatNumberWithCommas, hexToRGBA, timeAgo } from '@/utils';
import { Post, UserPhoto } from '@/types';

interface PostProps {
    post: Post | UserPhoto;
    withMeta?: boolean;
    size?: number;
}

interface MetaProps {
    post: Post | UserPhoto;
}

// eslint-disable-next-line react/display-name
export const PhotoPost = forwardRef<HTMLImageElement, PostProps>(
    ({ post, withMeta = true, size = 400, ...props }, ref) => {
        const [isPostLoaded, setIsPostLoaded] = useState(false);

        return (
            <article className={styles.Illustration}>
                {withMeta && <PostHeader post={post} />}
                <div className={styles.postImage__wrapper}>
                    <Image
                        ref={ref}
                        loading="lazy"
                        src={post.urls.regular}
                        alt={post.alt_description ?? 'Post Image'}
                        width={size}
                        height={size}
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
                        height={size}
                        width={size}
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
    return (
        <header
            className={styles.postHeader}
            style={{
                background: `linear-gradient(90deg, ${post.color}, transparent)`,
            }}
        >
            <button className={styles.postHeader__leftSection}>
                <ProfileIcon size={42} user={post.user} />
                <div className={styles.postHeader__userInfo}>
                    <span>{post.user.name}</span>
                    <span>&nbsp; &bull;</span>
                    <span>&nbsp; {timeAgo(post.created_at)} ago</span>
                </div>
            </button>
            <div className={styles.postHeader__rightSection}>
                <button className={styles.postFooter__iconButton}>
                    <SolarMenuDotsBoldDuotone />
                </button>
            </div>
        </header>
    );
}

export function PostFooter({ post }: MetaProps) {
    const [isLiked, setIsLiked] = useState(false);

    console.log(post);

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
                        }}
                    >
                        <HeartIcon liked={isLiked} />
                    </button>
                    <button
                        className={`${styles.postFooter__iconButton} ${styles.commentButton}`}
                    >
                        <CommentsIcon />
                    </button>
                    <button
                        className={`${styles.postFooter__iconButton} ${styles.shareButton}`}
                    >
                        <ShareIcon />
                    </button>
                </div>
                <div className={styles.postFooter__rightSection}>
                    <button
                        className={
                            styles.postFooter__iconButton +
                            ' ' +
                            styles.saveButton
                        }
                    >
                        <RibbonSave />
                    </button>
                </div>
            </div>
            <div className={styles.postLikes}>
                {formatNumberWithCommas(isLiked ? post.likes + 1 : post.likes)}{' '}
                likes
            </div>
            <div className={styles.postCaption}>
                {post.description ?? post.alt_description}
            </div>
        </footer>
    );
}
