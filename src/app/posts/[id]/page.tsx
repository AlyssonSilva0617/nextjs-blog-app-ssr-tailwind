'use client'

import {Card, Col, List, Row} from 'antd'
import {useEffect, useState} from 'react'
import {useParams} from 'next/navigation'
import {useStore} from '@/store/useStore' // Import Zustand store
import Link from 'next/link'
import Loading from '@/app/components/loading'
import {RollbackOutlined} from '@ant-design/icons'
import {fetchPostData} from '@/app/actions/posts'
import {PostType} from '@/utils/types/posts'
import {CommentType} from '@/utils/types/comment'
import {UserType} from '@/utils/types/user'
import {fetchUser} from '@/app/actions/users'

export default function PostPage() {
  const {id} = useParams()

  // Access Zustand state and actions
  const {comments, loading, setComments, setLoading} = useStore()
  const [post, setPost] = useState<PostType | null>(null)
  const [postComments, setPostComments] = useState<CommentType[] | null>(null)
  const [author, setAuthor] = useState<UserType | null>(null)

  useEffect(() => {
    if (id) {
      const getPostData = async () => {
        setLoading(true) // Set loading state to true while fetching

        try {
          // Fetch post data
          const postResponse = await fetchPostData(id)
          setPost(postResponse)

          // Fetch comments data
          const commentsResponse = comments?.filter(
            (item) => item.postId === Number(id),
          )
          if (commentsResponse) setPostComments(commentsResponse)

          // Fetch author data
          const authorResponse = await fetchUser(String(postResponse.userId))
          setAuthor(authorResponse)

          setLoading(false) // Set loading state to false after data is fetched
        } catch (error) {
          console.error(error)
          setLoading(false)
        }
      }

      getPostData()
    }
  }, [id, setPost, setComments, setAuthor, setLoading])

  if (loading) {
    return <Loading />
  }

  if (!post || !author) {
    return <div>Post not found</div>
  }

  return (
    <main className="max-w-screen-xl mx-auto p-6 bg-white/30 backdrop-blur-md">
      <Card>
        <Link href={'/'} className="float-right text-based">
          <RollbackOutlined />
        </Link>
        <h1 className="text-2xl font-bold mb-4 text-black font-MijaBold">
          {post.title}
        </h1>
        <p className="line-clamp-3 text-gray-700">{post.body}</p>

        {/* Display comments for each post */}
        <div className="mt-4">
          <h4 className="font-semibold ml-10">Comments:</h4>
          <div className="max-w-4xl mb-6 mx-auto">
            {postComments && postComments.length > 0 ? (
              <List
                itemLayout="horizontal"
                dataSource={postComments}
                className="max-w-4xl mb-6 mx-auto"
                renderItem={(comment) => (
                  <List.Item>
                    <List.Item.Meta
                      title={comment.name}
                      description={comment.body}
                    />
                  </List.Item>
                )}
              />
            ) : (
              <p>No comments available.</p>
            )}
          </div>
        </div>
      </Card>

      <div className=" mt-2 p-4 rounded-lg  bg-white/30 backdrop-blur-md">
        <h3 className="text-lg font-semibold">About the Author</h3>

        <Link href={`/users/${author?.id}`}>
          <Row>
            <Col span={3} offset={1}>
              <img
                src="/avatar.jpg"
                alt="Cosima avatar"
                className="w-12 h-12 rounded-md shadow-md"
              />
            </Col>
            <Col span={6}>
              <p>Name: {author.name}</p>
              <p>Email: {author.email}</p>
            </Col>
            <Col span={6}>
              <p>
                <Link href={''}>Website: {author.website}</Link>
              </p>
              <p>Phone: {author.phone}</p>
            </Col>
          </Row>
        </Link>
      </div>
    </main>
  )
}
