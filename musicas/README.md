# Pasta de Músicas

Coloque aqui todos os arquivos de áudio das músicas da banda.

## Formato Recomendado

- **Formato**: MP3 (compatível com todos os navegadores)
- **Qualidade**: 128kbps ou superior
- **Duração**: Mantenha os arquivos originais

## Estrutura Sugerida

```
musicas/
├── apoteose-racional.mp3
├── marcha-racional.mp3
├── hino-cultura-racional.mp3
└── ...
```

## Nomenclatura

Use nomes descritivos e consistentes:
- Use hífens ao invés de espaços
- Use letras minúsculas
- Exemplo: `apoteose-racional.mp3`

## Atualização no HTML

Quando adicionar uma nova música, atualize o HTML:

```html
<audio controls class="audio-player">
    <source src="musicas/nome-da-musica.mp3" type="audio/mpeg">
</audio>
```

## Otimização

Para melhor performance:
- Comprima os arquivos de áudio quando possível
- Use formatos modernos como WebM para melhor compressão (opcional)
- Mantenha arquivos com tamanho razoável
