// Sistema de Partituras - Baseado no PHP fornecido
// Renderiza widgets expansíveis para cada música com partituras e áudios

(function() {
    'use strict';

    // Base URL para downloads (ajuste conforme necessário)
    // Para produção, ajuste estas URLs para apontar para o servidor correto
    const BASE_URL = '';
    const MP3_BASE_URL = BASE_URL + 'musicas/';
    const PDF_BASE_URL = BASE_URL + 'partituras/';
    
    // Tornar dados disponíveis globalmente
    if (typeof window !== 'undefined') {
        window.partiturasData = window.partiturasData || {};
    }

    // Cache de elementos DOM
    let container = null;
    let categoryFilters = null;
    let widgetsCache = null;

    // Estado
    let currentCategory = 'all';
    let isLoading = false;

    // Inicialização
    function init() {
        container = document.getElementById('partituras-container');
        if (!container) return;

        categoryFilters = document.querySelectorAll('.category-filter-btn');
        
        // Event listeners
        setupCategoryFilters();
        
        // Renderizar partituras
        renderPartituras();
    }

    // Configurar filtros de categoria
    function setupCategoryFilters() {
        categoryFilters.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Remove active de todos
                categoryFilters.forEach(b => b.classList.remove('active'));
                // Adiciona active no clicado
                this.classList.add('active');
                
                const selectedCategory = this.getAttribute('data-category');
                if (selectedCategory) {
                    currentCategory = selectedCategory;
                    filterByCategory(currentCategory);
                }
            });
        });
    }

    // Filtrar por categoria
    function filterByCategory(category) {
        if (!widgetsCache || widgetsCache.length === 0) {
            // Se não houver cache, re-renderizar
            renderPartituras();
            return;
        }

        let visibleCount = 0;
        
        widgetsCache.forEach(widget => {
            const widgetCategory = widget.getAttribute('data-category') || '';
            const selectedCategory = category || 'all';
            const shouldShow = selectedCategory === 'all' || widgetCategory === selectedCategory;
            
            if (shouldShow) {
                widget.style.display = 'block';
                widget.style.opacity = '1';
                widget.style.transform = 'scale(1)';
                visibleCount++;
            } else {
                widget.style.opacity = '0';
                widget.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    widget.style.display = 'none';
                }, 200);
            }
        });
        
        // Scroll suave para o topo se houver resultados
        if (visibleCount > 0 && category !== 'all') {
            setTimeout(() => {
                container.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }

    // Renderizar todas as partituras
    function renderPartituras() {
        // Usar dados do arquivo partituras-data.js se disponível
        const dataSource = window.partiturasData;
        if (!container || !dataSource) {
            console.warn('Dados de partituras não encontrados. Certifique-se de que partituras-data.js está carregado.');
            return;
        }

        container.innerHTML = '';

        // Ordenar as músicas por categoria e depois por folder
        const sortedKeys = Object.keys(dataSource).sort((a, b) => {
            const musicaA = dataSource[a];
            const musicaB = dataSource[b];
            
            // Primeiro ordena por categoria
            if (musicaA.category !== musicaB.category) {
                const categoryOrder = { 'r': 1, 'd': 2, 'a': 3, 'tf': 4, 'h': 5 };
                return (categoryOrder[musicaA.category] || 99) - (categoryOrder[musicaB.category] || 99);
            }
            
            // Depois ordena por folder (numérico quando possível)
            const numA = parseInt(musicaA.folder.replace(/\D/g, '')) || 0;
            const numB = parseInt(musicaB.folder.replace(/\D/g, '')) || 0;
            if (numA !== numB) {
                return numA - numB;
            }
            
            // Por último, ordem alfabética
            return musicaA.folder.localeCompare(musicaB.folder);
        });

        sortedKeys.forEach(key => {
            const musica = dataSource[key];
            const widget = createPartituraWidget(musica);
            container.appendChild(widget);
        });

        // Cache dos widgets
        widgetsCache = Array.from(container.querySelectorAll('.partituras-widget'));
        
        // Garantir que todos os widgets estejam visíveis inicialmente se categoria for 'all'
        if (currentCategory === 'all') {
            widgetsCache.forEach(widget => {
                widget.style.display = 'block';
                widget.style.opacity = '1';
                widget.style.transform = 'scale(1)';
            });
        } else {
            // Aplicar filtro atual após renderizar
            filterByCategory(currentCategory);
        }
        
        // Inicializar interatividade
        initializeWidgets();
    }

    // Criar widget de partitura
    function createPartituraWidget(musica) {
        const widget = document.createElement('div');
        widget.className = 'partituras-widget';
        widget.setAttribute('data-folder', musica.folder);
        widget.setAttribute('data-category', musica.category || 'all');
        widget.setAttribute('data-state', 'closed');
        
        // Garantir que o widget comece visível
        widget.style.display = 'block';
        widget.style.opacity = '1';
        widget.style.transform = 'scale(1)';

        // Header
        const header = createWidgetHeader(musica);
        
        // Lista de instrumentos
        const listContainer = createInstrumentList(musica);

        widget.appendChild(header);
        widget.appendChild(listContainer);

        return widget;
    }

    // Criar header do widget
    function createWidgetHeader(musica) {
        const header = document.createElement('div');
        header.className = 'partituras-header';
        header.setAttribute('role', 'button');
        header.setAttribute('tabindex', '0');
        header.setAttribute('aria-expanded', 'false');

        header.innerHTML = `
            <h3 class="partitura-title">${musica.title}</h3>
            <input 
                class="pr-filtro" 
                type="search" 
                placeholder="Filtrar instrumento..." 
                aria-label="Filtrar instrumentos"
                data-folder="${musica.folder}"
            >
            <button class="download-button pr-download-all" type="button" data-folder="${musica.folder}">
                <i class="fas fa-download"></i> Baixar todos (PDF)
            </button>
        `;

        return header;
    }

    // Criar lista de instrumentos
    function createInstrumentList(musica) {
        const listContainer = document.createElement('div');
        listContainer.className = 'partitura-list-container';
        listContainer.id = `partitura-list-container-${musica.folder}`;
        listContainer.style.display = 'none';

        // Música completa (se tiver MP3)
        if (musica.hasMP3) {
            const fullSongItem = createFullSongItem(musica);
            listContainer.appendChild(fullSongItem);
        }

        // Lista de instrumentos
        const list = document.createElement('div');
        list.className = 'partitura-list';

        // Verificar se há instrumentos
        if (musica.instrumentos && musica.instrumentos.length > 0) {
            musica.instrumentos.forEach(instrumento => {
                const item = createInstrumentItem(musica, instrumento);
                list.appendChild(item);
            });
        } else {
            // Mensagem quando não há instrumentos
            const emptyMsg = document.createElement('div');
            emptyMsg.className = 'partitura-empty';
            emptyMsg.innerHTML = '<p><i class="fas fa-info-circle"></i> Partituras em preparação. Em breve estarão disponíveis.</p>';
            list.appendChild(emptyMsg);
        }

        listContainer.appendChild(list);
        return listContainer;
    }

    // Criar item de música completa
    function createFullSongItem(musica) {
        const item = document.createElement('div');
        item.className = 'partitura-item full-song-item';

        const mp3Url = `${MP3_BASE_URL}${musica.folder}.mp3`;

        item.innerHTML = `
            <div class="partitura-item-inner">
                <div class="instrumento-info">
                    <div class="instrumento-nome">Música Completa</div>
                </div>
                <div class="audio-player-wrapper">
                    <audio controls preload="none" class="audio-controls">
                        <source src="${mp3Url}" type="audio/mpeg">
                        Seu navegador não suporta o elemento de áudio.
                    </audio>
                </div>
                <div class="download-links">
                    <a class="download-link-item mp3-btn" href="${mp3Url}" download="${musica.folder}.mp3">
                        <i class="fas fa-download"></i> Baixar MP3
                    </a>
                </div>
            </div>
        `;

        return item;
    }

    // Criar item de instrumento
    function createInstrumentItem(musica, instrumento) {
        const item = document.createElement('div');
        item.className = 'partitura-item';
        
        const sanitized = sanitizeInstrumentNameLocal(instrumento, true); // Sempre Sibelius agora
        const mp3Key = getMP3KeyLocal(instrumento);
        const hasMP3 = musica.mp3Instruments && musica.mp3Instruments.includes(mp3Key);
    
        const pdfUrl = `${PDF_BASE_URL}${musica.category}/${musica.folder}/${musica.folder}${sanitized}.pdf`;
        const audioUrl = hasMP3 ? `${MP3_BASE_URL}${musica.folder}/${musica.folder}${mp3Key}.mp3` : null;
    
        item.innerHTML = `
            <div class="partitura-item-inner">
                <div class="instrumento-info">
                    <div class="instrumento-nome">${instrumento}</div>
                </div>
                <div class="audio-player-wrapper">
                    ${audioUrl ? `<audio controls preload="none" class="audio-controls"><source src="${audioUrl}" type="audio/mpeg"></audio>` : 
                    '<span class="audio-placeholder">Áudio em breve</span>'}
                </div>
                <div class="download-links">
                    <a href="${pdfUrl}" target="_blank" class="download-link-item pr-pdf-link" download>
                        <i class="fas fa-file-pdf"></i> PDF
                    </a>
                    <a href="${PDF_BASE_URL}${musica.category}/${musica.folder}/${musica.folder}${sanitized}.sib" class="download-link-item sibelius-btn" download>
                        <i class="fas fa-music"></i> SIB
                    </a>
                </div>
            </div>
        `;
        return item;
    }

    // Inicializar interatividade dos widgets
    function initializeWidgets() {
        if (!widgetsCache) return;

        widgetsCache.forEach(widget => {
            const folder = widget.getAttribute('data-folder');
            const header = widget.querySelector('.partituras-header');
            const listContainer = widget.querySelector('.partitura-list-container');
            const filtro = widget.querySelector('.pr-filtro');
            const downloadAllBtn = widget.querySelector('.pr-download-all');

            // Toggle do widget - Melhorado com animações suaves
            if (header && listContainer) {
                // Adicionar suporte para teclado (Enter e Space)
                header.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        header.click();
                    }
                });

                header.addEventListener('click', function(e) {
                    // Não fechar se clicar em input ou button
                    if (e.target.closest('.pr-filtro') || 
                        e.target.closest('.pr-download-all') || 
                        e.target.closest('button') ||
                        e.target.closest('input')) {
                        return;
                    }

                    const currentState = widget.getAttribute('data-state');
                    const newState = currentState === 'open' ? 'closed' : 'open';
                    
                    widget.setAttribute('data-state', newState);
                    
                    // Animação fluída e suave de abertura/fechamento
                    if (newState === 'open') {
                        // Abrir: mostrar e animar
                        listContainer.style.display = 'block';
                        listContainer.style.maxHeight = '0';
                        listContainer.style.opacity = '0';
                        listContainer.style.padding = '0';
                        
                        // Forçar reflow para garantir que a transição funcione
                        listContainer.offsetHeight;
                        
                        // Animar com requestAnimationFrame para suavidade máxima
                        requestAnimationFrame(() => {
                            requestAnimationFrame(() => {
                                listContainer.style.transition = 'max-height 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), padding 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                                listContainer.style.maxHeight = '6000px';
                                listContainer.style.opacity = '1';
                                listContainer.style.padding = '1.5rem 0';
                            });
                        });
                    } else {
                        // Fechar: animar e esconder
                        listContainer.style.transition = 'max-height 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), padding 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                        listContainer.style.maxHeight = '0';
                        listContainer.style.opacity = '0';
                        listContainer.style.padding = '0';
                        
                        // Esconder após animação
                        setTimeout(() => {
                            if (widget.getAttribute('data-state') === 'closed') {
                                listContainer.style.display = 'none';
                            }
                        }, 600);
                    }
                    
                    header.setAttribute('aria-expanded', newState === 'open');
                });
            }

            // Filtro de busca
            if (filtro) {
    const filterItems = debounce(function(searchTerm) {
        const items = listContainer.querySelectorAll('.partitura-item');
        const termo = searchTerm.trim().toLowerCase();
        
        // Se estiver filtrando, garantimos que o container não quebre o layout
        if (termo.length > 0) {
            widget.setAttribute('data-state', 'open');
            listContainer.style.display = 'block';
            listContainer.style.maxHeight = 'none'; // Permite expansão dinâmica
        }
        
        items.forEach(item => {
            const text = item.getAttribute('data-instrumento') || '';
            item.style.display = text.indexOf(termo) !== -1 ? 'flex' : 'none';
        });
    }, 300);

                filtro.addEventListener('input', function(e) {
                    filterItems(this.value);
                });
            }

            // Download todos
            if (downloadAllBtn) {
                downloadAllBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    
                    const pdfLinks = listContainer.querySelectorAll('.pr-pdf-link');
                    const links = Array.from(pdfLinks).filter(link => {
                        const item = link.closest('.partitura-item');
                        return item && item.style.display !== 'none';
                    });

                    if (links.length === 0) {
                        alert('Nenhuma partitura encontrada para download.');
                        return;
                    }

                    // Mostrar modal de progresso
                    showDownloadModal(links, folder);
                });
            }
        });
    }

    // Mostrar modal de download
    function showDownloadModal(links, folder) {
        // Criar modal se não existir
        let modal = document.getElementById(`pr-download-modal-${folder}`);
        if (!modal) {
            modal = document.createElement('div');
            modal.id = `pr-download-modal-${folder}`;
            modal.className = 'download-modal-overlay';
            modal.innerHTML = `
                <div class="download-modal-content">
                    <div class="spinner"></div>
                    <p class="modal-progress-text">Preparando downloads...</p>
                    <small>O processo pode levar alguns segundos, dependendo da quantidade.</small>
                </div>
            `;
            document.body.appendChild(modal);
        }

        const progressText = modal.querySelector('.modal-progress-text');
        modal.style.display = 'flex';

        let downloadsInitiated = 0;
        const totalLinks = links.length;

        links.forEach((link, i) => {
            setTimeout(() => {
                progressText.textContent = `Baixando arquivo ${i + 1} de ${totalLinks}...`;
                
                const tempLink = link.cloneNode(true);
                const titleAttr = link.getAttribute('title') || 'partitura-download';
                const fileName = titleAttr.replace(/^(Abrir|Baixar) PDF - /i, '').trim().replace(/[\s\W]+/g, '-') + '.pdf';
                tempLink.setAttribute('download', fileName);
                
                document.body.appendChild(tempLink);
                tempLink.click();
                document.body.removeChild(tempLink);
                
                downloadsInitiated++;
                if (downloadsInitiated === totalLinks) {
                    progressText.textContent = 'Todos os downloads iniciados!';
                    setTimeout(() => {
                        modal.style.display = 'none';
                        alert('Todos os downloads foram iniciados. Verifique a barra de downloads do seu navegador.');
                    }, 2000);
                }
            }, i * 500);
        });
    }

    // Funções auxiliares
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    function sanitizeInstrumentNameLocal(name, isSibelius = true) {
        let sanitized = name.toLowerCase();
        const search = [' ', 'á', 'é', 'í', 'ó', 'ú', 'ã', 'ç'];
        const replace = ['', 'a', 'e', 'i', 'o', 'u', 'a', 'c'];
        
        for (let i = 0; i < search.length; i++) {
            sanitized = sanitized.replace(new RegExp(search[i], 'g'), replace[i]);
        }
        
        // Sempre remove números (formato Sibelius)
        sanitized = sanitized.replace(/[123]/g, '');
        
        return sanitized;
    }

    function getMP3KeyLocal(instrumentName) {
        const sanitized = sanitizeInstrumentNameLocal(instrumentName, true);
        const mp3Map = {
            'lira1': 'lira',
            'lira2': 'lira'
        };
        return mp3Map[sanitized] || sanitized;
    }

    // Inicializar quando DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
