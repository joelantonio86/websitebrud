# 🎵 Banda Racional Universo em Desencanto

Site oficial da **Banda União Racional (BUR)** - uma Banda Marcial sem fins lucrativos que divulga a **CULTURA RACIONAL DO TERCEIRO MILÊNIO** através da música.

## 📋 Sobre

Este projeto é o site oficial da Banda Racional Universo em Desencanto, desenvolvido com design moderno e profissional, mantendo a identidade visual da Cultura Racional.

### ✨ Características

- 🎨 Design moderno com identidade visual da Cultura Racional
- 📱 Totalmente responsivo (desktop, tablet, mobile)
- ♿ Acessibilidade completa (ARIA, navegação por teclado)
- ⚡ Performance otimizada (PWA, lazy loading, preload)
- 🔍 SEO otimizado
- 🎯 Navegação intuitiva com submenus
- 📦 JavaScript modularizado (ES6)
- ✅ Validação de formulários melhorada
- 🔄 Service Worker (funciona offline)

## 🚀 Tecnologias

- **HTML5** - Estrutura semântica
- **CSS3** - Variáveis CSS, Grid, Flexbox, Animações
- **JavaScript (ES6 Modules)** - Código modularizado
- **Vite** - Sistema de build e desenvolvimento
- **Service Worker** - PWA (Progressive Web App)
- **Font Awesome 6.4.0** - Ícones
- **Google Fonts** - Poppins e Playfair Display

## 📁 Estrutura do Projeto

```
websitebrud/
├── index.html              # Página principal
├── repertorio.html         # Repertório completo
├── partituras.html         # Partituras para download
├── eventos.html            # Eventos e shows
├── letras-musicas.html     # Letras das músicas
├── material-apoio.html     # Material de apoio
├── sibelius-*.html         # Guias Sibelius
│
├── styles.css              # Estilos base
├── styles-index.css        # Estilos homepage
├── styles-repertorio.css  # Estilos repertório
├── styles-*.css           # Outros estilos
│
├── script.js               # JavaScript principal (fallback)
├── js/                     # Módulos JavaScript ES6
│   ├── main.js             # Ponto de entrada
│   ├── navigation.js       # Menu e navegação
│   ├── animations.js       # Animações e contadores
│   ├── forms.js            # Validação de formulários
│   ├── utils.js            # Funções utilitárias
│   └── analytics.js        # Analytics (Google/Plausible)
├── repertorio.js           # JavaScript repertório
├── partituras.js           # JavaScript partituras
├── sw.js                   # Service Worker (PWA)
├── manifest.json           # Manifest PWA
├── vite.config.js          # Configuração Vite
├── package.json            # Dependências NPM
│
├── images/                 # Imagens
├── musicas/                # Arquivos de áudio
└── partituras/             # Partituras (PDF, Sibelius)
```

## 🎨 Paleta de Cores

