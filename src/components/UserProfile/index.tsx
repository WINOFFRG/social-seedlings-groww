import { User } from '@/types';
import { ProfileIcon } from '../ProfileIcon';
import styles from './userProfile.module.css';
import { PhotoPost } from '../Post';

export function UserProfile({ user }: { user: User }) {
    return (
        <>
            <section className={styles.userProfileSection}>
                <div className={styles.profile__leftSection}>
                    <ProfileIcon src={user.profile_image.large} size={100} />
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
            <div className={styles.profile__bottomSection}>
                {user.photos.map((photo) => (
                    <PhotoPost post={photo} withMeta={false} size={200} />
                ))}
            </div>
        </>
    );
}
