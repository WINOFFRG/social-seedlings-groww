import { getPosts } from "./api/posts";
import { getUser, getUserPhotos } from './api/user';

export type Post = ReturnType<typeof getPosts>[number];
export type Posts = ReturnType<typeof getPosts>;
export type User = ReturnType<typeof getUser>;
export type UserPhotos = ReturnType<typeof getUserPhotos>;
export type UserPhoto = UserPhotos[number];

export interface UserProfileProps {
    user: User;
    userPhotos: UserPhotos;
    error?: string;
}

export interface ErrorData {
    message: string;
}
