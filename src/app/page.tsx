import api from '@/lib/api';
import { Card, List } from 'antd';
import Link from 'next/link';

type Post = {
  id: number;
  title: string;
  body: string;
};

export default async function HomePage() {
  const { data: posts } = await api.get<Post[]>('/posts');

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
    </main>
  );
}
