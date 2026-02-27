import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'OG 6IX RESERVES - Premium Cannabis GTA',
  description: 'Luxury cannabis flower delivery in Toronto. 19+ only. Free delivery over $150.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}