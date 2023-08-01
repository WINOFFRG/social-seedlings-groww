import { getUser, getUserPhotos } from '@/api/user';
import { HtmlHead } from '@/components/HtmlHead';
import { UserProfile } from '@/components/UserProfile';
import { UserProfileProps } from '@/types';
import { GetServerSideProps } from 'next';

export default function Profile({ user, userPhotos }: UserProfileProps) {
    return (
        <>
            <HtmlHead />
            <UserProfile user={user} userPhotos={userPhotos} />
        </>
    );
}

export const getServerSideProps: GetServerSideProps<
    UserProfileProps
> = async () => {
    const user = getUser();
    const userPhotos = getUserPhotos();
    return { props: { user, userPhotos } };
};
