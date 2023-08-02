import styles from './recentlyViewed.module.css';
import { ProfileIcon } from '../ProfileIcon';
import { useEffect, useState } from 'react';
import { useWindowScroll } from '@/hooks/useWindowsScroll';
import { ChevronDownIcon, GithubIcon } from '../Icons';
import Link from 'next/link';
import { cache } from '@/utils';
import { User } from '@/types';
import { useStore } from '@/store';
import { useRouter } from 'next/router';
import { useIsClient } from '@/hooks/useIsClient';

function UserProfile({ user }: { user: User }) {
    const [isFollowed, setIsFollowed] = useState(false);

    return (
        <div className={styles.contentWrapper__container__item}>
            <div className={styles.contentWrapper__leftSection}>
                <ProfileIcon user={user} size={42} showOnline />
                <div className={styles.userProfile_desc}>
                    <h3>{user.username}</h3>
                    <p>{user.name}</p>
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
    const [cachedUsers, setCachedUsers] = useState<User[]>([]);
    const recentUsers = useStore((state) => state.recentUsers);
    const setRecentUsers = useStore((state) => state.setRecentUsers);
    const isClient = useIsClient();

    const router = useRouter();

    useEffect(() => {
        recentUsers.forEach((user) => {
            if (cache.has(user.id)) return;
            cache.set(user.id, user);
        });
    }, []);

    useEffect(() => {
        const currentUsers: User[] = [];
        const uniqueUsers = new Set();

        // @ts-ignore
        cache.forEach((value: User) => {
            if (uniqueUsers.has(value.id)) return;
            currentUsers.push(value);
            uniqueUsers.add(value.id);
        });

        setCachedUsers(currentUsers);
        setRecentUsers(currentUsers);

        return () => {
            console.log('[RecentlyViewed] Unmounted');
        };
    }, [router.asPath, setRecentUsers]);

    return (
        <section className={styles.contentWrapper}>
            <div className={styles.sidebar__upperSection}>
                <h2 className={styles.title}>Recently Viewed</h2>
                {isClient && (
                    <div className={styles.contentWrapper__container}>
                        {cachedUsers.map((user: User) => (
                            <UserProfile user={user} key={user.id} />
                        ))}
                    </div>
                )}
            </div>
            <div className={styles.sidebar__lowerSection}>
                <Affix />
                <Link href="https://github.com/winoffrg">
                    <GithubIcon />
                </Link>
            </div>
            <span className={styles.footerText}>Made with ❤️ by @winoffrg</span>
        </section>
    );
}

// Keep this as low as possible because hook causes re-render on every scroll
function Affix() {
    const [, scrollTo] = useWindowScroll();

    return (
        <button
            className={styles.carouselButton}
            onClick={() => scrollTo({ x: 0, y: 0 })}
        >
            <ChevronDownIcon />
        </button>
    );
}
