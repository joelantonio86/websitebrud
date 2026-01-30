import { PageHeader } from '@/components/layout';
import '@/styles/styles-sibelius-computador.css';

const IMG_BASE = 'https://www.bandaracional.com.br/partituras/imagens-sibelius';
/** Vídeo explicativo: como executar partituras no Sibelius (igual em todas as páginas Sibelius). */
const SIBELIUS_VIDEO_ID = 'o_-oXm1xmlI';

interface StepImage {
  src: string;
  alt: string;
}

interface Step {
  text: React.ReactNode;
  image?: StepImage;
}

interface Section {
  id: string;
  title: string;
  start?: number;
  intro?: string;
  steps: Step[];
}

const SECTIONS: Section[] = [
  {
    id: 'obter-link',
    title: '1. Obtenha o Link para Download',
    steps: [
      {
        text: (
          <>
            Acesse este link no seu navegador: <strong>https://my.avid.com/get/sibelius-first</strong>.
          </>
        ),
      },
      {
        text: (
          <>
            Clique no botão <strong>"Create an account"</strong>.
          </>
        ),
        image: { src: `${IMG_BASE}/Imagem1.png`, alt: "Tela de boas-vindas do Sibelius com o botão 'Create an account' destacado." },
      },
      {
        text: (
          <>
            Na próxima tela, crie sua conta preenchendo as informações solicitadas: Primeiro nome, Segundo nome, E-mail e Senha.
          </>
        ),
        image: { src: `${IMG_BASE}/Imagem2.png`, alt: "Formulário de cadastro da conta com campos de nome, e-mail e senha." },
      },
      {
        text: (
          <>
            Após preencher os dados, clique em <strong>"Submit"</strong>.
          </>
        ),
      },
      {
        text: (
          <>
            Na tela seguinte, marque as opções conforme a imagem abaixo e depois clique em <strong>"Email my download links"</strong>.
          </>
        ),
        image: { src: `${IMG_BASE}/Imagem4.png`, alt: "Mensagem de confirmação de envio do e-mail." },
      },
      {
        text: (
          <>
            Você receberá uma mensagem de confirmação, informando que o e-mail com o link foi enviado para sua caixa de entrada.
          </>
        ),
      },
    ],
  },
  {
    id: 'download',
    title: '2. Faça o Download do Programa',
    start: 7,
    steps: [
      {
        text: (
          <>
            Acesse seu e-mail e procure pela mensagem com o título <strong>"Your Sibelius | First Download"</strong> enviada por noreply@avid.com.
          </>
        ),
        image: { src: `${IMG_BASE}/Imagem6.png`, alt: "Caixa de entrada de e-mail com a mensagem do Sibelius destacada." },
      },
      {
        text: (
          <>
            Dentro do e-mail, clique no botão correspondente ao sistema operacional do seu computador, seja <strong>Mac</strong> ou <strong>Windows</strong>, para baixar o arquivo. Veja a imagem acima.
          </>
        ),
      },
    ],
  },
  {
    id: 'instalar',
    title: '3. Instale o Sibelius',
    intro: 'Após o download, localize e execute o arquivo. Em seguida, siga os passos para a instalação:',
    steps: [
      {
        text: (
          <>
            Selecione o idioma da instalação, como <strong>"Português (Brasileiro)"</strong>, e clique em <strong>"OK"</strong>.
          </>
        ),
      },
      {
        text: (
          <>
            Na tela de boas-vindas do assistente de instalação, clique em <strong>"Avançar"</strong>.
          </>
        ),
      },
      {
        text: (
          <>
            Aceite os termos do contrato de licença e clique em <strong>"Avançar"</strong>.
          </>
        ),
      },
      {
        text: (
          <>
            Clique em <strong>"Avançar"</strong> nas telas de "Pasta de destino" e "Pasta do Menu Iniciar" para manter as configurações padrão.
          </>
        ),
      },
      {
        text: (
          <>
            Para iniciar a instalação, clique em <strong>"Instalar"</strong>.
          </>
        ),
      },
      {
        text: (
          <>
            Ao final, clique em <strong>"Concluir"</strong> para sair do assistente de instalação.
          </>
        ),
      },
    ],
  },
  {
    id: 'abrir-partitura',
    title: '4. Abra uma Partitura e Selecione a Versão',
    steps: [
      {
        text: (
          <>
            Depois de instalar o programa, baixe uma partitura do site da banda e abra o arquivo com o Sibelius.
          </>
        ),
      },
      {
        text: (
          <>
            Ao abrir a partitura, uma janela de boas-vindas do Sibelius aparecerá.
          </>
        ),
      },
      {
        text: (
          <>
            Sempre selecione a opção <strong>"Use o Sibelius First"</strong>.
          </>
        ),
        image: { src: `${IMG_BASE}/Imagem14.png`, alt: "Janela de boas-vindas do Sibelius com a opção 'Use o Sibelius First' destacada." },
      },
    ],
  },
];

const SibeliusComputador: React.FC = () => {
  return (
    <div className="sibelius-computador-page">
      <PageHeader
        title="Sibelius - Computador"
        subtitle="Manual de instalação do Sibelius no computador"
        breadcrumb={[
          { label: 'Início', to: '/' },
          { label: 'Repertório', to: '/repertorio' },
          { label: 'Sibelius', to: '/sibelius-computador' },
          { label: 'Computador' },
        ]}
      />

      <article className="sibelius-computador-container">
        <header className="sibelius-computador-header">
          <h1 className="sibelius-computador-title">
            Manual de Instalação: Sibelius para o computador
          </h1>
          <p className="sibelius-computador-intro">
            Este guia detalha o processo de instalação do programa <strong>Sibelius</strong> no seu computador. Para iniciar, você precisa de um e-mail com o link para o download. Se não o recebeu ou o link expirou, siga as instruções abaixo para obtê-lo.
          </p>
        </header>

        {SECTIONS.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="sibelius-computador-section"
            aria-labelledby={`${section.id}-title`}
          >
            <h2 id={`${section.id}-title`} className="sibelius-computador-section-title">
              {section.title}
            </h2>
            {section.intro && (
              <p className="sibelius-computador-section-intro">{section.intro}</p>
            )}
            <ol
              className="sibelius-computador-steps"
              start={section.start}
              style={section.start != null ? { ['--step-start' as string]: String(section.start - 1) } : undefined}
            >
              {section.steps.map((step, index) => (
                <li key={index} className="sibelius-computador-step">
                  <span className="sibelius-computador-step-text">{step.text}</span>
                  {step.image && (
                    <figure className="sibelius-computador-step-figure">
                      <img
                        src={step.image.src}
                        alt={step.image.alt}
                        loading="lazy"
                        width={800}
                        height={450}
                      />
                      <figcaption className="sibelius-computador-step-figcaption">
                        {step.image.alt}
                      </figcaption>
                    </figure>
                  )}
                </li>
              ))}
            </ol>
          </section>
        ))}

        <div className="sibelius-computador-highlight" role="note">
          <p>
            A versão <strong>Sibelius First</strong> permite que você abra a partitura e a reproduza para ouvir o som dos instrumentos ou de um único instrumento, mesmo após o período de teste.
          </p>
        </div>

        <section className="sibelius-computador-video" aria-labelledby="sibelius-video-title">
          <h2 id="sibelius-video-title" className="sibelius-computador-video-title">
            Veja como executar suas partituras no Sibelius
          </h2>
          <div className="sibelius-computador-video-wrap">
            <iframe
              title="Vídeo: como executar partituras no Sibelius"
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

export default SibeliusComputador;
