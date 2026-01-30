import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { partiturasData, PartituraData } from '@/data/partituras-data';
import AudioPlayer from '@/components/AudioPlayer';
import { PageHeader } from '@/components/layout';
import '@/styles/repertorio.css';

interface CategoriaInfo {
  id: string;
  nome: string;
  icon: string;
  colorClass: string;
  gradient: string;
}

const Repertorio: React.FC = () => {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const categorias: CategoriaInfo[] = [
    { 
      id: 'r', 
      nome: 'Músicas Racionais', 
      icon: 'fas fa-music', 
      colorClass: 'racionais',
      gradient: 'linear-gradient(135deg, #FFD700 0%, #FFE55C 100%)'
    },
    { 
      id: 'd', 
      nome: 'Músicas Diversas', 
      icon: 'fas fa-compact-disc', 
      colorClass: 'diversas',
      gradient: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)'
    },
    { 
      id: 'a', 
      nome: 'Apresentações', 
      icon: 'fas fa-theater-masks', 
      colorClass: 'apresentacoes',
      gradient: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)'
    },
    { 
      id: 'tf', 
      nome: 'Toques de Fanfarra', 
      icon: 'fas fa-drum', 
      colorClass: 'fanfarra',
      gradient: 'linear-gradient(135deg, #EF4444 0%, #F87171 100%)'
    },
    { 
      id: 'h', 
      nome: 'Hinos', 
      icon: 'fas fa-flag', 
      colorClass: 'hinos',
      gradient: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)'
    },
  ];

  // Organizar músicas por categoria
  const musicasPorCategoria = useMemo(() => {
    const organizadas: Record<string, PartituraData[]> = {};
    
    categorias.forEach(cat => {
      organizadas[cat.id] = [];
    });

    // Ordenar músicas por folder (numérico quando possível)
    const sortedKeys = Object.keys(partiturasData).sort((a, b) => {
      const musicaA = partiturasData[a];
      const musicaB = partiturasData[b];
      
      const numA = parseInt(musicaA.folder.replace(/\D/g, '')) || 0;
      const numB = parseInt(musicaB.folder.replace(/\D/g, '')) || 0;
      if (numA !== numB) {
        return numA - numB;
      }
      
      return musicaA.folder.localeCompare(musicaB.folder);
    });

    sortedKeys.forEach(key => {
      const musica = partiturasData[key];
      if (organizadas[musica.category]) {
        organizadas[musica.category].push(musica);
      }
    });

    return organizadas;
  }, []);

  // Contadores por categoria
  const contadores = useMemo(() => {
    const counts: Record<string, number> = {};
    categorias.forEach(cat => {
      counts[cat.id] = musicasPorCategoria[cat.id]?.length || 0;
    });
    return counts;
  }, [musicasPorCategoria]);

  // Extrair nome da música (remover código se estiver no título)
  const extrairNomeMusica = (title: string): string => {
    const codigoMatch = title.match(/^[A-Z]+\d+\s*–\s*/);
    if (codigoMatch) {
      return title.replace(codigoMatch[0], '').trim();
    }
    return title;
  };

  const toggleCategory = (categoryId: string): void => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  // Gerar PDF
  const gerarPDF = (): void => {
    setIsGeneratingPDF(true);
    
    Promise.all([
      import('html2canvas'),
      import('jspdf')
    ]).then(([html2canvasModule, jsPDFModule]) => {
      const html2canvas = html2canvasModule.default;
      const { jsPDF } = jsPDFModule;
      
      const elemento = document.getElementById('repertorioPDFView');
      if (!elemento) {
        alert('Erro: Elemento PDF não encontrado.');
        setIsGeneratingPDF(false);
        return;
      }

      elemento.style.display = 'block';
      elemento.style.position = 'absolute';
      elemento.style.left = '-9999px';
      elemento.style.top = '0';
      elemento.style.overflow = 'visible';
      elemento.style.maxHeight = 'none';

      const opcoes = {
        scale: 1.5,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        allowTaint: true,
        scrollX: 0,
        scrollY: 0
      };

      html2canvas(elemento, opcoes).then(canvas => {
        const imgData = canvas.toDataURL('image/png', 0.92);
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4',
          compress: true
        });

        const marginLeft = 10;
        const marginTop = 10;
        const marginBottom = 10;
        const marginRight = 10;
        const maxWidth = 210 - marginLeft - marginRight;
        const maxHeight = 297 - marginTop - marginBottom;

        const imgAspect = canvas.width / canvas.height;
        const pageAspect = maxWidth / maxHeight;
        let finalWidth: number;
        let finalHeight: number;
        if (imgAspect > pageAspect) {
          finalWidth = maxWidth;
          finalHeight = maxWidth / imgAspect;
        } else {
          finalHeight = maxHeight;
          finalWidth = maxHeight * imgAspect;
        }
        const x = marginLeft + (maxWidth - finalWidth) / 2;
        const y = marginTop + (maxHeight - finalHeight) / 2;

        pdf.addImage(imgData, 'PNG', x, y, finalWidth, finalHeight);
        pdf.save('repertorio-banda-racional.pdf');

        elemento.style.display = 'none';
        elemento.style.position = '';
        elemento.style.left = '';
        elemento.style.top = '';
        setIsGeneratingPDF(false);
      }).catch(error => {
        console.error('Erro ao gerar PDF:', error);
        alert('Erro ao gerar PDF. Por favor, use a opção de Imprimir.');
        setIsGeneratingPDF(false);
      });
    }).catch(() => {
      alert('Bibliotecas PDF não disponíveis. Use a opção de Imprimir.');
      window.print();
      setIsGeneratingPDF(false);
    });
  };

  return (
    <div className="repertorio-page">
      <PageHeader
        title="Repertório"
        subtitle="Explore todas as músicas organizadas por categoria"
        breadcrumb={[{ label: 'Início', to: '/' }, { label: 'Repertório' }]}
      />

      <div className="container">
        <div className="repertorio-header-actions">
          <button
            className="repertorio-download-btn"
            onClick={gerarPDF}
            disabled={isGeneratingPDF}
          >
            {isGeneratingPDF ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                Gerando PDF...
              </>
            ) : (
              <>
                <i className="fas fa-download"></i>
                Baixar PDF
              </>
            )}
          </button>
        </div>

        {/* Cards de Categoria */}
        {categorias.map(categoria => {
          const musicas = musicasPorCategoria[categoria.id] || [];
          const count = contadores[categoria.id] || 0;
          const isExpanded = expandedCategories.has(categoria.id);

          return (
            <div key={categoria.id} className={`repertorio-categoria-modern ${isExpanded ? 'expanded' : ''}`}>
              <div 
                className="repertorio-categoria-header"
                onClick={() => toggleCategory(categoria.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleCategory(categoria.id);
                  }
                }}
              >
                <div className="repertorio-categoria-left">
                  <div className={`repertorio-categoria-icon ${categoria.colorClass}`}>
                    <i className={categoria.icon}></i>
                  </div>
                  <div className="repertorio-categoria-title">
                    <h2>{categoria.nome}</h2>
                    <div className="repertorio-categoria-count">
                      <span className="count-number">{count}</span>
                      <span className="count-label">{count === 1 ? 'música' : 'músicas'}</span>
                    </div>
                  </div>
                </div>
                <button 
                  className={`repertorio-toggle-btn ${isExpanded ? 'expanded' : ''}`}
                  aria-label={isExpanded ? 'Recolher' : 'Expandir'}
                >
                  <i className={`fas fa-chevron-${isExpanded ? 'up' : 'down'}`}></i>
                </button>
              </div>

              {/* Grid de Músicas */}
              {isExpanded && (
                <div className="repertorio-grid-modern" id={`${categoria.id}-lista`}>
                  {musicas.map((musica) => {
                    const nomeMusica = extrairNomeMusica(musica.title);
                    
                    return (
                      <div key={musica.folder} className="repertorio-item-modern">
                        <div className="repertorio-item-header">
                          <div className="repertorio-item-badge">
                            {musica.folder.toUpperCase()}
                          </div>
                          <Link 
                            to="/partituras" 
                            className="repertorio-item-link"
                            title="Ver partitura"
                          >
                            <i className="fas fa-file-alt"></i>
                          </Link>
                        </div>
                        <div className="repertorio-item-body">
                          <h3 className="repertorio-item-nome">{nomeMusica}</h3>
                          <AudioPlayer
                            musicaCode={musica.folder}
                            musicaTitle={nomeMusica}
                            hasMP3={musica.hasMP3}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {/* Versão PDF (oculta) - 1 página, 2 colunas de músicas, layout limpo */}
        <div id="repertorioPDFView" className="repertorio-pdf-view" style={{ display: 'none' }}>
          <div className="repertorio-pdf-header">
            <h1>Repertório Completo</h1>
            <p>Banda Racional — Cultura Racional</p>
          </div>

          {categorias.map(categoria => {
            const musicas = musicasPorCategoria[categoria.id] || [];
            return (
              <div key={`pdf-${categoria.id}`} className={`repertorio-pdf-categoria ${categoria.colorClass}`}>
                <div className="repertorio-pdf-categoria-title">{categoria.nome}</div>
                <div className="repertorio-pdf-lista" id={`${categoria.id}-lista-pdf`}>
                  {musicas.map((musica) => {
                    const nomeMusica = extrairNomeMusica(musica.title);
                    return (
                      <div key={`pdf-${musica.folder}`} className="repertorio-pdf-item">
                        <span className="repertorio-pdf-codigo">{musica.folder.toUpperCase()}</span>
                        <span className="repertorio-pdf-nome">{nomeMusica}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Repertorio;
