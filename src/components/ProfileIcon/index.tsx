import Image from 'next/image';
import styles from './profileIcon.module.css';
import Link from 'next/link';
import { cache } from '@/utils';
import { User } from '@/types';

interface ProfileIconProps {
    user: User;
    size?: number;
    username?: string;
    withLink?: boolean;
    showOnline?: boolean;
    showStory?: boolean;
}

export function ProfileIcon({
    user,
    size = 60,
    withLink = true,
    showOnline = false,
    showStory = true,
}: ProfileIconProps) {
    const isOnline = showOnline && user.accepted_tos;
    const hasStory = showStory && !user.accepted_tos;

    const InnerSet = () => (
        <div className={styles.image_outer_container}>
            {isOnline && <div className={styles.green_icon} />}
            <div
                className={styles.image_inner_container}
                style={{
                    height: size,
                    width: size,
                    ...(!hasStory && {
                        padding: 0,
                        background: 'transparent',
                    }),
                }}
            >
                <Image
                    src={user.profile_image.large}
                    height={size}
                    width={size}
                    alt=""
                    style={{
                        borderRadius: '50%',
                        ...(!hasStory && {
                            border: 0,
                        }),
                    }}
                />
            </div>
        </div>
    );

    if (withLink) {
        return (
            <Link
                className={styles.iconWrapper}
                href={user.username ? `/user/${user.username}` : '/'}
                onClick={() => {
                    cache.set(user.username, user);
                }}
            >
                <InnerSet />
            </Link>
        );
    }

    return (
        <div className={styles.iconWrapper}>
            <InnerSet />
        </div>
    );
}
