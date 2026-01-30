import React, { useMemo, useState, useRef, useCallback, useEffect } from 'react';
import { partiturasData } from '../data/partituras-data';
import type { PartituraData } from '../data/partituras-data';
import { PartiturasWidget } from '../components/partituras';
import { PageHeader } from '../components/layout';

type CategoriaId = PartituraData['category'] | 'todas';

const CATEGORIAS: { id: CategoriaId; nome: string; short?: string }[] = [
  { id: 'todas', nome: 'Todas' },
  { id: 'r', nome: 'Músicas Racionais', short: 'R' },
  { id: 'd', nome: 'Músicas Diversas', short: 'D' },
  { id: 'a', nome: 'Apresentações', short: 'A' },
  { id: 'tf', nome: 'Toques de Fanfarra' },
  { id: 'h', nome: 'Hinos', short: 'H' }
];

function filterBySearch(list: PartituraData[], query: string): PartituraData[] {
  const q = query.toLowerCase().trim();
  if (!q) return list;
  return list.filter((p) => p.title.toLowerCase().includes(q) || p.folder.toLowerCase().includes(q));
}

const STORAGE_KEY = 'partituras-categoria';

function getInitialCategoria(): CategoriaId {
  try {
    const s = sessionStorage.getItem(STORAGE_KEY);
    if (s && CATEGORIAS.some((c) => c.id === s)) return s as CategoriaId;
  } catch {
    /* ignore */
  }
  return 'todas';
}

const Partituras: React.FC = () => {
  const [categoriaAtiva, setCategoriaAtiva] = useState<CategoriaId>(getInitialCategoria);
  const [search, setSearch] = useState('');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, categoriaAtiva);
    } catch {
      /* ignore */
    }
  }, [categoriaAtiva]);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const porCategoria = useMemo(() => {
    const list = Object.values(partiturasData);
    const map: Record<PartituraData['category'], PartituraData[]> = {
      r: [], d: [], a: [], tf: [], h: []
    };
    list.forEach((p) => {
      if (map[p.category]) map[p.category].push(p);
    });
    (Object.keys(map) as PartituraData['category'][]).forEach((cat) => {
      map[cat].sort((a, b) => a.folder.localeCompare(b.folder, undefined, { numeric: true }));
    });
    return map;
  }, []);

  const categoriasComConteudo = useMemo(
    () => CATEGORIAS.filter((c) => c.id === 'todas' || (porCategoria[c.id as PartituraData['category']]?.length ?? 0) > 0),
    [porCategoria]
  );

  const partiturasVisiveis = useMemo(() => {
    const base = categoriaAtiva === 'todas'
      ? (Object.keys(porCategoria) as PartituraData['category'][]).flatMap((id) => porCategoria[id] ?? [])
      : porCategoria[categoriaAtiva] ?? [];
    return filterBySearch(base, search);
  }, [categoriaAtiva, porCategoria, search]);

  const temResultados = partiturasVisiveis.length > 0;
  const temFiltroAtivo = search.trim().length > 0;

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
      e.preventDefault();
      searchInputRef.current?.focus();
    }
    if (e.key === 'Escape') {
      setSearch('');
      searchInputRef.current?.blur();
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="partituras-page">
      <PageHeader
        title="Partituras"
        subtitle="Baixe partituras e ouça os áudios de cada instrumento"
        breadcrumb={[{ label: 'Início', to: '/' }, { label: 'Partituras' }]}
      />

      <div className="container">
        {/* Barra: busca + abas (base joelantonio86.github.io/websitebrud/partituras.html) */}
        <div className="partituras-toolbar" role="search">
          <div className="partituras-search-wrap">
            <label htmlFor="partituras-search" className="partituras-search-label">
              Pesquisar
            </label>
            <input
              ref={searchInputRef}
              id="partituras-search"
              type="search"
              className="partituras-search-input"
              placeholder="Música ou instrumento (ex.: R01, atabaque)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Pesquisar música ou instrumento"
              autoComplete="off"
            />
            {temFiltroAtivo && (
              <button
                type="button"
                className="partituras-search-clear"
                onClick={() => { setSearch(''); searchInputRef.current?.focus(); }}
                aria-label="Limpar pesquisa"
              >
                ✕
              </button>
            )}
          </div>

          <div className="partituras-tabs" role="tablist" aria-label="Filtrar por categoria">
            {categoriasComConteudo.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={categoriaAtiva === cat.id}
                aria-controls={`panel-${cat.id}`}
                id={`tab-${cat.id}`}
                className={`partituras-tab ${categoriaAtiva === cat.id ? 'active' : ''}`}
                onClick={() => {
                  setCategoriaAtiva(cat.id);
                }}
              >
                {cat.short ? `${cat.nome} (${cat.short})` : cat.nome}
              </button>
            ))}
          </div>
        </div>

        <div className="partituras-content">
          {!temResultados ? (
            <div className="partituras-empty" role="status">
              {temFiltroAtivo ? (
                <>
                  <p className="partituras-empty-title">Nenhuma música encontrada</p>
                  <p className="partituras-empty-desc">Tente outro termo ou limpe a pesquisa.</p>
                  <button
                    type="button"
                    className="partituras-empty-btn"
                    onClick={() => { setSearch(''); searchInputRef.current?.focus(); }}
                  >
                    Limpar pesquisa
                  </button>
                </>
              ) : (
                <>
                  <p className="partituras-empty-title">Nenhuma partitura nesta categoria</p>
                  <p className="partituras-empty-desc">Selecione outra aba acima.</p>
                </>
              )}
            </div>
          ) : categoriaAtiva === 'todas' ? (
            (['r', 'd', 'a', 'tf', 'h'] as PartituraData['category'][]).map((id) => {
              const partituras = partiturasVisiveis.filter((p) => p.category === id);
              if (partituras.length === 0) return null;
              const nome = CATEGORIAS.find((c) => c.id === id)?.nome ?? id;
              return (
                <section
                  key={id}
                  id={`cat-${id}`}
                  className="partituras-categoria"
                  role="tabpanel"
                  aria-labelledby={`tab-${id}`}
                >
                  <h2 className="partituras-categoria-title">{nome}</h2>
                  <div className="partituras-widgets">
                    {partituras.map((p) => (
                      <PartiturasWidget
                        key={p.folder}
                        partitura={p}
                        globalSearchQuery={search}
                      />
                    ))}
                  </div>
                </section>
              );
            })
          ) : (
            <section
              id={`panel-${categoriaAtiva}`}
              className="partituras-categoria"
              role="tabpanel"
              aria-labelledby={`tab-${categoriaAtiva}`}
            >
              <div className="partituras-widgets">
                {partiturasVisiveis.map((p) => (
                  <PartiturasWidget
                    key={p.folder}
                    partitura={p}
                    globalSearchQuery={search}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {showBackToTop && (
        <button
          type="button"
          className="partituras-back-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Voltar ao topo"
        >
          ↑
        </button>
      )}
    </div>
  );
};

export default Partituras;
