import { Posts } from '@/types';
import { useEffect, useState } from 'react';

const ARRAY_SIZE = 10;
const INITIAL_PAGE = 2;

export function useLoadItems(
    callback: (page: number) => () => Promise<Posts>,
    initialData: Posts = [],
) {
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState<Posts>(initialData);
    const [hasNextPage, setHasNextPage] = useState<boolean>(
        initialData.length === ARRAY_SIZE,
    );
    const [error, setError] = useState<Error>();
    const [page, setPage] = useState<number>(INITIAL_PAGE);

    // Change on initial data while scrolling can cause bugs
    useEffect(() => {
        setItems(initialData);
        setHasNextPage(initialData.length === ARRAY_SIZE);
        setPage(INITIAL_PAGE);
    }, [initialData]);

    async function loadMore() {
        setLoading(true);
        try {
            const data = await callback(page)();
            setItems((current) => [...current, ...data]);
            setHasNextPage(data.length === ARRAY_SIZE);
        } catch (error) {
            // @ts-ignore
            setError(error);
        } finally {
            setLoading(false);
            setPage((current) => current + 1);
        }
    }

    return { loading, items, hasNextPage, error, loadMore, page } as const;
}
