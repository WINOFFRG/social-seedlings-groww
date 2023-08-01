import { getPosts } from '@/api/posts';
import styles from './recentlyViewed.module.css';
import { ProfileIcon } from '../ProfileIcon';
import { useState } from 'react';
import { useWindowScroll } from '@/hooks/useWindowsScroll';
import { ChevronDownIcon, GithubIcon } from '../Icons';
import Link from 'next/link';

function UserProfile({
    user,
}: {
    user: ReturnType<typeof getPosts>[number]['user'];
}) {
    const [isFollowed, setIsFollowed] = useState(false);

    return (
        <div className={styles.contentWrapper__container__item}>
            <div className={styles.contentWrapper__leftSection}>
                <ProfileIcon
                    src={user.profile_image.medium}
                    size={42}
                    // isOnline={Math.random() > 0.5}
                    // hasStory={Math.random() > 0.5}
                />
                <div className={styles.userProfile_desc}>
                    <h3>{user.username}</h3>
                    <p>Followed By</p>
                </div>
            </div>
            <div className={styles.contentWrapper__rightSection}>
                <button
                    className={styles.followBtn}
                    onClick={() => setIsFollowed(!isFollowed)}
                    style={{
                        color: isFollowed ? '#a6a6a6' : '#0095f6',
                    }}
                >
                    {isFollowed ? 'Requested' : 'Follow'}
                </button>
            </div>
        </div>
    );
}

export function RecentlyViewed() {
    const posts = getPosts();

    const [, scrollTo] = useWindowScroll();

    return (
        <section className={styles.contentWrapper}>
            <div className={styles.sidebar__upperSection}>
                <h2 className={styles.title}>Recently Viewed</h2>
                <div className={styles.contentWrapper__container}>
                    {posts.map((post) => (
                        <UserProfile user={post.user} key={post.id} />
                    ))}
                </div>
            </div>
            <div className={styles.sidebar__lowerSection}>
                <button
                    className={styles.carouselButton}
                    onClick={() => scrollTo({ x: 0, y: 0 })}
                >
                    <ChevronDownIcon />
                </button>
                <Link href="https://github.com/winoffrg">
                    <GithubIcon />
                </Link>
            </div>
        </section>
    );
}
