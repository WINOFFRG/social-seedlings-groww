import { create } from 'zustand';
import { Posts } from './types';

interface BearState {
    posts: Posts;
    setPosts: (posts: Posts) => void;
}

export const useStore = create<BearState>()((set) => ({
    posts: [],
    setPosts: (posts) => set({ posts }),
}));
