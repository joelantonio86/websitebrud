import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '@/components/layout';
import { TourMediaGrid, TourMediaModal } from '@/components/tour';
import type { TourMediaItem } from '@/data/tour-media-types';
import {
  TOUR_2019_INTRO_PT,
  TOUR_2019_GENERAL_PT,
  TOUR_2019_GENERAL_EN,
  TOUR_2019_CITIES,
  TOUR_2019_CONCLUSION_PT,
  TOUR_2019_CONCLUSION_EN,
} from '@/data/tour-europa-2019-data';
import '@/styles/styles-tour-post.css';

const TourEuropa2019: React.FC = () => {
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
        title="Turnê Europa 2019"
        subtitle="Áustria, Itália e Suíça — 26 de setembro a 03 de outubro de 2019"
        breadcrumb={[
          { label: 'Início', to: '/' },
          { label: 'Eventos', to: '/eventos' },
          { label: 'Turnê Europa 2019' },
        ]}
      />

      <div className="container tour-post-container">
        <div className="tour-post-hero">
          <div className="tour-post-hero-icon" aria-hidden>
            <i className="fas fa-globe-europe" />
          </div>
          <p className="tour-post-hero-text">{TOUR_2019_INTRO_PT}</p>
        </div>

        <div className="tour-post-lead">
          <p className="tour-post-text">{TOUR_2019_GENERAL_PT}</p>
          <div className="tour-post-en-wrap">
            <span className="tour-post-en-label">English</span>
            <p className="tour-post-text tour-post-text-en">{TOUR_2019_GENERAL_EN}</p>
          </div>
        </div>

        {TOUR_2019_CITIES.map((city, index) => (
          <section
            key={city.id}
            id={city.id}
            className="tour-post-section tour-post-section-card"
            aria-labelledby={`tour-title-${city.id}`}
          >
            <div className="tour-post-section-header">
              <span className="tour-post-section-step" aria-hidden>
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="tour-post-section-titles">
                <h2 id={`tour-title-${city.id}`} className="tour-post-section-title">
                  <i className="fas fa-map-marker-alt tour-post-section-icon" aria-hidden />
                  {city.titlePt}
                </h2>
                <span className="tour-post-section-title-en" aria-hidden>
                  {city.titleEn}
                </span>
              </div>
            </div>
            <div className="tour-post-section-body">
              <p className="tour-post-text">{city.textPt}</p>
              <div className="tour-post-en-wrap">
                <span className="tour-post-en-label">English</span>
                <p className="tour-post-text tour-post-text-en">{city.textEn}</p>
              </div>
              <TourMediaGrid items={city.media} onSelect={openMedia} />
            </div>
          </section>
        ))}

        <section className="tour-post-conclusion tour-post-conclusion-highlight">
          <div className="tour-post-conclusion-icon" aria-hidden>
            <i className="fas fa-heart" />
          </div>
          <p className="tour-post-text tour-post-conclusion-text">{TOUR_2019_CONCLUSION_PT}</p>
          <div className="tour-post-en-wrap">
            <span className="tour-post-en-label">English</span>
            <p className="tour-post-text tour-post-text-en">{TOUR_2019_CONCLUSION_EN}</p>
          </div>
        </section>

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

export default TourEuropa2019;
