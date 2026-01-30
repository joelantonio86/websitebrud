import React from 'react';
import type { TourMediaItem } from '@/data/tour-media-types';
import { youtubeThumbnail } from '@/data/tour-media-types';
import './TourMediaGrid.css';

interface TourMediaGridProps {
  items: TourMediaItem[];
  onSelect: (item: TourMediaItem, index: number) => void;
}

export const TourMediaGrid: React.FC<TourMediaGridProps> = ({ items, onSelect }) => {
  return (
    <div className="tour-media-grid" role="list">
      {items.map((item, index) => {
        const isYoutube = item.type === 'youtube';
        const hasYoutubeId = isYoutube && !!item.youtubeId;
        const isClickable = item.type === 'image' || hasYoutubeId;

        return (
          <div
            key={`${item.caption}-${index}`}
            className={`tour-media-item ${!isClickable ? 'tour-media-item-placeholder' : ''}`}
            role="listitem"
          >
            {item.type === 'image' ? (
              <button
                type="button"
                className="tour-media-button"
                onClick={() => onSelect(item, index)}
                aria-label={`Ver imagem: ${item.caption}`}
              >
                <img src={item.url} alt={item.caption} className="tour-media-thumb" />
                <span className="tour-media-caption">{item.caption}</span>
              </button>
            ) : (
              hasYoutubeId ? (
                <button
                  type="button"
                  className="tour-media-button tour-media-button-video"
                  onClick={() => onSelect(item, index)}
                  aria-label={`Assistir vídeo: ${item.caption}`}
                >
                  <img
                    src={youtubeThumbnail(item.youtubeId)}
                    alt=""
                    className="tour-media-thumb"
                  />
                  <span className="tour-media-play-icon" aria-hidden>
                    <i className="fas fa-play" />
                  </span>
                  <span className="tour-media-caption">{item.caption}</span>
                </button>
              ) : (
                <div className="tour-media-placeholder-content">
                  <div className="tour-media-placeholder-icon" aria-hidden>
                    <i className="fab fa-youtube" />
                  </div>
                  <span className="tour-media-caption">{item.caption}</span>
                  <span className="tour-media-placeholder-label">Vídeo em breve</span>
                </div>
              )
            )}
          </div>
        );
      })}
    </div>
  );
};
