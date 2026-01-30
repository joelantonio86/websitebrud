import { Link } from 'react-router-dom';
import { PageHeader } from '@/components/layout';
import '@/styles/styles-eventos.css';

const EVENTOS_HISTORICO = [
  {
    id: 'tour-europa-2019',
    to: '/eventos/tour-europa-2019',
    title: 'Turnê Europa 2019',
    subtitle: 'Áustria, Itália e Suíça',
    date: '26 de setembro a 03 de outubro de 2019',
    description: 'Desfiles e apresentações em Viena, Veneza, Roma, Milão e Berna. Hinos dos três países, repertório brasileiro e doações do livro Universo em Desencanto.',
    icon: 'fa-globe-europe',
    imageClass: 'eventos-card-image-2019',
  },
  {
    id: 'tour-suecia-2017',
    to: '/eventos/tour-suecia-2017',
    title: 'Turnê Suécia e Finlândia 2017',
    subtitle: 'Estocolmo e Helsinki',
    date: 'Setembro de 2017',
    description: 'Apoteose Racional em Estocolmo: desfile em Götgatan, homenagem no ABBA Museum, apresentação no Palácio Real e concerto no Nobel Museum.',
    icon: 'fa-music',
    imageClass: 'eventos-card-image-2017',
  },
];

const Eventos: React.FC = () => {
  return (
    <div className="eventos-page">
      <PageHeader
        title="Histórico de Apresentações"
        subtitle="Turnês e eventos da Banda Racional"
        breadcrumb={[{ label: 'Início', to: '/' }, { label: 'Eventos' }]}
      />

      <div className="container eventos-container">
        <p className="eventos-intro">
          A Banda Racional já se apresentou em diversos países, levando alegria, harmonia e
          fraternidade ao público. Confira os relatos das turnês pela Europa.
        </p>

        <div className="eventos-grid" role="list">
          {EVENTOS_HISTORICO.map((evento) => (
            <article
              key={evento.id}
              className="eventos-card"
              role="listitem"
            >
              <Link to={evento.to} className="eventos-card-link">
                <div className={`eventos-card-image ${evento.imageClass}`} aria-hidden>
                  <span className="eventos-card-icon" aria-hidden>
                    <i className={`fas ${evento.icon}`} />
                  </span>
                </div>
                <div className="eventos-card-body">
                  <span className="eventos-card-date">{evento.date}</span>
                  <h2 className="eventos-card-title">{evento.title}</h2>
                  <p className="eventos-card-subtitle">{evento.subtitle}</p>
                  <p className="eventos-card-desc">{evento.description}</p>
                  <span className="eventos-card-cta">
                    <span>Ver relato completo</span>
                    <i className="fas fa-arrow-right" aria-hidden />
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Eventos;
