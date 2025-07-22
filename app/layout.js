import { Inter, Lora } from 'next/font/google';
import './globals.css';
import Navbar from '../components/shared/Navbar';

// Configure fonts
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
});

export const metadata = {
  title: 'Kensho Journal',
  description: 'The journal that talks back.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${lora.variable} font-sans bg-brand-background text-brand-text`}>
        <Navbar />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}