import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useSmoothScroll = (): void => {
  const location = useLocation();

  useEffect(() => {
    // Aguardar um pouco para garantir que o DOM está renderizado
    const timer = setTimeout(() => {
      const hash = location.hash;
      
      if (hash) {
        // Remover o # do hash
        const elementId = hash.substring(1);
        const element = document.getElementById(elementId);
        
        if (element) {
          const offsetTop = element.offsetTop - 80; // Altura da navbar
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth',
          });
        }
      } else if (location.pathname === '/') {
        // Se estiver na home sem hash, scroll para o topo
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [location]);
};

export default useSmoothScroll;
