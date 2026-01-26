# Banda Racional - Site Oficial

Site moderno e profissional da **Banda Racional** da Cultura Racional. Uma evolução completa do site original com design moderno, mantendo a essência e identidade visual da Cultura Racional.

## 🎵 Sobre o Projeto

Este projeto é uma evolução do site www.bandaracional.com.br, desenvolvido com:
- Design moderno e profissional
- Identidade visual da Cultura Racional (cores dourado/amarelo e azul)
- Todas as funcionalidades do site original
- Interface responsiva e otimizada

## ✨ Características

- **Design Moderno**: Interface elegante com cores da Cultura Racional (dourado e azul)
- **Totalmente Responsivo**: Funciona perfeitamente em todos os dispositivos
- **Navegação Suave**: Scroll suave entre seções
- **Animações Interativas**: Elementos animados ao rolar a página
- **Repertório Completo**: Músicas com player de áudio e partituras para download
- **Agenda de Shows**: Próximas apresentações da banda
- **Galeria de Fotos**: Momentos especiais da banda
- **Formulário de Contato**: Sistema de contato funcional
- **Filtros de Músicas**: Filtro por categoria (Hinos, Marchas, Outras)
- **Performance Otimizada**: Carregamento rápido e eficiente

## 📁 Estrutura do Projeto

```
websitebrud/
├── index.html          # Página principal
├── styles.css          # Estilos com cores da Cultura Racional
├── script.js           # Funcionalidades JavaScript
├── README.md          # Documentação
├── images/            # Pasta para imagens
│   └── README.md      # Guia de imagens
└── .gitignore        # Arquivos ignorados pelo Git
```

## 🎨 Cores da Cultura Racional

O site utiliza a paleta de cores oficial da Cultura Racional:

- **Dourado/Amarelo** (#FFD700): Cor principal, representa a luz e elevação
- **Azul** (#1E3A8A): Cor secundária, representa a espiritualidade
- **Branco** (#FFFFFF): Textos e elementos claros
- **Preto** (#000000): Contraste e profundidade

## 🚀 Como Usar

1. Abra o arquivo `index.html` em seu navegador
2. Ou use um servidor local:
   ```bash
   # Com Python
   python -m http.server 8000
   
   # Com Node.js (http-server)
   npx http-server
   ```

## 📋 Seções do Site

### 1. Hero (Início)
Seção inicial impactante com título da banda e call-to-action

### 2. Sobre
- História da Banda Racional
- Missão e valores
- Estatísticas animadas (Estados, Shows, Músicas, Músicos)

### 3. Repertório
- Player de áudio para cada música
- Partituras para download (Fuzileiro, Atabaque, Caixa, Surdo)
- Filtros por categoria (Hinos, Marchas, Outras)
- Botão para baixar todas as partituras

### 4. Agenda
- Próximos shows da banda
- Informações de data, local e horário
- Descrição dos eventos

### 5. Galeria
- Fotos da banda em apresentações
- Efeito hover com overlay
- Grid responsivo

### 6. Contato
- Formulário de contato completo
- Informações de contato (Email, Telefone, WhatsApp)
- Links para redes sociais
- Validação de formulário

## 🛠️ Personalização

### Adicionar Músicas
Para adicionar novas músicas, edite a seção de repertório no `index.html`:

```html
<div class="musica-card" data-category="hinos">
    <!-- Conteúdo da música -->
</div>
```

### Adicionar Shows
Adicione novos shows na seção de agenda:

```html
<div class="show-card">
    <!-- Informações do show -->
</div>
```

### Personalizar Cores
As cores podem ser ajustadas no arquivo `styles.css` através das variáveis CSS:

```css
:root {
    --primary-gold: #FFD700;
    --primary-blue: #1E3A8A;
    /* ... */
}
```

### Adicionar Imagens
1. Coloque suas imagens na pasta `images/`
2. Substitua os placeholders no HTML:
   ```html
   <img src="images/sua-imagem.jpg" alt="Descrição">
   ```

## 📱 Responsividade

O site é totalmente responsivo e se adapta a:
- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)
- **Mobile** (até 767px)

## 🌐 Navegadores Suportados

- Chrome (últimas versões)
- Firefox (últimas versões)
- Safari (últimas versões)
- Edge (últimas versões)

## 📝 Funcionalidades Implementadas

✅ Design com cores da Cultura Racional
✅ Navegação fixa com efeito de scroll
✅ Animações ao rolar a página
✅ Contadores animados nas estatísticas
✅ Menu hambúrguer para mobile
✅ Player de áudio para músicas
✅ Sistema de download de partituras
✅ Filtros de músicas por categoria
✅ Formulário de contato com validação
✅ Galeria com efeito hover
✅ Links para redes sociais
✅ Performance otimizada
✅ SEO otimizado

## 🔄 Próximos Passos

1. Adicionar imagens reais da banda
2. Adicionar arquivos de áudio reais
3. Adicionar arquivos PDF das partituras
4. Integrar formulário com backend
5. Adicionar mais músicas ao repertório
6. Implementar lightbox para galeria
7. Adicionar sistema de newsletter
8. Integrar com APIs de redes sociais

## 📄 Licença

Este projeto foi desenvolvido para a Banda Racional - Cultura Racional.

## 👨‍💻 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Estilos modernos com variáveis CSS, Grid e Flexbox
- **JavaScript (Vanilla)**: Interatividade sem dependências
- **Font Awesome**: Ícones
- **Google Fonts**: Tipografia (Poppins e Playfair Display)

## 🎯 Cultura Racional

> "A verdadeira origem de tudo e de todos"

Este site foi desenvolvido com dedicação para divulgar a música e os ensinamentos da Cultura Racional através da Banda Racional.

---

**Desenvolvido com ❤️ para a Cultura Racional**
