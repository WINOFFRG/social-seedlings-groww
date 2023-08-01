import { Posts } from '@/types';
import type { NextApiRequest, NextApiResponse } from 'next';

interface ErrorData {
    message: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Posts | ErrorData>,
) {
    try {
        const { page, limit = 10 } = req.query;

        // Check if page and limit params are passed, otherwise return error
        if (!page) {
            return res.status(400).json({
                message: 'Missing query params: page and limit required',
            });
        }

        //check if page and limit are strings
        if (Array.isArray(page) || Array.isArray(limit)) {
            return res.status(400).json({
                message: 'Query params should be of type string',
            });
        }

        const unsplashURI = process.env.API_URL;
        const clientId = process.env.UNSPLASH_ACCESS_KEY;

        // Fetch random photos from unsplash API
        const response = await fetch(
            `${unsplashURI}/photos?client_id=${clientId}&per_page=${limit}&page=${page}&orientation=squarish`,
        );

        if (!response.ok) {
            const message = await response.text();
            return res.status(response.status).json({ message });
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
}
