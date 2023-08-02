import { create } from 'zustand';
import { Posts, User } from './types';
import { persist } from 'zustand/middleware';

interface BearState {
    posts: Posts;
    setPosts: (posts: Posts) => void;
    view: 'list' | 'grid';
    setView: (view: 'list' | 'grid') => void;
    recentUsers: User[];
    setRecentUsers: (users: User[]) => void;
    likedPosts: string[];
    addLikedPost: (postId: string) => void;
    removeLikedPost: (postId: string) => void;
    setLikedPosts: (posts: string[]) => void;
    requestedUsers: string[];
    addRequestedUser: (userId: string) => void;
    removeRequestedUser: (userId: string) => void;
    setRequestedUsers: (users: string[]) => void;
}

// First I will check if TS working properly then using chaining
// const chainedMiddleware = (f) =>
//     devtools(persist(f, { name: 'cache-storage' }));

export const useStore = create<BearState>()(
    persist(
        (set) => ({
            posts: [],
            setPosts: (posts) => set({ posts }),
            view: 'list',
            setView: (view) => set({ view }),
            recentUsers: [],
            setRecentUsers: (users) => set({ recentUsers: users }),
            likedPosts: [],
            setLikedPosts: (posts) => set({ likedPosts: posts }),
            addLikedPost: (postId) =>
                set((state) => ({
                    likedPosts: state.likedPosts.includes(postId)
                        ? state.likedPosts
                        : [...state.likedPosts, postId],
                })),
            removeLikedPost: (postId) =>
                set((state) => ({
                    likedPosts: state.likedPosts.filter(
                        (likedPost) => likedPost !== postId,
                    ),
                })),
            requestedUsers: [],
            setRequestedUsers: (users) => set({ requestedUsers: users }),
            addRequestedUser: (userId) =>
                set((state) => ({
                    requestedUsers: state.requestedUsers.includes(userId)
                        ? state.requestedUsers
                        : [...state.requestedUsers, userId],
                })),
            removeRequestedUser: (userId) =>
                set((state) => ({
                    requestedUsers: state.requestedUsers.filter(
                        (requestedUser) => requestedUser !== userId,
                    ),
                })),
        }),
        {
            name: 'cache-storage',
        },
    ),
);
