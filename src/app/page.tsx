'use client'

import {List} from 'antd'
import {useEffect, startTransition} from 'react'
import {fetchPostsData} from './actions/posts'
import Post from './components/post'
import {fetchUsers} from './actions/users'
import {useStore} from '@/store/useStore' // Import Zustand store
import Loading from './components/loading'
import {fetchComments} from './actions/comments'

const Page = () => {
  const {setUsers, loading, setLoading, setPosts, posts, setComments} =
    useStore()

  useEffect(() => {
    if (!posts) {
      setLoading(true)
      getPostsData()
    }
    // Wrap non-urgent update in startTransition
    startTransition(async () => {
      setComments(await fetchComments())
    })
  }, [])

  const getPostsData = async () => {
    setPosts(await fetchPostsData())
    setUsers(await fetchUsers())
    setLoading(false)
  }

  if (loading) {
    return <Loading />
  }

  return (
    <main className="max-w-screen-xl mx-auto p-6">
      {posts && !loading && (
        <List
          grid={{gutter: 16, column: 2}}
          dataSource={posts}
          renderItem={(post) => <Post post={post} />}
        />
      )}
    </main>
  )
}

export default Page
