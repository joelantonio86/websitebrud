import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '@/components/layout';
import { TourMediaGrid, TourMediaModal } from '@/components/tour';
import type { TourMediaItem } from '@/data/tour-media-types';
import {
  TOUR_2017_INTRO,
  TOUR_2017_INTRO_MEDIA,
  TOUR_2017_SECTIONS,
} from '@/data/tour-suecia-2017-data';
import '@/styles/styles-tour-post.css';

const TourSuecia2017: React.FC = () => {
  const [modalItem, setModalItem] = useState<TourMediaItem | null>(null);

  const openMedia = useCallback((item: TourMediaItem) => {
    if (item.type === 'image' || (item.type === 'youtube' && item.youtubeId)) {
      setModalItem(item);
    }
  }, []);

  const closeMedia = useCallback(() => setModalItem(null), []);

  return (
    <div className="tour-post-page">
      <PageHeader
        title="Turnê Suécia e Finlândia 2017"
        subtitle="Setembro de 2017 — Estocolmo e Helsinki"
        breadcrumb={[
          { label: 'Início', to: '/' },
          { label: 'Eventos', to: '/eventos' },
          { label: 'Turnê Suécia 2017' },
        ]}
      />

      <div className="container tour-post-container">
        <div className="tour-post-hero">
          <div className="tour-post-hero-icon" aria-hidden>
            <i className="fas fa-music" />
          </div>
          <p className="tour-post-hero-text">{TOUR_2017_INTRO}</p>
        </div>

        <div className="tour-post-media-intro">
          <h3 className="tour-post-gallery-title">Primeiros momentos em Estocolmo</h3>
          <TourMediaGrid items={TOUR_2017_INTRO_MEDIA} onSelect={openMedia} />
        </div>

        <nav className="tour-post-index" aria-label="Índice da página">
          <h3 className="tour-post-index-title">
            <i className="fas fa-list-ul tour-post-index-icon" aria-hidden />
            Navegar pelo relato
          </h3>
          <ul className="tour-post-index-list">
            {TOUR_2017_SECTIONS.map((sec) => (
              <li key={sec.id}>
                <a href={`#${sec.id}`} className="tour-post-index-link">
                  {sec.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {TOUR_2017_SECTIONS.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="tour-post-section tour-post-section-card"
            aria-labelledby={`tour-title-${section.id}`}
          >
            <div className="tour-post-section-header tour-post-section-header-simple">
              <h2 id={`tour-title-${section.id}`} className="tour-post-section-title">
                <i className={`fas ${section.id === 'abba' ? 'fa-music' : section.id === 'palace' ? 'fa-landmark' : section.id === 'nobel' ? 'fa-award' : 'fa-check-circle'} tour-post-section-icon`} aria-hidden />
                {section.title}
              </h2>
              {section.date && (
                <p className="tour-post-section-date">
                  <i className="fas fa-calendar-alt tour-post-section-date-icon" aria-hidden />
                  {section.date}
                </p>
              )}
            </div>
            <div className="tour-post-section-body">
              <p className="tour-post-text">{section.text}</p>
              <TourMediaGrid items={section.media} onSelect={openMedia} />
            </div>
          </section>
        ))}

        <nav className="tour-post-back" aria-label="Voltar">
          <Link to="/eventos" className="tour-post-back-link">
            <i className="fas fa-arrow-left" aria-hidden />
            <span>Voltar ao Histórico de Apresentações</span>
          </Link>
        </nav>
      </div>

      <TourMediaModal item={modalItem} onClose={closeMedia} />
    </div>
  );
};

export default TourSuecia2017;
