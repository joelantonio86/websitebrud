import { useState, useCallback } from 'react';
import { PageHeader } from '@/components/layout';
import '@/styles/styles-contato.css';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

interface FormErrors {
  nome?: string;
  email?: string;
  assunto?: string;
  mensagem?: string;
}

const Contato: React.FC = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [assunto, setAssunto] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');

  const validate = useCallback((): boolean => {
    const next: FormErrors = {};
    if (!nome.trim()) next.nome = 'Informe seu nome';
    if (!email.trim()) next.email = 'Informe seu e-mail';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'E-mail inválido';
    if (!assunto.trim()) next.assunto = 'Informe o assunto';
    if (!mensagem.trim()) next.mensagem = 'Informe sua mensagem';
    setErrors(next);
    return Object.keys(next).length === 0;
  }, [nome, email, assunto, mensagem]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!validate()) return;
      setStatus('sending');
      // Substitua por sua API ou serviço (Formspree, backend próprio, etc.)
      setTimeout(() => {
        setStatus('success');
        setNome('');
        setEmail('');
        setAssunto('');
        setMensagem('');
        setErrors({});
      }, 800);
    },
    [validate]
  );

  return (
    <div className="contato-page">
      <PageHeader
        title="Contato"
        subtitle="Envie sua mensagem para a Banda Racional"
        breadcrumb={[{ label: 'Início', to: '/' }, { label: 'Contato' }]}
      />

      <div className="container contato-container">
        <div className="contato-intro">
          <p className="contato-intro-text">
            Utilize o formulário abaixo para dúvidas, sugestões ou solicitações. Retornaremos o mais breve possível.
          </p>
        </div>

        <form
          className="contato-form"
          onSubmit={handleSubmit}
          noValidate
          aria-labelledby="contato-form-title"
        >
          <h2 id="contato-form-title" className="contato-form-title">
            Enviar mensagem
          </h2>

          {status === 'success' && (
            <div className="contato-alert contato-alert-success" role="status">
              <i className="fas fa-check-circle" aria-hidden />
              <span>Mensagem enviada com sucesso. Em breve entraremos em contato.</span>
            </div>
          )}

          {status === 'error' && (
            <div className="contato-alert contato-alert-error" role="alert">
              <i className="fas fa-exclamation-circle" aria-hidden />
              <span>Não foi possível enviar. Tente novamente ou entre em contato por outro canal.</span>
            </div>
          )}

          <div className="contato-field">
            <label htmlFor="contato-nome" className="contato-label">
              Nome <span className="contato-required" aria-hidden>*</span>
            </label>
            <input
              id="contato-nome"
              type="text"
              name="nome"
              className={`contato-input ${errors.nome ? 'contato-input-error' : ''}`}
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              onBlur={() => errors.nome && validate()}
              placeholder="Seu nome completo"
              autoComplete="name"
              required
              aria-required="true"
              aria-invalid={!!errors.nome}
              aria-describedby={errors.nome ? 'contato-nome-error' : undefined}
              disabled={status === 'sending'}
            />
            {errors.nome && (
              <span id="contato-nome-error" className="contato-error" role="alert">
                {errors.nome}
              </span>
            )}
          </div>

          <div className="contato-field">
            <label htmlFor="contato-email" className="contato-label">
              E-mail <span className="contato-required" aria-hidden>*</span>
            </label>
            <input
              id="contato-email"
              type="email"
              name="email"
              className={`contato-input ${errors.email ? 'contato-input-error' : ''}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => errors.email && validate()}
              placeholder="seu@email.com"
              autoComplete="email"
              required
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'contato-email-error' : undefined}
              disabled={status === 'sending'}
            />
            {errors.email && (
              <span id="contato-email-error" className="contato-error" role="alert">
                {errors.email}
              </span>
            )}
          </div>

          <div className="contato-field">
            <label htmlFor="contato-assunto" className="contato-label">
              Assunto <span className="contato-required" aria-hidden>*</span>
            </label>
            <input
              id="contato-assunto"
              type="text"
              name="assunto"
              className={`contato-input ${errors.assunto ? 'contato-input-error' : ''}`}
              value={assunto}
              onChange={(e) => setAssunto(e.target.value)}
              onBlur={() => errors.assunto && validate()}
              placeholder="Ex.: dúvida sobre repertório"
              autoComplete="off"
              required
              aria-required="true"
              aria-invalid={!!errors.assunto}
              aria-describedby={errors.assunto ? 'contato-assunto-error' : undefined}
              disabled={status === 'sending'}
            />
            {errors.assunto && (
              <span id="contato-assunto-error" className="contato-error" role="alert">
                {errors.assunto}
              </span>
            )}
          </div>

          <div className="contato-field">
            <label htmlFor="contato-mensagem" className="contato-label">
              Mensagem <span className="contato-required" aria-hidden>*</span>
            </label>
            <textarea
              id="contato-mensagem"
              name="mensagem"
              className={`contato-input contato-textarea ${errors.mensagem ? 'contato-input-error' : ''}`}
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              onBlur={() => errors.mensagem && validate()}
              placeholder="Escreva sua mensagem..."
              rows={5}
              required
              aria-required="true"
              aria-invalid={!!errors.mensagem}
              aria-describedby={errors.mensagem ? 'contato-mensagem-error' : undefined}
              disabled={status === 'sending'}
            />
            {errors.mensagem && (
              <span id="contato-mensagem-error" className="contato-error" role="alert">
                {errors.mensagem}
              </span>
            )}
          </div>

          <div className="contato-actions">
            <button
              type="submit"
              className="contato-submit"
              disabled={status === 'sending'}
              aria-busy={status === 'sending'}
              aria-live="polite"
            >
              {status === 'sending' ? (
                <>
                  <i className="fas fa-spinner fa-spin" aria-hidden />
                  <span>Enviando...</span>
                </>
              ) : (
                <>
                  <i className="fas fa-paper-plane" aria-hidden />
                  <span>Enviar mensagem</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contato;
