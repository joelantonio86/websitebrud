import { useState, useMemo, useEffect } from 'react';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import '@/styles/map-brasil.css';

// Tipos
interface CidadeData {
  nome: string;
  bandas: number;
}

interface EstadoData {
  sigla: string;
  nome: string;
  regiao: 'Norte' | 'Nordeste' | 'Centro-Oeste' | 'Sudeste' | 'Sul';
  bandas: number;
  coordenadas: [number, number];
  cidades: CidadeData[];
}

interface ModalData {
  estado: EstadoData;
  isOpen: boolean;
}

// Cores modernas e profissionais por região (inspiradas na bandeira do Brasil)
const CORES_REGIAO = {
  Norte: '#10B981',        // Verde esmeralda moderno
  Nordeste: '#F59E0B',     // Amarelo âmbar elegante
  'Centro-Oeste': '#3B82F6', // Azul vibrante
  Sudeste: '#059669',      // Verde mais profundo
  Sul: '#6366F1',          // Índigo moderno (substitui branco por algo mais visível)
};

const CORES_REGIAO_HOVER = {
  Norte: '#34D399',
  Nordeste: '#FBBF24',
  'Centro-Oeste': '#60A5FA',
  Sudeste: '#10B981',
  Sul: '#818CF8',
};

const CORES_REGIAO_LIGHT = {
  Norte: '#D1FAE5',        // Verde muito claro para estados sem bandas
  Nordeste: '#FEF3C7',     // Amarelo muito claro
  'Centro-Oeste': '#DBEAFE', // Azul muito claro
  Sudeste: '#D1FAE5',      // Verde muito claro
  Sul: '#E0E7FF',         // Índigo muito claro
};

// Mapeamento de nomes do GeoJSON para nossos dados
const geoJsonToEstadoMap: Record<string, string> = {
  'Acre': 'AC',
  'Amapá': 'AP',
  'Amazonas': 'AM',
  'Pará': 'PA',
  'Rondônia': 'RO',
  'Roraima': 'RR',
  'Tocantins': 'TO',
  'Alagoas': 'AL',
  'Bahia': 'BA',
  'Ceará': 'CE',
  'Maranhão': 'MA',
  'Paraíba': 'PB',
  'Pernambuco': 'PE',
  'Piauí': 'PI',
  'Rio Grande do Norte': 'RN',
  'Sergipe': 'SE',
  'Distrito Federal': 'DF',
  'Goiás': 'GO',
  'Mato Grosso': 'MT',
  'Mato Grosso do Sul': 'MS',
  'Espírito Santo': 'ES',
  'Minas Gerais': 'MG',
  'Rio de Janeiro': 'RJ',
  'São Paulo': 'SP',
  'Paraná': 'PR',
  'Rio Grande do Sul': 'RS',
  'Santa Catarina': 'SC',
};

