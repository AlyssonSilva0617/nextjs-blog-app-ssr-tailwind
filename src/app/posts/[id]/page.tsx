'use client'

import { Card, Col, List, Row, Spin } from 'antd'
import api from '@/lib/api'
import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useStore } from '@/store/useStore' // Import Zustand store
import Link from 'next/link'

export default function PostPage() {
  const { id } = useParams()

  // Access Zustand state and actions
  const {
    post,
    comments,
    author,
    loading,
    setPost,
    setComments,
    setAuthor,
    setLoading,
  } = useStore()

  useEffect(() => {
    if (id) {
      const fetchPostData = async () => {
        setLoading(true) // Set loading state to true while fetching

        try {
          // Fetch post data
          const postResponse = await api.get(`/posts/${id}`)
          setPost(postResponse.data)

          // Fetch comments data
          const commentsResponse = await api.get(`/posts/${id}/comments`)
          setComments(commentsResponse.data)

          // Fetch author data
          const authorResponse = await api.get(
            `/users/${postResponse.data.userId}`,
          )
          setAuthor(authorResponse.data)

          setLoading(false) // Set loading state to false after data is fetched
        } catch (error) {
          console.error(error)
          setLoading(false)
        }
      }

      fetchPostData()
    }
  }, [id, setPost, setComments, setAuthor, setLoading])

  if (loading) {
    return (
      <Spin
        size="large"
        className="h-screen w-full flex justify-center items-center"
      />
    )
  }

  if (!post || !author) {
    return <div>Post not found</div>
  }

  return (
    <main className="max-w-screen-xl mx-auto p-6">
      <Card>
        <h1 className="text-2xl font-bold mb-4 text-black font-MijaBold">
          {post.title}
        </h1>
        <p className="line-clamp-3 text-gray-700">{post.body}</p>

        {/* Display comments for each post */}
        <div className="mt-4">
          <div className='max-w-4xl mb-6 mx-auto'>
            <h4 className="font-semibold">Comments:</h4>
            {comments && comments.length > 0 ? (
              <List
                itemLayout="horizontal"
                dataSource={comments}
                className='max-w-4xl mb-6 mx-auto'
                renderItem={(comment) => (
                  <List.Item>
                    <List.Item.Meta title={comment.name} description={comment.body} />
                  </List.Item>
                )}
              />
            ) : (
              <p>No comments available.</p>
            )}
          </div>
        </div>
      </Card>

      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="text-lg font-semibold">About the Author</h3>

        <Link href={`/users/${author?.id}`}>
          <Row>
            <Col span={3} offset={1}>
              <img src="https://api.dicebear.com/9.x/avataaars/svg" alt="Cosima avatar" className="w-12 h-12 rounded-md shadow-md" />
            </Col>
            <Col span={6}>
              <p>Name: {author.name}</p>
              <p>Email: {author.email}</p>
            </Col>
            <Col span={6}>
              <p>
                <a href={author.website}>Website: {author.website}</a>
              </p>
              <p>Phone: {author.phone}</p>
            </Col>
          </Row>
        </Link>
      </div>
    </main >
  )
}
