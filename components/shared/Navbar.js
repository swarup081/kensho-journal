import Link from 'next/link';

// A simple placeholder for our logo component
const Logo = () => (
  <div className="flex items-center space-x-2">
    {/* This is a placeholder for the arch logo */}
    <div className="w-8 h-8 rounded-full bg-gray-200" />
    <span className="text-xl font-bold text-brand-text">Kensho Journal</span>
  </div>
);

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-brand-background/95 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/">
            <Logo />
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/sign-in" className="text-gray-600 hover:text-brand-text px-3 py-2 rounded-md text-sm font-medium">
              Sign In
            </Link>
            <Link href="/sign-up" className="bg-gradient-to-r from-brand-accent-start to-brand-accent-end text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:opacity-90 transition-opacity">
              Start Your Free Trial
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}