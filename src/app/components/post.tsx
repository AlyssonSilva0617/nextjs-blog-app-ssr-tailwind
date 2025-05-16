'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useStore } from '@/store/useStore'
import { UserType } from '@/utils/types/user'
import { PostType } from '@/utils/types/posts'

export default function Post({ post }: { post: PostType }) {
  const { users } = useStore()
  const [author, setPostAuthor] = useState<UserType | null>(null)
  useEffect(() => {
    const postAuthor = users.find((item: UserType) => item.id === post.userId)
    if (postAuthor) setPostAuthor(postAuthor)
  }, [post, users])

  return (
    <div className="mx-auto p-6 group">
      {/* <!-- ?Header with Avatar --> */}
      <Link href={`/users/${author?.id}`}>
        <div className="flex items-center space-x-3 mb-4">
          <img
            src="/avatar.jpg"
            alt="Cosima avatar"
            className="w-12 h-12 rounded-md shadow-md"
          />
          <div>
            <span className="text-red-600 font-semibold text-base">
              {author?.name}
            </span>
            <span className="italic text-sm text-gray-600 ml-1">wrote</span>
          </div>
        </div>
      </Link>

      {/* <!-- ?Title --> */}
      <Link href={`/posts/${post.id}`}>
        <h1 className="text-2xl font-bold mb-4 text-black hover:text-red-400 transition-colors duration-200 truncate whitespace-nowrap">
          {post.title}
        </h1>
      </Link>

      {/* <!-- ?Description --> */}
      <p className="text-lg leading-relaxed mb-6 line-clamp-2">{post.body}</p>

      <Link href={`/posts/${post.id}`}>
        <div className="hidden group-hover:block text-sm text-blue-500 transition-opacity duration-200">
          See more →
        </div>
      </Link>
    </div>
  )
}
