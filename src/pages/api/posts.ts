import { IPost, IErrorMessage } from '@/types/misc';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IPost[] | IErrorMessage>,
) {
    try {
        const { page, limit } = req.query;

        // Check if page and limit params are passed, otherwise return error
        if (!page || !limit) {
            return res.status(400).json({
                message: 'Missing query params: page and limit required',
            } as IErrorMessage);
        }

        //check if page and limit are strings
        if (Array.isArray(page) || Array.isArray(limit)) {
            return res.status(400).json({
                message: 'Query params should be of type string',
            } as IErrorMessage);
        }

        // Convert params to number
        const pageNum = Number(page);
        const limitNum = Number(limit);

        if (isNaN(pageNum) || isNaN(limitNum)) {
            return res.status(400).json({
                message: 'Query params should be of type number',
            } as IErrorMessage);
        }

        const unsplashURI = process.env.UNSPLASH_API_URL;
        const clientId = process.env.UNSPLASH_ACCESS_KEY;

        // Fetch random photos from unsplash API
        const response = await fetch(
            `${unsplashURI}/photos/?client_id=${clientId}&per_page=${limitNum}&page=${pageNum}`,
        );

        if (!response.ok) {
            const message = await response.text();
            return res
                .status(response.status)
                .json({ message } as IErrorMessage);
        }

        const data = await response.json();

        const posts = data.map((post: any) => {
            return {
                id: post.id,
                userImage: post.user.profile_image.small,
                postImage: post.urls.regular,
                username: post.user.username,
                likesCount: post.likes,
                description: post.description,
                location: post.user.location,
                blurHash: post.blur_hash,
                height: post.height,
                width: post.width,
            } as IPost;
        });

        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        if (error instanceof Error) {
            res.status(500).json({ message: error.message } as IErrorMessage);
        }
    }
}
