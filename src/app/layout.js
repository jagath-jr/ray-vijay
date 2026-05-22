// 1. Add Poppins to the import
import { Cormorant_Garamond, Inter, Poppins } from 'next/font/google'; 
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// 2. Configure Poppins
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'], // Add the weights you need
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata = {
  title: 'Ray Vijay Centre For Conventions',
  description: 'convention centre in Kerala, India. We offer state-of-the-art facilities and exceptional service for all your event needs.',
};

export default function RootLayout({ children }) {
  return (
    // 3. Add poppins.variable to the class string
    <html lang="en" suppressHydrationWarning className={`${cormorant.variable} ${inter.variable} ${poppins.variable}`}>
      <body className="font-cormorant antialiased bg-white text-black min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow">
          {children}
        </main>
        
        <Footer />
      </body>
    </html>
  );
}