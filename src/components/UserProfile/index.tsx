import { UserProfileProps } from '@/types';
import { ProfileIcon } from '../ProfileIcon';
import styles from './userProfile.module.css';
import { UserGallery } from './Gallery';

export function UserProfile({ user, userPhotos }: UserProfileProps) {
    return (
        <>
            <section className={styles.userProfileSection}>
                <div className={styles.profile__leftSection}>
                    <ProfileIcon user={user} size={128} withLink={false} />
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
            <UserGallery userPhotos={userPhotos} user={user} />
        </>
    );
}
