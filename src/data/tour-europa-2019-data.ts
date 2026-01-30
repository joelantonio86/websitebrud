/**
 * Turnê Europa 2019: Áustria, Itália e Suíça (26/09 a 03/10/2019).
 * Vídeos: preencha youtubeId com o ID do YouTube de cada vídeo (ex: dQw4w9WgXcQ).
 */

import type { TourMediaItem } from './tour-media-types';

export interface TourCity {
  id: string;
  titlePt: string;
  titleEn: string;
  textPt: string;
  textEn: string;
  media: TourMediaItem[];
}

export const TOUR_2019_INTRO_PT =
  'De 26 de setembro a 03 de outubro de 2019, a Banda Racional esteve em solo europeu para uma grande turnê, na qual realizou desfiles e apresentações musicais memoráveis na Áustria, Itália e Suíça. Ao todo, quase 150 estudantes de Cultura Racional, entre músicos da banda e caravaneiros de diversas partes do Brasil, participaram dessa grande divulgação.';

export const TOUR_2019_INTRO_EN =
  'From September 26 to October 3, 2019, the Rational Band was on a grand European tour, performing memorable parades and musical shows in Austria, Italy, and Switzerland. In total, almost 150 students of Rational Culture, including band members and caravaners from various parts of Brazil, participated in this great divulgation.';

export const TOUR_2019_GENERAL_PT =
  'A Banda Racional, com seus músicos, corpo coreográfico e pelotão de porta-bandeiras, despertou a atenção de todos por onde passou. Com um repertório especial, que incluiu os hinos dos três países visitados e músicas brasileiras internacionalmente conhecidas (sambas, forrós, marchas e dobrados), a banda foi sempre entusiasticamente aplaudida. Assim como ocorreu na Suécia e na Finlândia em 2017, a Banda Racional impressionou positivamente, levando alegria, harmonia e fraternidade ao público.';

export const TOUR_2019_GENERAL_EN =
  'The Rational Band, with its musicians, choreographic body, and flag-bearer platoon, captured the attention of everyone it passed. With a special repertoire, which included the anthems of the three countries visited and internationally known Brazilian songs (sambas, forrós, marches, and marches), the band was always enthusiastically applauded. As in Sweden and Finland in 2017, the Rational Band made a positive impression, bringing joy, harmony, and fraternity to the public.';

export const TOUR_2019_CONCLUSION_PT =
  'Durante essa linda viagem, muitos livros "Universo em Desencanto" foram doados, em inglês, espanhol e português. Assim, a Banda União Racional deixou fortes lembranças e boas recordações dos maravilhosos e intensos momentos vividos em terras europeias.';

export const TOUR_2019_CONCLUSION_EN =
  'During this beautiful trip, many books "Universe in Disenchantment" were donated in English, Spanish, and Portuguese. The Union Rational Band thus left behind strong and wonderful memories of the intense moments lived in European lands.';

const B = 'https://www.bandaracional.com.br';
const WP = `${B}/wp-content/uploads`;

