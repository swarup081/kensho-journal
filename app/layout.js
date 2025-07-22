import './globals.css';
import Navbar from '../components/shared/Navbar';

export const metadata = {
  title: 'Kensho Journal',
  description: 'The journal that talks back.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <Navbar />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}