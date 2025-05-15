import {CommentType} from './comment'

export interface PostType {
  id: number
  userId: number
  title: string
  body: string
  comments: CommentType[]
}
