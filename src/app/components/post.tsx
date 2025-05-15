import Link from 'next/link'
import React, { useEffect } from 'react'
import { useStore } from '@/store/useStore' // Import Zustand store
import { UserType } from '@/utils/types/user'

export default function Post({ post }: { post: any }) {
    const { users, author, setAuthor } = useStore()
    useEffect(() => {
        const postAuthor = users.find((item: UserType) => item.id === post.userId)
        if (postAuthor) setAuthor(postAuthor)
    }, [post])

    return (
        <div className="mx-auto p-6">
            {/* <!-- ?Header with Avatar --> */}
            <Link href={`/users/${author?.id}`}>
                <div className="flex items-center space-x-3 mb-4">
                    <img src="https://api.dicebear.com/9.x/avataaars/svg" alt="Cosima avatar" className="w-12 h-12 rounded-md shadow-md" />
                    <div>
                        <span className="text-red-600 font-semibold text-base">{author?.name}</span>
                        <span className="italic text-sm text-gray-600 ml-1">wrote</span>
                    </div>
                </div>
            </Link>

            {/* <!-- ?Title --> */}
            <Link href={`/posts/${post.id}`}>
                <h1 className="text-2xl font-bold mb-4 text-black font-MijaBold truncate whitespace-nowrap">
                    {post.title}
                </h1>
            </Link>

            {/* <!-- ?Description --> */}
            <p className="text-lg leading-relaxed mb-6 truncate whitespace-nowrap">
                {post.body}
            </p>
        </div>
    )
}
