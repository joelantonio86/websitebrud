import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import heroBackground from '@/assets/images/logo-nova.png';

const Hero: React.FC = () => {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (img) {
      if (img.complete && img.naturalHeight !== 0) {
        img.classList.add('loaded');
      } else {
        const handleLoad = () => {
          img.classList.add('loaded');
        };
        const handleError = () => {
          img.style.opacity = '1';
        };
        img.addEventListener('load', handleLoad);
        img.addEventListener('error', handleError);
        return () => {
          img.removeEventListener('load', handleLoad);
          img.removeEventListener('error', handleError);
        };
      }
    }
  }, []);

  return (
    <section id="home" className="hero hero-with-logo" aria-label="Apresentação principal">
      <img 
        ref={imgRef}
        src={heroBackground} 
        alt="Logo Banda Racional" 
        className="hero-background-image"
      />
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 className="hero-title">
          <span className="title-line">Banda Racional</span>
          <span className="title-line">Universo em Desencanto</span>
        </h1>
        <p className="hero-subtitle">
          Levando a música e a energia da Cultura Racional por todo o Brasil
        </p>
        <div className="hero-buttons">
          <Link to="/repertorio" className="btn btn-primary">
            <i className="fas fa-music"></i>
            <span>Ouvir Músicas</span>
          </Link>
          <Link to="/proximos-eventos" className="btn btn-secondary">
            <i className="fas fa-map-marker-alt"></i>
            <span>Eventos por todo Brasil</span>
          </Link>
        </div>
      </div>
      <div className="scroll-indicator">
        <i className="fas fa-chevron-down"></i>
      </div>
    </section>
  );
};

export default Hero;
