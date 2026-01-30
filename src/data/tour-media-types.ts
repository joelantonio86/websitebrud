/**
 * Tipos e base URLs para mídia dos posts de turnê.
 * Fotos: Cloudflare R2 (ajuste TOUR_MEDIA_BASE quando tiver a URL final).
 * Vídeos: YouTube (preencha youtubeId em tour-europa-2019-data e tour-suecia-2017-data).
 */

export const TOUR_MEDIA_BASE = 'https://www.bandaracional.com.br';
// Quando as fotos estiverem no Cloudflare: use a URL pública do bucket, ex. 'https://seu-bucket.r2.dev'

export type TourMediaItem =
  | { type: 'image'; url: string; caption: string }
  | { type: 'youtube'; youtubeId: string; caption: string };

export function tourImageUrl(path: string): string {
  if (path.startsWith('http')) return path;
  return `${TOUR_MEDIA_BASE.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}

export function youtubeThumbnail(id: string): string {
  return `https://img.youtube.com/vi/${id}/mqdefault.jpg`;
}
