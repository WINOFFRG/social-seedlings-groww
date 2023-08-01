import { getUser, getUserPhotos } from '@/api/user';
import { HtmlHead } from '@/components/HtmlHead';
import { UserProfile } from '@/components/UserProfile';
import useFetch from '@/hooks/useAsync';
import { UserProfileProps } from '@/types';
import { unsplashFetch } from '@/utils';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

export default function Profile({ user, userPhotos }: UserProfileProps) {
    console.log(user, userPhotos);

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

    const userPhotos = await unsplashFetch(`/users/${query.username}/photos`);
    const user = await unsplashFetch(`/users/${query.username}`);

    return { props: { user, userPhotos } };
};
