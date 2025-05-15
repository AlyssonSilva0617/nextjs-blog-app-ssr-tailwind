import { create } from 'zustand'
import { PostType } from '@/utils/types/posts'
import { CommentType } from '@/utils/types/comment';
import { UserType } from '@/utils/types/user'

interface Store {
  post: PostType | null;
  comments: CommentType[];
  author: UserType | null;
  loading: boolean;
  setPost: (post: PostType) => void;
  setComments: (comments: CommentType[]) => void;
  setAuthor: (author: UserType) => void;
  setLoading: (loading: boolean) => void;
}

export const useStore = create<Store>((set) => ({
  post: null,
  comments: [],
  author: null,
  loading: true,
  setPost: (post) => set({ post }),
  setComments: (comments) => set({ comments }),
  setAuthor: (author) => set({ author }),
  setLoading: (loading) => set({ loading }),
}));