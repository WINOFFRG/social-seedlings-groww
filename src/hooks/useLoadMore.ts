import { Posts } from '@/types';
import * as React from 'react';

const ARRAY_SIZE = 10;

export function useLoadItems(
    callback: (page: number) => () => Promise<Posts>,
    initialData: Posts = [],
) {
    const [loading, setLoading] = React.useState(false);
    const [items, setItems] = React.useState<Posts>(initialData);
    const [hasNextPage, setHasNextPage] = React.useState<boolean>(
        initialData.length === ARRAY_SIZE,
    );
    const [error, setError] = React.useState<Error>();
    const [page, setPage] = React.useState<number>(0);

    async function loadMore() {
        setLoading(true);
        try {
            const data = await callback(page)();
            console.log(callback, page, data);
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
