import { forwardRef } from 'react';
import styles from './infiniteScroll.module.css';
import { LoadingDots } from '../Loading';

interface InfiniteScrollProps {
    children?: React.ReactNode;
    loading: boolean;
    error: Error | undefined;
}

// eslint-disable-next-line react/display-name
export const InfiniteScroll = forwardRef<HTMLDivElement, InfiniteScrollProps>(
    ({ children, loading, error }, ref) => {
        return (
            <div className={styles.feedContainer__loadMore} ref={ref}>
                {loading && <LoadingDots />}
                <Error error={error} />
                {children}
            </div>
        );
    },
);

export const Error = ({ error }: { error: Error | string | undefined }) => {
    if (!error) {
        return null;
    }

    return (
        <div className={styles.errorMessage}>
            <p>⚠️ An unexpected error occurred. Please try again!</p>
            <p>Details: {typeof error === 'string' ? error : error.message}</p>
        </div>
    );
};
