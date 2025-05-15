'use client'

import { Card, List, Spin } from 'antd';
import api from '@/lib/api';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useStore } from '@/store/useStore'; // Import Zustand store

export default function PostPage() {
  const { id } = useParams();
  
  // Access Zustand state and actions
  const { post, comments, author, loading, setPost, setComments, setAuthor, setLoading } = useStore();
  
  useEffect(() => {
    if (id) {
      const fetchPostData = async () => {
        setLoading(true); // Set loading state to true while fetching

        try {
          // Fetch post data
          const postResponse = await api.get(`/posts/${id}`);
          setPost(postResponse.data);

          // Fetch comments data
          const commentsResponse = await api.get(`/posts/${id}/comments`);
          setComments(commentsResponse.data);

          // Fetch author data
          const authorResponse = await api.get(`/users/${postResponse.data.userId}`);
          setAuthor(authorResponse.data);

          setLoading(false); // Set loading state to false after data is fetched
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
      };

      fetchPostData();
    }
  }, [id, setPost, setComments, setAuthor, setLoading]);

  if (loading) {
    return <Spin size="large" className="h-screen w-full flex justify-center items-center" />;
  }

  if (!post || !author) {
    return <div>Post not found</div>;
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <Card title={post.title} className="mb-6">
        <p>{post.body}</p>
      </Card>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Comments</h2>
        <List
          itemLayout="horizontal"
          dataSource={comments}
          renderItem={(comment) => (
            <List.Item>
              <List.Item.Meta
                title={comment.name}
                description={comment.body}
              />
            </List.Item>
          )}
        />
      </div>

      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="text-lg font-semibold">About the Author</h3>
        <p>Name: {author.name}</p>
        <p>Email: {author.email}</p>
      </div>
    </main>
  );
}
