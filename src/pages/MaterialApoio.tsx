import { useState, useRef, useEffect, useCallback } from 'react';
import { PageHeader } from '@/components/layout';
import '@/styles/styles-material-apoio.css';

const DOCS_BASE = 'https://www.bandaracional.com.br/partituras/doc';
const MP3_BASE = 'https://www.bandaracional.com.br/partituras/mp3';

interface DocItem {
  title: string;
  href: string;
  description: string;
}

interface VideoItem {
  id: string;
  title: string;
  description: string;
}

interface AudioItem {
  id: string;
  title: string;
  src: string;
  description: string;
}

const DOCUMENTOS: DocItem[] = [
  {
    title: 'Regras interpret Batidas e Evoluções',
    href: `${DOCS_BASE}/Regras interpret Batidas e Evoluções.pdf`,
    description: 'Documento com padrões de partituras e contagem rítmica.',
  },
  {
    title: 'Repertório andamentos e compassos',
    href: `${DOCS_BASE}/Repertório andamentos e compassos.pdf`,
    description: 'Guia completo para repertórios e diretrizes musicais.',
  },
];

const VIDEOS: VideoItem[] = [
  {
    id: 'jOxkIemv6RA',
    title: 'Demonstração de Evoluções para Fuzileiro',
    description: 'Vídeo com demonstrações práticas para evoluções.',
  },
  {
    id: 'QtdGhSOeA9g',
    title: 'Evoluções de Pratos',
    description: 'Vídeo completo com demonstrações práticas para evoluções.',
  },
];

const AUDIOS: AudioItem[] = [
  {
    id: '2x1',
    title: '2x1.mp3',
    src: `${MP3_BASE}/2x1.mp3`,
    description: 'Áudio para marcação de ritmo (120 BPM).',
  },
  {
    id: 'senta-levanta',
    title: 'senta-levanta.mp3',
    src: `${MP3_BASE}/senta-levanta.mp3`,
    description: 'Áudio para marcação de ritmo (120 BPM).',
  },
];

