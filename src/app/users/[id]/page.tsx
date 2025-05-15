'use client'

import { Card, List, Spin, Avatar, Row, Col } from 'antd'
import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useStore } from '@/store/useStore' // Import Zustand store
import { fetchPostsDataByUserId } from '@/app/actions/posts' // Replace with actual fetch function
import { fetchCommentsByPostId } from '@/app/actions/comments' // New fetch function for comments
import Link from 'next/link'

export default function UserPage() {
  const { id } = useParams() // Get user ID from URL
  const { posts, loading, author, setPosts, setLoading } = useStore() // Zustand store

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
              return { ...post, comments } // Add comments to each post
            }),
          )
          setPosts(postsWithComments)

          setLoading(false) // Set loading to false after data is fetched
        } catch (error) {
          console.error(error)
          setLoading(false)
        }
      }

      fetchUserData()
    }
  }, [id, setPosts, setLoading])

  if (loading) {
    return (
      <Spin
        size="large"
        className="h-screen w-full flex justify-center items-center"
      />
    )
  }

  return (
    <main className="max-w-screen-xl mx-auto p-6">
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <h3 className="text-lg font-semibold">About the Author</h3>
        {/* Display user info with avatar */}
        {author && (
          <Row>
            <Col span={2} offset={1}>
              <Avatar src="https://api.dicebear.com/9.x/avataaars/svg" alt="Cosima avatar" className="w-12 h-12 rounded-md shadow-md" />
            </Col>
            <Col span={5}>
              <p>Name: {author.name}</p>
              <p>Email: {author.email}</p>
            </Col>
            <Col span={5}>
              <p>
                <a href={author.website}>Website: {author.website}</a>
              </p>
              <p>Phone: {author.phone}</p>
            </Col>
            <Col span={6}>
              <p>Company: {author?.company.name}</p>
              <p>Address: {author.address.suite}, {author.address.street}, {author.address.city}</p>
            </Col>
          </Row>
        )}
      </div>


      {/* Check if posts are null or empty */}
      {posts === null || posts.length === 0 ? (
        <p className="text-center text-gray-500">
          No posts available for this user.
        </p>
      ) : (
        <List
          grid={{ gutter: 16, column: 2 }}
          dataSource={posts}
          renderItem={(post) => (
            <List.Item key={post.id}>
              <Link href={`/posts/${post.id}`}>
                <Card hoverable className="cursor-pointer">
                  <h1 className="text-2xl font-bold mb-4 text-black font-MijaBold">
                    {post.title}
                  </h1>
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
              </Link>
            </List.Item>
          )}
        />
      )}
    </main>
  )
}
