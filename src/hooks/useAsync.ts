import { unsplashFetch } from '@/utils';
import { useState, useEffect } from 'react';

type FetcherResult<T> = {
    isLoading: boolean;
    isError: boolean;
    data: T | null;
};

const useFetch = <T>(path: string): FetcherResult<T> => {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [data, setData] = useState<T | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const jsonData: T = await unsplashFetch(path);
                setData(jsonData);

                // const message = await response.text();

                // try {
                //     const errorData = JSON.parse(message);
                //     return {
                //         message: errorData.errors?.[0],
                //     };
                // } catch (error) {
                //     return { message };
                // }
            } catch (error) {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [path]);

    return { isLoading, isError, data };
};

export default useFetch;
