import { PageHeader } from '@/components/layout';
import { getBandasOrdenadas } from '@/data/bandas-brasil-data';
import {
  ANO_CALENDARIO,
  AGENDA_BRUD_2026,
  getMesesDoAno,
  getPdfUrlBanda,
} from '@/data/calendarios-brud-data';
import '@/styles/styles-calendarios.css';

const Calendarios: React.FC = () => {
  const bandas = getBandasOrdenadas();
  const meses = getMesesDoAno();

  return (
    <div className="calendarios-page">
      <PageHeader
        title="Calendários BRUD"
        subtitle={`Agenda BRUD e calendários das 24 bandas — ano ${ANO_CALENDARIO}`}
        breadcrumb={[{ label: 'Início', to: '/' }, { label: 'Calendários BRUD' }]}
      />

      <div className="container calendarios-container">
        {/* Seção 1: Agenda BRUD 2026 */}
        <section
          className="calendarios-section calendarios-agenda"
          aria-labelledby="agenda-brud-title"
        >
          <h2 id="agenda-brud-title" className="calendarios-section-title">
            <i className="fas fa-calendar-alt calendarios-section-icon" aria-hidden />
            Agenda BRUD {ANO_CALENDARIO}
          </h2>
          <p className="calendarios-section-desc">
            Quatro encontros anuais em diferentes regiões do Brasil. Meses com evento destacados abaixo.
          </p>

          <div className="calendarios-ano-strip" role="img" aria-label={`Calendário anual ${ANO_CALENDARIO}`}>
            <span className="calendarios-ano-numero">{ANO_CALENDARIO}</span>
            <div className="calendarios-meses-grid">
              {meses.map((m) => (
                <div
                  key={m.numero}
                  className={`calendarios-mes-item ${m.temEvento ? 'tem-evento' : ''}`}
                  title={m.temEvento ? `Encontro BRUD em ${m.label}` : m.label}
                >
                  <span className="calendarios-mes-num">{String(m.numero).padStart(2, '0')}</span>
                  <span className="calendarios-mes-label">{m.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="calendarios-eventos-list">
            {AGENDA_BRUD_2026.map((ev) => (
              <article
                key={ev.id}
                className="calendarios-evento-card"
                aria-labelledby={`evento-${ev.id}`}
              >
                <div className="calendarios-evento-mes" aria-hidden>
                  {ev.mesLabel}
                </div>
                <div className="calendarios-evento-body">
                  <h3 id={`evento-${ev.id}`} className="calendarios-evento-titulo">
                    {ev.titulo}
                  </h3>
                  <p className="calendarios-evento-local">
                    <i className="fas fa-map-marker-alt" aria-hidden />
                    {ev.local}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Seção 2: Calendários das 24 bandas (PDF) */}
        <section
          className="calendarios-section calendarios-pdfs"
          aria-labelledby="pdfs-bandas-title"
        >
          <h2 id="pdfs-bandas-title" className="calendarios-section-title">
            <i className="fas fa-file-pdf calendarios-section-icon" aria-hidden />
            Calendários das 24 bandas — {ANO_CALENDARIO}
          </h2>
          <p className="calendarios-section-desc">
            Download do calendário em PDF por banda. Arquivos para impressão ou leitura digital.
          </p>

          <div className="calendarios-pdf-grid" role="list">
            {bandas.map((banda) => (
              <article
                key={banda.id}
                className="calendarios-pdf-card"
                role="listitem"
              >
                <div className="calendarios-pdf-card-header">
                  <p className="calendarios-pdf-cidade-estado">
                    {banda.cidade} — {banda.estadoSigla}
                  </p>
                  <span className="calendarios-pdf-brud">BRUD</span>
                </div>
                <a
                  href={getPdfUrlBanda(banda.id)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="calendarios-pdf-btn"
                  download
                  aria-label={`Baixar calendário PDF — ${banda.cidade}, ${banda.estadoSigla}`}
                >
                  <i className="fas fa-download" aria-hidden />
                  <span>Baixar PDF</span>
                </a>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Calendarios;
