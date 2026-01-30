/**
 * Configuração de Partituras - Lógica do plugin PR Partituras
 * Estrutura do bucket Cloudflare R2: partituras-brud
 * Pastas raiz: racionais, diversas, hinos, toques, mp3 (e docs para uso futuro).
 */

// --- Bucket R2: partituras-brud ---
export const R2_BUCKET_PARTITURAS = 'partituras-brud';

// --- URL base: desenvolvimento público R2 (ou override via .env para produção) ---
// URL de desenvolvimento: https://pub-xxx.r2.dev/partituras-brud
const R2_PUBLIC_DEV_URL = 'https://pub-7bbbe8f08c7143cb98146a2a4d2f633f.r2.dev/partituras-brud';

export const CLOUDFLARE_PARTITURAS_BASE =
  (import.meta.env.VITE_PARTITURAS_BASE_URL as string) || R2_PUBLIC_DEV_URL;

/** Mapeamento categoria do app → pasta raiz no bucket R2 */
const BUCKET_FOLDER_BY_CATEGORY: Record<string, string> = {
  r: 'racionais',
  d: 'diversas',
  a: 'apresentacoes', // adicione a pasta no bucket quando houver arquivos
  tf: 'toques',
  h: 'hinos'
};

/** Monta URL para PDF/SIB/ENC conforme estrutura do bucket: racionais/r01/arquivo.pdf */
export function getPartituraFileUrl(category: string, folder: string, filename: string): string {
  const bucketFolder = BUCKET_FOLDER_BY_CATEGORY[category] ?? category;
  const path = `${bucketFolder}/${folder}/${encodeURIComponent(filename)}`;
  return `${CLOUDFLARE_PARTITURAS_BASE}/${path}`;
}

/** Monta URL para MP3 (pasta mp3 no bucket: mp3/r01.mp3 ou mp3/r01atabaque.mp3) */
export function getPartituraMp3Url(filePath: string): string {
  const normalized = filePath.startsWith('mp3/') ? filePath : `mp3/${filePath}`;
  return `${CLOUDFLARE_PARTITURAS_BASE}/${normalized}`;
}

// --- Pastas migradas para Sibelius (usa .sib e lista de instrumentos Sibelius) ---
export const PASTAS_MIGRADAS_SIBELIUS: string[] = [
  'a10', 'r01', 'r02', 'r03', 'r04', 'r05', 'r06', 'r07', 'r08', 'r09', 'r10',
  'r11', 'r12', 'r13', 'r14', 'r15', 'r16', 'r17', 'r18', 'r19', 'r20', 'r21',
  'r22', 'r23', 'r24', 'r25', 'r26', 'r27', 'r28', 'r29', 'r30', 'r31', 'r32',
  'r33', 'r34', 'r35', 'r36', 'r37', 'd17', 'd18', 'd33', 'd35', 'rjb01', 'rjb02'
];

// --- Pastas que possuem MP3 da música completa (mix) ---
export const PASTAS_COM_MP3_FULL: string[] = [
  'a10', 'r01', 'r02', 'r03', 'r04', 'r05', 'r06', 'r07', 'r08', 'r09', 'r10',
  'r11', 'r12', 'r13', 'r14', 'r15', 'r16', 'r17', 'r18', 'r19', 'r20', 'r21',
  'r22', 'r23', 'r24', 'r25', 'r26', 'r27', 'r28', 'r29', 'r30', 'r31', 'r32',
  'r33', 'r34', 'r35', 'r36', 'r37', 'd17', 'd18', 'd33', 'd35'
];

