import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import type { PartituraData } from '../../data/partituras-data';
import {
  getPartituraFileUrl,
  getPartituraMp3Url,
  getSanitizedName,
  getMp3Key,
  hasMp3Full
} from '../../data/partituras-config';
import './PartiturasWidget.css';

export interface PartiturasWidgetProps {
  partitura: PartituraData;
  /** Busca da página: filtra instrumentos e pode abrir o widget se o título bater */
  globalSearchQuery?: string;
}

export const PartiturasWidget: React.FC<PartiturasWidgetProps> = ({ partitura, globalSearchQuery = '' }) => {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const [downloadFeedback, setDownloadFeedback] = useState(false);
  const [audioErrors, setAudioErrors] = useState<Set<string>>(new Set());
  const widgetRef = useRef<HTMLDivElement>(null);

  if (!partitura) return null;

  const { folder, category, title, instrumentos = [], isSibelius, mp3Instruments = [] } = partitura;
  const ext = isSibelius ? 'sib' : 'enc';
  const showFullMp3 = hasMp3Full(folder);

  const effectiveQuery = (filter || globalSearchQuery).toLowerCase().trim();
  const filteredInstrumentos = useMemo(() => {
    if (!effectiveQuery) return instrumentos;
    return instrumentos.filter((nome) => nome.toLowerCase().includes(effectiveQuery));
  }, [instrumentos, effectiveQuery]);

  useEffect(() => {
    if (globalSearchQuery.trim() && title.toLowerCase().includes(globalSearchQuery.toLowerCase().trim())) {
      setOpen(true);
    }
  }, [globalSearchQuery, title]);

  useEffect(() => {
    if (open && widgetRef.current) {
      widgetRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [open]);

  const pdfLinks = useMemo(() => {
    return filteredInstrumentos.map((nome) => {
      const san = getSanitizedName(nome, !isSibelius);
      const filename = `${folder}${san}.pdf`;
      return getPartituraFileUrl(category, folder, filename);
    });
  }, [category, folder, filteredInstrumentos, isSibelius]);

  const handleDownloadAll = useCallback(() => {
    if (pdfLinks.length === 0) {
      alert('Nenhuma partitura PDF disponível para download.');
      return;
    }
    if (!window.confirm(`Deseja baixar todos os ${pdfLinks.length} PDFs desta música?\n\nOs downloads serão iniciados sequencialmente.`)) {
      return;
    }
    pdfLinks.forEach((href, i) => {
      setTimeout(() => window.open(href, '_blank'), i * 500);
    });
    setDownloadFeedback(true);
  }, [pdfLinks]);

  useEffect(() => {
    if (!downloadFeedback) return;
    const t = setTimeout(() => setDownloadFeedback(false), 4000);
    return () => clearTimeout(t);
  }, [downloadFeedback]);

  const markAudioError = useCallback((key: string) => {
    setAudioErrors((prev) => new Set(prev).add(key));
  }, []);

  return (
    <div ref={widgetRef} className={`pr-widget ${open ? 'open' : ''}`} id={`pr-w-${folder}`}>
      <div
        className="pr-header"
        role="button"
        tabIndex={0}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setOpen((o) => !o);
          }
        }}
      >
        <span className="pr-icon" aria-hidden>▶</span>
        <h3 className="pr-title">{title}</h3>
        <input
          type="text"
          className="pr-input"
          placeholder={globalSearchQuery ? `Ex.: ${globalSearchQuery}` : 'Filtrar instrumento...'}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
          aria-label="Filtrar por nome do instrumento"
        />
        <button
          type="button"
          className={`pr-btn-all ${downloadFeedback ? 'pr-btn-all-feedback' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            handleDownloadAll();
          }}
          aria-busy={downloadFeedback}
        >
          {downloadFeedback ? 'Downloads iniciados' : 'Baixar todos PDFs'}
        </button>
      </div>

      <div className="pr-container" id={`pr-c-${folder}`} style={{ display: open ? 'block' : 'none' }}>
        {showFullMp3 && (
          <div className="pr-item pr-full-row">
            <span className="pr-instr-name">✨ Música Completa</span>
            <div className="pr-audio-wrap">
              <audio
                controls
                preload="none"
                playsInline
                onError={() => markAudioError(`${folder}-full`)}
              >
                <source src={getPartituraMp3Url(`${folder}.mp3`)} type="audio/mpeg" />
              </audio>
              {audioErrors.has(`${folder}-full`) && (
                <span className="pr-audio-error" role="status">Erro ao carregar áudio</span>
              )}
            </div>
            <div className="pr-links">
              <a
                href={getPartituraMp3Url(`${folder}.mp3`)}
                download
                className="pr-link-file pr-mp3-btn"
                onClick={(e) => e.stopPropagation()}
              >
                Baixar MP3
              </a>
            </div>
          </div>
        )}

        {filteredInstrumentos.length === 0 ? (
          <div className="pr-no-results">
            {effectiveQuery ? `Nenhum instrumento encontrado com "${effectiveQuery}"` : 'Nenhum instrumento nesta lista.'}
          </div>
        ) : (
          filteredInstrumentos.map((nome) => {
            const san = getSanitizedName(nome, !isSibelius);
            const mKey = getMp3Key(nome);
            const hasMp3 = Array.isArray(mp3Instruments) && mp3Instruments.includes(mKey);
            const pdfFile = `${folder}${san}.pdf`;
            const extFile = `${folder}${san}.${ext}`;
            const pdfHref = getPartituraFileUrl(category, folder, pdfFile);
            const extHref = getPartituraFileUrl(category, folder, extFile);
            const mp3Href = hasMp3 ? getPartituraMp3Url(`${folder}${mKey}.mp3`) : null;

            return (
              <div
                key={nome}
                className="pr-item"
                data-name={String(nome).toLowerCase()}
              >
                <span className="pr-instr-name">{nome}</span>
                {hasMp3 && mp3Href ? (
                  <div className="pr-audio-wrap">
                    <audio
                      controls
                      preload="none"
                      playsInline
                      onError={() => markAudioError(`${folder}-${mKey}`)}
                    >
                      <source src={mp3Href} type="audio/mpeg" />
                    </audio>
                    {audioErrors.has(`${folder}-${mKey}`) && (
                      <span className="pr-audio-error" role="status">Erro ao carregar áudio</span>
                    )}
                  </div>
                ) : (
                  <div className="pr-spacer" />
                )}
                <div className="pr-links">
                  <a
                    href={pdfHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pr-link-file pr-pdf-btn pr-pdf-link"
                    onClick={(e) => e.stopPropagation()}
                  >
                    PDF
                  </a>
                  <a
                    href={extHref}
                    download
                    className="pr-link-file pr-sib-btn"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {ext.toUpperCase()}
                  </a>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
