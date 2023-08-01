import styles from './storySection.module.css';
import { ProfileIcon } from '../ProfileIcon';
import { useStore } from '@/store';

export function StorySection() {
    const posts = useStore((state) => state.posts);

    return (
        <section className={styles.storySection}>
            <div className={styles.storySection__wrapper}>
                {posts.map((post) => {
                    return (
                        <div
                            className={styles.storySection__story}
                            key={post.id}
                        >
                            <div className={styles.storySection__story__image}>
                                <figure className={styles.imageContainer}>
                                    <ProfileIcon
                                        src={post.user.profile_image.medium}
                                        hasStory={true}
                                        size={64}
                                        username={post.user.username}
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
