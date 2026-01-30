// =========================================================
// TYPES - Tipos TypeScript para o projeto
// =========================================================

export interface NavItem {
  label: string;
  path: string;
  submenu?: NavItem[];
}

export interface SubmenuItem {
  label: string;
  path: string;
  subSubmenu?: SubmenuItem[];
}

export interface MenuState {
  isOpen: boolean;
  activeSubmenu: string | null;
  activeSubSubmenu: string | null;
}

export interface StatsData {
  musicas: number;
  apresentacoes: number;
  bandas: number;
}

export interface EventData {
  id: string;
  title: string;
  date: string;
  location: string;
  description?: string;
}

export interface MusicData {
  id: string;
  title: string;
  category: string;
  audioUrl?: string;
  partituras?: PartituraData[];
}

export interface PartituraData {
  id: string;
  instrument: string;
  url: string;
}

export interface GalleryData {
  id: string;
  banda: string;
  cidade: string;
  estado: string;
  fotos: PhotoData[];
  videos: VideoData[];
}

export interface PhotoData {
  id: string;
  url: string;
  titulo: string;
  data: string;
}

export interface VideoData {
  id: string;
  youtubeId: string;
  titulo: string;
  data: string;
}
