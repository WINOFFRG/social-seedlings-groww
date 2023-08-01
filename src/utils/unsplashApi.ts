export async function unsplashFetch(path: string) {
    const response = await fetch(
        `${process.env.API_URL}${path}?client_id=${process.env.UNSPLASH_ACCESS_KEY}&orientation=squarish`,
        {
            headers: {
                'Content-Type': 'application/json',
            },
        },
    );

    if (!response.ok) {
        const message = await response.text();
        throw new Error(message);
    }

    const data = await response.json();

    return data;
}
