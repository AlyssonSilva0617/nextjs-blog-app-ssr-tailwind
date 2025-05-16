import {create} from 'zustand'
import {PostType} from '@/utils/types/posts'
import {CommentType} from '@/utils/types/comment'
import {UserType} from '@/utils/types/user'

interface Store {
  posts: PostType[] | null
  comments: CommentType[] | null
  users: UserType[] // Add user to the state
  loading: boolean
  setPosts: (posts: PostType[]) => void
  setComments: (comments: CommentType[]) => void
  setUsers: (user: UserType[]) => void // Add setUser action
  setLoading: (loading: boolean) => void
}

export const useStore = create<Store>((set) => ({
  posts: null,
  comments: [],
  users: [], // Initialize user as null
  loading: true,
  setPosts: (posts) => set({posts}),
  setComments: (comments) => set({comments}),
  setUsers: (users) => set({users}), // Set user data in Zustand
  setLoading: (loading) => set({loading}),
}))
