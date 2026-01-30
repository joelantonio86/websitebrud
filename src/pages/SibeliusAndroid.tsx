import { PageHeader } from '@/components/layout';
import '@/styles/styles-sibelius-android.css';

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.avid.sibelius.android&pcampaignid=web_share';

/** Vídeo explicativo: como executar partituras no Sibelius (igual em todas as páginas Sibelius). */
const SIBELIUS_ANDROID_VIDEO_ID = 'o_-oXm1xmlI';

interface Step {
  icon: string;
  text: React.ReactNode;
}

const STEPS: Step[] = [
  {
    icon: 'fab fa-google-play',
    text: (
      <>
        Acesse a <strong>Google Play Store</strong> no seu celular ou tablet Android. Você pode encontrá-la no menu de aplicativos.
      </>
    ),
  },
  {
    icon: 'fas fa-search',
    text: (
      <>
        Na barra de pesquisa, digite <strong>"Sibelius"</strong> e pressione o ícone de lupa para buscar o aplicativo.
      </>
    ),
  },
  {
    icon: 'fas fa-arrow-alt-circle-down',
    text: (
      <>
        Clique no ícone do aplicativo <strong>Sibelius</strong> e, em seguida, no botão <strong>"Instalar"</strong> para iniciar o download e a instalação.
      </>
    ),
  },
];

const SibeliusAndroid: React.FC = () => {
  return (
    <div className="sibelius-android-page">
      <PageHeader
        title="Sibelius - Android"
        subtitle="Instale o Sibelius no seu celular ou tablet Android"
        breadcrumb={[
          { label: 'Início', to: '/' },
          { label: 'Repertório', to: '/repertorio' },
          { label: 'Sibelius', to: '/sibelius-computador' },
          { label: 'Android' },
        ]}
      />

      <article className="sibelius-android-container">
        <header className="sibelius-android-header">
          <h1 className="sibelius-android-title">
            Instalando Sibelius no Android
          </h1>
          <p className="sibelius-android-instruction">
            Siga os passos abaixo para instalar o aplicativo Sibelius no seu dispositivo Android.
          </p>
        </header>

        <ol className="sibelius-android-steps" aria-label="Passos de instalação">
          {STEPS.map((step, index) => (
            <li key={index} className="sibelius-android-step">
              <div className="sibelius-android-step-inner">
                <span className="sibelius-android-step-icon" aria-hidden>
                  <i className={step.icon} />
                </span>
                <div className="sibelius-android-step-text">{step.text}</div>
              </div>
            </li>
          ))}
        </ol>

        <div className="sibelius-android-cta-wrap">
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="sibelius-android-cta"
          >
            <i className="fab fa-google-play" aria-hidden />
            <span>Baixar na Play Store</span>
          </a>
        </div>

        <section className="sibelius-android-video" aria-labelledby="sibelius-android-video-title">
          <h2 id="sibelius-android-video-title" className="sibelius-android-video-title">
            Veja como executar suas partituras no Sibelius
          </h2>
          <div className="sibelius-android-video-wrap">
            <iframe
              title="Vídeo: como executar partituras no Sibelius no Android"
              src={`https://www.youtube.com/embed/${SIBELIUS_ANDROID_VIDEO_ID}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </section>
      </article>
    </div>
  );
};

export default SibeliusAndroid;
