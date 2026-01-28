# 📸 Guia de Atualização da Galeria

## Visão Geral

A galeria exibe fotos e vídeos das **24 bandas** da Cultura Racional, organizadas por cidade. O conteúdo é atualizado **todo domingo**.

## Estrutura de Dados

Os dados estão no arquivo `galeria-data.js`. Cada banda possui:

- **id**: Identificador único (ex: `bh-mg`)
- **nome**: Nome completo da banda
- **cidade**: Nome da cidade
- **estado**: Sigla do estado
- **fotos**: Array de objetos com:
  - `url`: URL da imagem (Cloudflare)
  - `titulo`: Título da foto
  - `tipo`: `'apresentacao'` ou `'ensaio'`
  - `data`: Data no formato `YYYY-MM-DD`
- **videos**: Array de objetos com:
  - `id`: ID do vídeo do YouTube
  - `titulo`: Título do vídeo
  - `tipo`: `'apresentacao'` ou `'ensaio'`
  - `data`: Data no formato `YYYY-MM-DD`

## Como Atualizar

### 1. Adicionar Fotos

As fotos devem ser hospedadas no **Cloudflare**. Para adicionar uma nova foto:

```javascript
fotos: [
    {
        url: 'https://seu-dominio.cloudflare.com/caminho/foto.jpg',
        titulo: 'Apresentação Dominical',
        tipo: 'apresentacao', // ou 'ensaio'
        data: '2026-01-28' // Data do evento
    }
]
```

### 2. Adicionar Vídeos

Os vídeos devem estar no **YouTube**. Para adicionar um novo vídeo:

1. Obtenha o ID do vídeo do YouTube (ex: `dQw4w9WgXcQ` da URL `https://www.youtube.com/watch?v=dQw4w9WgXcQ`)
2. Adicione ao array `videos`:

```javascript
videos: [
    {
        id: 'dQw4w9WgXcQ', // ID do YouTube
        titulo: 'Apresentação Dominical',
        tipo: 'apresentacao', // ou 'ensaio'
        data: '2026-01-28' // Data do evento
    }
]
```

### 3. Atualizar Data da Última Atualização

Sempre que atualizar o conteúdo, altere a data:

```javascript
ultimaAtualizacao: '2026-01-28'
```

## Exemplo Completo

```javascript
{
    id: 'bh-mg',
    nome: 'Banda Racional em Belo Horizonte',
    cidade: 'Belo Horizonte',
    estado: 'MG',
    fotos: [
        {
            url: 'https://exemplo.cloudflare.com/bh/apresentacao-2026-01-28.jpg',
            titulo: 'Apresentação Dominical',
            tipo: 'apresentacao',
            data: '2026-01-28'
        },
        {
            url: 'https://exemplo.cloudflare.com/bh/ensaio-2026-01-27.jpg',
            titulo: 'Ensaio Semanal',
            tipo: 'ensaio',
            data: '2026-01-27'
        }
    ],
    videos: [
        {
            id: 'VIDEO_ID_YOUTUBE',
            titulo: 'Apresentação Completa',
            tipo: 'apresentacao',
            data: '2026-01-28'
        }
    ]
}
```

## Funcionalidades

### Filtros

- **Filtro por Banda**: Permite visualizar conteúdo de uma banda específica ou todas
- **Filtro por Tipo**: Permite filtrar por "Apresentações" ou "Ensaios"

### Visualização

- **Fotos**: Clique para abrir em lightbox (tela cheia)
- **Vídeos**: Clique para abrir player do YouTube integrado

### Responsividade

A galeria é totalmente responsiva e funciona em:
- Desktop
- Tablet
- Mobile

## Lista das 24 Bandas

1. Belo Horizonte - MG
2. Juiz de Fora - MG
3. Curitiba - PR
4. Joinville - SC
5. São Paulo - SP
6. Rio de Janeiro - RJ
7. Porto Alegre - RS
8. Salvador - BA
9. Brasília - DF
10. Fortaleza - CE
11. Recife - PE
12. Manaus - AM
13. Belém - PA
14. Goiânia - GO
15. Campinas - SP
16. Vitória - ES
17. Florianópolis - SC
18. Natal - RN
19. João Pessoa - PB
20. Aracaju - SE
21. Maceió - AL
22. Teresina - PI
23. São Luís - MA
24. Cuiabá - MT

## Dicas

- Mantenha os nomes das cidades consistentes
- Use datas no formato correto (`YYYY-MM-DD`)
- Organize as fotos por data (mais recentes primeiro)
- Verifique se as URLs das imagens estão acessíveis antes de publicar
- Teste os IDs dos vídeos do YouTube antes de adicionar

## Suporte

Em caso de dúvidas ou problemas, verifique:
1. Se o arquivo `galeria-data.js` está com a sintaxe correta
2. Se as URLs das imagens estão acessíveis
3. Se os IDs dos vídeos do YouTube estão corretos
4. Se a data está no formato correto
