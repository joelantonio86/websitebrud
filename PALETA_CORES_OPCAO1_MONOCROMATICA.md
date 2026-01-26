# Paleta de Cores - Opção 1: Monocromática Azul

Este arquivo contém as cores alternativas para implementar a **Opção 1: Monocromática Azul** na página de partituras.

## Como usar:
1. Substitua as cores nos arquivos CSS conforme indicado abaixo
2. Ou crie um arquivo CSS alternativo com essas cores

## Paleta de Cores - Opção 1

### Cores Principais (Monocromática Azul)
- **Azul Escuro**: `#1E3A8A` - Títulos, bordas importantes
- **Azul Médio**: `#3B82F6` - Botões principais, ações
- **Azul Claro**: `#60A5FA` - Fundos, hovers suaves
- **Azul Muito Claro**: `#DBEAFE` - Fundos de destaque
- **Neutros**: `#FFFFFF` (branco), `#F9FAFB` (cinza claro)

### Substituições Necessárias

#### 1. Botões PDF (em `styles-improvements.css` e `styles-partituras-ultra-modern.css`)
```css
/* PDF - Azul Médio */
.download-link-item.pr-pdf-link,
.download-link-item[href*=".pdf"] {
    background: linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%);
    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
}

.download-link-item.pr-pdf-link:hover,
.download-link-item[href*=".pdf"]:hover {
    background: linear-gradient(135deg, #2563EB 0%, #3B82F6 100%);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}
```

#### 2. Botões SIB/Sibelius
```css
/* Sibelius - Azul Claro */
.download-link-item[href*=".sib"],
.download-link-item[href*="Sibelius"],
.sibelius-btn {
    background: linear-gradient(135deg, #60A5FA 0%, #93C5FD 100%);
    box-shadow: 0 2px 8px rgba(96, 165, 250, 0.3);
}

.download-link-item[href*=".sib"]:hover,
.download-link-item[href*="Sibelius"]:hover,
.sibelius-btn:hover {
    background: linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%);
    box-shadow: 0 4px 12px rgba(96, 165, 250, 0.4);
}
```

#### 3. Filtros de Categoria (manter amarelo ou trocar por azul)
```css
/* Opção: Trocar amarelo por azul nos filtros */
.category-filter-btn.active {
    background: linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%);
    color: #ffffff;
    border-color: #3B82F6;
}

.category-filter-btn:hover {
    border-color: #3B82F6;
}
```

## Vantagens da Opção 1
- ✅ Visual mais limpo e minimalista
- ✅ Extremamente profissional
- ✅ Consistência total de cores
- ✅ Menos distrações visuais

## Desvantagens
- ⚠️ Menos destaque para elementos específicos
- ⚠️ Pode parecer monótono para alguns usuários
- ⚠️ Menos diferenciação entre tipos de arquivo

## Status Atual
- **Ativa**: Opção 2 (Azul + Acentos Sutis)
- **Disponível**: Esta Opção 1 (Monocromática Azul)
