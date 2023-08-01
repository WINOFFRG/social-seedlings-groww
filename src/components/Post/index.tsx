import { getPosts } from '@/api/posts';
import styles from './post.module.css';
import Image from 'next/image';
import {
    CommentsIcon,
    HeartIcon,
    RibbonSave,
    ShareIcon,
    SolarMenuDotsBoldDuotone,
} from '../Icons';
import { useState } from 'react';
import { Blurhash } from 'react-blurhash';
import { ProfileIcon } from '../ProfileIcon';
import { formatNumberWithCommas, hexToRGBA, timeAgo } from '@/utils';
import { useRouter } from 'next/router';
import { Post } from '@/types';

export function PhotoPost({
    post,
    withMeta = true,
    size = 400,
}: {
    post: Post;
    withMeta?: boolean;
    size?: number;
}) {
    const [isPostLoaded, setIsPostLoaded] = useState(false);

    return (
        <article className={styles.Illustration}>
            {withMeta && <PostHeader post={post} />}
            <div className={styles.postImage__wrapper}>
                <Image
                    loading="lazy"
                    src={post.urls.regular}
                    alt={post.alt_description ?? 'Post Image'}
                    width={size}
                    height={size}
                    className={styles.postImage}
                    onLoadingComplete={() => {
                        setIsPostLoaded(true);
                    }}
                    style={{
                        opacity: isPostLoaded ? 1 : 0,
                        transition: 'opacity 0.3s ease-in-out',
                        zIndex: isPostLoaded ? 1 : -1,
                        position: 'absolute',
                    }}
                />
                <Blurhash
                    hash={post.blur_hash}
                    height={size}
                    width={size}
                    style={{
                        objectFit: 'cover',
                        opacity: isPostLoaded ? 0.5 : 1,
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
}

export function PostHeader({ post }: { post: Post }) {
    return (
        <header
            className={styles.postHeader}
            style={{
                background: `linear-gradient(90deg, ${post.color}, transparent)`,
            }}
        >
            <button className={styles.postHeader__leftSection}>
                <ProfileIcon
                    src={post.user.profile_image.medium}
                    hasStory={post.user.accepted_tos}
                    size={42}
                    username={post.user.username}
                />
                <div className={styles.postHeader__userInfo}>
                    <span>{post.user.name}</span>
                    <span>&nbsp; &bull;</span>
                    <span>&nbsp; {timeAgo(post.created_at)}</span>
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

export function PostFooter({
    post,
}: {
    post: ReturnType<typeof getPosts>[number];
}) {
    const [isLiked, setIsLiked] = useState(false);

    return (
        <footer
            className={styles.postFooter__stacked}
            style={{
                backgroundColor: hexToRGBA(post.color, 0.6),
            }}
        >
            <div className={styles.postFooter__iconSection}>
                <div className={styles.postFooter__leftSection}>
                    <button
                        className={
                            styles.postFooter__iconButton +
                            ' ' +
                            styles.likeButton
                        }
                        onClick={() => {
                            setIsLiked(!isLiked);
                        }}
                    >
                        <HeartIcon liked={isLiked} />
                    </button>
                    <button
                        className={
                            styles.postFooter__iconButton +
                            ' ' +
                            styles.commentsButton
                        }
                    >
                        <CommentsIcon />
                    </button>
                    <button
                        className={
                            styles.postFooter__iconButton +
                            ' ' +
                            styles.shareButton
                        }
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
                {formatNumberWithCommas(isLiked ? post.likes + 1 : post.likes)}
                &nbsp; likes &bull;&nbsp;
                {formatNumberWithCommas(post.views)} views
            </div>
            {/* <div className={styles.postCaption}></div> */}
        </footer>
    );
}
