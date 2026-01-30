/**
 * Calendários BRUD — Agenda 2026 e PDFs das 24 bandas (Cloudflare).
 * Ajuste CALENDARIOS_PDF_BASE quando os PDFs estiverem no Cloudflare.
 */

/** Base URL dos PDFs no Cloudflare R2 (ou CDN). Ex.: https://seu-bucket.r2.dev/calendarios-2026 */
export const CALENDARIOS_PDF_BASE = 'https://www.bandaracional.com.br/calendarios';
// Quando estiver no Cloudflare: 'https://pub-xxxx.r2.dev/calendarios-2026'

export const ANO_CALENDARIO = 2026;

/** Eventos da Agenda BRUD no Brasil — normalmente 4 vezes ao ano, em determinado mês */
export interface EventoAgendaBRUD {
  id: string;
  mes: number; // 1–12
  mesLabel: string;
  titulo: string;
  /** Região/cidade (placeholder até definir) */
  local: string;
}

const MESES: string[] = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];

/** Os 4 encontros BRUD em 2026 (ajuste meses e locais conforme o calendário real) */
export const AGENDA_BRUD_2026: EventoAgendaBRUD[] = [
  { id: 'ev1', mes: 3, mesLabel: 'Março', titulo: 'Encontro BRUD', local: 'A definir' },
  { id: 'ev2', mes: 6, mesLabel: 'Junho', titulo: 'Encontro BRUD', local: 'A definir' },
  { id: 'ev3', mes: 9, mesLabel: 'Setembro', titulo: 'Encontro BRUD', local: 'A definir' },
  { id: 'ev4', mes: 12, mesLabel: 'Dezembro', titulo: 'Encontro BRUD', local: 'A definir' },
];

export function getMesesDoAno(): { numero: number; label: string; temEvento: boolean }[] {
  return MESES.map((label, i) => {
    const numero = i + 1;
    const temEvento = AGENDA_BRUD_2026.some((e) => e.mes === numero);
    return { numero, label, temEvento };
  });
}

/** Retorna a URL do PDF do calendário 2026 para uma banda (id igual ao de bandas-brasil-data) */
export function getPdfUrlBanda(bandaId: string): string {
  const base = CALENDARIOS_PDF_BASE.replace(/\/$/, '');
  return `${base}/2026/${bandaId}.pdf`;
}
