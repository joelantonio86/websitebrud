// Dados das Partituras - Baseado no sistema PHP
// Usa partituras-config para pastas Sibelius vs Encore e MP3 (Cloudflare).

import {
  getInstrumentosLista,
  isPastaMigradaSibelius,
  MP3_POR_PASTA
} from './partituras-config';

export interface PartituraData {
  folder: string;
  category: 'r' | 'd' | 'a' | 'tf' | 'h';
  title: string;
  instrumentos: string[];
  hasMP3: boolean;
  isSibelius: boolean;
  mp3Instruments: string[];
}

function hasMP3ForMusic(musicCode: string): boolean {
  return Object.prototype.hasOwnProperty.call(MP3_POR_PASTA, musicCode.toLowerCase());
}

function criarRacional(folder: string, title: string): PartituraData {
  const f = folder.toLowerCase();
  const hasMP3 = hasMP3ForMusic(folder);
  return {
    folder: folder,
    category: 'r',
    title: title,
    instrumentos: getInstrumentosLista(folder),
    hasMP3,
    isSibelius: isPastaMigradaSibelius(folder),
    mp3Instruments: hasMP3 ? MP3_POR_PASTA[f] : []
  };
}

function criarMusicaPadrao(folder: string, category: 'r' | 'd' | 'a' | 'tf' | 'h', title: string): PartituraData {
  const f = folder.toLowerCase();
  const hasMP3 = hasMP3ForMusic(folder);
  return {
    folder: folder,
    category: category,
    title: title,
    instrumentos: getInstrumentosLista(folder),
    hasMP3,
    isSibelius: isPastaMigradaSibelius(folder),
    mp3Instruments: hasMP3 ? MP3_POR_PASTA[f] : []
  };
}

