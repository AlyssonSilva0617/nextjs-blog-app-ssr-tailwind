import { create } from 'zustand'
import { PostType } from '@/utils/types/posts'
import { CommentType } from '@/utils/types/comment';
import { UserType } from '@/utils/types/user'

interface Store {
    post: PostType | null;
    comments: CommentType[];
    author: UserType | null;
}

export const useStore = create<Store>((set) => ({
    post: null,
    comments: [],
    author: null,
}));