import {
    SearchOutlined,
    SoundOutlined,
    BulbOutlined,
    WifiOutlined,
} from '@ant-design/icons';
import Link from 'next/link';

export default function Navbar() {
    return (
        <header className="flex items-center justify-between px-16 py-4 shadow bg-white">
            {/* Left: Logo */}
            <Link href={'/'}>
                <div className="flex items-center space-x-1 text-xl font-semibold">
                    <span className="text-blue-600">Blog</span>
                    <span className="text-blue-600">Posts</span>
                    <span className="text-gray-500 text-xs -mt-2 rotate-12">〰</span>
                </div>
            </Link>
            {/* Right: Icons */}
            <div className="flex items-center space-x-4 text-lg">
                <SearchOutlined />
                <SoundOutlined />
                <BulbOutlined />
                <WifiOutlined />
            </div>
        </header>
    );
}
