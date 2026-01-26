// Dados das Partituras - Baseado no sistema PHP
// Todas as músicas ordenadas: Racionais (r01-r37), Diversas (d01-d42), Apresentações (a01-a14), Toques de Fanfarra (tf01-tf21), Hinos (h01-h27)

// Função auxiliar para obter instrumentos padrão Sibelius
function getSibeliusInstrumentos(mp3List) {
    const instrumentMap = {
        'fuzileiro': 'Fuzileiro',
        'atabaque': 'Atabaque',
        'caixa': 'Caixa',
        'surdo': 'Surdo',
        'prato': 'Prato',
        'lirac': 'Lira C',
        'flautimc': 'Flautim C',
        'saxaltoeb': 'Sax Alto Eb',
        'saxsopranobb': 'Sax Soprano Bb',
        'clarinetebb': 'Clarinete Bb',
        'saxtenorbb': 'Sax Tenor Bb',
        'trompetebb': 'Trompete Bb',
        'trompetec': 'Trompete C',
        'trompabb': 'Trompa Bb',
        'trombonebb': 'Trombone Bb',
        'trombonec': 'Trombone C',
        'bombardinobb': 'Bombardino Bb',
        'trombonebaixoc': 'Trombone Baixo C',
        'tubabb': 'Tuba Bb',
        'tubaeb': 'Tuba Eb'
    };
    
    return mp3List.map(key => instrumentMap[key] || key.charAt(0).toUpperCase() + key.slice(1));
}

// Instrumentos padrão completos para músicas racionais
const instrumentosRacionaisCompletos = ['fuzileiro', 'atabaque', 'caixa', 'surdo', 'prato', 'lirac', 'flautimc', 'saxaltoeb', 'saxsopranobb', 'clarinetebb', 'saxtenorbb', 'trompetebb', 'trompetec', 'trompabb', 'trombonebb', 'trombonec', 'bombardinobb', 'trombonebaixoc', 'tubabb', 'tubaeb'];

// Função auxiliar para criar entrada de música racional padrão
function criarRacional(folder, title) {
    return {
        folder: folder,
        category: 'r',
        title: title,
        instrumentos: getSibeliusInstrumentos(instrumentosRacionaisCompletos),
        hasMP3: true,
        isSibelius: true,
        mp3Instruments: instrumentosRacionaisCompletos
    };
}

// Função auxiliar para criar entrada padrão para todas as categorias (mesmos instrumentos das Racionais)
function criarMusicaPadrao(folder, category, title) {
    return {
        folder: folder,
        category: category,
        title: title,
        instrumentos: getSibeliusInstrumentos(instrumentosRacionaisCompletos),
        hasMP3: true,
        isSibelius: true,
        mp3Instruments: instrumentosRacionaisCompletos
    };
}

// Instrumentos padrão básicos (para algumas músicas)
const instrumentosBasicos = ['atabaque', 'caixa', 'surdo', 'lirac', 'saxaltoeb', 'saxsopranobb', 'clarinetebb', 'trompetebb', 'trombonebb', 'bombardinobb', 'tubabb', 'tubaeb'];

