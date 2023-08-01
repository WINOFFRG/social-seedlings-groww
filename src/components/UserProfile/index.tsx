import { UserProfileProps } from '@/types';
import { ProfileIcon } from '../ProfileIcon';
import styles from './userProfile.module.css';
import { PhotoPost } from '../Post';
import { useStore } from '@/store';
import { useIsClient } from '@/hooks/useIsClient';

export function UserProfile({ user, userPhotos }: UserProfileProps) {
    const view = useStore((state) => state.view);
    const isClient = useIsClient();

    return (
        <>
            <section className={styles.userProfileSection}>
                <div className={styles.profile__leftSection}>
                    <ProfileIcon user={user} size={128} />
                </div>
                <div className={styles.profile__rightSection}>
                    <span className={styles.welcomeTitle}>
                        @ {user.username}
                    </span>
                    <div className={styles.profileSection_userStats}>
                        <span>Posts {user.total_photos}</span>|
                        <span>Followers {user.followers_count}</span>|
                        <span>Following {user.following_count}</span>
                    </div>
                    <div className={styles.profileSection_userBio}>
                        <span className={styles.userBio__name}>
                            {user.name}
                        </span>
                        <span className={styles.userBio__bio}>{user.bio}</span>
                        <span className={styles.userBio__location}>
                            {user.location}
                        </span>
                    </div>
                </div>
            </section>
            {isClient && (
                <>
                    <DividerArea />
                    <div
                        className={
                            view === 'grid'
                                ? styles.profile__bottomSectionGrid
                                : styles.profile__bottomSectionList
                        }
                    >
                        {userPhotos.map((photo) => (
                            <PhotoPost
                                post={photo}
                                withMeta={view === 'list'}
                                size={view === 'grid' ? 300 : 500}
                                key={photo.id}
                            />
                        ))}
                    </div>
                </>
            )}
        </>
    );
}

export function DividerArea() {
    const view = useStore((state) => state.view);
    const setView = useStore((state) => state.setView);

    const ButtonSet = ({ children, set }) => {
        return (
            <button
                className={`${styles.profile__viewButton} 
        ${set === view ? styles.profile__viewButton_active : ''}`}
                onClick={() => {
                    setView(set);
                }}
            >
                {children}
            </button>
        );
    };

    return (
        <>
            <div className={styles.buttonsWrapper}>
                <ButtonSet set={'list'}>List View</ButtonSet>
                <ButtonSet set={'grid'}>Grid View</ButtonSet>
            </div>
            <hr className={styles.divider} />
        </>
    );
}
