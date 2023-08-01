import { getUser } from '@/api/user';
import { HtmlHead } from '@/components/HtmlHead';
import { UserProfile } from '@/components/UserProfile';
import { User } from '@/types';
import { GetServerSideProps } from 'next';

export default function Profile({ user }: { user: User }) {
    return (
        <>
            <HtmlHead />
            <UserProfile user={user} />
        </>
    );
}

export const getServerSideProps: GetServerSideProps<{
    user: User;
}> = async () => {
    const user = getUser();
    return { props: { user } };
};
