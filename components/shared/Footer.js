import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="w-full max-w-4xl mx-auto px-6 py-8 mt-12 text-center text-gray-500">
      <div className="flex flex-col items-center gap-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Kensho Journal Logo" width={24} height={24} />
          <span className="font-semibold text-gray-600">KENSHO JOURNAL</span>
        </Link>
        <div className="flex gap-6 text-sm">
          <Link href="/terms" className="hover:text-purple-600 transition-colors">Terms of Service</Link>
          <Link href="/privacy" className="hover:text-purple-600 transition-colors">Privacy Policy</Link>
          <Link href="/cookies" className="hover:text-purple-600 transition-colors">Cookie Policy</Link>
        </div>
        <p className="text-xs">&copy; {new Date().getFullYear()} Kensho Journal. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;