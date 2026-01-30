import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NavigationProps } from '@/types/navigation';
import MobileMenu from './MobileMenu';
import HashLink from '../HashLink';
import './Navigation.css';

const Navigation: React.FC<NavigationProps> = ({ scrolled = false }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const location = useLocation();

  // Detectar se é mobile
  useEffect(() => {
    const checkMobile = (): void => {
      setIsMobile(window.innerWidth <= 968);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Fechar menu quando mudar de rota
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Fechar menu ao redimensionar para desktop
  useEffect(() => {
    if (!isMobile && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [isMobile, isMobileMenuOpen]);

  // ESC para fechar
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent): void => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isMobileMenuOpen]);

  // Bloquear scroll quando menu está aberto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = (): void => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleMobileMenuStateChange = (state: { isOpen: boolean }): void => {
    setIsMobileMenuOpen(state.isOpen);
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
        <div className="container">
          <div className="nav-wrapper">
            <HashLink 
              to="/#home" 
              className="logo" 
              aria-label="Banda Racional - Página inicial"
            >
              <i className="fas fa-music" aria-hidden="true"></i>
              <div className="logo-text">
                <span className="logo-main">Banda Racional</span>
                <span className="logo-sub">Universo em Desencanto</span>
              </div>
            </HashLink>

            {/* Menu Desktop */}
            <ul className="nav-menu desktop-menu" id="navMenu" role="menubar">
              <li role="none">
                <HashLink 
                  to="/#home" 
                  className="nav-link" 
                  role="menuitem"
                >
                  Início
                </HashLink>
              </li>
              <li role="none">
                <HashLink 
                  to="/#sobre" 
                  className="nav-link" 
                  role="menuitem"
                >
                  Sobre
                </HashLink>
              </li>
              <li className="has-submenu" role="none">
                <span className="nav-link" role="menuitem" aria-haspopup="true">
                  Repertório
                </span>
                <ul className="submenu" role="menu">
                  <li role="none">
                    <Link to="/repertorio" className="nav-link" role="menuitem">
                      Lista do Repertório
                    </Link>
                  </li>
                  <li role="none">
                    <Link to="/partituras" className="nav-link" role="menuitem">
                      Partituras
                    </Link>
                  </li>
                  <li role="none">
                    <Link to="/material-apoio" className="nav-link" role="menuitem">
                      Material de Apoio
                    </Link>
                  </li>
                  <li className="has-submenu" role="none">
                    <span className="nav-link" role="menuitem" aria-haspopup="true">
                      Sibelius
                    </span>
                    <ul className="sub-submenu" role="menu">
                      <li role="none">
                        <Link to="/sibelius-computador" className="nav-link" role="menuitem">
                          Computador
                        </Link>
                      </li>
                      <li role="none">
                        <Link to="/sibelius-ios" className="nav-link" role="menuitem">
                          iOS
                        </Link>
                      </li>
                      <li role="none">
                        <Link to="/sibelius-android" className="nav-link" role="menuitem">
                          Android
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li role="none">
                    <Link to="/letras-musicas" className="nav-link" role="menuitem">
                      Letra das Músicas
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="has-submenu" role="none">
                <span className="nav-link" role="menuitem" aria-haspopup="true">
                  Eventos
                </span>
                <ul className="submenu" role="menu">
                  <li role="none">
                    <Link to="/eventos" className="nav-link" role="menuitem">
                      Histórico de Apresentações
                    </Link>
                  </li>
                  <li role="none">
                    <Link to="/proximos-eventos" className="nav-link" role="menuitem">
                      Eventos por todo Brasil
                    </Link>
                  </li>
                </ul>
              </li>
              <li role="none">
                <Link to="/calendarios" className="nav-link" role="menuitem">
                  Calendários BRUD
                </Link>
              </li>
              <li role="none">
                <Link to="/contato" className="nav-link" role="menuitem">
                  Contato
                </Link>
              </li>
            </ul>

            {/* Botão Hamburger Mobile */}
            <button
              className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}
              id="hamburger"
              aria-label="Menu de navegação"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              onClick={toggleMobileMenu}
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Menu Mobile com react-burger-menu */}
      {isMobile && (
        <MobileMenu isOpen={isMobileMenuOpen} onStateChange={handleMobileMenuStateChange} />
      )}
    </>
  );
};

export default Navigation;