// Definir dados das partituras
const partiturasData = {
    // Músicas Racionais (r01 até r37) - ORDENADAS - TODAS EM SIBELIUS
    // Instrumentos padrão para músicas racionais completas
    r01: { 
        folder: 'r01', 
        category: 'r', 
        title: 'R01 - Apoteose Racional', 
        instrumentos: getSibeliusInstrumentos(['fuzileiro', 'atabaque', 'caixa', 'surdo', 'prato', 'lirac', 'flautimc', 'saxaltoeb', 'saxsopranobb', 'clarinetebb', 'saxtenorbb', 'trompetebb', 'trompetec', 'trompabb', 'trombonebb', 'trombonec', 'bombardinobb', 'trombonebaixoc', 'tubabb', 'tubaeb']), 
        hasMP3: true, 
        isSibelius: true, 
        mp3Instruments: ['fuzileiro', 'atabaque', 'caixa', 'surdo', 'prato', 'lirac', 'flautimc', 'saxaltoeb', 'saxsopranobb', 'clarinetebb', 'saxtenorbb', 'trompetebb', 'trompetec', 'trompabb', 'trombonebb', 'trombonec', 'bombardinobb', 'trombonebaixoc', 'tubabb', 'tubaeb'] 
    },
    r02: { folder: 'r02', category: 'r', title: 'R02 - Brasil Racional', instrumentos: getSibeliusInstrumentos(instrumentosRacionaisCompletos), hasMP3: true, isSibelius: true, mp3Instruments: instrumentosRacionaisCompletos },
    r03: { folder: 'r03', category: 'r', title: 'R03 - Hino Racional', instrumentos: getSibeliusInstrumentos(instrumentosRacionaisCompletos), hasMP3: true, isSibelius: true, mp3Instruments: instrumentosRacionaisCompletos },
    r04: { folder: 'r04', category: 'r', title: 'R04 - Menino Rei', instrumentos: getSibeliusInstrumentos(instrumentosRacionaisCompletos), hasMP3: true, isSibelius: true, mp3Instruments: instrumentosRacionaisCompletos },
    r05: { folder: 'r05', category: 'r', title: 'R05 - Jubileu de Ouro', instrumentos: getSibeliusInstrumentos(instrumentosRacionaisCompletos), hasMP3: true, isSibelius: true, mp3Instruments: instrumentosRacionaisCompletos },
    r06: { folder: 'r06', category: 'r', title: 'R06 - O Grande Missionário', instrumentos: getSibeliusInstrumentos(instrumentosRacionaisCompletos), hasMP3: true, isSibelius: true, mp3Instruments: instrumentosRacionaisCompletos },
    r07: { folder: 'r07', category: 'r', title: 'R07 - Os Guerreiros', instrumentos: getSibeliusInstrumentos(instrumentosRacionaisCompletos), hasMP3: true, isSibelius: true, mp3Instruments: instrumentosRacionaisCompletos },
    r08: { folder: 'r08', category: 'r', title: 'R08 - Três Poderes', instrumentos: getSibeliusInstrumentos(instrumentosRacionaisCompletos), hasMP3: true, isSibelius: true, mp3Instruments: instrumentosRacionaisCompletos },
    r09: { folder: 'r09', category: 'r', title: 'R09 - Parabéns Racional', instrumentos: getSibeliusInstrumentos(instrumentosRacionaisCompletos), hasMP3: true, isSibelius: true, mp3Instruments: instrumentosRacionaisCompletos },
    r10: { folder: 'r10', category: 'r', title: 'R10 - Os Sete Reinos', instrumentos: getSibeliusInstrumentos(instrumentosRacionaisCompletos), hasMP3: true, isSibelius: true, mp3Instruments: instrumentosRacionaisCompletos },
    r11: { folder: 'r11', category: 'r', title: 'R11 - De Onde Viemos e Para Onde Vamos', instrumentos: getSibeliusInstrumentos(instrumentosRacionaisCompletos), hasMP3: true, isSibelius: true, mp3Instruments: instrumentosRacionaisCompletos },
    r12: { folder: 'r12', category: 'r', title: 'R12 - Alegria', instrumentos: getSibeliusInstrumentos(instrumentosRacionaisCompletos), hasMP3: true, isSibelius: true, mp3Instruments: instrumentosRacionaisCompletos },
    r13: { folder: 'r13', category: 'r', title: 'R13 - Manoel Jacintho Coelho', instrumentos: getSibeliusInstrumentos(instrumentosRacionaisCompletos), hasMP3: true, isSibelius: true, mp3Instruments: instrumentosRacionaisCompletos },
    r14: { folder: 'r14', category: 'r', title: 'R14 - M.J.C.', instrumentos: getSibeliusInstrumentos(instrumentosRacionaisCompletos), hasMP3: true, isSibelius: true, mp3Instruments: instrumentosRacionaisCompletos },
    r15: { folder: 'r15', category: 'r', title: 'R15 - Naturaleza (Hom. a Atna Jacintho Coelho)', instrumentos: getSibeliusInstrumentos(instrumentosRacionaisCompletos), hasMP3: true, isSibelius: true, mp3Instruments: instrumentosRacionaisCompletos },
    r16: { folder: 'r16', category: 'r', title: 'R16 - Caravana Racional', instrumentos: getSibeliusInstrumentos(instrumentosRacionaisCompletos), hasMP3: true, isSibelius: true, mp3Instruments: instrumentosRacionaisCompletos },
    r17: { folder: 'r17', category: 'r', title: 'R17 - Imunização Racional', instrumentos: getSibeliusInstrumentos(instrumentosRacionaisCompletos), hasMP3: true, isSibelius: true, mp3Instruments: instrumentosRacionaisCompletos },
    r18: { folder: 'r18', category: 'r', title: 'R18 - Cavaleiro da Concórdia', instrumentos: getSibeliusInstrumentos(instrumentosRacionaisCompletos), hasMP3: true, isSibelius: true, mp3Instruments: instrumentosRacionaisCompletos },
    r19: { folder: 'r19', category: 'r', title: 'R19 - Nosso Pai Verdadeiro', instrumentos: getSibeliusInstrumentos(instrumentosRacionaisCompletos), hasMP3: true, isSibelius: true, mp3Instruments: instrumentosRacionaisCompletos },
    r20: { folder: 'r20', category: 'r', title: 'R20 - Obrigado Meu Pai', instrumentos: getSibeliusInstrumentos(instrumentosRacionaisCompletos), hasMP3: true, isSibelius: true, mp3Instruments: instrumentosRacionaisCompletos },
    r21: { folder: 'r21', category: 'r', title: 'R21 - Alvas Serras', instrumentos: getSibeliusInstrumentos(instrumentosRacionaisCompletos), hasMP3: true, isSibelius: true, mp3Instruments: instrumentosRacionaisCompletos },
    r22: { folder: 'r22', category: 'r', title: 'R22 - A Solução da Vida', instrumentos: getSibeliusInstrumentos(instrumentosRacionaisCompletos), hasMP3: true, isSibelius: true, mp3Instruments: instrumentosRacionaisCompletos },
    r23: { folder: 'r23', category: 'r', title: 'R23 - Raciocínio/Tudo Pela Paz', instrumentos: getSibeliusInstrumentos(instrumentosRacionaisCompletos), hasMP3: true, isSibelius: true, mp3Instruments: instrumentosRacionaisCompletos },
    r24: { folder: 'r24', category: 'r', title: 'R24 - Praça das Nações', instrumentos: getSibeliusInstrumentos(instrumentosRacionaisCompletos), hasMP3: true, isSibelius: true, mp3Instruments: instrumentosRacionaisCompletos },
    r25: { folder: 'r25', category: 'r', title: 'R25 - Enfim o Raciocínio', instrumentos: getSibeliusInstrumentos(instrumentosRacionaisCompletos), hasMP3: true, isSibelius: true, mp3Instruments: instrumentosRacionaisCompletos },
    r26: { folder: 'r26', category: 'r', title: 'R26 - Centenário M.J.C.', instrumentos: getSibeliusInstrumentos(instrumentosRacionaisCompletos), hasMP3: true, isSibelius: true, mp3Instruments: instrumentosRacionaisCompletos },
    r27: { folder: 'r27', category: 'r', title: 'R27 - Imunização Racional (Que Beleza!)', instrumentos: getSibeliusInstrumentos(instrumentosRacionaisCompletos), hasMP3: true, isSibelius: true, mp3Instruments: instrumentosRacionaisCompletos },
    r28: { folder: 'r28', category: 'r', title: 'R28 - Salve os Protetores', instrumentos: getSibeliusInstrumentos(instrumentosRacionaisCompletos), hasMP3: true, isSibelius: true, mp3Instruments: instrumentosRacionaisCompletos },
    r29: { folder: 'r29', category: 'r', title: 'R29 - Dia dos Guerreiros', instrumentos: getSibeliusInstrumentos(instrumentosRacionaisCompletos), hasMP3: true, isSibelius: true, mp3Instruments: instrumentosRacionaisCompletos },
    r30: { folder: 'r30', category: 'r', title: 'R30 - Voltando a Origem', instrumentos: getSibeliusInstrumentos(instrumentosRacionaisCompletos), hasMP3: true, isSibelius: true, mp3Instruments: instrumentosRacionaisCompletos },
    r31: { folder: 'r31', category: 'r', title: 'R31 - Natureza', instrumentos: getSibeliusInstrumentos(instrumentosRacionaisCompletos), hasMP3: true, isSibelius: true, mp3Instruments: instrumentosRacionaisCompletos },
    r32: { folder: 'r32', category: 'r', title: 'R32 - Vem Ver a Banda Passar', instrumentos: getSibeliusInstrumentos(instrumentosRacionaisCompletos), hasMP3: true, isSibelius: true, mp3Instruments: instrumentosRacionaisCompletos },
    r33: { folder: 'r33', category: 'r', title: 'R33 - Francisco de Assis', instrumentos: getSibeliusInstrumentos(instrumentosRacionaisCompletos), hasMP3: true, isSibelius: true, mp3Instruments: instrumentosRacionaisCompletos },
    r34: { folder: 'r34', category: 'r', title: 'R34 - Salve o Retiro Racional', instrumentos: getSibeliusInstrumentos(instrumentosRacionaisCompletos), hasMP3: true, isSibelius: true, mp3Instruments: instrumentosRacionaisCompletos },
    r35: { folder: 'r35', category: 'r', title: 'R35 - Até Me Imunizar', instrumentos: getSibeliusInstrumentos(instrumentosRacionaisCompletos), hasMP3: true, isSibelius: true, mp3Instruments: instrumentosRacionaisCompletos },
    r36: { folder: 'r36', category: 'r', title: 'R36 - Oxigênio', instrumentos: getSibeliusInstrumentos(instrumentosRacionaisCompletos), hasMP3: true, isSibelius: true, mp3Instruments: instrumentosRacionaisCompletos },
    r37: { folder: 'r37', category: 'r', title: 'R37 - Hino dos Caravaneiros', instrumentos: getSibeliusInstrumentos(instrumentosRacionaisCompletos), hasMP3: true, isSibelius: true, mp3Instruments: instrumentosRacionaisCompletos },
    
    // Músicas Diversas (d01 até d42) - ORDENADAS - TODAS COM MESMOS INSTRUMENTOS DAS RACIONAIS
    d01: { folder: 'd01', category: 'd', title: 'D01 – Canção do Soldado', instrumentos: getSibeliusInstrumentos(instrumentosRacionaisCompletos), hasMP3: true, isSibelius: true, mp3Instruments: instrumentosRacionaisCompletos },
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
    
    // Apresentações (a01 até a14) - ORDENADAS - TODAS COM MESMOS INSTRUMENTOS DAS RACIONAIS
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
    
    // Toques de Fanfarra (tf01 até tf21) - ORDENADAS - TODAS COM MESMOS INSTRUMENTOS DAS RACIONAIS
    tf01: criarMusicaPadrao('tf01', 'tf', 'Toque de Fanfarra 01'),
    tf02: criarMusicaPadrao('tf02', 'tf', 'Toque de Fanfarra 02'),
    tf03: criarMusicaPadrao('tf03', 'tf', 'Toque de Fanfarra 03'),
    tf04: criarMusicaPadrao('tf04', 'tf', 'Toque de Fanfarra 04'),
    tf05: criarMusicaPadrao('tf05', 'tf', 'Toque de Fanfarra 05'),
    tf06: criarMusicaPadrao('tf06', 'tf', 'Toque de Fanfarra 06'),
    tf07: criarMusicaPadrao('tf07', 'tf', 'Toque de Fanfarra 07'),
    tf08: criarMusicaPadrao('tf08', 'tf', 'Toque de Fanfarra 08'),
    tf09: criarMusicaPadrao('tf09', 'tf', 'Toque de Fanfarra 09'),
    tf10: criarMusicaPadrao('tf10', 'tf', 'Toque de Fanfarra 10'),
    tf11: criarMusicaPadrao('tf11', 'tf', 'Toque de Fanfarra 11'),
    tf12: criarMusicaPadrao('tf12', 'tf', 'Toque de Fanfarra 12'),
    tf13: criarMusicaPadrao('tf13', 'tf', 'Toque de Fanfarra 13'),
    tf14: criarMusicaPadrao('tf14', 'tf', 'Toque de Fanfarra 14'),
    tf15: criarMusicaPadrao('tf15', 'tf', 'Toque de Fanfarra 15'),
    tf16: criarMusicaPadrao('tf16', 'tf', 'Toque de Fanfarra 16'),
    tf17: criarMusicaPadrao('tf17', 'tf', 'Toque de Fanfarra 17'),
    tf18: criarMusicaPadrao('tf18', 'tf', 'Toque de Fanfarra 18'),
    tf19: criarMusicaPadrao('tf19', 'tf', 'Toque de Fanfarra 19'),
    tf20: criarMusicaPadrao('tf20', 'tf', 'Toque de Fanfarra 20'),
    tf21: criarMusicaPadrao('tf21', 'tf', 'Toque de Fanfarra 21'),
    
    // Hinos (h01 até h27) - ORDENADAS - TODAS COM MESMOS INSTRUMENTOS DAS RACIONAIS
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
    h22: criarMusicaPadrao('h22', 'h', 'H22 – Hino de Nova Iguaçú'),
    h23: criarMusicaPadrao('h23', 'h', 'H23 – Hino de Itabira'),
    h24: criarMusicaPadrao('h24', 'h', 'H24 – Hino da Áustria'),
    h25: criarMusicaPadrao('h25', 'h', 'H25 – Hino da Suíça'),
    h26: criarMusicaPadrao('h26', 'h', 'H26 – Hino do Vaticano'),
    h27: criarMusicaPadrao('h27', 'h', 'H27 – Hino de Uberlândia')
};

