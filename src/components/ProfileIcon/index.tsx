import Image from 'next/image';
import styles from './profileIcon.module.css';
import Link from 'next/link';

interface ProfileIconProps {
    src: string;
    isOnline?: boolean;
    hasStory?: boolean;
    size?: number;
    username?: string;
}

export function ProfileIcon({
    src,
    username,
    isOnline = false,
    hasStory = false,
    size = 60,
}: ProfileIconProps) {
    return (
        <Link
            className={styles.iconWrapper}
            href={username ? `/user/${username}` : '/'}
        >
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
                        src={src}
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
        </Link>
    );
}
