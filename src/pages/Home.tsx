import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Hero, Sobre, Stats, MapBrasil, Destaques } from '@/components/sections';

const Home: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const scrollToHash = (): void => {
      const hash = location.hash || window.location.hash;
      if (hash) {
        const elementId = hash.substring(1);
        const element = document.getElementById(elementId);
        if (element) {
          setTimeout(() => {
            const offsetTop = element.offsetTop - 80;
            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth',
            });
          }, 100);
        } else if (elementId === 'home') {
          setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }, 100);
        }
      }
    };

    scrollToHash();
    window.addEventListener('hashchange', scrollToHash);
    return () => window.removeEventListener('hashchange', scrollToHash);
  }, [location]);

  return (
    <>
      <Hero />
      <Sobre />
      <Stats />
      <MapBrasil />
      <Destaques />
    </>
  );
};

export default Home;
