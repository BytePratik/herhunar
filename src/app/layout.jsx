import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CornerPanelSwitcher from '@/components/CornerPanelSwitcher';

export const metadata = {
  title: 'HerHunar | Empowering Women Through Skills',
  description: 'A social-impact bridge connecting skilled women service providers with companies and conscious customers.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,500;0,600;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-warm-50 text-warm-900">
        <AuthProvider>
          <LanguageProvider>
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
            {/* 1-Button Corner Switcher between Admin and User Panel */}
            <CornerPanelSwitcher />
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
