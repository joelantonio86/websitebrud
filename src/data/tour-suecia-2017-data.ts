/**
 * Turnê Suécia e Finlândia 2017 (Setembro 2017).
 * Vídeos: preencha youtubeId quando houver vídeo no YouTube.
 */

import type { TourMediaItem } from './tour-media-types';

export interface TourSection {
  id: string;
  title: string;
  date?: string;
  text: string;
  media: TourMediaItem[];
}

const B = 'https://www.bandaracional.com.br';
const WP = `${B}/wp-content/uploads`;

export const TOUR_2017_INTRO =
  'Setembro de 2017 ficará marcado para os integrantes da Banda União Racional. Foram momentos inesquecíveis de eventos maravilhosos realizados na belíssima capital sueca, Estocolmo. Para resumir em uma única expressão, foi uma verdadeira "APOTEOSE RACIONAL". Um mar branco emanando a energia da paz, do amor e da fraternidade tomou conta de nobres espaços da capital da Suécia, contagiando e enchendo de alegria os cidadãos de Estocolmo e também de muitas outras partes do mundo. A extensa agenda de eventos começou com um desfile cívico realizado na manhã de quarta-feira, 13/09/2017, com início na praça Ryssgården em frente à estação do metrô em Slussen, percorrendo a rua Götgatan e terminando na praça Medborgarplatsen. Foi uma grata surpresa para a população, que recebeu a Banda Racional com muito carinho e entusiasmo.';

export const TOUR_2017_INTRO_MEDIA: TourMediaItem[] = [
  { type: 'image', url: `${WP}/2017/09/BUR-em-Gotgathan-13-09-2017-e1507710969442.jpg`, caption: 'Banda em Estocolmo' },
  { type: 'image', url: `${WP}/2017/09/BUR-em-Medbogarplatsen-13-09-2017-1-e1507710626761.jpg`, caption: 'Desfile na praça Medborgarplatsen' },
  { type: 'image', url: `${WP}/2017/09/BUR-em-Gotgathan-13-09-2017-2-e1506092463569.jpg`, caption: 'Desfile na rua Götgatan' },
  { type: 'image', url: `${WP}/2017/09/BUR-doação-livro-13-09-2017-Estocolmo-1.jpg`, caption: 'Doação de livros em Estocolmo' },
];

