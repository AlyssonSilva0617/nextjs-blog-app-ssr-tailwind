'use server'

import api from '@/lib/api'
import {CommentType} from '@/utils/types/comment'

export const fetchCommentsByPostId = async (
  postId: number,
): Promise<CommentType[]> => {
  const response = await api.get(`posts/${postId}/comments`)
  return response.data
}
export const fetchComments = async (): Promise<CommentType[]> => {
  const response = await api.get('comments')
  return response.data
}
