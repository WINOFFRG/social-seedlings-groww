export async function unsplashFetch(path: string, params?: string) {
    const response = await fetch(
        `${process.env.API_URL}${path}?client_id=${process.env.UNSPLASH_ACCESS_KEY}&orientation=squarish&order_by=popular&per_page=10&${params}`,
        {
            headers: {
                'Content-Type': 'application/json',
            },
        },
    );

    if (!response.ok) {
        const message = await response.text();

        try {
            const errorData = JSON.parse(message);
            return {
                message: errorData.errors?.[0],
            };
        } catch (error) {
            return { message };
        }
    }

    const data = await response.json();

    return data;
}