// --- MP3 por pasta (chaves de instrumento para arquivos .mp3) ---
// Os players de áudio aparecem SOMENTE para os instrumentos listados aqui em cada pasta.
// Para adicionar novos áudios: edite este objeto (MP3_POR_PASTA) abaixo.
//   - Inclua a chave do instrumento (ex: 'atabaque', 'lirac', 'saxaltoeb') no array da pasta.
//   - Para uma música nova: crie uma nova entrada, ex: 'r38': ['atabaque', 'caixa', ...].
//   - Se houver MP3 da música completa (mix), adicione a pasta também em PASTAS_COM_MP3_FULL (linhas 46-52).
// Chaves de instrumento usadas: fuzileiro, atabaque, caixa, surdo, prato, lirac, flautimc,
//   saxaltoeb, saxsopranobb, clarinetebb, saxtenorbb, trompetebb, trompetec, trompabb,
//   trombonebb, trombonec, bombardinobb, trombonebaixoc, tubabb, tubaeb
export const MP3_POR_PASTA: Record<string, string[]> = {
  a10: ['fuzileiro', 'atabaque', 'caixa', 'surdo', 'prato', 'lirac', 'saxaltoeb', 'saxtenorbb', 'saxsopranobb', 'clarinetebb', 'trompetebb', 'trombonebb', 'bombardinobb', 'tubabb', 'tubaeb'],
  r01: ['atabaque', 'caixa', 'lirac', 'surdo'],
  r02: ['atabaque', 'caixa', 'surdo', 'lirac', 'saxaltoeb', 'saxsopranobb', 'clarinetebb', 'trompetebb', 'trombonebb', 'bombardinobb', 'tubabb', 'tubaeb'],
  r03: ['atabaque', 'caixa', 'surdo', 'lirac', 'saxaltoeb', 'saxsopranobb', 'clarinetebb', 'trompetebb', 'trombonebb', 'bombardinobb', 'tubabb', 'tubaeb'],
  r04: ['atabaque', 'caixa', 'surdo', 'lirac', 'saxaltoeb', 'saxsopranobb', 'clarinetebb', 'trompetebb', 'trombonebb', 'bombardinobb', 'tubabb', 'tubaeb'],
  r05: ['atabaque', 'caixa', 'surdo', 'prato', 'lirac', 'saxaltoeb', 'saxsopranobb', 'clarinetebb', 'trompetebb', 'trombonebb', 'bombardinobb', 'tubabb', 'tubaeb'],
  r06: ['atabaque', 'caixa', 'surdo', 'lirac', 'saxaltoeb', 'saxsopranobb', 'clarinetebb', 'saxtenorbb', 'trompetebb', 'trombonebb', 'bombardinobb', 'tubabb', 'tubaeb'],
  r07: ['atabaque', 'caixa', 'lirac'],
  r08: ['atabaque', 'caixa', 'surdo', 'lirac', 'saxaltoeb', 'saxsopranobb', 'clarinetebb', 'saxtenorbb', 'trompetebb', 'trombonebb', 'bombardinobb', 'tubabb', 'tubaeb'],
  r09: ['atabaque', 'caixa', 'surdo', 'lirac', 'saxaltoeb', 'saxsopranobb', 'clarinetebb', 'saxtenorbb', 'trompetebb', 'trombonebb', 'bombardinobb', 'tubabb', 'tubaeb'],
  r10: ['atabaque', 'caixa', 'surdo', 'lirac', 'saxaltoeb', 'saxsopranobb', 'clarinetebb', 'saxtenorbb', 'trompetebb', 'trombonebb', 'bombardinobb', 'tubabb', 'tubaeb'],
  r11: ['fuzileiro', 'atabaque', 'caixa', 'surdo', 'prato', 'lirac', 'saxaltoeb', 'saxsopranobb', 'clarinetebb', 'saxtenorbb', 'trompetebb', 'trompetec', 'trombonebb', 'trombonec', 'bombardinobb', 'trombonebaixoc', 'tubabb', 'tubaeb'],
  r12: ['fuzileiro', 'atabaque', 'caixa', 'surdo', 'prato', 'lirac', 'saxaltoeb', 'saxsopranobb', 'clarinetebb', 'saxtenorbb', 'trompetebb', 'trompetec', 'trombonebb', 'trombonec', 'bombardinobb', 'trombonebaixoc', 'tubabb', 'tubaeb'],
  r13: ['fuzileiro', 'atabaque', 'caixa', 'surdo', 'prato', 'lirac', 'flautimc', 'saxaltoeb', 'saxsopranobb', 'clarinetebb', 'saxtenorbb', 'trompetebb', 'trompabb', 'trompetec', 'trombonebb', 'trombonec', 'bombardinobb', 'trombonebaixoc', 'tubabb', 'tubaeb'],
  r14: ['fuzileiro', 'atabaque', 'caixa', 'surdo', 'prato', 'lirac', 'flautimc', 'saxaltoeb', 'saxsopranobb', 'clarinetebb', 'saxtenorbb', 'trompetebb', 'trompetec', 'trompabb', 'trombonebb', 'trombonec', 'bombardinobb', 'trombonebaixoc', 'tubabb', 'tubaeb'],
  r15: ['fuzileiro', 'atabaque', 'caixa', 'surdo', 'prato', 'lirac', 'flautimc', 'saxaltoeb', 'saxsopranobb', 'clarinetebb', 'saxtenorbb', 'trompetebb', 'trompetec', 'trompabb', 'trombonebb', 'trombonec', 'bombardinobb', 'trombonebaixoc', 'tubabb', 'tubaeb'],
  r16: ['fuzileiro', 'atabaque', 'caixa', 'surdo', 'prato', 'lirac', 'flautimc', 'saxaltoeb', 'saxsopranobb', 'clarinetebb', 'saxtenorbb', 'trompetebb', 'trompetec', 'trompabb', 'trombonebb', 'trombonec', 'bombardinobb', 'trombonebaixoc', 'tubabb', 'tubaeb'],
  r17: ['fuzileiro', 'atabaque', 'caixa', 'surdo', 'prato', 'lirac', 'flautimc', 'saxaltoeb', 'saxsopranobb', 'clarinetebb', 'saxtenorbb', 'trompetebb', 'trompetec', 'trompabb', 'trombonebb', 'trombonec', 'bombardinobb', 'trombonebaixoc', 'tubabb', 'tubaeb'],
  r18: ['fuzileiro', 'atabaque', 'caixa', 'surdo', 'prato', 'lirac', 'flautimc', 'saxaltoeb', 'saxsopranobb', 'clarinetebb', 'saxtenorbb', 'trompetebb', 'trompetec', 'trompabb', 'trombonebb', 'trombonec', 'bombardinobb', 'trombonebaixoc', 'tubabb', 'tubaeb'],
  r19: ['fuzileiro', 'atabaque', 'caixa', 'surdo', 'prato', 'lirac', 'flautimc', 'saxaltoeb', 'saxsopranobb', 'clarinetebb', 'saxtenorbb', 'trompetebb', 'trompetec', 'trompabb', 'trombonebb', 'trombonec', 'bombardinobb', 'trombonebaixoc', 'tubabb', 'tubaeb'],
  r20: ['fuzileiro', 'atabaque', 'caixa', 'surdo', 'prato', 'lirac', 'flautimc', 'saxaltoeb', 'saxsopranobb', 'clarinetebb', 'saxtenorbb', 'trompetebb', 'trompetec', 'trompabb', 'trombonebb', 'trombonec', 'bombardinobb', 'trombonebaixoc', 'tubabb', 'tubaeb'],
  r21: ['fuzileiro', 'atabaque', 'caixa', 'surdo', 'prato', 'lirac', 'flautimc', 'saxaltoeb', 'saxsopranobb', 'clarinetebb', 'saxtenorbb', 'trompetebb', 'trompetec', 'trompabb', 'trombonebb', 'trombonec', 'bombardinobb', 'trombonebaixoc', 'tubabb', 'tubaeb'],
  r22: ['fuzileiro', 'atabaque', 'caixa', 'surdo', 'prato', 'lirac', 'flautimc', 'saxaltoeb', 'saxsopranobb', 'clarinetebb', 'saxtenorbb', 'trompetebb', 'trompetec', 'trompabb', 'trombonebb', 'trombonec', 'bombardinobb', 'trombonebaixoc', 'tubabb', 'tubaeb'],
  r23: ['fuzileiro', 'atabaque', 'caixa', 'surdo', 'prato', 'lirac', 'flautimc', 'saxaltoeb', 'saxsopranobb', 'clarinetebb', 'saxtenorbb', 'trompetebb', 'trompetec', 'trompabb', 'trombonebb', 'trombonec', 'bombardinobb', 'trombonebaixoc', 'tubabb', 'tubaeb'],
  r24: ['fuzileiro', 'atabaque', 'caixa', 'surdo', 'prato', 'lirac', 'flautimc', 'saxaltoeb', 'saxsopranobb', 'clarinetebb', 'saxtenorbb', 'trompetebb', 'trompetec', 'trompabb', 'trombonebb', 'trombonec', 'bombardinobb', 'trombonebaixoc', 'tubabb', 'tubaeb'],
  r25: ['fuzileiro', 'atabaque', 'caixa', 'surdo', 'prato', 'lirac', 'flautimc', 'saxaltoeb', 'saxsopranobb', 'clarinetebb', 'saxtenorbb', 'trompetebb', 'trompetec', 'trompabb', 'trombonebb', 'trombonec', 'bombardinobb', 'trombonebaixoc', 'tubabb', 'tubaeb'],
  r26: ['fuzileiro', 'atabaque', 'caixa', 'surdo', 'prato', 'lirac', 'flautimc', 'saxaltoeb', 'saxsopranobb', 'clarinetebb', 'saxtenorbb', 'trompetebb', 'trompetec', 'trompabb', 'trombonebb', 'trombonec', 'bombardinobb', 'trombonebaixoc', 'tubabb', 'tubaeb'],
  r27: ['fuzileiro', 'atabaque', 'caixa', 'surdo', 'prato', 'lirac', 'flautimc', 'saxaltoeb', 'saxsopranobb', 'clarinetebb', 'saxtenorbb', 'trompetebb', 'trompetec', 'trompabb', 'trombonebb', 'trombonec', 'bombardinobb', 'trombonebaixoc', 'tubabb', 'tubaeb'],
  r28: ['fuzileiro', 'atabaque', 'caixa', 'surdo', 'prato', 'lirac', 'flautimc', 'saxaltoeb', 'saxsopranobb', 'clarinetebb', 'saxtenorbb', 'trompetebb', 'trompetec', 'trompabb', 'trombonebb', 'trombonec', 'bombardinobb', 'trombonebaixoc', 'tubabb', 'tubaeb'],
  r29: ['fuzileiro', 'atabaque', 'caixa', 'surdo', 'prato', 'lirac', 'flautimc', 'saxaltoeb', 'saxsopranobb', 'clarinetebb', 'saxtenorbb', 'trompetebb', 'trompetec', 'trompabb', 'trombonebb', 'trombonec', 'bombardinobb', 'trombonebaixoc', 'tubabb', 'tubaeb'],
  r30: ['fuzileiro', 'atabaque', 'caixa', 'surdo', 'prato', 'lirac', 'flautimc', 'saxaltoeb', 'saxsopranobb', 'clarinetebb', 'saxtenorbb', 'trompetebb', 'trompetec', 'trompabb', 'trombonebb', 'trombonec', 'bombardinobb', 'trombonebaixoc', 'tubabb', 'tubaeb'],
  r31: ['fuzileiro', 'atabaque', 'caixa', 'surdo', 'prato', 'lirac', 'flautimc', 'saxaltoeb', 'saxtenorbb', 'saxsopranobb', 'clarinetebb', 'trompetebb', 'trompetec', 'trompabb', 'trombonebb', 'trombonec', 'bombardinobb', 'trombonebaixoc', 'tubabb', 'tubaeb'],
  r32: ['fuzileiro', 'atabaque', 'caixa', 'surdo', 'prato', 'lirac', 'flautimc', 'saxaltoeb', 'saxtenorbb', 'saxsopranobb', 'clarinetebb', 'trompetebb', 'trompetec', 'trompabb', 'trombonebb', 'trombonec', 'bombardinobb', 'trombonebaixoc', 'tubabb', 'tubaeb'],
  r33: ['fuzileiro', 'atabaque', 'caixa', 'surdo', 'prato', 'lirac', 'flautimc', 'saxaltoeb', 'saxtenorbb', 'saxsopranobb', 'clarinetebb', 'trompetebb', 'trompetec', 'trompabb', 'trombonebb', 'trombonec', 'bombardinobb', 'trombonebaixoc', 'tubabb', 'tubaeb'],
  r34: ['fuzileiro', 'atabaque', 'caixa', 'surdo', 'prato', 'lirac', 'flautimc', 'saxaltoeb', 'saxtenorbb', 'saxsopranobb', 'clarinetebb', 'trompetebb', 'trompetec', 'trompabb', 'trombonebb', 'trombonec', 'bombardinobb', 'trombonebaixoc', 'tubabb', 'tubaeb'],
  r35: ['fuzileiro', 'atabaque', 'caixa', 'surdo', 'prato', 'lirac', 'flautimc', 'saxaltoeb', 'saxtenorbb', 'saxsopranobb', 'clarinetebb', 'trompetebb', 'trompetec', 'trompabb', 'trombonebb', 'trombonec', 'bombardinobb', 'trombonebaixoc', 'tubabb', 'tubaeb'],
  r36: ['fuzileiro', 'atabaque', 'caixa', 'surdo', 'prato', 'lirac', 'flautimc', 'saxaltoeb', 'saxtenorbb', 'saxsopranobb', 'clarinetebb', 'trompetebb', 'trompetec', 'trompabb', 'trombonebb', 'trombonec', 'bombardinobb', 'trombonebaixoc', 'tubabb', 'tubaeb'],
  r37: ['fuzileiro', 'atabaque', 'caixa', 'surdo', 'prato', 'lirac', 'flautimc', 'saxaltoeb', 'saxtenorbb', 'saxsopranobb', 'clarinetebb', 'trompetebb', 'trompetec', 'trompabb', 'trombonebb', 'trombonec', 'bombardinobb', 'trombonebaixoc', 'tubabb', 'tubaeb'],
  d17: ['atabaque', 'lirac', 'caixa'],
  d18: ['atabaque', 'lirac', 'caixa'],
  d33: ['atabaque', 'lirac', 'caixa'],
  d35: ['fuzileiro', 'atabaque', 'caixa', 'surdo', 'prato', 'lirac', 'saxaltoeb', 'saxtenorbb', 'saxsopranobb', 'clarinetebb', 'trompetebb', 'trompabb', 'trombonebb', 'trombonebaixoc', 'bombardinobb', 'tubabb', 'tubaeb']
};

