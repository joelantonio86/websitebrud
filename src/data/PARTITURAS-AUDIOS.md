# Onde alterar os áudios das partituras

Os players de áudio na página **Partituras** aparecem **somente** para os instrumentos configurados no array `MP3_POR_PASTA`.

## Arquivo a editar

**`src/data/partituras-config.ts`**

### 1. Áudios por instrumento (cada música)

Objeto **`MP3_POR_PASTA`** (por volta da linha 65):

- Cada **chave** é o código da música (ex: `r01`, `r02`, `a10`, `d17`).
- Cada **valor** é a lista de chaves de instrumento que têm MP3 (ex: `['atabaque', 'caixa', 'lirac', 'surdo']`).

**Para adicionar áudio de um instrumento em uma música já existente:**  
Inclua a chave do instrumento no array da pasta. Exemplo: em `r01` já existe `['atabaque', 'caixa', 'lirac', 'surdo']`; para incluir o áudio de "Prato", adicione `'prato'` ao array.

**Para uma música nova (ex: r38):**  
Crie uma nova entrada no objeto, por exemplo:

```ts
r38: ['atabaque', 'caixa', 'surdo', 'lirac', 'saxaltoeb', 'saxsopranobb', ...],
```

**Chaves de instrumento válidas:**  
`fuzileiro`, `atabaque`, `caixa`, `surdo`, `prato`, `lirac`, `flautimc`, `saxaltoeb`, `saxsopranobb`, `clarinetebb`, `saxtenorbb`, `trompetebb`, `trompetec`, `trompabb`, `trombonebb`, `trombonec`, `bombardinobb`, `trombonebaixoc`, `tubabb`, `tubaeb`

### 2. MP3 da música completa (mix)

Se a música tiver um arquivo de **música completa** (ex: `r01.mp3`), a pasta precisa estar na lista **`PASTAS_COM_MP3_FULL`** (por volta da linha 46).  
Para uma música nova com mix, adicione o código da pasta nesse array (ex: `'r38'`).

---

Depois de alterar `partituras-config.ts`, salve o arquivo. Em desenvolvimento, a página atualiza sozinha; em produção, é preciso gerar o build de novo.
