import {create} from 'zustand'
import {PostType} from '@/utils/types/posts'
import {CommentType} from '@/utils/types/comment'
import {UserType} from '@/utils/types/user'

interface Store {
  post: PostType | null
  posts: PostType[] | null
  comments: CommentType[]
  author: UserType | null
  users: UserType[] // Add user to the state
  loading: boolean
  setPost: (post: PostType) => void
  setPosts: (posts: PostType[]) => void
  setComments: (comments: CommentType[]) => void
  setAuthor: (author: UserType) => void
  setUsers: (user: UserType[]) => void // Add setUser action
  setLoading: (loading: boolean) => void
}

export const useStore = create<Store>((set) => ({
  post: null,
  posts: null,
  comments: [],
  author: null,
  users: [], // Initialize user as null
  loading: true,
  setPost: (post) => set({post}),
  setPosts: (posts) => set({posts}),
  setComments: (comments) => set({comments}),
  setAuthor: (author) => set({author}),
  setUsers: (users) => set({users}), // Set user data in Zustand
  setLoading: (loading) => set({loading}),
}))
