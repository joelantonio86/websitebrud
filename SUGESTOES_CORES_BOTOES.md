# 🎨 Sugestões de Cores para Botões de Download

## 🎯 Paleta Atual do Site
- **Dourado**: #FFD700 (principal)
- **Azul Escuro**: #1E3A8A
- **Azul Médio**: #3B82F6
- **Branco**: #FFFFFF
- **Preto/Cinza**: #1F2937

## 💡 Opções de Cores Sugeridas

### Opção 1: **Elegante e Profissional** ✅ IMPLEMENTADA
- **PDF**: Cinza escuro (#374151 → #4B5563)
  - Neutro, profissional, combina com qualquer design
  - Não compete com as cores principais
  
- **Sibelius**: Roxo/Violeta (#7C3AED → #A78BFA)
  - Moderno, distinto, harmoniza com dourado
  - Cria contraste interessante

### Opção 2: **Tons Terrosos**
- **PDF**: Marrom/Caramelo (#92400E → #B45309)
  - Quente, acolhedor, complementa o dourado
  
- **Sibelius**: Verde Esmeralda (#059669 → #10B981)
  - Fresco, profissional, distinto

### Opção 3: **Tons Suaves**
- **PDF**: Laranja Suave (#EA580C → #F97316)
  - Complementa o dourado sem competir
  
- **Sibelius**: Azul Petróleo (#0D9488 → #14B8A6)
  - Harmoniza com o azul existente, mas mais suave

### Opção 4: **Alto Contraste**
- **PDF**: Preto/Cinza muito escuro (#111827 → #1F2937)
  - Máximo contraste, muito elegante
  
- **Sibelius**: Índigo profundo (#4F46E5 → #6366F1)
  - Rico, distinto, moderno

### Opção 5: **Cores Complementares**
- **PDF**: Coral/Rosa suave (#E11D48 → #F43F5E)
  - Suave, feminino, complementa dourado
  
- **Sibelius**: Ciano/Turquesa (#0891B2 → #06B6D4)
  - Fresco, moderno, distinto

## 🎨 Recomendação Final

**Opção 1 (IMPLEMENTADA)** é a melhor escolha porque:
- ✅ Harmoniza perfeitamente com a paleta existente
- ✅ Não compete com o dourado principal
- ✅ Cores distintas e fáceis de identificar
- ✅ Profissional e elegante
- ✅ Bom contraste para legibilidade

## 🔄 Como Alterar

Se quiser testar outras opções, edite o arquivo `styles-improvements.css` na seção:
```css
/* Cores específicas por tipo de arquivo */
.download-link-item.pr-pdf-link,
.download-link-item[href*=".pdf"] {
    background: linear-gradient(135deg, COR1 0%, COR2 100%);
}
```

## 📱 Considerações de Acessibilidade

Todas as opções mantêm:
- ✅ Contraste adequado (WCAG AA)
- ✅ Texto branco legível
- ✅ Estados hover distintos
- ✅ Feedback visual claro
