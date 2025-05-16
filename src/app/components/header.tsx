import Link from 'next/link'
export default function Navbar() {
  return (
    <>
      <header className="flex items-center justify-between px-16 py-4 shadow bg-white/30 backdrop-blur-md border border-white/40 rounded-md">
        {/* Left: Logo */}
        <Link href={'/'}>
          <div className="flex items-center space-x-1 text-xl font-semibold">
            <span className="text-blue-600">Blog</span>
            <span className="text-blue-600">Posts</span>
            <span className="text-gray-500 text-xs -mt-2 rotate-12">〰</span>
          </div>
        </Link>
      </header>
    </>
  )
}
