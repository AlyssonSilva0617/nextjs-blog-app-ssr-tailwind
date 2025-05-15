'use server'

import api from "@/lib/api"
import { PostType } from "@/utils/types/posts"

export const fetchPostsData = async (): Promise<PostType[]> => {
  const res = await api.get<PostType[]>('posts');
  return res.data;
};