export const TOUR_2017_SECTIONS: TourSection[] = [
  {
    id: 'abba',
    title: 'Homenagem ao ABBA',
    date: 'Sexta-feira, 15/09/2017',
    text: 'Um fim de tarde nublado, com uma garoa constante e um friozinho bem típico da Suécia, assim estava Estocolmo na sexta-feira, 15/09/2017. Então a Banda União Racional chegou ao ABBA Museum para prestar justa homenagem ao maior grupo Pop da história da música até os dias atuais. Com a execução de um mix de 5 das mais famosas canções do ABBA, até o sol sorriu e o público, atônito, especialmente os fãs de ABBA, parou para admirar a performance da Banda Racional, relembrando, cantando e alguns até dançando os grandes sucessos ao som da BUR. Na sequência, e já com sol brilhando no céu, deu-se início ao segundo desfile da Banda Racional em Estocolmo, passando pela avenida Djurgårdsvägen, ponte Djurgårdsbron, Av. Strandvägen e finalizando na praça Raoul Wallenbergs, tudo isso na área central e nobre da cidade. O desfile da Banda Racional, com repertório repleto de músicas brasileiras internacionalmente conhecidas, atraiu grande interesse e muitos livros "Universo em Desencanto", originais, foram doados a pessoas de diversas nacionalidades, incluindo suecos, arábes e asiáticos.',
    media: [
      { type: 'image', url: `${WP}/2017/09/BUR-no-ABBA-Museum-15-09-2017.jpg`, caption: 'Banda Racional no ABBA Museum' },
      { type: 'image', url: `${WP}/2017/09/BUR-em-Strandvagen-15-09-2017.jpg`, caption: 'Desfile na Av. Strandvägen' },
      { type: 'image', url: `${WP}/2017/09/BUR-doação-livro-Strandvagen-15-09-2017-2.jpg`, caption: 'Doação de livros' },
      { type: 'image', url: `${WP}/2017/09/BUR-doação-livro-Strandvagen-15-09-2017-1-e1506093004777.jpg`, caption: 'Doação de livros' },
    ],
  },
  {
    id: 'palace',
    title: 'Apresentação no Palácio Real',
    date: 'Sábado, 16/09/2017',
    text: 'Sim, já era mesmo uma belíssima divulgação da Cultura Racional, mas faltava a "cereja do bolo", pois a Cultura Racional, que é genuinamente brasileira, não podia deixar de prestar sua homenagem à Rainha Silvia, que é filha de brasileira, tendo morado no Brasil e ainda mantém projetos sociais no nosso país. Além disso a monarquia sueca é uma das mais tradicionais do mundo e o famoso e lindo Palácio Real se localiza na histórica "Gamla Stam", a tradicional cidade velha no centro de Estocolmo. A "cereja" veio na gostosa manhã de sábado, 16/09/2017, quando a Banda Racional teve a grande honra de executar os Hinos Nacionais da Suécia e do Brasil em frente à entrada do Palácio Real, perfilando as bandeiras de vários países do mundo em ambos os lados da entrada do grande Reinado. Público maravilhado, aplaudindo e tirando fotos com a Banda Racional, com o pavilhão da Escola de Samba Unidos do Raciocínio (que junto com nossa rainha de bateria se fez representar também) e com as bandeiras de seus países.',
    media: [
      { type: 'image', url: `${WP}/2017/09/BUR-com-bandeiras-no-Royal-Palace-16-09-2017.jpg`, caption: 'Banda com bandeiras no Palácio Real' },
      { type: 'image', url: `${WP}/2017/09/finlandia-1.jpg`, caption: 'Banda em Helsinki, Finlândia' },
      { type: 'image', url: `${WP}/2017/09/BUR-Royal-Palace-16-09-2017-3.jpg`, caption: 'Apresentação no Palácio Real' },
      { type: 'image', url: `${WP}/2017/09/Estrangeiros-com-suas-bandeiras-China-1.jpg`, caption: 'Banda Racional com estrangeiros e suas bandeiras' },
      { type: 'image', url: `${WP}/2017/09/BUR-Royal-Palace-16-09-2017-2.jpg`, caption: 'Apresentação em frente ao Palácio' },
    ],
  },
  {
    id: 'nobel',
    title: 'Concerto no Nobel Museum',
    date: 'Sábado, 16/09/2017',
    text: 'Não parou por aí. Na sequência a Banda União Racional seguiu para a praça Stortorget, ainda em Gamla Stam, em frente ao NOBEL MUSEUM. A performance em frente ao Nobel Museum foi ainda mais empolgante, com centenas de pessoas admirando as músicas populares brasileiras executadas pela Banda Racional, tais como "Carinhoso" de Pixinguinha e "Aquarela do Brasil" de Ary Barroso, além do sensacional mix intitulado "ABBAs Hits", que teve o grande sucesso "Dancing Queen" adaptado para o tradicional samba brasileiro e protagonizado pela lindíssima rainha de bateria da Escola de Samba Unidos do Raciocínio, Kelly Cristina.',
    media: [
      { type: 'image', url: `${WP}/2017/09/BUR-Nobel-Museum-16-09-2017-3.jpg`, caption: 'Banda no Nobel Museum' },
      { type: 'image', url: `${WP}/2017/09/BUR-Nobel-Museum-16-09-2017-2.jpg`, caption: 'Apresentação no Nobel Museum' },
      { type: 'image', url: `${WP}/2017/09/BUR-Nobel-Museum-16-09-2017-1.jpg`, caption: 'Banda no Nobel Museum' },
      { type: 'image', url: `${WP}/2017/09/BUR-foto-geral-Nobel-Museum-3.jpg`, caption: 'Foto geral em frente ao Nobel Museum' },
      { type: 'image', url: `${WP}/2017/09/BUR-doação-livro-16-09-2017-1.jpg`, caption: 'Doação de livro em Estocolmo' },
    ],
  },
  {
    id: 'conclusion',
    title: 'Conclusão e Agradecimentos',
    text: 'Então é isso minha gente, a Banda Racional divulgando a Cultura Racional pelo mundo, porque esse é o dever dos Estudantes dessa maravilhosa cultura, que é o maior tesouro da humanidade. Deixamos aqui nossos sinceros agradecimentos à Polícia de Estocolmo, que autorizou e disponibilizou efetivo em todos os eventos da Banda Racional na Suécia. Sem as permissões e apoio da Polícia de Estocolmo não teria sido possível a consolidação dessa APOTEOSE RACIONAL.',
    media: [
      { type: 'youtube', youtubeId: '', caption: 'Melhores momentos da Banda Racional em Estocolmo' },
    ],
  },
];
