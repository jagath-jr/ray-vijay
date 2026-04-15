import './globals.css';
import Navbar from '@/components/layout/Navbar';
// 1. Import the Footer component
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'Ray Vijay Centre For Conventions',
  description: 'convention centre in Kerala, India. We offer state-of-the-art facilities and exceptional service for all your event needs.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-black min-h-screen flex flex-col">
        <Navbar />
        
        {/* Main Content Wrapper - Flex grow ensures footer is pushed to bottom if page content is short */}
        <main className="flex-grow">
          {children}
        </main>
        
        {/* 2. Place Footer here so it renders on every page */}
        <Footer />
        
      </body>
    </html>
  );
}