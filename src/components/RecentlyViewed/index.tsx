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
    const requestedUsers = useStore((state) => state.requestedUsers);
    const addRequestedUser = useStore((state) => state.addRequestedUser);
    const removeRequestedUser = useStore((state) => state.removeRequestedUser);
    const [isFollowed, setIsFollowed] = useState(
        requestedUsers.includes(user.id),
    );

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
                    onClick={() => {
                        setIsFollowed(!isFollowed);

                        if (isFollowed) {
                            removeRequestedUser(user.id);
                        } else {
                            addRequestedUser(user.id);
                        }
                    }}
                    style={{
                        color: isFollowed ? '#a6a6a6' : '#0095f6',
                    }}
                    aria-label={isFollowed ? 'Following' : 'Follow'}
                >
                    {isFollowed ? 'Following' : 'Follow'}
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
        if (cache.size === 0) {
            recentUsers.reverse().forEach((user) => {
                if (cache.has(user.id)) return;
                cache.set(user.id, user);
            });
        }
    }, []);

    useEffect(() => {
        const currentUsers: User[] = [];
        const uniqueUsers = new Set();

        // @ts-ignore
        cache.forEach((value: User, key) => {
            if (uniqueUsers.has(value.id)) return;
            currentUsers.push(value);
            uniqueUsers.add(value.id);
        });

        setCachedUsers(currentUsers);
        setRecentUsers(currentUsers);
    }, [router.asPath, setRecentUsers]);

    return (
        <section className={styles.contentWrapper}>
            <div className={styles.sidebar__upperSection}>
                <h2 className={styles.title}>Recently Viewed</h2>
                {cachedUsers.length === 0 && (
                    <div className={styles.subtitle}>
                        Click on a user photo to see their profile!
                    </div>
                )}
                {isClient && (
                    <div className={styles.contentWrapper__container}>
                        {cachedUsers.map((user: User) => (
                            <UserProfile user={user} key={user.id} />
                        ))}
                    </div>
                )}
            </div>
            <div className={styles.sidebar__lowerSection}>
                <Link
                    href="https://github.com/winoffrg"
                    aria-label="Github"
                    title="Github"
                    target="_blank"
                >
                    <GithubIcon />
                </Link>
                <Affix />
            </div>
            <span className={styles.footerText}>
                Made with ❤️ by &nbsp;
                <Link
                    title="winoffrg on LinkedIn"
                    style={{
                        textDecoration: 'underline',
                    }}
                    href={'https://linkedin.com/in/winoffrg'}
                    target="_blank"
                >
                    @winoffrg
                </Link>
            </span>
        </section>
    );
}

// Keep this as low as possible because hook causes re-render on every scroll
function Affix() {
    const [{ y }, scrollTo] = useWindowScroll();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (y > window.innerHeight * 1) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }, [y]);

    return (
        isVisible && (
            <button
                className={styles.carouselButton}
                onClick={() => scrollTo({ x: 0, y: 0 })}
                aria-label="Scroll to top"
                title="Scroll to top"
            >
                <ChevronDownIcon />
            </button>
        )
    );
}
