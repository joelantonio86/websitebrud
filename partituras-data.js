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
    
    // Músicas Diversas (d01 até d42) - ORDENADAS
    d01: { folder: 'd01', category: 'd', title: 'D01 – Canção do Soldado', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    d02: { folder: 'd02', category: 'd', title: 'D02 – Cidade Maravilhosa', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    d03: { folder: 'd03', category: 'd', title: 'D03 – Retirada da Laguna', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    d04: { folder: 'd04', category: 'd', title: 'D04 – Dois Corações', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    d05: { folder: 'd05', category: 'd', title: 'D05 – Avante Camaradas', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    d06: { folder: 'd06', category: 'd', title: 'D06 – Velhos Camaradas', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    d07: { folder: 'd07', category: 'd', title: 'D07 – Cisne Branco', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    d08: { folder: 'd08', category: 'd', title: 'D08 – Batista de Mello', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    d09: { folder: 'd09', category: 'd', title: 'D09 – O Mais Longo dos Dias', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    d10: { folder: 'd10', category: 'd', title: 'D10 – Marcha Nupcial', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    d11: { folder: 'd11', category: 'd', title: 'D11 – Valsa das Flôres', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    d12: { folder: 'd12', category: 'd', title: 'D12 – Janjão – Dobrado Sinfônico', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    d13: { folder: 'd13', category: 'd', title: 'D13 – Aquarela do Brasil', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    d14: { folder: 'd14', category: 'd', title: 'D14 – Vassourinha', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    d15: { folder: 'd15', category: 'd', title: 'D15 – El Dia Que Me Quieras', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    d16: { folder: 'd16', category: 'd', title: 'D16 – Semper Fidelis', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    d17: { folder: 'd17', category: 'd', title: 'D17 – The Stars and Stripes Forever (Estrela do Sul)', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    d18: { folder: 'd18', category: 'd', title: 'D18 – Colonel Bogey', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    d19: { folder: 'd19', category: 'd', title: 'D19 – Fouth Rendez-Vous – 4º Encontro', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    d20: { folder: 'd20', category: 'd', title: 'D20 – Trem das Onze', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    d21: { folder: 'd21', category: 'd', title: 'D21 – La Cumparsita', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    d22: { folder: 'd22', category: 'd', title: 'D22 – Dobrado Oliveira', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    d23: { folder: 'd23', category: 'd', title: 'D23 – Recuerdos de Ypacaray', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    d24: { folder: 'd24', category: 'd', title: 'D24 – India', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    d25: { folder: 'd25', category: 'd', title: 'D25 – Gracias A La Vida', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    d26: { folder: 'd26', category: 'd', title: 'D26 – Garota de Ipanema', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    d27: { folder: 'd27', category: 'd', title: 'D27 – Pot-Pourri Músicas Italianas', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    d28: { folder: 'd28', category: 'd', title: 'D28 – IV Centenário', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    d29: { folder: 'd29', category: 'd', title: 'D29 – Saudades de Minha Terra', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    d30: { folder: 'd30', category: 'd', title: 'D30 – Oh! Minas Gerais', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    d31: { folder: 'd31', category: 'd', title: 'D31 – Laudo Natel', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    d32: { folder: 'd32', category: 'd', title: 'D32 – Ao Mestre com Carinho', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    d33: { folder: 'd33', category: 'd', title: 'D33 – The Washington Post', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    d34: { folder: 'd34', category: 'd', title: 'D34 – Carinhoso', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    d35: { folder: 'd35', category: 'd', title: 'D35 – Crianças', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    d36: { folder: 'd36', category: 'd', title: 'D36 – Meu Querido, Meu Velho, Meu Amigo', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    d37: { folder: 'd37', category: 'd', title: 'D37 – Te Quiero Mas y Mas', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    d38: { folder: 'd38', category: 'd', title: 'D38 – A Banda', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    d39: { folder: 'd39', category: 'd', title: 'D39 – A Saudade Que Ficou (Aquele Lencinho)', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    d40: { folder: 'd40', category: 'd', title: 'D40 – Eu te Amo meu Brasil', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    d41: { folder: 'd41', category: 'd', title: 'D41 – Cecilia', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    d42: { folder: 'd42', category: 'd', title: 'D42 – Hino dos Aviadores', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    
    // Apresentações (a01 até a14) - ORDENADAS
    a01: { folder: 'a01', category: 'a', title: 'A01 – Pot Pourri de Natal', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    a02: { folder: 'a02', category: 'a', title: 'A02 – Boas Festas', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    a03: { folder: 'a03', category: 'a', title: 'A03 – Esporte Espetacular', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    a04: { folder: 'a04', category: 'a', title: 'A04 – Tema da Vitória', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    a05: { folder: 'a05', category: 'a', title: 'A05 – Asa Branca/Mulher Rendeira', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    a06: { folder: 'a06', category: 'a', title: 'A06 – Carruagens de Fogo', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    a07: { folder: 'a07', category: 'a', title: 'A07 – Paris Belford', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    a08: { folder: 'a08', category: 'a', title: 'A08 – Vento Gelado', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    a09: { folder: 'a09', category: 'a', title: 'A09 – Concerto de Aranjuez', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    a10: { folder: 'a10', category: 'a', title: 'A10 – Lugar Melhor que BH', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    a11: { folder: 'a11', category: 'a', title: 'A11 – ABBA\'s HITs', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    a12: { folder: 'a12', category: 'a', title: 'A12 – Varttina', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    a13: { folder: 'a13', category: 'a', title: 'A13 – Como é grande o meu amor por você', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    a14: { folder: 'a14', category: 'a', title: 'A14 – Mozart Brasil', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    
    // Toques de Fanfarra (tf01 até tf21) - ORDENADAS
    tf01: { folder: 'tf01', category: 'tf', title: 'Toque de Fanfarra 01', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    tf02: { folder: 'tf02', category: 'tf', title: 'Toque de Fanfarra 02', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    tf03: { folder: 'tf03', category: 'tf', title: 'Toque de Fanfarra 03', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    tf04: { folder: 'tf04', category: 'tf', title: 'Toque de Fanfarra 04', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    tf05: { folder: 'tf05', category: 'tf', title: 'Toque de Fanfarra 05', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    tf06: { folder: 'tf06', category: 'tf', title: 'Toque de Fanfarra 06', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    tf07: { folder: 'tf07', category: 'tf', title: 'Toque de Fanfarra 07', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    tf08: { folder: 'tf08', category: 'tf', title: 'Toque de Fanfarra 08', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    tf09: { folder: 'tf09', category: 'tf', title: 'Toque de Fanfarra 09', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    tf10: { folder: 'tf10', category: 'tf', title: 'Toque de Fanfarra 10', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    tf11: { folder: 'tf11', category: 'tf', title: 'Toque de Fanfarra 11', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    tf12: { folder: 'tf12', category: 'tf', title: 'Toque de Fanfarra 12', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    tf13: { folder: 'tf13', category: 'tf', title: 'Toque de Fanfarra 13', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    tf14: { folder: 'tf14', category: 'tf', title: 'Toque de Fanfarra 14', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    tf15: { folder: 'tf15', category: 'tf', title: 'Toque de Fanfarra 15', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    tf16: { folder: 'tf16', category: 'tf', title: 'Toque de Fanfarra 16', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    tf17: { folder: 'tf17', category: 'tf', title: 'Toque de Fanfarra 17', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    tf18: { folder: 'tf18', category: 'tf', title: 'Toque de Fanfarra 18', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    tf19: { folder: 'tf19', category: 'tf', title: 'Toque de Fanfarra 19', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    tf20: { folder: 'tf20', category: 'tf', title: 'Toque de Fanfarra 20', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    tf21: { folder: 'tf21', category: 'tf', title: 'Toque de Fanfarra 21', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    
    // Hinos (h01 até h27) - ORDENADAS
    h01: { folder: 'h01', category: 'h', title: 'H01 – Hino Nacional Brasileiro', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    h02: { folder: 'h02', category: 'h', title: 'H02 – Hino à Bandeira', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    h03: { folder: 'h03', category: 'h', title: 'H03 – Hino da Independência do Brasil', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    h04: { folder: 'h04', category: 'h', title: 'H04 – Hino da Proclamação da República', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    h05: { folder: 'h05', category: 'h', title: 'H05 – Hino Nacional Português', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    h06: { folder: 'h06', category: 'h', title: 'H06 – Hino Nacional Argentino', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    h07: { folder: 'h07', category: 'h', title: 'H07 – Hino Nacional Paraguaio', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    h08: { folder: 'h08', category: 'h', title: 'H08 – Hino de Brasília', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    h09: { folder: 'h09', category: 'h', title: 'H09 – Hino Nacional Uruguaio', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    h10: { folder: 'h10', category: 'h', title: 'H10 – Hino do Paraná/Marcha de Curitiba', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    h11: { folder: 'h11', category: 'h', title: 'H11 – Hino Nacional Chileno', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    h12: { folder: 'h12', category: 'h', title: 'H12 – Hino Municipal de Belford Roxo', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    h13: { folder: 'h13', category: 'h', title: 'H13 – Hino Nacional Italiano', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    h14: { folder: 'h14', category: 'h', title: 'H14 – Hino de Santa Catarina', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    h15: { folder: 'h15', category: 'h', title: 'H15 – Hino dos Bandeirantes', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    h16: { folder: 'h16', category: 'h', title: 'H16 – Hino de Contagem', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    h17: { folder: 'h17', category: 'h', title: 'H17 – Hino de Santa Luzia', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    h18: { folder: 'h18', category: 'h', title: 'H18 – Hino de Juiz de Fora', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    h19: { folder: 'h19', category: 'h', title: 'H19 – Hino de Pinhais', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    h20: { folder: 'h20', category: 'h', title: 'H20 – Hino da Suécia', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    h21: { folder: 'h21', category: 'h', title: 'H21 – Hino da Finlândia', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    h22: { folder: 'h22', category: 'h', title: 'H22 – Hino de Nova Iguaçú', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    h23: { folder: 'h23', category: 'h', title: 'H23 – Hino de Itabira', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    h24: { folder: 'h24', category: 'h', title: 'H24 – Hino da Áustria', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    h25: { folder: 'h25', category: 'h', title: 'H25 – Hino da Suíça', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    h26: { folder: 'h26', category: 'h', title: 'H26 – Hino do Vaticano', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] },
    h27: { folder: 'h27', category: 'h', title: 'H27 – Hino de Uberlândia', instrumentos: [], hasMP3: false, isSibelius: true, mp3Instruments: [] }
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
    
    // Se for Sibelius, remove números 1, 2, 3
    if (isSibelius) {
        sanitized = sanitized.replace(/[123]/g, '');
    }
    
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
