import useScrollAnimation from '@/hooks/useScrollAnimation';

interface DestaqueItem {
  ano: string;
  titulo: string;
  descricao: string;
  local: string;
  tipo?: 'internacional' | 'nacional' | 'evento';
}

const Destaques: React.FC = () => {
  const sectionRef = useScrollAnimation();
  const destaques: DestaqueItem[] = [
    {
      ano: '2017',
      titulo: 'Desfiles Internacionais',
      descricao: 'Desfiles internacionais em Estocolmo-Suécia e Helsinque-Finlândia em setembro de 2017.',
      local: 'Suécia e Finlândia',
      tipo: 'internacional'
    },
    {
      ano: '2017',
      titulo: 'Desfiles na América do Sul',
      descricao: 'Desfiles internacionais em Buenos Aires (Argentina), Santiago (Chile), Montevidéu e San José (Uruguai) e Assunção (Paraguai).',
      local: 'América do Sul',
      tipo: 'internacional'
    },
    {
      ano: '2012',
      titulo: 'Rio +20',
      descricao: 'Desfile em Ipanema e Leblon – Rio de Janeiro como parte da agenda de eventos da Conferência Internacional para o Meio Ambiente – Rio +20, com a participação de aproximadamente 800 integrantes.',
      local: 'Rio de Janeiro, RJ',
      tipo: 'evento'
    },
    {
      ano: '1992',
      titulo: 'ECO 92',
      descricao: 'Desfile no aterro do Flamengo – Rio de Janeiro como parte da agenda de eventos da Conferência Internacional para o Meio Ambiente – ECO 92, com a participação de aproximadamente 500 integrantes.',
      local: 'Rio de Janeiro, RJ',
      tipo: 'evento'
    },
    {
      ano: '1992',
      titulo: 'Congresso Nacional',
      descricao: 'Apresentação no Congresso Nacional – Brasília, em abril de 1992.',
      local: 'Brasília, DF',
      tipo: 'nacional'
    },
    {
      ano: '1992',
      titulo: 'Medalha de Honra da Inconfidência',
      descricao: 'Desfile Cívico em São João Del Rey / MG, na solenidade de entrega da Condecoração "Medalha de Honra da Inconfidência Mineira" prestada pelo Presidente da República a várias Personalidades do Brasil, dentre elas, o Sr. Manoel Jacintho Coelho, autor dos livros "Universo em Desencanto", de CULTURA RACIONAL.',
      local: 'São João Del Rey, MG',
      tipo: 'nacional'
    },
    {
      ano: '2018',
      titulo: 'Assembleia Legislativa RJ',
      descricao: 'Apresentação no Plenário da Assembleia Legislativa do Estado do Rio de Janeiro em setembro de 2018.',
      local: 'Rio de Janeiro, RJ',
      tipo: 'nacional'
    },
    {
      ano: '',
      titulo: 'Todas as Capitais',
      descricao: 'Desfiles de divulgação da Cultura Racional em todas as capitais dos 26 Estados Brasileiros e do Distrito Federal, sem exceção, de Boa Vista à Porto Alegre.',
      local: 'Todo o Brasil',
      tipo: 'nacional'
    },
    {
      ano: '',
      titulo: '7 de Setembro',
      descricao: 'Participação, há mais de 15 anos, seguidamente, nos desfiles cívicos do Dia da Independência (7 de setembro), realizados em várias cidades brasileiras.',
      local: 'Nacional',
      tipo: 'nacional'
    },
    {
      ano: '',
      titulo: '2 de Julho - Independência da Bahia',
      descricao: 'Participação, há mais de 10 anos, seguidamente, nos desfiles cívicos do Dia da Independência da Bahia (2 de julho), realizados em Salvador/BA.',
      local: 'Salvador, BA',
      tipo: 'nacional'
    },
    {
      ano: '',
      titulo: 'MG TV - Rede Globo',
      descricao: 'Apresentação ao vivo, em frente à Igreja de São Francisco, na Pampulha, durante a primeira edição do telejornal MG TV – rede Globo – em homenagem ao aniversário de 102 anos de Belo Horizonte.',
      local: 'Belo Horizonte, MG',
      tipo: 'evento'
    },
    {
      ano: '',
      titulo: 'Cerimônia do Papai Noel',
      descricao: 'Apresentação na cerimônia de chegada do Papai Noel em Belo Horizonte, com transmissão no jornal "MG TV, primeira edição", da rede Globo, e "Bom Dia Minas", também da rede Globo.',
      local: 'Belo Horizonte, MG',
      tipo: 'evento'
    },
    {
      ano: '',
      titulo: 'Estádios de Futebol',
      descricao: 'Apresentações no estádio Cícero Pompeu de Toledo (Morumbi), no jogo entre São Paulo e Palmeiras, e no Estádio Governador Magalhães Pinto (Mineirão), como entretenimento para o público antes de jogos do campeonato brasileiro de futebol.',
      local: 'São Paulo e Belo Horizonte',
      tipo: 'evento'
    },
    {
      ano: '',
      titulo: 'Universidades',
      descricao: 'Apresentações em Campus de Universidades, dentre as quais, UNB, UFV, UFMG, PUC-MG, UFPR e UFCE.',
      local: 'Diversas Universidades',
      tipo: 'evento'
    },
    {
      ano: '',
      titulo: 'Eventos Comunitários',
      descricao: 'Apresentações em diversas festividades comunitárias, sociais e solenidades públicas, tais como inaugurações de Escolas e Espaços Públicos, parques municipais, formaturas, eventos escolares, asilos, escolas para portadores de deficiência, hospitais, clubes recreativos, corridas rústicas, gincanas, festividades infantis, festividades de grupos de 3ª idade, ginásios e estádios de futebol.',
      local: 'Nacional',
      tipo: 'nacional'
    },
    {
      ano: '2007-2017',
      titulo: 'Copa Itatiaia',
      descricao: 'Apresentações, com execução do Hino Nacional Brasileiro, no Estádio Independência, em Belo Horizonte, por ocasiões das partidas finais da Copa Itatiaia de futebol amador (promovido pela Rádio Itatiaia de Belo Horizonte), desde 2007 até 2017, de forma ininterrupta.',
      local: 'Belo Horizonte, MG',
      tipo: 'evento'
    }
  ];

  const getIcon = (tipo?: string): string => {
    switch (tipo) {
      case 'internacional':
        return 'fas fa-globe-americas';
      case 'nacional':
        return 'fas fa-flag';
      case 'evento':
        return 'fas fa-calendar-check';
      default:
        return 'fas fa-star';
    }
  };

  return (
    <section id="destaques" className="destaques-section section fade-in-section" ref={sectionRef}>
      <div className="container">
        <div className="destaques-header">
          <h2 className="destaques-title">Destaques do Currículo</h2>
          <p className="destaques-subtitle">Uma trajetória de excelência e dedicação à Cultura Racional</p>
        </div>
        <div className="destaques-timeline">
          {destaques.map((destaque, index) => (
            <div 
              key={index} 
              className={`destaque-timeline-item ${destaque.tipo || ''}`}
            >
              <div className="destaque-timeline-content">
                {destaque.ano && (
                  <div className="destaque-timeline-year">{destaque.ano}</div>
                )}
                <h3 className="destaque-timeline-title">
                  <div className="destaque-timeline-title-icon">
                    <i className={getIcon(destaque.tipo)}></i>
                  </div>
                  {destaque.titulo}
                </h3>
                <p className="destaque-timeline-description">{destaque.descricao}</p>
                <div className="destaque-timeline-location">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>{destaque.local}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Destaques;
