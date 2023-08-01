import { Posts } from '@/types';
import * as React from 'react';

const ARRAY_SIZE = 20;

export function useLoadItems(
    callback: (page: number, limit: number) => Promise<Posts>,
    initialData: Posts = [],
) {
    const [loading, setLoading] = React.useState(false);
    const [items, setItems] = React.useState<Posts>(initialData);
    const [hasNextPage, setHasNextPage] = React.useState<boolean>(true);
    const [error, setError] = React.useState<Error>();
    const [page, setPage] = React.useState<number>(0);

    async function loadMore() {
        setLoading(true);
        try {
            const data = await callback(page, ARRAY_SIZE);
            setItems((current) => [...current, ...data]);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
            setPage((current) => current + 1);
        }
    }

    return { loading, items, hasNextPage, error, loadMore, page } as const;
}
