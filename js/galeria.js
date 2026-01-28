// =========================================================
// GALERIA MODULE - Gerenciamento da galeria de bandas
// =========================================================

import { galeriaData } from '../galeria-data.js';

let bandaSelecionada = 'todas';
let tipoFiltro = 'todos';
let paginaAtual = 1;
const itensPorPagina = 6; // Número de bandas por página

// Inicializar galeria
export function initGaleria() {
    renderizarFiltros();
    renderizarConteudo();
    setupEventListeners();
}

// Ordenar bandas alfabeticamente por cidade
function ordenarBandasAlfabeticamente(bandas) {
    return [...bandas].sort((a, b) => {
        const cidadeA = a.cidade.toLowerCase();
        const cidadeB = b.cidade.toLowerCase();
        return cidadeA.localeCompare(cidadeB, 'pt-BR');
    });
}

// Renderizar filtros de bandas
function renderizarFiltros() {
    const filtrosContainer = document.querySelector('.galeria-filtros');
    if (!filtrosContainer) return;

    filtrosContainer.innerHTML = '';

    // Botão "Todas"
    const btnTodas = document.createElement('button');
    btnTodas.className = `filtro-btn ${bandaSelecionada === 'todas' ? 'active' : ''}`;
    btnTodas.textContent = 'Todas as Bandas';
    btnTodas.setAttribute('data-banda', 'todas');
    filtrosContainer.appendChild(btnTodas);

    // Botões para cada banda (ordenadas alfabeticamente)
    const bandasOrdenadas = ordenarBandasAlfabeticamente(galeriaData.bandas);
    bandasOrdenadas.forEach(banda => {
        const btn = document.createElement('button');
        btn.className = `filtro-btn ${bandaSelecionada === banda.id ? 'active' : ''}`;
        btn.textContent = `${banda.cidade} - ${banda.estado}`;
        btn.setAttribute('data-banda', banda.id);
        filtrosContainer.appendChild(btn);
    });
}

