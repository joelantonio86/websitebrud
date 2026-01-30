import useScrollAnimation from '@/hooks/useScrollAnimation';

const Sobre: React.FC = () => {
  const sectionRef = useScrollAnimation();
  const cidades = [
    'Brasília',
    'Rio de Janeiro',
    'São Paulo',
    'Belo Horizonte',
    'Porto Alegre',
    'Fortaleza',
    'Salvador',
    'Curitiba',
    'Vitória',
    'Natal',
    'Belém',
    'Teresina',
    'Goiânia',
    'E muitas outras cidades',
  ];

  return (
    <section id="sobre" className="sobre section fade-in-section" ref={sectionRef}>
      <div className="container">
        <div className="section-header sobre-header">
          <h2 className="section-title sobre-title">Sobre a Banda</h2>
          <p className="section-subtitle sobre-subtitle">
            Conheça a história da Banda União Racional
          </p>
        </div>

        <div className="sobre-content">
          <div className="bur-header">
            <div className="bur-header-content">
              <div className="bur-acronym">BUR</div>
              <div className="bur-full-name">Banda União Racional</div>
              <p className="bur-tagline">
                Uma Banda Marcial sem fins lucrativos, cujo maior objetivo é divulgar a CULTURA RACIONAL DO TERCEIRO MILÊNIO
              </p>
            </div>
          </div>

          <div className="sobre-text-modern">
            <p className="sobre-paragraph sobre-paragraph-first">
              <span className="sobre-drop-cap">A</span>
              Banda União Racional (BUR) é uma Banda Marcial sem fins lucrativos, cujo maior objetivo é divulgar a <strong>CULTURA RACIONAL DO TERCEIRO MILÊNIO</strong>, dos livros <strong>UNIVERSO EM DESENCANTO</strong>, que é um conhecimento de paz, amor e fraternidade entre os povos.
            </p>

            <p className="sobre-paragraph">
              A BUR congrega <strong>24 Bandas</strong> em todo o Brasil, totalizando aproximadamente <strong>811 integrantes</strong>, entre músicos, balizas, porta-bandeiras e regentes. São Bandas Racionais, assim chamadas, em várias capitais brasileiras, tais como:
            </p>

            <div className="sobre-cidades-line">
              {cidades.map((cidade, index) => (
                <span key={index} className="sobre-cidade-item">
                  {cidade}
                  {index < cidades.length - 1 && ' '}
                </span>
              ))}
            </div>

            <p className="sobre-paragraph">
              As <strong>BANDAS RACIONAIS UNIVERSO EM DESENCANTO</strong>, desde <strong>1982</strong>, por meio do branco dos uniformes e de seus acordes musicais, vêm participando de várias festividades cívicas nacionais e internacionais, tais como encontros de bandas; aberturas e encerramentos de diversos eventos; comemorações e aniversários de cidades e Estados do Brasil, além de fazer eventos próprios de divulgação da <strong>CULTURA RACIONAL</strong> com apresentações em estádios, parques, praças, coretos e caravanas em ruas e bairros, sempre com o objetivo de levar uma mensagem de Paz, Amor e Fraternidade Universal.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sobre;
