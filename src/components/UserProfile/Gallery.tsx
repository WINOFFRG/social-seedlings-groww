import { useIsClient } from '@/hooks/useIsClient';
import styles from './userProfile.module.css';
import { useStore } from '@/store';
import { PhotoPost } from '../Post';
import { User, UserPhotos } from '@/types';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { useLoadItems } from '@/hooks/useLoadMore';
import { unsplashFetch } from '@/utils';
import { InfiniteScroll } from '../InfiniteScroll';
import { useCallback } from 'react';

export function UserGallery({
    userPhotos,
    user,
}: {
    userPhotos: UserPhotos;
    user: User;
}) {
    const view = useStore((state) => state.view);
    const isClient = useIsClient();

    const getMoreItems = useCallback((page: number) => {
        return async () => {
            return unsplashFetch(
                `/users/${user.username}/photos`,
                `page=${page}`,
            );
        };
    }, []);

    const { loading, items, hasNextPage, error, loadMore } = useLoadItems(
        getMoreItems,
        userPhotos,
    );

    const [elementRef] = useInfiniteScroll({
        loading,
        hasNextPage,
        onLoadMore: loadMore,
        disabled: !!error,
        rootMargin: '0px 0px 400px 0px',
    });

    return (
        isClient && (
            <>
                <DividerArea disabled={items.length === 0} />
                <div
                    className={
                        view === 'grid'
                            ? styles.profile__bottomSectionGrid
                            : styles.profile__bottomSectionList
                    }
                >
                    {items.map((photo) => (
                        <PhotoPost
                            post={photo}
                            withMeta={view === 'list'}
                            size={view === 'grid' ? 300 : 500}
                            key={photo.id}
                        />
                    ))}
                    {items.length === 0 && (
                        <div className={styles.profile__noPhotos}>
                            <p>{user.name} has not posted any photos yet!</p>
                        </div>
                    )}
                </div>
                <InfiniteScroll
                    ref={elementRef}
                    loading={loading}
                    error={error}
                />
            </>
        )
    );
}

export function DividerArea({ disabled }: { disabled: boolean }) {
    const view = useStore((state) => state.view);
    const setView = useStore((state) => state.setView);

    const ButtonSet = ({
        children,
        set,
    }: {
        children: React.ReactNode;
        set: 'list' | 'grid';
    }) => {
        return (
            <button
                disabled={disabled}
                className={`${styles.profile__viewButton} 
        ${set === view ? styles.profile__viewButton_active : ''}`}
                onClick={() => {
                    setView(set);
                }}
            >
                {children}
            </button>
        );
    };

    return (
        <>
            <div className={styles.buttonsWrapper}>
                <ButtonSet set={'list'}>List View</ButtonSet>
                <ButtonSet set={'grid'}>Grid View</ButtonSet>
            </div>
            <hr className={styles.divider} />
        </>
    );
}