// Definir dados das partituras
export const partiturasData: Record<string, PartituraData> = {
  // Racionais (r01 até r37)
  r01: criarRacional('r01', 'R01 – Apoteose Racional'),
  r02: criarRacional('r02', 'R02 – Brasil Racional'),
  r03: criarRacional('r03', 'R03 – Hino Racional'),
  r04: criarRacional('r04', 'R04 – Menino Rei'),
  r05: criarRacional('r05', 'R05 – Jubileu de Ouro'),
  r06: criarRacional('r06', 'R06 – O Grande Missionário'),
  r07: criarRacional('r07', 'R07 – Os Guerreiros'),
  r08: criarRacional('r08', 'R08 – Três Poderes'),
  r09: criarRacional('r09', 'R09 – Parabéns Racional'),
  r10: criarRacional('r10', 'R10 – Os Sete Reinos'),
  r11: criarRacional('r11', 'R11 – De Onde Viemos e Para Onde Vamos'),
  r12: criarRacional('r12', 'R12 – Alegria'),
  r13: criarRacional('r13', 'R13 – Manoel Jacintho Coelho'),
  r14: criarRacional('r14', 'R14 – M.J.C.'),
  r15: criarRacional('r15', 'R15 – Naturaleza (Hom. a Atna Jacintho Coelho)'),
  r16: criarRacional('r16', 'R16 – Caravana Racional'),
  r17: criarRacional('r17', 'R17 – Imunização Racional'),
  r18: criarRacional('r18', 'R18 – Cavaleiro da Concórdia'),
  r19: criarRacional('r19', 'R19 – Nosso Pai Verdadeiro'),
  r20: criarRacional('r20', 'R20 – Obrigado Meu Pai'),
  r21: criarRacional('r21', 'R21 – Alvas Serras'),
  r22: criarRacional('r22', 'R22 – A Solução da Vida'),
  r23: criarRacional('r23', 'R23 – Raciocínio/Tudo Pela Paz'),
  r24: criarRacional('r24', 'R24 – Praça das Nações'),
  r25: criarRacional('r25', 'R25 – Enfim o Raciocínio'),
  r26: criarRacional('r26', 'R26 – Centenário M.J.C.'),
  r27: criarRacional('r27', 'R27 – Imunização Racional (Que Beleza!)'),
  r28: criarRacional('r28', 'R28 – Salve os Protetores'),
  r29: criarRacional('r29', 'R29 – Dia dos Guerreiros'),
  r30: criarRacional('r30', 'R30 – Voltando a Origem'),
  r31: criarRacional('r31', 'R31 – Natureza'),
  r32: criarRacional('r32', 'R32 – Vem Ver a Banda Passar'),
  r33: criarRacional('r33', 'R33 – Francisco de Assis'),
  r34: criarRacional('r34', 'R34 – Salve o Retiro Racional'),
  r35: criarRacional('r35', 'R35 – Até Me Imunizar'),
  r36: criarRacional('r36', 'R36 – Oxigênio'),
  r37: criarRacional('r37', 'R37 – Hino dos Caravaneiros'),
  
  // Diversas (d01 até d42)
  d01: criarMusicaPadrao('d01', 'd', 'D01 – Canção do Soldado'),
  d02: criarMusicaPadrao('d02', 'd', 'D02 – Cidade Maravilhosa'),
  d03: criarMusicaPadrao('d03', 'd', 'D03 – Retirada da Laguna'),
  d04: criarMusicaPadrao('d04', 'd', 'D04 – Dois Corações'),
  d05: criarMusicaPadrao('d05', 'd', 'D05 – Avante Camaradas'),
  d06: criarMusicaPadrao('d06', 'd', 'D06 – Velhos Camaradas'),
  d07: criarMusicaPadrao('d07', 'd', 'D07 – Cisne Branco'),
  d08: criarMusicaPadrao('d08', 'd', 'D08 – Batista de Mello'),
  d09: criarMusicaPadrao('d09', 'd', 'D09 – O Mais Longo dos Dias'),
  d10: criarMusicaPadrao('d10', 'd', 'D10 – Marcha Nupcial'),
  d11: criarMusicaPadrao('d11', 'd', 'D11 – Valsa das Flôres'),
  d12: criarMusicaPadrao('d12', 'd', 'D12 – Janjão – Dobrado Sinfônico'),
  d13: criarMusicaPadrao('d13', 'd', 'D13 – Aquarela do Brasil'),
  d14: criarMusicaPadrao('d14', 'd', 'D14 – Vassourinha'),
  d15: criarMusicaPadrao('d15', 'd', 'D15 – El Dia Que Me Quieras'),
  d16: criarMusicaPadrao('d16', 'd', 'D16 – Semper Fidelis'),
  d17: criarMusicaPadrao('d17', 'd', 'D17 – The Stars and Stripes Forever (Estrela do Sul)'),
  d18: criarMusicaPadrao('d18', 'd', 'D18 – Colonel Bogey'),
  d19: criarMusicaPadrao('d19', 'd', 'D19 – Fouth Rendez-Vous – 4º Encontro'),
  d20: criarMusicaPadrao('d20', 'd', 'D20 – Trem das Onze'),
  d21: criarMusicaPadrao('d21', 'd', 'D21 – La Cumparsita'),
  d22: criarMusicaPadrao('d22', 'd', 'D22 – Dobrado Oliveira'),
  d23: criarMusicaPadrao('d23', 'd', 'D23 – Recuerdos de Ypacaray'),
  d24: criarMusicaPadrao('d24', 'd', 'D24 – India'),
  d25: criarMusicaPadrao('d25', 'd', 'D25 – Gracias A La Vida'),
  d26: criarMusicaPadrao('d26', 'd', 'D26 – Garota de Ipanema'),
  d27: criarMusicaPadrao('d27', 'd', 'D27 – Pot-Pourri Músicas Italianas'),
  d28: criarMusicaPadrao('d28', 'd', 'D28 – IV Centenário'),
  d29: criarMusicaPadrao('d29', 'd', 'D29 – Saudades de Minha Terra'),
  d30: criarMusicaPadrao('d30', 'd', 'D30 – Oh! Minas Gerais'),
  d31: criarMusicaPadrao('d31', 'd', 'D31 – Laudo Natel'),
  d32: criarMusicaPadrao('d32', 'd', 'D32 – Ao Mestre com Carinho'),
  d33: criarMusicaPadrao('d33', 'd', 'D33 – The Washington Post'),
  d34: criarMusicaPadrao('d34', 'd', 'D34 – Carinhoso'),
  d35: criarMusicaPadrao('d35', 'd', 'D35 – Crianças'),
  d36: criarMusicaPadrao('d36', 'd', 'D36 – Meu Querido, Meu Velho, Meu Amigo'),
  d37: criarMusicaPadrao('d37', 'd', 'D37 – Te Quiero Mas y Mas'),
  d38: criarMusicaPadrao('d38', 'd', 'D38 – A Banda'),
  d39: criarMusicaPadrao('d39', 'd', 'D39 – A Saudade Que Ficou (Aquele Lencinho)'),
  d40: criarMusicaPadrao('d40', 'd', 'D40 – Eu te Amo meu Brasil'),
  d41: criarMusicaPadrao('d41', 'd', 'D41 – Cecilia'),
  d42: criarMusicaPadrao('d42', 'd', 'D42 – Hino dos Aviadores'),
  
  // Apresentações (a01 até a14)
  a01: criarMusicaPadrao('a01', 'a', 'A01 – Pot Pourri de Natal'),
  a02: criarMusicaPadrao('a02', 'a', 'A02 – Boas Festas'),
  a03: criarMusicaPadrao('a03', 'a', 'A03 – Esporte Espetacular'),
  a04: criarMusicaPadrao('a04', 'a', 'A04 – Tema da Vitória'),
  a05: criarMusicaPadrao('a05', 'a', 'A05 – Asa Branca/Mulher Rendeira'),
  a06: criarMusicaPadrao('a06', 'a', 'A06 – Carruagens de Fogo'),
  a07: criarMusicaPadrao('a07', 'a', 'A07 – Paris Belford'),
  a08: criarMusicaPadrao('a08', 'a', 'A08 – Vento Gelado'),
  a09: criarMusicaPadrao('a09', 'a', 'A09 – Concerto de Aranjuez'),
  a10: criarMusicaPadrao('a10', 'a', 'A10 – Lugar Melhor que BH'),
  a11: criarMusicaPadrao('a11', 'a', 'A11 – ABBA\'s HITs'),
  a12: criarMusicaPadrao('a12', 'a', 'A12 – Varttina'),
  a13: criarMusicaPadrao('a13', 'a', 'A13 – Como é grande o meu amor por você'),
  a14: criarMusicaPadrao('a14', 'a', 'A14 – Mozart Brasil'),
  
  // Toques de Fanfarra (códigos atualizados)
  't01': criarMusicaPadrao('t01', 'tf', 'T01 – Toque em 1'),
  't02': criarMusicaPadrao('t02', 'tf', 'T02 – Toque 2 em 1'),
  't03': criarMusicaPadrao('t03', 'tf', 'T03 – Toque 3X2'),
  't-ac': criarMusicaPadrao('t-ac', 'tf', 'T-AC – Toque Acelerado'),
  't01-03': criarMusicaPadrao('t01-03', 'tf', 'T01-03 – Toque 1 a 3'),
  't04-06': criarMusicaPadrao('t04-06', 'tf', 'T04-06 – Toque 4 a 6'),
  't07-09': criarMusicaPadrao('t07-09', 'tf', 'T07-09 – Toque 7 a 9'),
  't10': criarMusicaPadrao('t10', 'tf', 'T10 – Toque 10'),
  't11-12': criarMusicaPadrao('t11-12', 'tf', 'T11-12 – Toque 11 a 12'),
  't13': criarMusicaPadrao('t13', 'tf', 'T13 – Toque 13'),
  't14-16': criarMusicaPadrao('t14-16', 'tf', 'T14-16 – Toque 14 a 16'),
  't17': criarMusicaPadrao('t17', 'tf', 'T17 – Toque 17'),
  't18': criarMusicaPadrao('t18', 'tf', 'T18 – Toque 18'),
  't19-21': criarMusicaPadrao('t19-21', 'tf', 'T19-21 – Toque 19 a 21'),
  
  // Hinos (h01 até h27)
  h01: criarMusicaPadrao('h01', 'h', 'H01 – Hino Nacional Brasileiro'),
  h02: criarMusicaPadrao('h02', 'h', 'H02 – Hino à Bandeira'),
  h03: criarMusicaPadrao('h03', 'h', 'H03 – Hino da Independência do Brasil'),
  h04: criarMusicaPadrao('h04', 'h', 'H04 – Hino da Proclamação da República'),
  h05: criarMusicaPadrao('h05', 'h', 'H05 – Hino Nacional Português'),
  h06: criarMusicaPadrao('h06', 'h', 'H06 – Hino Nacional Argentino'),
  h07: criarMusicaPadrao('h07', 'h', 'H07 – Hino Nacional Paraguaio'),
  h08: criarMusicaPadrao('h08', 'h', 'H08 – Hino de Brasília'),
  h09: criarMusicaPadrao('h09', 'h', 'H09 – Hino Nacional Uruguaio'),
  h10: criarMusicaPadrao('h10', 'h', 'H10 – Hino do Paraná/Marcha de Curitiba'),
  h11: criarMusicaPadrao('h11', 'h', 'H11 – Hino Nacional Chileno'),
  h12: criarMusicaPadrao('h12', 'h', 'H12 – Hino Municipal de Belford Roxo'),
  h13: criarMusicaPadrao('h13', 'h', 'H13 – Hino Nacional Italiano'),
  h14: criarMusicaPadrao('h14', 'h', 'H14 – Hino de Santa Catarina'),
  h15: criarMusicaPadrao('h15', 'h', 'H15 – Hino dos Bandeirantes'),
  h16: criarMusicaPadrao('h16', 'h', 'H16 – Hino de Contagem'),
  h17: criarMusicaPadrao('h17', 'h', 'H17 – Hino de Santa Luzia'),
  h18: criarMusicaPadrao('h18', 'h', 'H18 – Hino de Juiz de Fora'),
  h19: criarMusicaPadrao('h19', 'h', 'H19 – Hino de Pinhais'),
  h20: criarMusicaPadrao('h20', 'h', 'H20 – Hino da Suécia'),
  h21: criarMusicaPadrao('h21', 'h', 'H21 – Hino da Finlândia'),
  h22: criarMusicaPadrao('h22', 'h', 'H22 – Hino de Nova Iguaçu'),
  h23: criarMusicaPadrao('h23', 'h', 'H23 – Hino de Itabira'),
  h24: criarMusicaPadrao('h24', 'h', 'H24 – Hino da Áustria'),
  h25: criarMusicaPadrao('h25', 'h', 'H25 – Hino da Suíça'),
  h26: criarMusicaPadrao('h26', 'h', 'H26 – Hino do Vaticano'),
  h27: criarMusicaPadrao('h27', 'h', 'H27 – Hino de Uberlândia')
};
