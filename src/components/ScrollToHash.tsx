import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToHash: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Aguardar renderização completa
    const timer = setTimeout(() => {
      const hash = location.hash || window.location.hash;
      
      if (hash) {
        const elementId = hash.substring(1);
        
        if (elementId === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const element = document.getElementById(elementId);
          if (element) {
            const offsetTop = element.offsetTop - 80;
            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth',
            });
          }
        }
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [location.pathname, location.hash]);

  return null;
};

export default ScrollToHash;
