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
                {error && (
                    <div className={styles.errorMessage}>
                        <p>
                            ⚠️ An unexpected error occurred. Please try again!
                        </p>
                        <p>Details: {error.message}</p>
                    </div>
                )}
                {children}
            </div>
        );
    },
);
