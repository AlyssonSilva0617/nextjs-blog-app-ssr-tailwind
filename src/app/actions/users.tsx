'use server'

import api from '@/lib/api'
import {UserType} from '@/utils/types/user'

export const fetchUser = async (
  userId: string | string[],
): Promise<UserType> => {
  const res = await api.get<UserType>(`users/${userId}`)
  return res.data
}
