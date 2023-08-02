import Head from 'next/head';

const BASE_URL = 'http://localhost:3000/';

interface MetaTagsProps {
    path?: string;
    image?: string;
    imageAlt?: string;
    description?: string;
    title?: string;
}

export function HtmlHead({
    path,
    image,
    imageAlt,
    description,
    title,
}: MetaTagsProps) {
    title = title ? `Social Seedlings | ${title}` : 'Social Seedlings';
    description =
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam nisi laudantium eaque quos blanditiis distinctio magnam nemo, in unde, similique incidunt vel, est officiis commodi! Maxime quae cupiditate tempore facere.';
    image = image ?? '/favicon/apple-touch-icon.png';
    imageAlt = imageAlt ?? 'Social Seedlings';

    return (
        <Head>
            <meta key="charset" charSet="utf-8" />
            <title key="title">{title}</title>

            <link rel="preconnect" href="https://images.unsplash.com" />
            <link rel="preconnect" href="https://api.unsplash.com" />

            <meta
                key="viewport"
                name="viewport"
                content="width=device-width, height=device-height, initial-scale=1, shrink-to-fit=no, viewport-fit=cover"
            />

            <meta key="twitterTitle" property="twitter:title" content={title} />
            <meta key="ogTitle" property="og:title" content={title} />

            <meta
                key="apple-webapp"
                name="apple-mobile-web-app-capable"
                content="yes"
            />
            <meta
                key="apple-webapp-status-style"
                name="apple-mobile-web-app-status-bar-style"
                content="black"
            />
            <meta key="theme-color" name="theme-color" content={'#060606'} />

            {/* Favicons */}
            <link rel="icon" type="image/x-icon" href="/favicon/favicon.ico" />
            <link
                rel="icon"
                type="image/png"
                sizes="16x16"
                href="/favicon/favicon-16x16.png"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="32x32"
                href="/favicon/favicon-32x32.png"
            />
            <link
                rel="apple-touch-icon"
                sizes="180x180"
                href="/favicon/apple-touch-icon.png"
            />
            <link
                rel="apple-touch-icon"
                sizes="180x180"
                href="/favicon/apple-touch-icon.png"
            />
            <link rel="manifest" href="/favicon/site.webmanifest" />

            <link key="canonical" rel="canonical" href={BASE_URL + path} />
            <meta key="ogUrl" property="og:url" content={BASE_URL + path} />

            {/* OG & Twitter */}
            <meta
                key="twitterSite"
                property="twitter:site"
                content="@winoffrg"
            />
            <meta
                key="twitterCreator"
                property="twitter:creator"
                content="@winoffrg"
            />
            <meta key="ogSiteName" property="og:site_name" content="Limeplay" />
            <meta key="ogType" property="og:type" content="website" />

            {image && (
                <>
                    <meta
                        key="twitterCard"
                        property="twitter:card"
                        content="summary_large_image"
                    />
                    <meta
                        key="twitterImage"
                        property="twitter:image"
                        content={image}
                    />
                    <meta key="ogImage" property="og:image" content={image} />
                    <meta property="og:image:width" content="1200" />
                    <meta property="og:image:height" content="630" />
                </>
            )}

            {imageAlt && (
                <>
                    <meta
                        key="ogImageAlt"
                        property="og:image:alt"
                        content={imageAlt}
                    />
                    <meta
                        key="twitterImageAlt"
                        property="twitter:image:alt"
                        content={imageAlt}
                    />
                </>
            )}

            {description && (
                <>
                    <meta
                        key="description"
                        name="description"
                        content={description}
                    />
                    <meta
                        key="twitterDescription"
                        property="twitter:description"
                        content={description}
                    />
                    <meta
                        key="ogDescription"
                        property="og:description"
                        content={description}
                    />
                </>
            )}
        </Head>
    );
}