// Função para sanitizar nome do instrumento (baseado no PHP)
function sanitizeInstrumentName(name, isSibelius = true) {
    let sanitized = name.toLowerCase();
    
    // Remove acentos e espaços
    const search = [' ', 'á', 'é', 'í', 'ó', 'ú', 'ã', 'ç'];
    const replace = ['', 'a', 'e', 'i', 'o', 'u', 'a', 'c'];
    
    for (let i = 0; i < search.length; i++) {
        sanitized = sanitized.replace(new RegExp(search[i], 'g'), replace[i]);
    }
    
    // Sempre remove números (formato Sibelius - todas as músicas agora usam Sibelius)
    sanitized = sanitized.replace(/[123]/g, '');
    
    return sanitized;
}

// Função para obter chave MP3
function getMP3Key(instrumentName) {
    const sanitized = sanitizeInstrumentName(instrumentName, true);
    
    // Mapeamentos especiais
    const mp3Map = {
        'lira1': 'lira',
        'lira2': 'lira'
    };
    
    return mp3Map[sanitized] || sanitized;
}

// Tornar disponível globalmente
if (typeof window !== 'undefined') {
    window.partiturasData = partiturasData;
    window.sanitizeInstrumentName = sanitizeInstrumentName;
    window.getMP3Key = getMP3Key;
}

// Exportar dados e funções (Node.js)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { partiturasData, sanitizeInstrumentName, getMP3Key };
}