- **Dourado** (#FFD700) - Cor principal
- **Azul Escuro** (#1E3A8A) - Cor secundária
- **Branco** (#FFFFFF) - Textos claros
- **Preto** (#000000) - Contraste

## 📄 Páginas

1. **Homepage** - Hero, Sobre, Estatísticas, Agenda, Galeria, Contato
2. **Repertório** - Lista completa de músicas com player de áudio
3. **Partituras** - Download de partituras por instrumento
4. **Eventos** - Shows e apresentações
5. **Letras** - Letras das músicas
6. **Material de Apoio** - Recursos para músicos
7. **Guias Sibelius** - Instruções para computador, iOS e Android

## 🛠️ Como Usar

### Execução Local

#### Opção 1: Com Vite (Recomendado)

```bash
# Instalar dependências (primeira vez)
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Acesse: http://localhost:3000
```

#### Opção 2: Servidor HTTP Simples

```bash
# Python 3
python -m http.server 8000

# Node.js
npx http-server

# PHP
php -S localhost:8000
```

Acesse: `http://localhost:8000`

### Build para Produção

```bash
# Build completo (minifica tudo)
npm run build

# Os arquivos otimizados estarão em: dist/
```

### Deploy

- **Netlify/Vercel:** Arraste a pasta `dist/` ou conecte com Git
- **GitHub Pages:** Faça push da pasta `dist/` para branch `gh-pages`

## 📱 Responsividade

- **Desktop** (1200px+): Layout completo
- **Tablet** (768px - 1199px): Layout adaptado
- **Mobile** (até 767px): Menu hambúrguer, layout em coluna

## ✅ Funcionalidades

- ✅ Menu fixo com scroll effect
- ✅ Menu hambúrguer para mobile
- ✅ Submenus funcionais
- ✅ Player de áudio para músicas
- ✅ Sistema de filtros
- ✅ Download de partituras
- ✅ Formulário de contato com validação em tempo real
- ✅ Animações ao scroll
- ✅ Contadores animados
- ✅ Botão "Voltar ao topo"
- ✅ PWA (funciona offline)
- ✅ Service Worker (cache inteligente)
- ✅ Preload de recursos críticos
- ✅ Lazy loading de imagens
- ✅ Analytics (Google/Plausible)

## 🎯 Sobre a BUR

- **24 Bandas** em todo o Brasil
- **811 Integrantes** aproximadamente
- Músicos, balizas, porta-bandeiras e regentes
- Bandas Racionais em várias capitais brasileiras

## 📚 Documentação

- `ESTRATEGIA_FUTURA.md` - Estratégia de desenvolvimento futuro (React, backend)
- `musicas/README.md` - Guia de organização de áudio
- `partituras/README.md` - Guia de organização de partituras

## 🔧 Personalização

### Adicionar Músicas

Edite `repertorio.js`:

```javascript
{
    nome: "Nome da Música",
    categoria: "hinos", // ou "marchas", "outras"
    audio: "musicas/nome.mp3"
}
```

### Personalizar Cores

Edite `styles.css`:

```css
:root {
    --primary-gold: #FFD700;
    --primary-blue: #1E3A8A;
}
```

### Configurar Analytics

Edite `js/analytics.js`:

```javascript
const ANALYTICS_CONFIG = {
    provider: 'google', // ou 'plausible'
    googleId: 'G-SEU-ID-AQUI',
    plausibleDomain: 'seu-dominio.com.br'
};
```

## ⚙️ Melhorias Implementadas

### ✅ Alta Prioridade
- **Preload de recursos críticos** - CSS, fontes e imagens carregam mais rápido
- **Lazy loading de imagens** - Imagens carregam sob demanda
- **Minificação de CSS/JS** - Redução de 30-50% no tamanho dos arquivos (via Vite)

### ✅ Média Prioridade
- **JavaScript modularizado** - 6 módulos ES6 organizados (`js/`)
- **Validação de formulários melhorada** - Validação em tempo real com feedback visual
- **Service Worker (PWA)** - Site funciona offline, pode ser instalado no celular

### ✅ Baixa Prioridade
- **Sistema de build (Vite)** - Build automatizado, minificação, otimização
- **Analytics** - Google Analytics 4 e Plausible configurados (pronto para usar)

### ✅ Alta Prioridade
- Preload de recursos críticos (CSS, fontes, imagens)
- Lazy loading de imagens
- Minificação de CSS/JS (via Vite)

### ✅ Média Prioridade
- JavaScript modularizado (6 módulos ES6)
- Validação de formulários melhorada (tempo real, feedback visual)
- Service Worker (PWA completo)

### ✅ Baixa Prioridade
- Sistema de build (Vite configurado)
- Analytics (Google Analytics 4 / Plausible)

## 🌐 Navegadores Suportados

- Chrome (últimas versões)
- Firefox (últimas versões)
- Safari (últimas versões)
- Edge (últimas versões)

## 📄 Licença

Este projeto foi desenvolvido para a **Banda Racional Universo em Desencanto** - Cultura Racional.

---

**Desenvolvido com ❤️ para a Cultura Racional**

*Banda Racional Universo em Desencanto - Divulgando a música e a energia da Cultura Racional por todo o Brasil*
