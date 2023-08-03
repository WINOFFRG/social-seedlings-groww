import { Posts } from '@/types';
import { useEffect, useState } from 'react';

const ARRAY_SIZE = 10;

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
    const [page, setPage] = useState<number>(1);

    useEffect(() => {
        setItems(initialData);
        setHasNextPage(initialData.length === ARRAY_SIZE);
        setPage(1);
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
