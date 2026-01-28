(function() {
    'use strict';

    const MP3_BASE_URL = 'musicas/';
    const PDF_BASE_URL = 'partituras/';
    
    let container = null;
    let currentCategory = 'all';

    function init() {
        container = document.getElementById('partituras-container');
        if (!container) return;
        setupCategoryFilters();
        renderPartituras();
    }

    function setupCategoryFilters() {
        const filters = document.querySelectorAll('.category-filter-btn');
        filters.forEach(btn => {
            btn.addEventListener('click', function() {
                filters.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                currentCategory = this.getAttribute('data-category');
                renderPartituras(); // Re-renderiza para manter a memória limpa
            });
        });
    }

    function renderPartituras() {
        const data = window.partiturasData;
        if (!container || !data) return;

        const fragment = document.createDocumentFragment();
        container.innerHTML = '';

        Object.keys(data).forEach(key => {
            const musica = data[key];
            if (currentCategory === 'all' || musica.category === currentCategory) {
                const widget = createWidget(musica);
                fragment.appendChild(widget);
            }
        });

        container.appendChild(fragment);
    }

    function createWidget(musica) {
        const widget = document.createElement('div');
        widget.className = 'pr-widget';
        widget.innerHTML = `
            <div class="pr-header" onclick="prToggle(this)">
                <span class="pr-icon">▶</span>
                <h3 class="pr-title">${musica.title}</h3>
                <input type="text" class="pr-input" placeholder="Filtrar..." onclick="event.stopPropagation()" onkeyup="prFilter(this)">
                <button class="pr-btn-all" onclick="event.stopPropagation(); prDownloadAll(this)" aria-label="Baixar todos os PDFs desta música">
                    <i class="fas fa-download"></i>
                    <span>Baixar todos PDFs</span>
                </button>
            </div>
            <div class="pr-content" style="display:none">
                <div class="pr-list-loading">Carregando instrumentos...</div>
            </div>
        `;
        // Armazenamos os dados da música no elemento para carregar depois (Lazy Load)
        widget._musicaData = musica; 
        return widget;
    }

    // Função global de Toggle (Lazy Loading de verdade)
    window.prToggle = function(header) {
        const widget = header.parentElement;
        const content = widget.querySelector('.pr-content');
        const isOpen = widget.classList.toggle('open');
        
        content.style.display = isOpen ? 'block' : 'none';

        // Carrega os instrumentos apenas na primeira vez que abre
        if (isOpen && !widget._loaded) {
            renderInstrumentos(widget);
            widget._loaded = true;
        }
    };

    function renderInstrumentos(widget) {
        const musica = widget._musicaData;
        const content = widget.querySelector('.pr-content');
        let html = '';

        // Verificar se a música tem MP3 completo usando a lista configurada
        const musicCode = musica.folder.toLowerCase();
        const hasMusicMP3 = window.hasMP3ForMusic && window.hasMP3ForMusic(musicCode);
        
        if (hasMusicMP3) {
            const url = `${MP3_BASE_URL}${musica.folder}.mp3`;
            html += `<div class="pr-item pr-full-row">
                <span class="pr-name">✨ Música Completa</span>
                <audio controls preload="none" class="pr-audio-player"><source src="${url}" type="audio/mpeg"></audio>
                <a href="${url}" download class="pr-btn-mp3" aria-label="Baixar MP3 da música completa">
                    <i class="fas fa-download"></i>
                    <span>Baixar MP3</span>
                </a>
            </div>`;
        }

        musica.instrumentos.forEach(inst => {
            const san = inst.toLowerCase().replace(/[ áéíóúãç]/g, m => ({' ': '', 'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u', 'ã': 'a', 'ç': 'c'}[m])).replace(/[123]/g, '');
            // Normalizar: 'Lira C' vira 'lirac', 'Lira 1' vira 'lirac', etc.
            let mKey = san;
            if (san.includes('lira')) {
                mKey = 'lirac'; // Sempre usar 'lirac' para lira
            }
            
            // Verificar se o instrumento tem MP3 usando a lista configurada
            const hasMp3 = window.hasMP3ForInstrument && window.hasMP3ForInstrument(musicCode, mKey);
            
            const pdf = `${PDF_BASE_URL}${musica.category}/${musica.folder}/${musica.folder}${san}.pdf`;
            const sib = `${PDF_BASE_URL}${musica.category}/${musica.folder}/${musica.folder}${san}.sib`;

            html += `<div class="pr-item" data-name="${inst.toLowerCase()}">
                <span class="pr-name">${inst}</span>
                ${hasMp3 ? `<audio controls preload="none" class="pr-audio-player"><source src="${MP3_BASE_URL}${musica.folder}/${musica.folder}${mKey}.mp3" type="audio/mpeg"></audio>` : '<div class="pr-audio-placeholder"></div>'}
                <div class="pr-links">
                    <a href="${pdf}" target="_blank" class="pr-btn-file pr-pdf" aria-label="Abrir PDF de ${inst}">
                        <i class="fas fa-file-pdf"></i>
                        <span>PDF</span>
                    </a>
                    <a href="${sib}" download class="pr-btn-file pr-sib" aria-label="Baixar arquivo Sibelius de ${inst}">
                        <i class="fas fa-music"></i>
                        <span>SIB</span>
                    </a>
                </div>
            </div>`;
        });

        content.innerHTML = html;
    }

    window.prFilter = function(input) {
        const val = input.value.toLowerCase();
        const items = input.closest('.pr-widget').querySelectorAll('.pr-item');
        items.forEach(it => {
            const name = it.getAttribute('data-name') || '';
            it.style.display = name.includes(val) ? 'flex' : 'none';
        });
    };

    window.prDownloadAll = function(btn) {
        const links = btn.closest('.pr-widget').querySelectorAll('.pr-pdf');
        if (!links.length) return alert('Abra a pasta primeiro para carregar os links.');
        if (confirm(`Baixar ${links.length} PDFs?`)) {
            links.forEach((l, i) => setTimeout(() => window.open(l.href, '_blank'), i * 600));
        }
    };

    document.addEventListener('DOMContentLoaded', init);
})();