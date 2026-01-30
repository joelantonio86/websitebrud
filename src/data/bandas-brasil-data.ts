/**
 * Bandas Racionais no Brasil — 24 bandas.
 * Cada banda tem espaço para vídeos e fotos (apresentações/ensaios), atualizados nos finais de semana.
 * Preencha media[] com { type: 'image'|'youtube', url ou youtubeId, caption } quando houver arquivos.
 */

export interface BandaMediaItem {
  type: 'image' | 'youtube';
  url?: string;
  youtubeId?: string;
  caption: string;
  thumbnail?: string;
}

export interface BandaBrasil {
  id: string;
  nome: string;
  cidade: string;
  estadoSigla: string;
  /** Mídias (fotos/vídeos) — atualizadas nos finais de semana */
  media: BandaMediaItem[];
}

const BANDAS: BandaBrasil[] = [
  { id: 'banda-1', nome: 'Banda Racional', cidade: 'Rio de Janeiro', estadoSigla: 'RJ', media: [] },
  { id: 'banda-2', nome: 'Banda Racional', cidade: 'Niterói', estadoSigla: 'RJ', media: [] },
  { id: 'banda-3', nome: 'Banda Racional', cidade: 'São Paulo', estadoSigla: 'SP', media: [] },
  { id: 'banda-4', nome: 'Banda Racional', cidade: 'Campinas', estadoSigla: 'SP', media: [] },
  { id: 'banda-5', nome: 'Banda Racional', cidade: 'Santos', estadoSigla: 'SP', media: [] },
  { id: 'banda-6', nome: 'Banda Racional', cidade: 'Belo Horizonte', estadoSigla: 'MG', media: [] },
  { id: 'banda-7', nome: 'Banda Racional', cidade: 'Uberlândia', estadoSigla: 'MG', media: [] },
  { id: 'banda-8', nome: 'Banda Racional', cidade: 'Salvador', estadoSigla: 'BA', media: [] },
  { id: 'banda-9', nome: 'Banda Racional', cidade: 'Recife', estadoSigla: 'PE', media: [] },
  { id: 'banda-10', nome: 'Banda Racional', cidade: 'Fortaleza', estadoSigla: 'CE', media: [] },
  { id: 'banda-11', nome: 'Banda Racional', cidade: 'Curitiba', estadoSigla: 'PR', media: [] },
  { id: 'banda-12', nome: 'Banda Racional', cidade: 'Londrina', estadoSigla: 'PR', media: [] },
  { id: 'banda-13', nome: 'Banda Racional', cidade: 'Porto Alegre', estadoSigla: 'RS', media: [] },
  { id: 'banda-14', nome: 'Banda Racional', cidade: 'Florianópolis', estadoSigla: 'SC', media: [] },
  { id: 'banda-15', nome: 'Banda Racional', cidade: 'Brasília', estadoSigla: 'DF', media: [] },
  { id: 'banda-16', nome: 'Banda Racional', cidade: 'Goiânia', estadoSigla: 'GO', media: [] },
  { id: 'banda-17', nome: 'Banda Racional', cidade: 'Belém', estadoSigla: 'PA', media: [] },
  { id: 'banda-18', nome: 'Banda Racional', cidade: 'Manaus', estadoSigla: 'AM', media: [] },
  { id: 'banda-19', nome: 'Banda Racional', cidade: 'João Pessoa', estadoSigla: 'PB', media: [] },
  { id: 'banda-20', nome: 'Banda Racional', cidade: 'Natal', estadoSigla: 'RN', media: [] },
  { id: 'banda-21', nome: 'Banda Racional', cidade: 'Vitória', estadoSigla: 'ES', media: [] },
  { id: 'banda-22', nome: 'Banda Racional', cidade: 'São Luís', estadoSigla: 'MA', media: [] },
  { id: 'banda-23', nome: 'Banda Racional', cidade: 'Cuiabá', estadoSigla: 'MT', media: [] },
  { id: 'banda-24', nome: 'Banda Racional', cidade: 'Campo Grande', estadoSigla: 'MS', media: [] },
];

/** Bandas ordenadas por estado (sigla) e depois por cidade */
export function getBandasOrdenadas(): BandaBrasil[] {
  return [...BANDAS].sort((a, b) => {
    if (a.estadoSigla !== b.estadoSigla) return a.estadoSigla.localeCompare(b.estadoSigla);
    return a.cidade.localeCompare(b.cidade);
  });
}

/** Estados que possuem bandas (siglas únicas), ordenados */
export function getEstadosComBandas(): string[] {
  const siglas = [...new Set(BANDAS.map((b) => b.estadoSigla))];
  return siglas.sort((a, b) => a.localeCompare(b));
}

export const BANDAS_BRASIL = BANDAS;
