import { Layout } from '@/components/Layout';
import '@/styles/globals.css';
import '@/styles/normalize.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
// @ts-ignore
import NProgress from 'nprogress';

NProgress.configure({ showSpinner: false });

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter();

    useEffect(() => {
        router.events.on('routeChangeStart', () => NProgress.start());
        router.events.on('routeChangeComplete', () => NProgress.done());
        router.events.on('routeChangeError', () => NProgress.done());
    }, []);

    return (
        <>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </>
    );
}