const MaterialApoio: React.FC = () => {
  const [videoModalId, setVideoModalId] = useState<string | null>(null);

  const openVideo = useCallback((id: string) => setVideoModalId(id), []);
  const closeVideo = useCallback(() => setVideoModalId(null), []);

  useEffect(() => {
    if (!videoModalId) return;
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && closeVideo();
    document.addEventListener('keydown', onEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onEsc);
      document.body.style.overflow = '';
    };
  }, [videoModalId, closeVideo]);

  return (
    <div className="material-apoio-page">
      <PageHeader
        title="Material de Apoio"
        subtitle="Documentação e recursos para maestros"
        breadcrumb={[
          { label: 'Início', to: '/' },
          { label: 'Repertório', to: '/repertorio' },
          { label: 'Material de Apoio' },
        ]}
      />

      <div className="container material-apoio-container">
        <div className="material-apoio-intro">
          <div className="material-apoio-intro-icon" aria-hidden>
            <i className="fas fa-book-open" />
          </div>
          <p className="material-apoio-intro-text">
            <strong>Salve!</strong> Disponibilizamos a nova documentação com orientações aos maestros sobre as recentes atualizações.
          </p>
        </div>

        <section className="material-apoio-section" aria-labelledby="doc-section-title">
          <h2 id="doc-section-title" className="material-apoio-section-title">
            <i className="fas fa-file-pdf material-apoio-section-icon" aria-hidden />
            Documentos
          </h2>
          <div className="material-apoio-grid">
            {DOCUMENTOS.map((doc) => (
              <a
                key={doc.title}
                href={doc.href}
                target="_blank"
                rel="noopener noreferrer"
                className="material-apoio-card material-apoio-card-link"
              >
                <div className="material-apoio-card-accent material-apoio-card-accent-pdf" aria-hidden />
                <div className="material-apoio-card-header">
                  <span className="material-apoio-card-icon material-apoio-card-icon-pdf" aria-hidden>
                    <i className="fas fa-file-pdf" />
                  </span>
                  <h3 className="material-apoio-card-title">{doc.title}</h3>
                </div>
                <p className="material-apoio-card-desc">{doc.description}</p>
                <div className="material-apoio-card-footer">
                  <span className="material-apoio-label material-apoio-label-pdf">PDF</span>
                  <span className="material-apoio-card-cta">
                    <i className="fas fa-download" aria-hidden />
                    <span>Baixar</span>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="material-apoio-section" aria-labelledby="video-section-title">
          <h2 id="video-section-title" className="material-apoio-section-title">
            <i className="fas fa-play-circle material-apoio-section-icon" aria-hidden />
            Vídeos
          </h2>
          <div className="material-apoio-grid">
            {VIDEOS.map((video) => (
              <button
                key={video.id}
                type="button"
                className="material-apoio-card material-apoio-card-video"
                onClick={() => openVideo(video.id)}
              >
                <div className="material-apoio-card-accent material-apoio-card-accent-video" aria-hidden />
                <div className="material-apoio-card-header">
                  <span className="material-apoio-card-icon material-apoio-card-icon-video" aria-hidden>
                    <i className="fas fa-play" />
                  </span>
                  <h3 className="material-apoio-card-title">{video.title}</h3>
                </div>
                <p className="material-apoio-card-desc">{video.description}</p>
                <div className="material-apoio-card-footer">
                  <span className="material-apoio-label material-apoio-label-video">Vídeo</span>
                  <span className="material-apoio-card-cta">
                    <i className="fas fa-play" aria-hidden />
                    <span>Assistir</span>
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="material-apoio-section" aria-labelledby="audio-section-title">
          <h2 id="audio-section-title" className="material-apoio-section-title">
            <i className="fas fa-music material-apoio-section-icon" aria-hidden />
            Áudios
          </h2>
          <div className="material-apoio-grid">
            {AUDIOS.map((audio) => (
              <MaterialApoioAudioCard key={audio.id} item={audio} />
            ))}
          </div>
        </section>
      </div>

      {videoModalId && (
        <div
          className="material-apoio-video-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Assistir vídeo"
          onClick={(e) => e.target === e.currentTarget && closeVideo()}
        >
          <div className="material-apoio-video-modal-content">
            <button
              type="button"
              className="material-apoio-video-modal-close"
              onClick={closeVideo}
              aria-label="Fechar vídeo"
            >
              <i className="fas fa-times" aria-hidden />
              <span className="material-apoio-video-modal-close-text">Fechar</span>
            </button>
            <div className="material-apoio-video-modal-iframe-wrap">
              <iframe
                title="Vídeo YouTube"
                src={`https://www.youtube.com/embed/${videoModalId}?autoplay=1`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface MaterialApoioAudioCardProps {
  item: AudioItem;
}

const MaterialApoioAudioCard: React.FC<MaterialApoioAudioCardProps> = ({ item }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    if (isPlaying) el.pause();
    else el.play().catch(() => setIsPlaying(false));
  }, [isPlaying]);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    el.addEventListener('play', onPlay);
    el.addEventListener('pause', onPause);
    el.addEventListener('ended', onPause);
    return () => {
      el.removeEventListener('play', onPlay);
      el.removeEventListener('pause', onPause);
      el.removeEventListener('ended', onPause);
    };
  }, []);

  return (
    <div className="material-apoio-card material-apoio-card-audio">
      <div className="material-apoio-card-accent material-apoio-card-accent-audio" aria-hidden />
      <div className="material-apoio-card-header">
        <span className="material-apoio-card-icon material-apoio-card-icon-audio" aria-hidden>
          <i className="fas fa-music" />
        </span>
        <h3 className="material-apoio-card-title">{item.title}</h3>
      </div>
      <p className="material-apoio-card-desc">{item.description}</p>
      <div className="material-apoio-card-footer">
        <span className="material-apoio-label material-apoio-label-audio">Áudio</span>
        <div className="material-apoio-audio-actions">
          <button
            type="button"
            className="material-apoio-audio-btn"
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pausar' : 'Reproduzir'}
          >
            <i className={isPlaying ? 'fas fa-pause' : 'fas fa-play'} aria-hidden />
          </button>
          <audio ref={audioRef} src={item.src} preload="none" playsInline />
          <a
            href={item.src}
            download
            className="material-apoio-audio-btn material-apoio-download-btn"
            aria-label="Baixar áudio"
          >
            <i className="fas fa-download" aria-hidden />
          </a>
        </div>
      </div>
    </div>
  );
};

export default MaterialApoio;
