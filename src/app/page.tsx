'use client'

import { Card, List } from 'antd';
import Link from 'next/link';
import { PostType } from '@/utils/types/posts';
import { useEffect, useState } from 'react';
import { fetchPostsData } from './actions/posts';

const Page = () => {
  const [posts, setPosts] = useState<PostType[] | null>(null)
  useEffect(() => {
    getPostsData()
  }, [])

  const getPostsData = async () => {
    const response = await fetchPostsData()
    setPosts(response)
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
      {posts && (
        <List
          grid={{ gutter: 16, column: 2 }}
          dataSource={posts}
          renderItem={(post) => (
            <List.Item>
              <Link href={`/posts/${post.id}`}>
                <Card
                  hoverable
                  title={post.title}
                  className="cursor-pointer"
                >
                  <p className="line-clamp-3 text-gray-700">{post.body}</p>
                </Card>
              </Link>
            </List.Item>
          )}
        />)}
    </main>
  )
}

export default Page