// Renderizar conteúdo (fotos e vídeos)
function renderizarConteudo() {
    const conteudoContainer = document.querySelector('.galeria-conteudo');
    if (!conteudoContainer) return;

    conteudoContainer.innerHTML = '';

    let bandasParaExibir = [];
    
    if (bandaSelecionada === 'todas') {
        // Ordenar alfabeticamente quando mostrar todas
        bandasParaExibir = ordenarBandasAlfabeticamente(galeriaData.bandas);
    } else {
        bandasParaExibir = galeriaData.bandas.filter(b => b.id === bandaSelecionada);
        paginaAtual = 1; // Resetar página quando filtrar por banda específica
    }

    if (bandasParaExibir.length === 0) {
        conteudoContainer.innerHTML = '<p class="galeria-vazio">Nenhuma banda encontrada.</p>';
        renderizarPaginacao(0);
        return;
    }

    // Calcular paginação apenas se mostrar todas as bandas
    if (bandaSelecionada === 'todas') {
        const totalPaginas = Math.ceil(bandasParaExibir.length / itensPorPagina);
        const inicio = (paginaAtual - 1) * itensPorPagina;
        const fim = inicio + itensPorPagina;
        const bandasDaPagina = bandasParaExibir.slice(inicio, fim);

        bandasDaPagina.forEach(banda => {
            const bandaSection = criarSecaoBanda(banda);
            conteudoContainer.appendChild(bandaSection);
        });

        // Renderizar controles de paginação
        renderizarPaginacao(totalPaginas);
    } else {
        // Se uma banda específica está selecionada, mostrar tudo sem paginação
        bandasParaExibir.forEach(banda => {
            const bandaSection = criarSecaoBanda(banda);
            conteudoContainer.appendChild(bandaSection);
        });
        renderizarPaginacao(0); // Esconder paginação
    }

    // Atualizar contador
    atualizarContador();
    
    // Scroll suave para o topo do conteúdo
    conteudoContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Criar seção de uma banda
function criarSecaoBanda(banda) {
    const section = document.createElement('div');
    section.className = 'banda-section';
    section.setAttribute('data-banda-id', banda.id);

    // Header da banda
    const header = document.createElement('div');
    header.className = 'banda-header';
    header.innerHTML = `
        <h3 class="banda-nome">${banda.nome}</h3>
        <span class="banda-localizacao">${banda.cidade} - ${banda.estado}</span>
    `;
    section.appendChild(header);

    // Filtros de tipo (apresentação/ensaio)
    const tipoFiltros = document.createElement('div');
    tipoFiltros.className = 'tipo-filtros';
    tipoFiltros.innerHTML = `
        <button class="tipo-filtro-btn ${tipoFiltro === 'todos' ? 'active' : ''}" data-tipo="todos">
            <i class="fas fa-th"></i> Todos
        </button>
        <button class="tipo-filtro-btn ${tipoFiltro === 'apresentacao' ? 'active' : ''}" data-tipo="apresentacao">
            <i class="fas fa-calendar-check"></i> Apresentações
        </button>
        <button class="tipo-filtro-btn ${tipoFiltro === 'ensaio' ? 'active' : ''}" data-tipo="ensaio">
            <i class="fas fa-music"></i> Ensaios
        </button>
    `;
    section.appendChild(tipoFiltros);

    // Grid de conteúdo
    const grid = document.createElement('div');
    grid.className = 'galeria-grid-conteudo';

    // Filtrar conteúdo por tipo
    let conteudoParaExibir = [];
    
    if (tipoFiltro === 'todos') {
        conteudoParaExibir = [...banda.fotos, ...banda.videos];
    } else {
        conteudoParaExibir = [
            ...banda.fotos.filter(f => f.tipo === tipoFiltro),
            ...banda.videos.filter(v => v.tipo === tipoFiltro)
        ];
    }

    if (conteudoParaExibir.length === 0) {
        grid.innerHTML = `<p class="galeria-vazio">Nenhum conteúdo disponível para esta seleção.</p>`;
    } else {
        conteudoParaExibir.forEach(item => {
            const card = item.url ? criarCardFoto(item, banda) : criarCardVideo(item, banda);
            grid.appendChild(card);
        });
    }

    section.appendChild(grid);

    return section;
}

// Criar card de foto
function criarCardFoto(foto, banda) {
    const card = document.createElement('div');
    card.className = 'galeria-item foto-item';
    card.setAttribute('data-tipo', foto.tipo);
    
    card.innerHTML = `
        <div class="galeria-image">
            <img src="${foto.url}" alt="${foto.titulo}" loading="lazy">
            <div class="galeria-overlay">
                <i class="fas fa-image"></i>
                <p>${foto.titulo}</p>
                <span class="galeria-data">${formatarData(foto.data)}</span>
            </div>
        </div>
    `;

    card.addEventListener('click', () => abrirLightbox(foto, banda));
    
    return card;
}

// Criar card de vídeo
function criarCardVideo(video, banda) {
    const card = document.createElement('div');
    card.className = 'galeria-item video-item';
    card.setAttribute('data-tipo', video.tipo);
    
    const thumbnailUrl = `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`;
    
    card.innerHTML = `
        <div class="galeria-image">
            <img src="${thumbnailUrl}" alt="${video.titulo}" loading="lazy">
            <div class="galeria-overlay">
                <i class="fas fa-play-circle"></i>
                <p>${video.titulo}</p>
                <span class="galeria-data">${formatarData(video.data)}</span>
            </div>
            <div class="video-badge">
                <i class="fab fa-youtube"></i>
            </div>
        </div>
    `;

    card.addEventListener('click', () => abrirPlayerVideo(video, banda));
    
    return card;
}

// Abrir lightbox para foto
function abrirLightbox(foto, banda) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <button class="lightbox-close" aria-label="Fechar">
                <i class="fas fa-times"></i>
            </button>
            <img src="${foto.url}" alt="${foto.titulo}">
            <div class="lightbox-info">
                <h3>${foto.titulo}</h3>
                <p>${banda.nome} - ${banda.cidade}, ${banda.estado}</p>
                <span class="lightbox-data">${formatarData(foto.data)}</span>
            </div>
        </div>
    `;

    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';

    const closeBtn = lightbox.querySelector('.lightbox-close');
    closeBtn.addEventListener('click', () => fecharLightbox(lightbox));
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) fecharLightbox(lightbox);
    });
}

// Fechar lightbox
function fecharLightbox(lightbox) {
    lightbox.remove();
    document.body.style.overflow = '';
}

// Abrir player de vídeo
function abrirPlayerVideo(video, banda) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox video-lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content video-content">
            <button class="lightbox-close" aria-label="Fechar">
                <i class="fas fa-times"></i>
            </button>
            <div class="video-wrapper">
                <iframe 
                    src="https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            </div>
            <div class="lightbox-info">
                <h3>${video.titulo}</h3>
                <p>${banda.nome} - ${banda.cidade}, ${banda.estado}</p>
                <span class="lightbox-data">${formatarData(video.data)}</span>
            </div>
        </div>
    `;

    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';

    const closeBtn = lightbox.querySelector('.lightbox-close');
    closeBtn.addEventListener('click', () => fecharLightbox(lightbox));
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) fecharLightbox(lightbox);
    });
}

