import { useState, useMemo } from 'react';
import { PageHeader } from '@/components/layout';
import {
  getBandasOrdenadas,
  getEstadosComBandas,
  type BandaBrasil,
  type BandaMediaItem,
} from '@/data/bandas-brasil-data';
import { TourMediaModal } from '@/components/tour';
import { youtubeThumbnail, type TourMediaItem } from '@/data/tour-media-types';
import '@/styles/styles-proximos-eventos.css';

const BANDAS_POR_PAGINA = 8;

const ProximosEventos: React.FC = () => {
  const [filtroEstado, setFiltroEstado] = useState<string>('Todos');
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [modalItem, setModalItem] = useState<BandaMediaItem | null>(null);
  const [indexAccordionOpen, setIndexAccordionOpen] = useState<string | null>(null);

  const bandasOrdenadas = useMemo(() => getBandasOrdenadas(), []);
  const estados = useMemo(() => getEstadosComBandas(), []);

  const bandasFiltradas = useMemo(() => {
    if (filtroEstado === 'Todos') return bandasOrdenadas;
    return bandasOrdenadas.filter((b) => b.estadoSigla === filtroEstado);
  }, [bandasOrdenadas, filtroEstado]);

  const totalPaginas = Math.max(1, Math.ceil(bandasFiltradas.length / BANDAS_POR_PAGINA));
  const paginaCorrigida = Math.min(paginaAtual, totalPaginas);
  const indiceInicio = (paginaCorrigida - 1) * BANDAS_POR_PAGINA;
  const bandasNaPagina = bandasFiltradas.slice(indiceInicio, indiceInicio + BANDAS_POR_PAGINA);

  const abrirMidia = (item: BandaMediaItem) => {
    if (item.type === 'image' && item.url) setModalItem(item);
    if (item.type === 'youtube' && item.youtubeId) setModalItem(item);
  };

  const fecharModal = () => setModalItem(null);

  const modalTourItem: TourMediaItem | null = useMemo(() => {
    if (!modalItem) return null;
    if (modalItem.type === 'image' && modalItem.url)
      return { type: 'image', url: modalItem.url, caption: modalItem.caption };
    if (modalItem.type === 'youtube' && modalItem.youtubeId)
      return { type: 'youtube', youtubeId: modalItem.youtubeId, caption: modalItem.caption };
    return null;
  }, [modalItem]);

  const indexPorEstado = useMemo(() => {
    const map = new Map<string, BandaBrasil[]>();
    bandasOrdenadas.forEach((b) => {
      const list = map.get(b.estadoSigla) ?? [];
      list.push(b);
      map.set(b.estadoSigla, list);
    });
    return map;
  }, [bandasOrdenadas]);

  return (
    <div className="bandas-brasil-page">
      <PageHeader
        title="Eventos por todo Brasil"
        subtitle="As Bandas Racionais em cada região — fotos e vídeos das apresentações e ensaios, atualizados nos finais de semana"
        breadcrumb={[
          { label: 'Início', to: '/' },
          { label: 'Eventos', to: '/eventos' },
          { label: 'Eventos por todo Brasil' },
        ]}
      />

      <div className="container bandas-brasil-container">
        <div className="bandas-brasil-hero">
          <div className="bandas-brasil-hero-icon" aria-hidden>
            <i className="fas fa-users" />
          </div>
          <p className="bandas-brasil-hero-text">
            Este é o espaço das <strong>Bandas Racionais</strong> em todo o Brasil. Aqui cada
            banda pode compartilhar vídeos e fotos das apresentações e ensaios realizados nos
            finais de semana. Conteúdo atualizado semanalmente.
          </p>
        </div>

        {/* Índice: desktop = lista com pills; mobile = accordion por estado */}
        <nav className="bandas-brasil-index bandas-brasil-index-desktop" aria-label="Índice das bandas por estado (desktop)">
          <h2 className="bandas-brasil-index-title">
            <i className="fas fa-map-marker-alt bandas-brasil-index-icon" aria-hidden />
            Bandas por cidade e estado
          </h2>
          <ul className="bandas-brasil-index-list">
            {Array.from(indexPorEstado.entries()).map(([sigla, bandas]) => (
              <li key={sigla} className="bandas-brasil-index-estado">
                <span className="bandas-brasil-index-sigla">{sigla}</span>
                <span className="bandas-brasil-index-cidades">
                  {bandas.map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      className="bandas-brasil-index-link"
                      onClick={() => {
                        setFiltroEstado(sigla);
                        const listaEstado = bandasOrdenadas.filter((x) => x.estadoSigla === sigla);
                        const idx = listaEstado.findIndex((x) => x.id === b.id);
                        setPaginaAtual(idx >= 0 ? Math.floor(idx / BANDAS_POR_PAGINA) + 1 : 1);
                      }}
                    >
                      {b.cidade}
                    </button>
                  ))}
                </span>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="bandas-brasil-index bandas-brasil-index-mobile" aria-label="Índice das bandas por estado">
          <h2 className="bandas-brasil-index-title">
            <i className="fas fa-map-marker-alt bandas-brasil-index-icon" aria-hidden />
            Bandas por cidade e estado
          </h2>
          <p className="bandas-brasil-index-hint">Toque em um estado para ver as cidades e ir direto à banda.</p>
          <div className="bandas-brasil-index-accordion">
            {Array.from(indexPorEstado.entries()).map(([sigla, bandas]) => {
              const isOpen = indexAccordionOpen === sigla;
              return (
                <div key={sigla} className="bandas-brasil-index-accordion-item">
                  <button
                    type="button"
                    className={`bandas-brasil-index-accordion-trigger ${isOpen ? 'open' : ''}`}
                    onClick={() => setIndexAccordionOpen((prev) => (prev === sigla ? null : sigla))}
                    aria-expanded={isOpen}
                    aria-controls={`bandas-index-panel-${sigla}`}
                    id={`bandas-index-trigger-${sigla}`}
                  >
                    <span className="bandas-brasil-index-accordion-sigla">{sigla}</span>
                    <span className="bandas-brasil-index-accordion-count">
                      {bandas.length} {bandas.length === 1 ? 'cidade' : 'cidades'}
                    </span>
                    <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'} bandas-brasil-index-accordion-chevron`} aria-hidden />
                  </button>
                  <div
                    id={`bandas-index-panel-${sigla}`}
                    className="bandas-brasil-index-accordion-panel"
                    role="region"
                    aria-labelledby={`bandas-index-trigger-${sigla}`}
                    hidden={!isOpen}
                  >
                    {bandas.map((b) => (
                      <button
                        key={b.id}
                        type="button"
                        className="bandas-brasil-index-accordion-city"
                        onClick={() => {
                          setFiltroEstado(sigla);
                          const listaEstado = bandasOrdenadas.filter((x) => x.estadoSigla === sigla);
                          const idx = listaEstado.findIndex((x) => x.id === b.id);
                          setPaginaAtual(idx >= 0 ? Math.floor(idx / BANDAS_POR_PAGINA) + 1 : 1);
                          setIndexAccordionOpen(null);
                        }}
                      >
                        {b.cidade}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </nav>

        <div className="bandas-brasil-filtro">
          <span className="bandas-brasil-filtro-label">Filtrar por estado:</span>
          <div className="bandas-brasil-filtro-pills" role="group" aria-label="Estado">
            <button
              type="button"
              className={`bandas-brasil-pill ${filtroEstado === 'Todos' ? 'active' : ''}`}
              onClick={() => {
                setFiltroEstado('Todos');
                setPaginaAtual(1);
              }}
            >
              Todos
            </button>
            {estados.map((sigla) => (
              <button
                key={sigla}
                type="button"
                className={`bandas-brasil-pill ${filtroEstado === sigla ? 'active' : ''}`}
                onClick={() => {
                  setFiltroEstado(sigla);
                  setPaginaAtual(1);
                }}
              >
                {sigla}
              </button>
            ))}
          </div>
        </div>

        <div className="bandas-brasil-grid" role="list">
          {bandasNaPagina.map((banda) => (
            <article
              key={banda.id}
              id={banda.id}
              className="bandas-brasil-card"
              role="listitem"
            >
              <div className="bandas-brasil-card-header">
                <span className="bandas-brasil-card-uf">{banda.estadoSigla}</span>
                <h3 className="bandas-brasil-card-titulo">{banda.nome}</h3>
                <p className="bandas-brasil-card-cidade">
                  {banda.cidade} — {banda.estadoSigla}
                </p>
              </div>
              <div className="bandas-brasil-card-midia">
                {banda.media.length === 0 ? (
                  <div className="bandas-brasil-card-placeholder">
                    <i className="fas fa-camera bandas-brasil-placeholder-icon" aria-hidden />
                    <span className="bandas-brasil-placeholder-text">Fotos e vídeos em breve</span>
                    <span className="bandas-brasil-placeholder-hint">
                      Atualizado nos finais de semana
                    </span>
                  </div>
                ) : (
                  <div className="bandas-brasil-card-galeria">
                    {banda.media.slice(0, 4).map((item, i) => (
                      <div key={i} className="bandas-brasil-mini-thumb">
                        {item.type === 'image' && item.url ? (
                          <button
                            type="button"
                            className="bandas-brasil-thumb-btn"
                            onClick={() => abrirMidia(item)}
                            aria-label={item.caption}
                          >
                            <img src={item.url} alt={item.caption} />
                          </button>
                        ) : item.type === 'youtube' && item.youtubeId ? (
                          <button
                            type="button"
                            className="bandas-brasil-thumb-btn bandas-brasil-thumb-video"
                            onClick={() => abrirMidia(item)}
                            aria-label={item.caption}
                          >
                            <img src={youtubeThumbnail(item.youtubeId)} alt="" />
                            <i className="fas fa-play bandas-brasil-thumb-play" aria-hidden />
                          </button>
                        ) : null}
                      </div>
                    ))}
                    {banda.media.length > 4 && (
                      <span className="bandas-brasil-mais">+{banda.media.length - 4}</span>
                    )}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        {totalPaginas > 1 && (
          <nav
            className="bandas-brasil-paginacao"
            aria-label="Navegação entre páginas"
          >
            <button
              type="button"
              className="bandas-brasil-pag-btn"
              disabled={paginaCorrigida <= 1}
              onClick={() => setPaginaAtual((p) => Math.max(1, p - 1))}
              aria-label="Página anterior"
            >
              <i className="fas fa-chevron-left" aria-hidden />
              <span>Anterior</span>
            </button>
            <span className="bandas-brasil-pag-info" aria-live="polite">
              Página {paginaCorrigida} de {totalPaginas}
            </span>
            <div className="bandas-brasil-pag-numeros">
              {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  type="button"
                  className={`bandas-brasil-pag-num ${n === paginaCorrigida ? 'active' : ''}`}
                  onClick={() => setPaginaAtual(n)}
                  aria-label={`Página ${n}`}
                  aria-current={n === paginaCorrigida ? 'page' : undefined}
                >
                  {n}
                </button>
              ))}
            </div>
            <button
              type="button"
              className="bandas-brasil-pag-btn"
              disabled={paginaCorrigida >= totalPaginas}
              onClick={() => setPaginaAtual((p) => Math.min(totalPaginas, p + 1))}
              aria-label="Próxima página"
            >
              <span>Próxima</span>
              <i className="fas fa-chevron-right" aria-hidden />
            </button>
          </nav>
        )}
      </div>

      <TourMediaModal item={modalTourItem} onClose={fecharModal} />
    </div>
  );
};

export default ProximosEventos;
