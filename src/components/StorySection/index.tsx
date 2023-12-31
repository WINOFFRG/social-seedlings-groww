import styles from './storySection.module.css';
import { ProfileIcon } from '../ProfileIcon';
import { useStore } from '@/store';

export function StorySection() {
    const posts = useStore((state) => state.posts);
    const uniqueUsers = new Set();

    return (
        <section className={styles.storySection}>
            <div className={styles.storySection__wrapper}>
                {posts.map((post) => {
                    if (uniqueUsers.has(post.user.username)) {
                        return null;
                    }

                    uniqueUsers.add(post.user.username);

                    return (
                        <div
                            className={styles.storySection__story}
                            key={post.id}
                        >
                            <div className={styles.storySection__story__image}>
                                <figure
                                    className={styles.imageContainer}
                                    title={post.user.username}
                                >
                                    <ProfileIcon
                                        size={64}
                                        user={post.user}
                                        showStory={true}
                                    />
                                    <figcaption
                                        className={
                                            styles.storySection__storyCaption
                                        }
                                    >
                                        {post.user.username}
                                    </figcaption>
                                </figure>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
