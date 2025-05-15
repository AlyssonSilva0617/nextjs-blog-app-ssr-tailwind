'use client'

import { List, Spin } from 'antd'
import { PostType } from '@/utils/types/posts'
import { useEffect, useState } from 'react'
import { fetchPostsData } from './actions/posts'
import Post from './components/post'
import { fetchUsers } from './actions/users'
import { useStore } from '@/store/useStore' // Import Zustand store

const Page = () => {
  const { setUsers, loading, setLoading } = useStore()
  const [posts, setPosts] = useState<PostType[] | null>(null)
  useEffect(() => {
    setLoading(true)
    getPostsData()
  }, [])

  const getPostsData = async () => {
    setPosts(await fetchPostsData())
    setUsers(await fetchUsers())
    setLoading(false)
  }

  return (

    <main className="max-w-screen-xl mx-auto p-6">
      <Spin spinning={loading}>
        {posts && !loading && (
          <List
            grid={{ gutter: 16, column: 2 }}
            dataSource={posts}
            renderItem={(post) => (
              <Post post={post} />
            )}
          />
        )}
      </Spin>
    </main>
  )
}

export default Page
