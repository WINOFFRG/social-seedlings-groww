import styles from '@/styles/Home.module.css';
import { HomeFeed } from '@/components/Feed';
import { HtmlHead } from '@/components/HtmlHead';
import { RecentlyViewed } from '@/components/RecentlyViewed';
import { StorySection } from '@/components/StorySection';
import type { GetServerSideProps } from 'next';
import { getPosts } from '@/api/posts';
import { Post, Posts } from '@/types';
import { useStore } from '@/store';

export default function Home({ posts = [] }: { posts: Posts }) {
    const setPosts = useStore((state) => state.setPosts);
    setPosts(posts);

    return (
        <>
            <HtmlHead />
            <StorySection />
            <div className={styles.sectionWrapper__container}>
                <div className={styles.leftSection}>
                    <HomeFeed />
                </div>
                <aside className={styles.rightSection}>
                    <RecentlyViewed />
                </aside>
            </div>
        </>
    );
}

export const getServerSideProps: GetServerSideProps<{
    posts: Post[];
}> = async () => {
    // const posts = await fetch(
    //     'http://localhost:3000/api/posts?limit=10&page=0',
    // ).then((res) => res.json());
    const posts = getPosts();
    return { props: { posts } };
};
