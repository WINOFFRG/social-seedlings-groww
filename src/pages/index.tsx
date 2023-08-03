import styles from '@/styles/index.module.css';
import { HomeFeed } from '@/components/Feed';
import { HtmlHead } from '@/components/MetaTags';
import { RecentlyViewed } from '@/components/RecentlyViewed';
import { StorySection } from '@/components/StorySection';
import type { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { Posts } from '@/types';
import { useStore } from '@/store';
import { unsplashFetch } from '@/utils';
import { Error } from '@/components/InfiniteScroll';

interface HomeProps {
    posts: Posts;
    error?: string;
}

export default function Home({ posts, error }: HomeProps) {
    const setPosts = useStore((state) => state.setPosts);
    setPosts(posts);

    if (error) {
        return <Error error={error} />;
    }

    return (
        <>
            <HtmlHead title="Home Feed" />
            <StorySection />
            <div className={styles.sectionWrapper__container}>
                <HomeFeed />
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
    res.setHeader('Cache-Control', 'public, s-maxage=3600');
    const posts = await unsplashFetch(`/photos`);

    if (posts.message) {
        return {
            props: {
                error: posts.message,
                posts: [],
            },
        };
    }

    return { props: { posts } };
};
