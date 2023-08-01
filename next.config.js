/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['images.unsplash.com', 'res.cloudinary.com'],
    },
    env: {
        UNSPLASH_ACCESS_KEY: process.env.UNSPLASH_ACCESS_KEY,
        UNSPLASH_SECRET_KEY: process.env.UNSPLASH_SECRET_KEY,
        API_URL: process.env.API_URL,
    },
    experimental: {
        scrollRestoration: true,
    },
};

module.exports = nextConfig;
