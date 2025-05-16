import 'antd/dist/reset.css'
import '../styles/globals.css'
import Navbar from './components/header'

export const metadata = {
  title: 'Next.js Blog',
  description: 'Blog app with Next.js, AntD, Tailwind CSS',
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        <div className="bg-[url('/bg.jpg')] bg-cover bg-center w-screen h-screen overflow-y-auto">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  )
}
