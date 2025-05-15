import {CommentType} from './comment'

export interface PostType {
  id: number
  title: string
  body: string
  comments: CommentType[]
}
