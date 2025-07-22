import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            Kensho Journal
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/sign-in" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              Sign In
            </Link>
            <Link href="/sign-up" className="bg-gray-800 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-900">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}