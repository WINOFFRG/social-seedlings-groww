import styles from '@/styles/Home.module.css';
import { HomeFeed } from '@/components/Feed';
import { HtmlHead } from '@/components/MetaTags';
import { RecentlyViewed } from '@/components/RecentlyViewed';
import { StorySection } from '@/components/StorySection';
import type { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { Posts } from '@/types';
import { useStore } from '@/store';
import { unsplashFetch } from '@/utils';

interface HomeProps {
    posts: Posts;
}

export default function Home({ posts }: HomeProps) {
    const setPosts = useStore((state) => state.setPosts);
    setPosts(posts);

    return (
        <>
            <HtmlHead title="Home Feed" />
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

export const getServerSideProps: GetServerSideProps<HomeProps> = async ({
    res,
}: GetServerSidePropsContext) => {
    res.setHeader('Cache-Control', 'public, s-maxage=7200');
    const posts = await unsplashFetch(`/photos`);
    return { props: { posts } };
};