// Renderizar controles de paginação
function renderizarPaginacao(totalPaginas) {
    const paginacaoContainer = document.querySelector('.galeria-paginacao');
    if (!paginacaoContainer) return;

    // Se não há paginação necessária (banda específica selecionada ou nenhuma banda)
    if (totalPaginas <= 1) {
        paginacaoContainer.innerHTML = '';
        return;
    }

    let paginacaoHTML = '<div class="paginacao-wrapper">';

    // Botão Anterior
    const desabilitarAnterior = paginaAtual === 1;
    paginacaoHTML += `
        <button class="paginacao-btn ${desabilitarAnterior ? 'disabled' : ''}" 
                data-acao="anterior" 
                ${desabilitarAnterior ? 'disabled' : ''}
                aria-label="Página anterior">
            <i class="fas fa-chevron-left"></i>
            <span>Anterior</span>
        </button>
    `;

    // Números das páginas
    paginacaoHTML += '<div class="paginacao-numeros">';
    
    // Mostrar primeiras páginas
    if (totalPaginas <= 7) {
        // Se há 7 ou menos páginas, mostrar todas
        for (let i = 1; i <= totalPaginas; i++) {
            paginacaoHTML += `
                <button class="paginacao-numero ${i === paginaAtual ? 'active' : ''}" 
                        data-pagina="${i}"
                        aria-label="Página ${i}">
                    ${i}
                </button>
            `;
        }
    } else {
        // Lógica para muitas páginas (mostrar primeira, última e próximas)
        if (paginaAtual <= 3) {
            // Mostrar 1, 2, 3, 4, ..., última
            for (let i = 1; i <= 4; i++) {
                paginacaoHTML += `
                    <button class="paginacao-numero ${i === paginaAtual ? 'active' : ''}" 
                            data-pagina="${i}"
                            aria-label="Página ${i}">
                        ${i}
                    </button>
                `;
            }
            paginacaoHTML += '<span class="paginacao-ellipsis">...</span>';
            paginacaoHTML += `
                <button class="paginacao-numero" 
                        data-pagina="${totalPaginas}"
                        aria-label="Página ${totalPaginas}">
                    ${totalPaginas}
                </button>
            `;
        } else if (paginaAtual >= totalPaginas - 2) {
            // Mostrar primeira, ..., últimas 4
            paginacaoHTML += `
                <button class="paginacao-numero" 
                        data-pagina="1"
                        aria-label="Página 1">
                    1
                </button>
            `;
            paginacaoHTML += '<span class="paginacao-ellipsis">...</span>';
            for (let i = totalPaginas - 3; i <= totalPaginas; i++) {
                paginacaoHTML += `
                    <button class="paginacao-numero ${i === paginaAtual ? 'active' : ''}" 
                            data-pagina="${i}"
                            aria-label="Página ${i}">
                        ${i}
                    </button>
                `;
            }
        } else {
            // Mostrar primeira, ..., atual-1, atual, atual+1, ..., última
            paginacaoHTML += `
                <button class="paginacao-numero" 
                        data-pagina="1"
                        aria-label="Página 1">
                    1
                </button>
            `;
            paginacaoHTML += '<span class="paginacao-ellipsis">...</span>';
            for (let i = paginaAtual - 1; i <= paginaAtual + 1; i++) {
                paginacaoHTML += `
                    <button class="paginacao-numero ${i === paginaAtual ? 'active' : ''}" 
                            data-pagina="${i}"
                            aria-label="Página ${i}">
                        ${i}
                    </button>
                `;
            }
            paginacaoHTML += '<span class="paginacao-ellipsis">...</span>';
            paginacaoHTML += `
                <button class="paginacao-numero" 
                        data-pagina="${totalPaginas}"
                        aria-label="Página ${totalPaginas}">
                    ${totalPaginas}
                </button>
            `;
        }
    }

    paginacaoHTML += '</div>';

    // Botão Próxima
    const desabilitarProxima = paginaAtual === totalPaginas;
    paginacaoHTML += `
        <button class="paginacao-btn ${desabilitarProxima ? 'disabled' : ''}" 
                data-acao="proxima" 
                ${desabilitarProxima ? 'disabled' : ''}
                aria-label="Próxima página">
            <span>Próxima</span>
            <i class="fas fa-chevron-right"></i>
        </button>
    `;

    paginacaoHTML += '</div>';

    paginacaoContainer.innerHTML = paginacaoHTML;
}

