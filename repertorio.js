// Script para renderizar o repertório completo
(function() {
    'use strict';

    // Mapeamento de categorias para IDs de lista (web e PDF)
    const categoriaMap = {
        'r': { web: 'racionais-lista', pdf: 'racionais-lista-pdf', count: 'racionais-count' },
        'd': { web: 'diversas-lista', pdf: 'diversas-lista-pdf', count: 'diversas-count' },
        'a': { web: 'apresentacoes-lista', pdf: 'apresentacoes-lista-pdf', count: 'apresentacoes-count' },
        'tf': { web: 'fanfarra-lista', pdf: 'fanfarra-lista-pdf', count: 'fanfarra-count' },
        'h': { web: 'hinos-lista', pdf: 'hinos-lista-pdf', count: 'hinos-count' }
    };

    // Renderizar repertório
    function renderRepertorio() {
        const dataSource = window.partiturasData;
        if (!dataSource) {
            console.warn('Dados de partituras não encontrados.');
            return;
        }

        // Limpar listas (web e PDF)
        Object.values(categoriaMap).forEach(cat => {
            const listWeb = document.getElementById(cat.web);
            const listPdf = document.getElementById(cat.pdf);
            if (listWeb) listWeb.innerHTML = '';
            if (listPdf) listPdf.innerHTML = '';
        });

        // Ordenar músicas
        const sortedKeys = Object.keys(dataSource).sort((a, b) => {
            const musicaA = dataSource[a];
            const musicaB = dataSource[b];
            
            // Ordenar por folder (numérico quando possível)
            const numA = parseInt(musicaA.folder.replace(/\D/g, '')) || 0;
            const numB = parseInt(musicaB.folder.replace(/\D/g, '')) || 0;
            if (numA !== numB) {
                return numA - numB;
            }
            
            return musicaA.folder.localeCompare(musicaB.folder);
        });

        // Contadores por categoria
        const counters = {};
        Object.keys(categoriaMap).forEach(cat => {
            counters[cat] = 0;
        });

        // Renderizar cada música (web e PDF)
        sortedKeys.forEach(key => {
            const musica = dataSource[key];
            const catInfo = categoriaMap[musica.category];
            
            if (catInfo) {
                counters[musica.category]++;
                
                // Versão Web
                const listWeb = document.getElementById(catInfo.web);
                if (listWeb) {
                    const itemWeb = createRepertorioItemWeb(musica);
                    listWeb.appendChild(itemWeb);
                }
                
                // Versão PDF
                const listPdf = document.getElementById(catInfo.pdf);
                if (listPdf) {
                    const itemPdf = createRepertorioItemPDF(musica);
                    listPdf.appendChild(itemPdf);
                }
            }
        });

        // Atualizar contadores
        Object.keys(categoriaMap).forEach(cat => {
            const countEl = document.getElementById(categoriaMap[cat].count);
            if (countEl) {
                const count = counters[cat] || 0;
                countEl.textContent = `${count} ${count === 1 ? 'música' : 'músicas'}`;
            }
        });
    }

    // Criar item de repertório para Web (versão moderna)
    function createRepertorioItemWeb(musica) {
        const item = document.createElement('div');
        item.className = 'repertorio-item-modern';
        
        // Extrair apenas o nome da música (remover código se estiver no título)
        let nomeMusica = musica.title;
        const codigoMatch = musica.title.match(/^[A-Z]+\d+\s*-\s*/);
        if (codigoMatch) {
            nomeMusica = musica.title.replace(codigoMatch[0], '').trim();
        }
        
        item.innerHTML = `
            <div class="repertorio-item-content">
                <span class="repertorio-item-codigo">${musica.folder.toUpperCase()}</span>
                <span class="repertorio-item-nome">${nomeMusica}</span>
                <a href="partituras.html" class="repertorio-item-link">
                    <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        `;
        
        return item;
    }

    // Criar item de repertório para PDF (versão compacta)
    function createRepertorioItemPDF(musica) {
        const item = document.createElement('div');
        item.className = 'repertorio-pdf-item';
        
        // Extrair apenas o nome da música (remover código se estiver no título)
        let nomeMusica = musica.title;
        const codigoMatch = musica.title.match(/^[A-Z]+\d+\s*-\s*/);
        if (codigoMatch) {
            nomeMusica = musica.title.replace(codigoMatch[0], '').trim();
        }
        
        item.innerHTML = `
            <span class="repertorio-pdf-codigo">${musica.folder.toUpperCase()}</span>
            <span class="repertorio-pdf-nome">${nomeMusica}</span>
        `;
        
        return item;
    }

    // Inicializar quando DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderRepertorio);
    } else {
        renderRepertorio();
    }
})();
