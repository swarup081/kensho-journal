// app/layout.js
import { Inter, Lora } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const lora = Lora({ subsets: ['latin'], variable: '--font-lora', weight: '700' });

export const metadata = {
  title: 'Kensho Journal',
  description: 'The Journal That Talks Back.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${lora.variable} font-sans bg-brand-background text-brand-text`}>
        {children}
      </body>
    </html>
  );
}