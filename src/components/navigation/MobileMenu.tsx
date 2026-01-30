import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import HashLink from '../HashLink';
import './MobileMenu.css';

interface MobileMenuProps {
  isOpen: boolean;
  onStateChange: (state: { isOpen: boolean }) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onStateChange }) => {
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [activeSubSubmenu, setActiveSubSubmenu] = useState<string | null>(null);
  const location = useLocation();

  // Fechar submenus quando mudar de rota
  useEffect(() => {
    setActiveSubmenu(null);
    setActiveSubSubmenu(null);
  }, [location]);

  // Fechar submenus quando menu principal fecha
  useEffect(() => {
    if (!isOpen) {
      setActiveSubmenu(null);
      setActiveSubSubmenu(null);
    }
  }, [isOpen]);

  const toggleSubmenu = (submenuName: string): void => {
    setActiveSubmenu((prev) => (prev === submenuName ? null : submenuName));
    if (submenuName !== 'repertorio') {
      setActiveSubSubmenu(null);
    }
  };

  const toggleSubSubmenu = (subSubmenuName: string): void => {
    setActiveSubSubmenu((prev) => (prev === subSubmenuName ? null : subSubmenuName));
  };

  const handleLinkClick = (): void => {
    onStateChange({ isOpen: false });
    setActiveSubmenu(null);
    setActiveSubSubmenu(null);
  };

  const menuStyles = {
    bmBurgerButton: {
      display: 'none', // Controlado pelo Navigation.tsx
    },
    bmMenuWrap: {
      position: 'fixed',
      top: 0,
      height: '100%',
      width: '280px',
    },
    bmMenu: {
      background: '#ffffff',
      padding: '2.5em 1.5em 0',
      fontSize: '1.15em',
      overflow: 'hidden',
    },
    bmMorphShape: {
      fill: '#ffffff',
    },
    bmItemList: {
      color: '#000000',
      padding: '0.8em',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
    },
    bmItem: {
      display: 'block',
      outline: 'none',
    },
    bmOverlay: {
      background: 'rgba(0, 0, 0, 0.5)',
      top: 0,
      left: 0,
    },
  };

  return (
    <Menu
      right
      isOpen={isOpen}
      onStateChange={onStateChange}
      styles={menuStyles}
      customBurgerIcon={false}
      customCrossIcon={false}
      disableAutoFocus
      width={280}
    >
      <HashLink 
        to="/#home" 
        className="mobile-menu-item" 
        onClick={handleLinkClick}
      >
        <i className="fas fa-home"></i>
        <span>Início</span>
      </HashLink>

      <HashLink 
        to="/#sobre" 
        className="mobile-menu-item" 
        onClick={handleLinkClick}
      >
        <i className="fas fa-info-circle"></i>
        <span>Sobre</span>
      </HashLink>

      <div className="mobile-menu-group">
        <button
          className={`mobile-menu-item mobile-menu-toggle ${activeSubmenu === 'repertorio' ? 'active' : ''}`}
          onClick={() => toggleSubmenu('repertorio')}
        >
          <i className="fas fa-music"></i>
          <span>Repertório</span>
          <i className={`fas fa-chevron-${activeSubmenu === 'repertorio' ? 'up' : 'down'}`}></i>
        </button>
        {activeSubmenu === 'repertorio' && (
          <div className="mobile-submenu">
            <Link to="/repertorio" className="mobile-menu-item" onClick={handleLinkClick}>
              <span>Lista do Repertório</span>
            </Link>
            <Link to="/partituras" className="mobile-menu-item" onClick={handleLinkClick}>
              <span>Partituras</span>
            </Link>
            <Link to="/material-apoio" className="mobile-menu-item" onClick={handleLinkClick}>
              <span>Material de Apoio</span>
            </Link>
            <div className="mobile-menu-group">
              <button
                className={`mobile-menu-item mobile-menu-toggle ${activeSubSubmenu === 'sibelius' ? 'active' : ''}`}
                onClick={() => toggleSubSubmenu('sibelius')}
              >
                <span>Sibelius</span>
                <i className={`fas fa-chevron-${activeSubSubmenu === 'sibelius' ? 'up' : 'down'}`}></i>
              </button>
              {activeSubSubmenu === 'sibelius' && (
                <div className="mobile-submenu mobile-sub-submenu">
                  <Link to="/sibelius-computador" className="mobile-menu-item" onClick={handleLinkClick}>
                    <span>Computador</span>
                  </Link>
                  <Link to="/sibelius-ios" className="mobile-menu-item" onClick={handleLinkClick}>
                    <span>iOS</span>
                  </Link>
                  <Link to="/sibelius-android" className="mobile-menu-item" onClick={handleLinkClick}>
                    <span>Android</span>
                  </Link>
                </div>
              )}
            </div>
            <Link to="/letras-musicas" className="mobile-menu-item" onClick={handleLinkClick}>
              <span>Letra das Músicas</span>
            </Link>
          </div>
        )}
      </div>

      <div className="mobile-menu-group">
        <button
          className={`mobile-menu-item mobile-menu-toggle ${activeSubmenu === 'eventos' ? 'active' : ''}`}
          onClick={() => toggleSubmenu('eventos')}
        >
          <i className="fas fa-calendar-alt"></i>
          <span>Eventos</span>
          <i className={`fas fa-chevron-${activeSubmenu === 'eventos' ? 'up' : 'down'}`}></i>
        </button>
        {activeSubmenu === 'eventos' && (
          <div className="mobile-submenu">
            <Link to="/eventos" className="mobile-menu-item" onClick={handleLinkClick}>
              <span>Histórico de Apresentações</span>
            </Link>
            <Link to="/proximos-eventos" className="mobile-menu-item" onClick={handleLinkClick}>
              <span>Eventos por todo Brasil</span>
            </Link>
          </div>
        )}
      </div>

      <Link to="/calendarios" className="mobile-menu-item" onClick={handleLinkClick}>
        <i className="fas fa-calendar"></i>
        <span>Calendários BRUD</span>
      </Link>

      <Link to="/contato" className="mobile-menu-item" onClick={handleLinkClick}>
        <i className="fas fa-envelope"></i>
        <span>Contato</span>
      </Link>
    </Menu>
  );
};

export default MobileMenu;
