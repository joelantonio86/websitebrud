# Guia de Tipografia - Banda Racional

## 📋 Visão Geral

Este documento define o sistema de tipografia padronizado para o site da Banda Racional, garantindo consistência visual e profissionalismo em todas as páginas.

---

## 🎨 Fontes Utilizadas

### 1. Fonte Principal (Corpo de Texto)
**Poppins** - Sans-serif

- **Uso**: Corpo de texto, botões, navegação, formulários, descrições
- **Características**: Moderna, legível, profissional
- **Fallback**: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`

**Variável CSS**: `var(--font-primary)`

### 2. Fonte de Títulos
**Playfair Display** - Serif

- **Uso**: Títulos principais, hero, seções, headings importantes
- **Características**: Elegante, impactante, clássica
- **Fallback**: `Georgia, 'Times New Roman', serif`

**Variável CSS**: `var(--font-heading)`

---

## 📏 Escala Tipográfica

### Tamanhos de Fonte Padronizados

| Variável | Tamanho | Uso |
|----------|---------|-----|
| `--font-size-xs` | 0.75rem (12px) | Textos muito pequenos, labels |
| `--font-size-sm` | 0.875rem (14px) | Textos pequenos, badges |
| `--font-size-base` | 1rem (16px) | Texto padrão do corpo |
| `--font-size-lg` | 1.125rem (18px) | Textos destacados |
| `--font-size-xl` | 1.25rem (20px) | Subtítulos pequenos |
| `--font-size-2xl` | 1.5rem (24px) | Subtítulos médios |
| `--font-size-3xl` | 1.875rem (30px) | Títulos de seção pequenos |
| `--font-size-4xl` | 2.25rem (36px) | Títulos de seção médios |
| `--font-size-5xl` | 3rem (48px) | Títulos de seção grandes |
| `--font-size-6xl` | 3.75rem (60px) | Títulos muito grandes |
| `--font-size-hero` | 4.5rem (72px) | Título do Hero |

---

## ⚖️ Pesos de Fonte

| Variável | Peso | Uso |
|----------|------|-----|
| `--font-weight-light` | 300 | Textos leves, secundários |
| `--font-weight-normal` | 400 | Texto padrão |
| `--font-weight-medium` | 500 | Textos médios |
| `--font-weight-semibold` | 600 | Destaques, botões |
| `--font-weight-bold` | 700 | Títulos secundários |
| `--font-weight-extrabold` | 800 | Títulos principais |

---

## 📐 Line Heights (Altura de Linha)

| Variável | Valor | Uso |
|----------|-------|-----|
| `--line-height-tight` | 1.2 | Títulos grandes |
| `--line-height-normal` | 1.5 | Textos curtos |
| `--line-height-relaxed` | 1.7 | Corpo de texto padrão |
| `--line-height-loose` | 2 | Textos longos, parágrafos |

---

## 🔤 Letter Spacing (Espaçamento entre Letras)

| Variável | Valor | Uso |
|----------|-------|-----|
| `--letter-spacing-tight` | -0.02em | Títulos grandes |
| `--letter-spacing-normal` | 0 | Texto padrão |
| `--letter-spacing-wide` | 0.1em | Títulos em caixa alta |
| `--letter-spacing-wider` | 0.5px | Badges, labels |

---

## 📝 Regras de Uso

### ✅ CORRETO - Use Variáveis CSS

```css
/* ✅ CORRETO */
.titulo {
    font-family: var(--font-heading);
    font-size: var(--font-size-5xl);
    font-weight: var(--font-weight-extrabold);
    line-height: var(--line-height-tight);
}

.texto {
    font-family: var(--font-primary);
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-normal);
    line-height: var(--line-height-relaxed);
}
```

### ❌ INCORRETO - Não Use Valores Hardcoded

```css
/* ❌ INCORRETO */
.titulo {
    font-family: 'Playfair Display', serif;
    font-size: 3.5rem;
    font-weight: 800;
}

