# 🎵 Banda Racional - Site Oficial

Site oficial da Banda Racional Universo em Desencanto desenvolvido com **React + TypeScript + Vite**.

## 🚀 Tecnologias

- **React 18** - Biblioteca JavaScript para interfaces
- **TypeScript** - Tipagem estática para JavaScript
- **Vite** - Build tool moderna e rápida
- **React Router** - Roteamento para aplicações React
- **CSS** - Estilos organizados por página e componente (design system, responsivo)

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── layout/         # Layout e PageHeader
│   ├── navigation/     # Navegação e menu (desktop e mobile)
│   ├── footer/         # Rodapé
│   ├── sections/       # Seções da página inicial (Hero, Sobre, MapBrasil, etc.)
│   ├── partituras/     # Widget de partituras
│   └── tour/           # Grid e modal de mídia (turnês)
├── pages/              # Páginas/rotas (Home, Repertório, Partituras, Eventos, etc.)
├── data/               # Dados (partituras, bandas, turnês, calendários, letras)
├── hooks/               # Custom hooks
├── styles/             # Estilos CSS globais e por página
├── types/               # Definições TypeScript
└── assets/              # Imagens e recursos estáticos
```

## 🛠️ Instalação

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview

# Verificar tipos TypeScript
npm run type-check

# Lint do código
npm run lint
```

## 🌐 Publicar no GitHub Pages

O site funciona no GitHub Pages. Passos:

1. **Ajuste o `base` no `vite.config.ts`**  
   Se o repositório for `websitebrud`, a URL será `https://seu-usuario.github.io/websitebrud/`. O `base` fica como `'/websitebrud/'` **somente** quando a variável de ambiente `GITHUB_PAGES=true` está definida no momento do build. Se o nome do repositório for outro, altere no `vite.config.ts` o valor usado quando `GITHUB_PAGES === 'true'`.

2. **Build para GitHub Pages**  
   É **obrigatório** definir `GITHUB_PAGES=true` antes do build, senão o `base` fica `/` e as rotas quebram no GitHub Pages.

   - **Windows (PowerShell):** `$env:GITHUB_PAGES='true'; npm run build:gh-pages`  
   - **Windows (CMD):** `set GITHUB_PAGES=true && npm run build:gh-pages`  
   - **Mac/Linux:** `GITHUB_PAGES=true npm run build:gh-pages`

   O script `build:gh-pages` faz o build e em seguida executa `scripts/copy-404.js`, que copia `index.html` para `404.html` (necessário para o SPA: ao acessar uma rota direta, o GitHub Pages serve o 404 e o React Router resolve a URL).

3. **Publicar a pasta `dist`**  
   - **GitHub Actions:** em **Settings → Pages → Source**, escolha **GitHub Actions** e use um workflow que rode o build com `GITHUB_PAGES=true` e publique a pasta `dist`.  
   - **Branch:** crie um branch `gh-pages`, faça o build com `GITHUB_PAGES=true`, copie o conteúdo de `dist` para a raiz desse branch e envie. Em **Settings → Pages** use **Deploy from a branch** e selecione o branch `gh-pages` e a pasta raiz.

## 📝 Path Aliases

O projeto usa path aliases (configurados no `vite.config.ts`) para imports mais limpos:

```typescript
import { PageHeader } from '@/components/layout';
import { Hero, Sobre, MapBrasil } from '@/components/sections';
import type { NavigationProps } from '@/types/navigation';
```

## ✅ Funcionalidades

- ✅ Menu hambúrguer e navegação responsiva (mobile e desktop)
- ✅ React Router com rotas para todas as páginas
- ✅ TypeScript em todo o projeto
- ✅ **Home:** Hero, Sobre, Mapa do Brasil (interativo), Destaques, Agenda
- ✅ **Repertório:** categorias em accordion, players de áudio, exportar PDF
- ✅ **Partituras:** busca, filtro por instrumento, abas por categoria, players MP3
- ✅ **Eventos:** histórico (turnês Europa 2019, Suécia 2017) e Eventos por todo Brasil (bandas por estado)
- ✅ **Calendários:** agenda BRUD 2026 e PDFs das bandas
- ✅ **Material de Apoio:** documentos, vídeos e áudios
- ✅ **Sibelius:** manuais para Computador, Android e iOS
- ✅ **Letras das Músicas:** busca e acordeão
- ✅ **Contato:** formulário
- ✅ Design system, safe areas e touch targets para mobile
- ✅ PWA (manifest, ícone)

## 🎯 Próximos Passos

1. Implementar testes (unitários e E2E)
2. Otimizar performance (lazy de rotas, imagens)
3. Ajustes de conteúdo e mídia conforme demanda

## 📄 Licença

MIT