/** Lista de instrumentos para pastas migradas (Sibelius). */
const INSTRUMENTOS_SIBELIUS: string[] = [
  'Fuzileiro', 'Atabaque', 'Caixa', 'Surdo', 'Prato', 'Lira C', 'Flautim C',
  'Sax Alto Eb', 'Sax Soprano Bb', 'Clarinete Bb', 'Sax Tenor Bb', 'Trompete Bb', 'Trompete C',
  'Trompa Bb', 'Trombone Bb', 'Trombone C', 'Bombardino Bb', 'Trombone Baixo C', 'Tuba Eb', 'Tuba Bb',
  'Solo Bb', 'Solo C', 'Solo Eb', 'Grade'
];

/** Lista de instrumentos para pastas ainda em Encore. */
const INSTRUMENTOS_ENCORE: string[] = [
  'Fuzileiro', 'Atabaque', 'Caixa', 'Surdo', 'Prato', 'Lira', 'Flautim', 'Requinta',
  'Sax Soprano', 'Sax Alto', 'Clarinete', 'Sax Tenor', 'Trompete 1', 'Trompete 2',
  'Trombone 1', 'Trombone 2', 'Trombone C', 'Bombardino', 'Tuba Eb', 'Tuba Bb',
  'Grade', 'Regência'
];

