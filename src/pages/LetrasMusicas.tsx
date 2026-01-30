import { useState, useMemo } from 'react';
import { PageHeader } from '@/components/layout';
import { LETRAS_MUSICAS } from '@/data/letras-musicas-data';
import '@/styles/styles-letras-musicas.css';

const LetrasMusicas: React.FC = () => {
  const [search, setSearch] = useState('');
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return LETRAS_MUSICAS;
    return LETRAS_MUSICAS.filter((m) => m.title.toLowerCase().includes(q));
  }, [search]);

  return (
    <div className="letras-musicas-page">
      <PageHeader
        title="Letras das Músicas"
        subtitle="Repertório em letra para consulta"
        breadcrumb={[
          { label: 'Início', to: '/' },
          { label: 'Repertório', to: '/repertorio' },
          { label: 'Letras das Músicas' },
        ]}
      />

      <div className="container letras-musicas-container">
        <div className="letras-musicas-toolbar">
          <div className="letras-musicas-search-wrap">
            <i className="fas fa-search letras-musicas-search-icon" aria-hidden />
            <input
              type="search"
              className="letras-musicas-search"
              placeholder="Buscar por título da música..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Buscar música por título"
            />
          </div>
          <span className="letras-musicas-count" aria-live="polite">
            {filtered.length} {filtered.length === 1 ? 'música' : 'músicas'}
          </span>
        </div>

        {filtered.length === 0 ? (
          <div className="letras-musicas-empty">
            <i className="fas fa-music letras-musicas-empty-icon" aria-hidden />
            <p>Nenhuma música encontrada para &quot;{search}&quot;.</p>
            <p className="letras-musicas-empty-hint">Tente outro termo.</p>
          </div>
        ) : (
          <ul className="letras-musicas-list" role="list">
            {filtered.map((musica) => {
              const isOpen = openId === musica.id;
              return (
                <li key={musica.id} className="letras-musicas-item">
                  <button
                    type="button"
                    className={`letras-musicas-trigger ${isOpen ? 'is-open' : ''}`}
                    onClick={() => setOpenId(isOpen ? null : musica.id)}
                    aria-expanded={isOpen}
                    aria-controls={`lyrics-${musica.id}`}
                    id={`trigger-${musica.id}`}
                  >
                    <span className="letras-musicas-trigger-title">{musica.title}</span>
                    <i className={`fas fa-chevron-down letras-musicas-trigger-icon ${isOpen ? 'is-open' : ''}`} aria-hidden />
                  </button>
                  <div
                    id={`lyrics-${musica.id}`}
                    className={`letras-musicas-panel ${isOpen ? 'is-open' : ''}`}
                    role="region"
                    aria-labelledby={`trigger-${musica.id}`}
                    hidden={!isOpen}
                  >
                    <pre className="letras-musicas-lyrics">{musica.lyrics}</pre>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default LetrasMusicas;
