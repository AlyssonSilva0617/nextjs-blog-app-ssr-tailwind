'use client'

import {Card, List, Spin, Typography, Avatar} from 'antd'
import {useEffect} from 'react'
import {useParams} from 'next/navigation'
import {useStore} from '@/store/useStore' // Import Zustand store
import {fetchPostsDataByUserId} from '@/app/actions/posts' // Replace with actual fetch function
import {fetchUser} from '@/app/actions/users' // Replace with actual fetch function
import {fetchCommentsByPostId} from '@/app/actions/comments' // New fetch function for comments

export default function UserPage() {
  const {id} = useParams() // Get user ID from URL
  const {posts, user, loading, setPosts, setUser, setLoading, setComments} =
    useStore() // Zustand store

  useEffect(() => {
    if (id) {
      const fetchUserData = async () => {
        setLoading(true) // Set loading state to true while fetching

        try {
          // Fetch posts written by the user
          const postsResponse = await fetchPostsDataByUserId(id) // Fetch posts
          const postsWithComments = await Promise.all(
            postsResponse.map(async (post) => {
              const comments = await fetchCommentsByPostId(post.id) // Fetch comments for each post
              return {...post, comments} // Add comments to each post
            }),
          )
          setPosts(postsWithComments)

          // Fetch user data (info)
          const userResponse = await fetchUser(id) // Fetch user info
          setUser(userResponse) // Store user info in Zustand

          setLoading(false) // Set loading to false after data is fetched
        } catch (error) {
          console.error(error)
          setLoading(false)
        }
      }

      fetchUserData()
    }
  }, [id, setPosts, setUser, setComments, setLoading])

  if (loading) {
    return (
      <Spin
        size="large"
        className="h-screen w-full flex justify-center items-center"
      />
    )
  }

  // Generate avatar URL using DiceBear Avatars API
  const avatarUrl = `https://avatars.dicebear.com/api/human/${id}.svg`

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Posts by User {id}</h1>

      {/* Display user info with avatar */}
      {user && (
        <div className="mb-6 p-4 bg-gray-100 rounded-md flex items-center">
          <Avatar src={avatarUrl} size={64} className="mr-4" />
          <div>
            <Typography.Title level={3}>{user.name}</Typography.Title>
            <p className="text-gray-600">Email: {user.email}</p>
          </div>
        </div>
      )}

      {/* Check if posts are null or empty */}
      {posts === null || posts.length === 0 ? (
        <p className="text-center text-gray-500">
          No posts available for this user.
        </p>
      ) : (
        <List
          grid={{gutter: 16, column: 2}}
          dataSource={posts}
          renderItem={(post) => (
            <List.Item key={post.id}>
              <Card hoverable title={post.title} className="cursor-pointer">
                <p className="line-clamp-3 text-gray-700">{post.body}</p>

                {/* Display comments for each post */}
                <div className="mt-4">
                  <h4 className="font-semibold">Comments:</h4>
                  {post.comments && post.comments.length > 0 ? (
                    <ul className="pl-4">
                      {post.comments.map((comment) => (
                        <li key={comment.id} className="text-gray-600">
                          <strong>{comment.name}</strong>: {comment.body}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No comments available.</p>
                  )}
                </div>
              </Card>
            </List.Item>
          )}
        />
      )}
    </main>
  )
}