export function getInstrumentosLista(folder: string): string[] {
  const f = folder.toLowerCase();
  return PASTAS_MIGRADAS_SIBELIUS.includes(f) ? [...INSTRUMENTOS_SIBELIUS] : [...INSTRUMENTOS_ENCORE];
}

/** Nome sanitizado para nome de arquivo (sem acentos, opcionalmente sem 1/2/3). */
export function getSanitizedName(nome: string, isEncore: boolean): string {
  const map: Record<string, string> = {
    ' ': '', 'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u', 'ã': 'a', 'ç': 'c'
  };
  let n = nome.toLowerCase();
  for (const [k, v] of Object.entries(map)) n = n.split(k).join(v);
  if (!isEncore) n = n.replace(/[123]/g, '');
  return n;
}

/** Chave para buscar MP3 do instrumento (ex: Lira 1 -> lira, Lira C -> lirac). */
export function getMp3Key(nome: string): string {
  const n = getSanitizedName(nome, false);
  const map: Record<string, string> = {
    lira1: 'lira', lira2: 'lira', lirac: 'lirac'
  };
  return map[n] ?? n;
}

export function isPastaMigradaSibelius(folder: string): boolean {
  return PASTAS_MIGRADAS_SIBELIUS.includes(folder.toLowerCase());
}

export function hasMp3Full(folder: string): boolean {
  return PASTAS_COM_MP3_FULL.includes(folder.toLowerCase());
}
