import { useState, useEffect, ReactNode } from 'react';
import Navigation from '../navigation';
import Footer from '../footer';
import '@/styles/layout.css';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app">
      <Navigation scrolled={scrolled} />
      <main id="main-content">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
