import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '@/styles/footer.css';

const Footer: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            {/* Coluna 1: Branding */}
            <div className="footer-section">
              <div className="logo">
                <i className="fas fa-music"></i>
                <div className="logo-text">
                  <div className="logo-main">Banda Racional</div>
                  <div className="logo-sub">Cultura Racional</div>
                </div>
              </div>
              <p>
                Levando a música e a energia da Cultura Racional por todo o Brasil.
              </p>
            </div>

            {/* Coluna 2: Links Rápidos */}
            <div className="footer-section">
              <h3>Links Rápidos</h3>
              <ul>
                <li>
                  <Link to="/#home">Início</Link>
                </li>
                <li>
                  <Link to="/#sobre">Sobre</Link>
                </li>
                <li>
                  <Link to="/repertorio">Repertório</Link>
                </li>
                <li>
                  <Link to="/partituras">Partituras</Link>
                </li>
                <li>
                  <Link to="/proximos-eventos">Eventos por todo Brasil</Link>
                </li>
                <li>
                  <Link to="/calendarios">Calendários BRUD</Link>
                </li>
                <li>
                  <Link to="/contato">Contato</Link>
                </li>
              </ul>
            </div>

            {/* Coluna 3: Recursos */}
            <div className="footer-section">
              <h3>Recursos</h3>
              <ul>
                <li>
                  <Link to="/repertorio">Músicas</Link>
                </li>
                <li>
                  <Link to="/partituras">Partituras</Link>
                </li>
                <li>
                  <Link to="/eventos">Histórico</Link>
                </li>
                <li>
                  <Link to="/proximos-eventos">Eventos por todo Brasil</Link>
                </li>
                <li>
                  <a href="https://www.culturaracional.com.br" target="_blank" rel="noopener noreferrer">
                    Cultura Racional
                  </a>
                </li>
              </ul>
            </div>

            {/* Coluna 4: Redes Sociais */}
            <div className="footer-section">
              <h3>Redes Sociais</h3>
              <div className="social-links">
                <a
                  href="#"
                  className="social-link facebook"
                  aria-label="Facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  href="#"
                  className="social-link instagram"
                  aria-label="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  href="#"
                  className="social-link youtube"
                  aria-label="YouTube"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-youtube"></i>
                </a>
                <a
                  href="#"
                  className="social-link spotify"
                  aria-label="Spotify"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-spotify"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2026 Banda Racional Universo em Desencanto. Todos os direitos reservados.</p>
            <p className="footer-cultura">Cultura Racional - A verdadeira origem de tudo e de todos</p>
          </div>
        </div>
      </footer>

      {/* Botão Voltar ao Topo */}
      <a
        href="#home"
        className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
        onClick={(e) => {
          e.preventDefault();
          scrollToTop();
        }}
        aria-label="Voltar ao topo"
      >
        <i className="fas fa-chevron-up"></i>
      </a>
    </>
  );
};

export default Footer;