// Dados completos dos estados com cidades mockadas
const estadosData: EstadoData[] = [
  // Região Norte
  { sigla: 'AC', nome: 'Acre', regiao: 'Norte', bandas: 0, coordenadas: [-70.0, -9.0], cidades: [] },
  { sigla: 'AP', nome: 'Amapá', regiao: 'Norte', bandas: 0, coordenadas: [-52.0, 1.0], cidades: [] },
  { sigla: 'AM', nome: 'Amazonas', regiao: 'Norte', bandas: 1, coordenadas: [-60.0, -5.0], cidades: [{ nome: 'Manaus', bandas: 1 }] },
  { sigla: 'PA', nome: 'Pará', regiao: 'Norte', bandas: 1, coordenadas: [-52.0, -4.0], cidades: [{ nome: 'Belém', bandas: 1 }] },
  { sigla: 'RO', nome: 'Rondônia', regiao: 'Norte', bandas: 0, coordenadas: [-63.0, -11.0], cidades: [] },
  { sigla: 'RR', nome: 'Roraima', regiao: 'Norte', bandas: 0, coordenadas: [-61.0, 1.5], cidades: [] },
  { sigla: 'TO', nome: 'Tocantins', regiao: 'Norte', bandas: 0, coordenadas: [-48.0, -10.0], cidades: [] },
  
  // Região Nordeste
  { sigla: 'AL', nome: 'Alagoas', regiao: 'Nordeste', bandas: 1, coordenadas: [-36.5, -9.5], cidades: [{ nome: 'Maceió', bandas: 1 }] },
  { sigla: 'BA', nome: 'Bahia', regiao: 'Nordeste', bandas: 2, coordenadas: [-41.0, -12.5], cidades: [{ nome: 'Salvador', bandas: 1 }, { nome: 'Feira de Santana', bandas: 1 }] },
  { sigla: 'CE', nome: 'Ceará', regiao: 'Nordeste', bandas: 1, coordenadas: [-38.5, -5.0], cidades: [{ nome: 'Fortaleza', bandas: 1 }] },
  { sigla: 'MA', nome: 'Maranhão', regiao: 'Nordeste', bandas: 0, coordenadas: [-45.0, -5.0], cidades: [] },
  { sigla: 'PB', nome: 'Paraíba', regiao: 'Nordeste', bandas: 0, coordenadas: [-36.8, -7.2], cidades: [] },
  { sigla: 'PE', nome: 'Pernambuco', regiao: 'Nordeste', bandas: 1, coordenadas: [-37.0, -8.5], cidades: [{ nome: 'Recife', bandas: 1 }] },
  { sigla: 'PI', nome: 'Piauí', regiao: 'Nordeste', bandas: 1, coordenadas: [-42.5, -8.0], cidades: [{ nome: 'Teresina', bandas: 1 }] },
  { sigla: 'RN', nome: 'Rio Grande do Norte', regiao: 'Nordeste', bandas: 1, coordenadas: [-36.0, -5.5], cidades: [{ nome: 'Natal', bandas: 1 }] },
  { sigla: 'SE', nome: 'Sergipe', regiao: 'Nordeste', bandas: 0, coordenadas: [-37.5, -10.5], cidades: [] },
  
  // Região Centro-Oeste
  { sigla: 'DF', nome: 'Distrito Federal', regiao: 'Centro-Oeste', bandas: 1, coordenadas: [-47.8, -15.8], cidades: [{ nome: 'Brasília', bandas: 1 }] },
  { sigla: 'GO', nome: 'Goiás', regiao: 'Centro-Oeste', bandas: 1, coordenadas: [-49.0, -16.0], cidades: [{ nome: 'Goiânia', bandas: 1 }] },
  { sigla: 'MT', nome: 'Mato Grosso', regiao: 'Centro-Oeste', bandas: 0, coordenadas: [-56.0, -15.0], cidades: [] },
  { sigla: 'MS', nome: 'Mato Grosso do Sul', regiao: 'Centro-Oeste', bandas: 0, coordenadas: [-55.0, -20.0], cidades: [] },
  
  // Região Sudeste
  { sigla: 'ES', nome: 'Espírito Santo', regiao: 'Sudeste', bandas: 1, coordenadas: [-40.5, -19.5], cidades: [{ nome: 'Vitória', bandas: 1 }] },
  { sigla: 'MG', nome: 'Minas Gerais', regiao: 'Sudeste', bandas: 3, coordenadas: [-44.0, -19.0], cidades: [{ nome: 'Belo Horizonte', bandas: 1 }, { nome: 'Uberlândia', bandas: 1 }, { nome: 'Juiz de Fora', bandas: 1 }] },
  { sigla: 'RJ', nome: 'Rio de Janeiro', regiao: 'Sudeste', bandas: 2, coordenadas: [-43.0, -22.5], cidades: [{ nome: 'Rio de Janeiro', bandas: 1 }, { nome: 'Niterói', bandas: 1 }] },
  { sigla: 'SP', nome: 'São Paulo', regiao: 'Sudeste', bandas: 2, coordenadas: [-47.5, -22.8], cidades: [{ nome: 'São Paulo', bandas: 1 }, { nome: 'Campinas', bandas: 1 }] },
  
  // Região Sul
  { sigla: 'PR', nome: 'Paraná', regiao: 'Sul', bandas: 2, coordenadas: [-51.2, -24.8], cidades: [{ nome: 'Curitiba', bandas: 1 }, { nome: 'Londrina', bandas: 1 }] },
  { sigla: 'RS', nome: 'Rio Grande do Sul', regiao: 'Sul', bandas: 1, coordenadas: [-53.0, -30.0], cidades: [{ nome: 'Porto Alegre', bandas: 1 }] },
  { sigla: 'SC', nome: 'Santa Catarina', regiao: 'Sul', bandas: 1, coordenadas: [-50.3, -27.2], cidades: [{ nome: 'Florianópolis', bandas: 1 }] },
];

