import { PageHeader } from '@/components/layout';
import '@/styles/styles-sibelius-ios.css';

const APP_STORE_URL = 'https://apps.apple.com/br/app/sibelius/id1503221259';

/** Vídeo explicativo: como executar partituras no Sibelius (igual em todas as páginas Sibelius). */
const SIBELIUS_VIDEO_ID = 'o_-oXm1xmlI';

interface Step {
  icon: string;
  text: React.ReactNode;
}

const STEPS: Step[] = [
  {
    icon: 'fab fa-apple',
    text: (
      <>
        Acesse a <strong>Apple App Store</strong> no seu iPhone ou iPad. Você pode encontrá-la na tela inicial.
      </>
    ),
  },
  {
    icon: 'fas fa-search',
    text: (
      <>
        Na barra de pesquisa, digite <strong>"Sibelius"</strong> e clique no ícone de lupa para buscar o aplicativo.
      </>
    ),
  },
  {
    icon: 'fas fa-arrow-alt-circle-down',
    text: (
      <>
        Clique no ícone do aplicativo <strong>Sibelius</strong> e, em seguida, no botão <strong>"Obter"</strong> para iniciar o download e a instalação.
      </>
    ),
  },
];

const SibeliusIOS: React.FC = () => {
  return (
    <div className="sibelius-ios-page">
      <PageHeader
        title="Sibelius - iOS (iPhone)"
        subtitle="Instale o Sibelius no seu iPhone ou iPad"
        breadcrumb={[
          { label: 'Início', to: '/' },
          { label: 'Repertório', to: '/repertorio' },
          { label: 'Sibelius', to: '/sibelius-computador' },
          { label: 'iOS' },
        ]}
      />

      <article className="sibelius-ios-container">
        <header className="sibelius-ios-header">
          <h1 className="sibelius-ios-title">
            Instalando Sibelius no iOS (iPhone)
          </h1>
          <p className="sibelius-ios-instruction">
            Siga os passos abaixo para instalar o aplicativo Sibelius no seu iPhone ou iPad.
          </p>
        </header>

        <ol className="sibelius-ios-steps" aria-label="Passos de instalação">
          {STEPS.map((step, index) => (
            <li key={index} className="sibelius-ios-step">
              <div className="sibelius-ios-step-inner">
                <span className="sibelius-ios-step-icon" aria-hidden>
                  <i className={step.icon} />
                </span>
                <div className="sibelius-ios-step-text">{step.text}</div>
              </div>
            </li>
          ))}
        </ol>

        <div className="sibelius-ios-cta-wrap">
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="sibelius-ios-cta"
          >
            <i className="fab fa-apple" aria-hidden />
            <span>Baixar na App Store</span>
          </a>
        </div>

        <section className="sibelius-ios-video" aria-labelledby="sibelius-ios-video-title">
          <h2 id="sibelius-ios-video-title" className="sibelius-ios-video-title">
            Veja como executar suas partituras no Sibelius
          </h2>
          <div className="sibelius-ios-video-wrap">
            <iframe
              title="Vídeo: como executar partituras no Sibelius no iOS"
              src={`https://www.youtube.com/embed/${SIBELIUS_VIDEO_ID}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </section>
      </article>
    </div>
  );
};

export default SibeliusIOS;
