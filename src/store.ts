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
        }),
        {
            name: 'cache-storage',
        },
    ),
);