.texto {
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    font-weight: 400;
}
```

---

## 🎯 Hierarquia Tipográfica

### Nível 1 - Hero Title
```css
.hero-title {
    font-family: var(--font-heading);
    font-size: var(--font-size-hero);
    font-weight: var(--font-weight-extrabold);
    line-height: var(--line-height-tight);
}
```

### Nível 2 - Section Titles
```css
.section-title {
    font-family: var(--font-heading);
    font-size: var(--font-size-5xl);
    font-weight: var(--font-weight-extrabold);
    letter-spacing: var(--letter-spacing-tight);
}
```

### Nível 3 - Page Titles
```css
.page-title {
    font-family: var(--font-heading);
    font-size: var(--font-size-5xl);
    font-weight: var(--font-weight-extrabold);
}
```

### Nível 4 - Card Titles
```css
.card-title {
    font-family: var(--font-heading);
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-bold);
}
```

### Nível 5 - Body Text
```css
.body-text {
    font-family: var(--font-primary);
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-normal);
    line-height: var(--line-height-relaxed);
}
```

### Nível 6 - Small Text
```css
.small-text {
    font-family: var(--font-primary);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-normal);
}
```

---

## 📱 Responsividade

### Desktop (> 1024px)
- Hero Title: `4.5rem` (72px)
- Section Title: `3rem` (48px)
- Body Text: `1rem` (16px)

### Tablet (768px - 1024px)
- Hero Title: `3.5rem` (56px)
- Section Title: `2.5rem` (40px)
- Body Text: `1rem` (16px)

### Mobile (< 768px)
- Hero Title: `2.5rem` (40px)
- Section Title: `2rem` (32px)
- Body Text: `0.95rem` (15px)

---

## 🔍 Verificação de Consistência

### Checklist para Novos Componentes

- [ ] Usa variáveis CSS (`var(--font-primary)` ou `var(--font-heading)`)
- [ ] Não usa valores hardcoded de fonte
- [ ] Segue a hierarquia tipográfica definida
- [ ] Line-height apropriado para o tamanho
- [ ] Responsivo em diferentes breakpoints
- [ ] Contraste adequado para acessibilidade

---

## 📚 Exemplos Práticos

### Botão
```css
.btn {
    font-family: var(--font-primary);
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-semibold);
    letter-spacing: var(--letter-spacing-normal);
}
```

### Navegação
```css
.nav-link {
    font-family: var(--font-primary);
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-medium);
}
```

### Badge
```css
.badge {
    font-family: var(--font-primary);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-semibold);
    letter-spacing: var(--letter-spacing-wider);
    text-transform: uppercase;
}
```

### Formulário
```css
.form-input {
    font-family: var(--font-primary);
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-normal);
}
```

---

## 🎨 Paleta de Tipografia

### Cores de Texto

- **Texto Principal**: `var(--text-primary)` - #1F2937
- **Texto Secundário**: `var(--text-secondary)` - #4B5563
- **Texto Dourado**: `var(--text-gold)` - #FFD700
- **Texto Branco**: `var(--white)` - #FFFFFF
- **Texto Preto**: `var(--black)` - #000000

---

## 📖 Referências

- **Poppins**: [Google Fonts](https://fonts.google.com/specimen/Poppins)
- **Playfair Display**: [Google Fonts](https://fonts.google.com/specimen/Playfair+Display)
- **Material Design Typography**: [Material Design](https://material.io/design/typography/the-type-system.html)
- **WCAG Accessibility**: [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/?versions=2.1)

---

## 🔄 Atualizações

**Última atualização**: 2026-01-XX
**Versão**: 1.0.0

---

## 📞 Suporte

Para dúvidas sobre tipografia, consulte este guia ou entre em contato com a equipe de desenvolvimento.

---

**Nota**: Este guia deve ser seguido rigorosamente para manter a consistência visual do site da Banda Racional.
