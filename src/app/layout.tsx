import 'antd/dist/reset.css'; // AntD global styles (v5+)
import '../styles/globals.css'; // Tailwind base styles

export const metadata = {
  title: 'Next.js Blog',
  description: 'Blog app with Next.js, AntD, Tailwind CSS',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">{children}</body>
    </html>
  );
}
