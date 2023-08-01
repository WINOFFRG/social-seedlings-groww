import { getPosts } from "./api/posts";
import { getUser } from "./api/user";

export type Post = ReturnType<typeof getPosts>[number];
export type Posts = ReturnType<typeof getPosts>;
export type User = ReturnType<typeof getUser>;