// Configurar event listeners
function setupEventListeners() {
    // Filtros de banda
    document.addEventListener('click', (e) => {
        if (e.target.closest('.filtro-btn')) {
            const btn = e.target.closest('.filtro-btn');
            bandaSelecionada = btn.getAttribute('data-banda');
            paginaAtual = 1; // Resetar para primeira página
            
            document.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            renderizarConteudo();
        }

        // Filtros de tipo
        if (e.target.closest('.tipo-filtro-btn')) {
            const btn = e.target.closest('.tipo-filtro-btn');
            tipoFiltro = btn.getAttribute('data-tipo');
            
            document.querySelectorAll('.tipo-filtro-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            renderizarConteudo();
        }

        // Controles de paginação
        if (e.target.closest('.paginacao-btn')) {
            const btn = e.target.closest('.paginacao-btn');
            if (btn.disabled) return;
            
            const acao = btn.getAttribute('data-acao');
            if (acao === 'anterior') {
                paginaAtual = Math.max(1, paginaAtual - 1);
            } else if (acao === 'proxima') {
                const totalBandas = ordenarBandasAlfabeticamente(galeriaData.bandas).length;
                const totalPaginas = Math.ceil(totalBandas / itensPorPagina);
                paginaAtual = Math.min(totalPaginas, paginaAtual + 1);
            }
            
            renderizarConteudo();
        }

        // Números de página
        if (e.target.closest('.paginacao-numero')) {
            const btn = e.target.closest('.paginacao-numero');
            paginaAtual = parseInt(btn.getAttribute('data-pagina'));
            renderizarConteudo();
        }
    });
}

// Atualizar contador de conteúdo
function atualizarContador() {
    const contador = document.querySelector('.galeria-contador');
    if (!contador) return;

    let totalFotos = 0;
    let totalVideos = 0;

    const bandasParaContar = bandaSelecionada === 'todas' 
        ? galeriaData.bandas 
        : galeriaData.bandas.filter(b => b.id === bandaSelecionada);

    bandasParaContar.forEach(banda => {
        const fotos = tipoFiltro === 'todos' 
            ? banda.fotos 
            : banda.fotos.filter(f => f.tipo === tipoFiltro);
        const videos = tipoFiltro === 'todos' 
            ? banda.videos 
            : banda.videos.filter(v => v.tipo === tipoFiltro);
        
        totalFotos += fotos.length;
        totalVideos += videos.length;
    });

    contador.textContent = `${totalFotos} fotos • ${totalVideos} vídeos`;
}

// Formatar data
function formatarData(dataString) {
    if (!dataString) return '';
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric' 
    });
}
