import { HtmlHead } from '@/components/MetaTags';
import { UserProfile } from '@/components/UserProfile';
import { UserProfileProps } from '@/types';
import { unsplashFetch } from '@/utils';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

export default function Profile({ user, userPhotos }: UserProfileProps) {
    return (
        <>
            <HtmlHead />
            <UserProfile user={user} userPhotos={userPhotos} />
        </>
    );
}

export const getServerSideProps: GetServerSideProps<UserProfileProps> = async ({
    res,
    query,
}: GetServerSidePropsContext) => {
    res.setHeader('Cache-Control', 'public, s-maxage=3600');

    const [userPhotos, user] = await Promise.all([
        unsplashFetch(`/users/${query.username}/photos`),
        unsplashFetch(`/users/${query.username}`),
    ]);

    return { props: { user, userPhotos } };
};