const MapBrasil: React.FC = () => {
  const sectionRef = useScrollAnimation();
  const [tooltip, setTooltip] = useState<{ estado: string; regiao: string; x: number; y: number } | null>(null);
  const [modal, setModal] = useState<ModalData>({ estado: estadosData[0], isOpen: false });
  const [mapScale, setMapScale] = useState(750);

  const totalBandas = useMemo(() => estadosData.reduce((sum, estado) => sum + estado.bandas, 0), []);
  const estadosComBandas = useMemo(() => estadosData.filter(e => e.bandas > 0).length, []);

  // Ajustar scale baseado no tamanho da tela
  useEffect(() => {
    const updateScale = (): void => {
      const width = window.innerWidth;
      if (width < 480) {
        setMapScale(650); // Mobile pequeno
      } else if (width < 768) {
        setMapScale(700); // Mobile/Tablet
      } else if (width < 1024) {
        setMapScale(750); // Tablet grande
      } else {
        setMapScale(800); // Desktop
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  // URL do GeoJSON do Brasil
  const geoUrl = "https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/brazil-states.geojson";

  const getFillColor = (regiao: string, bandas: number): string => {
    if (bandas === 0) {
      // Estados sem bandas ficam com cor muito clara da região
      return CORES_REGIAO_LIGHT[regiao as keyof typeof CORES_REGIAO_LIGHT] || '#F3F4F6';
    }
    return CORES_REGIAO[regiao as keyof typeof CORES_REGIAO] || '#E5E7EB';
  };

  const getStrokeColor = (_regiao: string, bandas: number): string => {
    // Bordas finas e elegantes
    if (bandas === 0) return 'rgba(0, 0, 0, 0.08)'; // Muito sutil para estados sem bandas
    return 'rgba(0, 0, 0, 0.15)'; // Sutil mas visível para estados com bandas
  };

  const handleMouseEnter = (estado: EstadoData, event: React.MouseEvent<SVGPathElement>): void => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltip({
      estado: estado.nome,
      regiao: estado.regiao,
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
    });
  };

  const handleMouseLeave = (): void => {
    setTooltip(null);
  };

  const handleClick = (estado: EstadoData): void => {
    setModal({ estado, isOpen: true });
  };

  const closeModal = (): void => {
    setModal({ ...modal, isOpen: false });
  };

  return (
    <section id="mapa-brasil" className="mapa-brasil-section section fade-in-section" ref={sectionRef}>
      <div className="container">
        <div className="mapa-header">
          <h2 className="mapa-title">Distribuição das Bandas pelo Brasil</h2>
          <p className="mapa-subtitle">
            {totalBandas} bandas distribuídas em {estadosComBandas} estados brasileiros
          </p>
        </div>

        <div className="mapa-container">
          <div className="mapa-wrapper">
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{
                center: [-55, -14],
                scale: mapScale,
              }}
              style={{ width: '100%', height: 'auto' }}
            >
              <ZoomableGroup>
                <Geographies geography={geoUrl}>
                  {({ geographies }: { geographies: any[] }) =>
                    geographies.map((geo: any) => {
                      // Mapeamento mais preciso dos estados
                      const geoName = geo.properties.name || geo.properties.NAME || geo.properties.nome || '';
                      const geoSigla = geo.properties.sigla || geo.properties.SIGLA || geo.properties.abbrev || '';
                      
                      // Função para normalizar nomes (remover acentos e converter para maiúsculas)
                      const normalizeName = (name: string): string => {
                        return name
                          .normalize('NFD')
                          .replace(/[\u0300-\u036f]/g, '')
                          .toUpperCase()
                          .trim();
                      };
                      
                      // Primeiro tenta pelo mapeamento explícito
                      let estadoSigla = geoJsonToEstadoMap[geoName] || geoJsonToEstadoMap[normalizeName(geoName)];
                      
                      // Se não encontrou, tenta pela sigla direta
                      if (!estadoSigla && geoSigla) {
                        estadoSigla = geoSigla.toUpperCase();
                      }
                      
                      // Busca o estado pela sigla
                      let estado = estadoSigla ? estadosData.find((e) => e.sigla === estadoSigla) : undefined;
                      
                      // Se ainda não encontrou, tenta pelo nome normalizado
                      if (!estado && geoName) {
                        const normalizedGeoName = normalizeName(geoName);
                        estado = estadosData.find((e) => {
                          const normalizedEstadoName = normalizeName(e.nome);
                          // Match exato normalizado
                          if (normalizedGeoName === normalizedEstadoName) return true;
                          // Match parcial (um contém o outro)
                          if (normalizedGeoName.includes(normalizedEstadoName) || 
                              normalizedEstadoName.includes(normalizedGeoName)) return true;
                          // Match por sigla no nome
                          if (normalizedGeoName.includes(e.sigla)) return true;
                          return false;
                        });
                      }
                      
                      if (!estado) {
                        // Log para debug (pode remover depois)
                        console.warn(`Estado não encontrado no GeoJSON: ${geoName} (${geoSigla})`);
                        return null;
                      }
                      
                      const bandas = estado.bandas;
                      const regiao = estado.regiao;
                      
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill={getFillColor(regiao, bandas)}
                          stroke={getStrokeColor(regiao, bandas)}
                          strokeWidth={bandas > 0 ? 0.8 : 0.5}
                          style={{
                            default: {
                              outline: 'none',
                              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                              cursor: 'pointer',
                            },
                            hover: {
                              fill: CORES_REGIAO_HOVER[regiao as keyof typeof CORES_REGIAO_HOVER] || '#FCD34D',
                              stroke: 'rgba(0, 0, 0, 0.25)',
                              strokeWidth: 1.2,
                              outline: 'none',
                              cursor: 'pointer',
                              transform: 'scale(1.01)',
                              filter: 'brightness(1.05)',
                            },
                            pressed: {
                              outline: 'none',
                            },
                          }}
                          onMouseEnter={(e: React.MouseEvent<SVGPathElement>) => handleMouseEnter(estado, e)}
                          onMouseLeave={handleMouseLeave}
                          onClick={() => handleClick(estado)}
                        />
                      );
                    })
                  }
                </Geographies>

                {/* Siglas dos estados */}
                {estadosData.map((estado) => (
                  <Marker key={`sigla-${estado.sigla}`} coordinates={estado.coordenadas}>
                    <text
                      textAnchor="middle"
                      y={estado.bandas > 0 ? -22 : 0}
                      style={{
                        fontFamily: 'system-ui, -apple-system, sans-serif',
                        fill: estado.bandas > 0 ? '#1F2937' : '#9CA3AF',
                        fontSize: estado.bandas > 0 ? '13px' : '11px',
                        fontWeight: estado.bandas > 0 ? '700' : '600',
                        pointerEvents: 'none',
                        textShadow: 
                          estado.bandas > 0 
                            ? '0 1px 3px rgba(255, 255, 255, 0.9), 0 0 2px rgba(255, 255, 255, 0.8)'
                            : '0 1px 2px rgba(255, 255, 255, 0.7)',
                        letterSpacing: '0.5px',
                      }}
                    >
                      {estado.sigla}
                    </text>
                  </Marker>
                ))}

                {/* Marcadores com números para estados com bandas */}
                {estadosData
                  .filter((estado) => estado.bandas > 0)
                  .map((estado) => {
                    // Ajustar coordenadas do marcador para ficar abaixo da sigla
                    const [lng, lat] = estado.coordenadas;
                    const markerCoords: [number, number] = [lng, lat + 0.8];
                    
                    return (
                      <Marker key={`marker-${estado.sigla}`} coordinates={markerCoords}>
                        <circle
                          r={estado.bandas >= 3 ? 13 : estado.bandas === 2 ? 11 : 9}
                          fill="#FFD700"
                          stroke="#1F2937"
                          strokeWidth={2}
                          className="banda-marker"
                          style={{ filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.25))' }}
                        />
                        <text
                          textAnchor="middle"
                          y={3}
                          style={{
                            fontFamily: 'system-ui, -apple-system, sans-serif',
                            fill: '#1F2937',
                            fontSize: estado.bandas >= 3 ? '12px' : '10px',
                            fontWeight: '700',
                            pointerEvents: 'none',
                            textShadow: '0 1px 2px rgba(255, 255, 255, 0.5)',
                          }}
                        >
                          {estado.bandas}
                        </text>
                      </Marker>
                    );
                  })}
              </ZoomableGroup>
            </ComposableMap>
          </div>

          {/* Legenda por Região */}
          <div className="mapa-legenda">
            <h3 className="legenda-title">Regiões do Brasil</h3>
              <div className="legenda-items">
              <div className="legenda-item">
                <div className="legenda-color" style={{ backgroundColor: CORES_REGIAO.Norte }}></div>
                <span>Norte</span>
              </div>
              <div className="legenda-item">
                <div className="legenda-color" style={{ backgroundColor: CORES_REGIAO.Nordeste }}></div>
                <span>Nordeste</span>
              </div>
              <div className="legenda-item">
                <div className="legenda-color" style={{ backgroundColor: CORES_REGIAO['Centro-Oeste'] }}></div>
                <span>Centro-Oeste</span>
              </div>
              <div className="legenda-item">
                <div className="legenda-color" style={{ backgroundColor: CORES_REGIAO.Sudeste }}></div>
                <span>Sudeste</span>
              </div>
              <div className="legenda-item">
                <div className="legenda-color" style={{ backgroundColor: CORES_REGIAO.Sul }}></div>
                <span>Sul</span>
              </div>
            </div>
            <div className="legenda-info">
              <p className="legenda-note">💡 Clique em um estado para ver as cidades com bandas</p>
            </div>
          </div>
        </div>

        {/* Tooltip */}
        {tooltip && (
          <div
            className="mapa-tooltip"
            style={{
              left: `${tooltip.x}px`,
              top: `${tooltip.y}px`,
            }}
          >
            <div className="tooltip-estado">{tooltip.estado}</div>
            <div className="tooltip-regiao">{tooltip.regiao}</div>
          </div>
        )}

        {/* Modal */}
        {modal.isOpen && (
          <div className="mapa-modal-overlay" onClick={closeModal}>
            <div className="mapa-modal" onClick={(e) => e.stopPropagation()}>
              <button className="mapa-modal-close" onClick={closeModal} aria-label="Fechar modal">
                ×
              </button>
              <div className="mapa-modal-header">
                <h3 className="mapa-modal-title">{modal.estado.nome}</h3>
                <span className="mapa-modal-regiao">{modal.estado.regiao}</span>
              </div>
              <div className="mapa-modal-content">
                {modal.estado.bandas === 0 ? (
                  <div className="mapa-modal-empty">
                    <p>Este estado ainda não possui bandas cadastradas.</p>
                  </div>
                ) : (
                  <>
                    <div className="mapa-modal-stats">
                      <div className="mapa-modal-stat">
                        <span className="stat-value">{modal.estado.bandas}</span>
                        <span className="stat-label">{modal.estado.bandas === 1 ? 'Banda' : 'Bandas'}</span>
                      </div>
                      <div className="mapa-modal-stat">
                        <span className="stat-value">{modal.estado.cidades.length}</span>
                        <span className="stat-label">{modal.estado.cidades.length === 1 ? 'Cidade' : 'Cidades'}</span>
                      </div>
                    </div>
                    <div className="mapa-modal-cidades">
                      <h4 className="cidades-title">Cidades com Bandas</h4>
                      <ul className="cidades-list">
                        {modal.estado.cidades.map((cidade, index) => (
                          <li key={index} className="cidade-item">
                            <span className="cidade-nome">{cidade.nome}</span>
                            <span className="cidade-bandas">
                              {cidade.bandas} {cidade.bandas === 1 ? 'banda' : 'bandas'}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MapBrasil;