export const TOUR_2019_CITIES: TourCity[] = [
  {
    id: 'vienna',
    titlePt: 'Viena, Áustria',
    titleEn: 'Vienna, Austria',
    textPt:
      'Em Viena, capital da música clássica mundial, a Banda Racional realizou dois desfiles no dia 26 de setembro. O primeiro partiu da Schwarzenbergplatz, com a belíssima "fonte do brilho do alto", e terminou na Stephansplatz. O segundo desfile percorreu as vias entre a Maria Theresien Platz e a Rathausplatz, onde fica o Parlamento austríaco. A performance do Hino Nacional da Áustria e o medley "Mozart Brasil" foram momentos surpreendentes e muito aplaudidos.',
    textEn:
      'In Vienna, the capital of world classical music, the Rational Band held two parades on September 26. The first started from Schwarzenbergplatz, with the beautiful "fountain of high brightness", and ended at Stephansplatz. The second parade took place between Maria Theresien Platz and Rathausplatz, where the Austrian Parliament is located. The performance of the Austrian National Anthem and the medley "Mozart Brasil" were surprising and highly applauded moments.',
    media: [
      { type: 'youtube', youtubeId: '', caption: 'Desfile em Viena, Áustria' },
      { type: 'youtube', youtubeId: '', caption: 'Apresentação musical na Áustria' },
      { type: 'image', url: `${WP}/2018/11/Desfile-1-em-Viena-8.jpg`, caption: 'Desfile da Banda Racional em Viena' },
      { type: 'youtube', youtubeId: '', caption: 'Show em Viena' },
      { type: 'youtube', youtubeId: '', caption: 'A cidade de Viena e suas belezas' },
      { type: 'image', url: `${WP}/2018/11/Desfile-2-Viena-1.jpg`, caption: 'Rathausplatz - Viena' },
      { type: 'youtube', youtubeId: '', caption: 'Apresentação em Viena' },
      { type: 'image', url: `${WP}/2018/11/Desfile-2-Viena-4.jpg`, caption: 'Banda Racional na Maria-Theresien-Platz' },
    ],
  },
  {
    id: 'venice',
    titlePt: 'Veneza, Itália',
    titleEn: 'Venice, Italy',
    textPt:
      'Em solo italiano, a turnê começou em Veneza, a cidade dos canais. As apresentações musicais ocorreram no Campo Santo Stefano. Turistas de toda a Europa, além de árabes, japoneses, chineses e outras nacionalidades, se encantaram com o belo visual da banda e seus acordes. Muitos se aventuraram a dançar um bom samba com a passista Bruna, que interagiu com todos.',
    textEn:
      'On Italian lands, the tour started in Venice, the city of canals. The musical performances took place in Campo Santo Stefano. Tourists from all over Europe, as well as Arabs, Japanese, Chinese, and other nationalities, were enchanted by the band\'s beautiful visual and its chords. Many ventured to dance a good samba with the dancer Bruna, who interacted with everyone.',
    media: [
      { type: 'youtube', youtubeId: '', caption: 'Show em Veneza' },
      { type: 'youtube', youtubeId: '', caption: 'Veneza, a cidade dos canais' },
      { type: 'image', url: 'https://www.bandaracional.com.br/wp-content/uploads/2019/10/Apresentações-Veneza-Campo-Santo-Stefano-1.jpg', caption: 'Campo Santo Stefano - Veneza' },
      { type: 'image', url: 'https://www.bandaracional.com.br/wp-content/uploads/2019/10/Apresentações-Veneza-Campo-Santo-Stefano-5.jpg', caption: 'Campo Santo Stefano - Veneza' },
    ],
  },
  {
    id: 'rome',
    titlePt: 'Roma, Itália',
    titleEn: 'Rome, Italy',
    textPt:
      'Com a frase "Quem tem Cultura Racional, vai a Roma", a banda realizou dois desfiles maravilhosos. O primeiro partiu da Piazza Navona, uma das praças mais belas do mundo, e terminou no famoso Panteão. O segundo desfile marchou da Piazza San Silvestro em direção à Piazza di Spagna. A performance do Hino Italiano e o medley de músicas tradicionais foram muito aplaudidos. A banda também apresentou um tango e o famoso "ABBA\'s Hits" de 2017. Para finalizar, a banda prestou uma homenagem na Igreja Santíssima Trindade Villa Ghigi, a convite do Padre Rafaelle, proporcionando uma grande confraternização.',
    textEn:
      'With the saying "Who has Rational Culture, goes to Rome," the band performed two wonderful parades. The first departed from Piazza Navona, one of the most beautiful squares in the world, and ended at the famous Pantheon. The second parade marched from Piazza San Silvestro toward Piazza di Spagna. The performance of the Italian Anthem and the medley of traditional Italian songs were highly applauded. The band also presented a tango and the famous "ABBA\'s Hits" from 2017. To conclude, the band paid a tribute at the Holy Trinity Villa Ghigi Church, at the invitation of Father Rafaelle, providing a great gathering.',
    media: [
      { type: 'youtube', youtubeId: '', caption: 'Show em Roma' },
      { type: 'youtube', youtubeId: '', caption: 'Apresentação no Panteão' },
      { type: 'youtube', youtubeId: '', caption: 'Desfile em Roma' },
      { type: 'youtube', youtubeId: '', caption: 'Hino Italiano na Piazza di Spagna' },
      { type: 'youtube', youtubeId: '', caption: 'Hino Nacional Brasileiro' },
      { type: 'youtube', youtubeId: '', caption: 'Alegria e harmonia em Roma' },
    ],
  },
  {
    id: 'milan',
    titlePt: 'Milão, Itália',
    titleEn: 'Milan, Italy',
    textPt:
      'O maior centro da moda, Milão, não ficou de fora da turnê. O desfile, em 01 de outubro, partiu do famoso Castelo Sforzesco até a Piazza del Duomo, onde a imponente catedral de mesmo nome serviu de paisagem de fundo para o concerto musical, assistido por centenas de turistas deslumbrados.',
    textEn:
      'The biggest fashion center, Milan, was not left out of the tour. The parade, on October 1st, departed from the famous Sforzesco Castle to Piazza del Duomo, where the imposing cathedral of the same name served as the backdrop for the musical concert, attended by hundreds of dazzled tourists.',
    media: [
      { type: 'youtube', youtubeId: '', caption: 'Desfile em Milão' },
      { type: 'youtube', youtubeId: '', caption: 'Chegando na Piazza Duomo' },
      { type: 'youtube', youtubeId: '', caption: 'Concerto em Milão' },
      { type: 'youtube', youtubeId: '', caption: 'Músicas brasileiras em Milão' },
    ],
  },
  {
    id: 'bern',
    titlePt: 'Berna, Suíça',
    titleEn: 'Bern, Switzerland',
    textPt:
      'O encerramento da turnê foi em Berna, capital da Suíça. A apresentação ocorreu na Waisenhausplatz, no coração do centro histórico da cidade, declarado Patrimônio Cultural da Humanidade pela UNESCO. Mesmo com uma fina chuva, a população prestigiou o evento em grande número. Berna foi uma das cidades onde houve o maior número de doações do livro "Universo em Desencanto".',
    textEn:
      'The tour concluded in Bern, the capital of Switzerland. The performance took place at Waisenhausplatz, in the heart of the city\'s historic center, a UNESCO World Heritage Site. Even with a light rain, the public showed up in large numbers to honor the event. Bern was one of the cities with the highest number of donations of the book "Universe in Disenchantment".',
    media: [
      { type: 'youtube', youtubeId: '', caption: 'Hino Nacional Suíço' },
      { type: 'youtube', youtubeId: '', caption: 'Desfile em Berna' },
    ],
  },
];
