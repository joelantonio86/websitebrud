import React, { useEffect } from 'react';
import type { TourMediaItem } from '@/data/tour-media-types';
import './TourMediaModal.css';

interface TourMediaModalProps {
  item: TourMediaItem | null;
  onClose: () => void;
}

export const TourMediaModal: React.FC<TourMediaModalProps> = ({ item, onClose }) => {
  useEffect(() => {
    if (!item) return;
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onEsc);
      document.body.style.overflow = '';
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      className="tour-media-modal"
      role="dialog"
      aria-modal="true"
      aria-label={item.caption}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="tour-media-modal-content">
        <button
          type="button"
          className="tour-media-modal-close"
          onClick={onClose}
          aria-label="Fechar"
        >
          <i className="fas fa-times" aria-hidden />
          <span>Fechar</span>
        </button>

        {item.type === 'image' ? (
          <img
            src={item.url}
            alt={item.caption}
            className="tour-media-modal-media"
          />
        ) : item.youtubeId ? (
          <div className="tour-media-modal-iframe-wrap">
            <iframe
              title={item.caption}
              src={`https://www.youtube.com/embed/${item.youtubeId}?autoplay=1`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="tour-media-modal-iframe"
            />
          </div>
        ) : null}

        <p className="tour-media-modal-caption">{item.caption}</p>
      </div>
    </div>
  );
};
