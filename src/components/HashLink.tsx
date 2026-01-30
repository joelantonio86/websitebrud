import { useNavigate, useLocation } from 'react-router-dom';
import { MouseEvent } from 'react';

interface HashLinkProps {
  to: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  role?: string;
  'aria-label'?: string;
}

const HashLink: React.FC<HashLinkProps> = ({ to, className, children, onClick, role, 'aria-label': ariaLabel }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    
    // Chamar onClick primeiro (para fechar menu mobile, etc)
    if (onClick) {
      onClick();
    }
    
    // Se tem hash, fazer scroll suave
    if (to.includes('#')) {
      const [path, hash] = to.split('#');
      const targetPath = path || '/';
      
      // Se não está na rota correta, navegar primeiro
      if (targetPath !== location.pathname) {
        navigate(targetPath);
        // Aguardar navegação e depois fazer scroll
        setTimeout(() => {
          if (hash === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            const element = document.getElementById(hash);
            if (element) {
              const offsetTop = element.offsetTop - 80;
              window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
          }
        }, 200);
      } else {
        // Já está na rota correta, apenas fazer scroll
        setTimeout(() => {
          if (hash === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            const element = document.getElementById(hash);
            if (element) {
              const offsetTop = element.offsetTop - 80;
              window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
          }
        }, 50);
      }
    } else {
      // Link normal sem hash
      navigate(to);
    }
  };

  return (
    <a
      href={to}
      className={className}
      onClick={handleClick}
      role={role}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
};

export default HashLink;
