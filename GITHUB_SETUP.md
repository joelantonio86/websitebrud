# Guia para Enviar Projeto ao GitHub

## ✅ Passo 1: Criar Repositório no GitHub

1. Acesse: https://github.com/new
2. Preencha:
   - **Repository name**: `websitebrud` (ou outro nome de sua preferência)
   - **Description**: "Site oficial da Banda Racional - Cultura Racional"
   - **Visibilidade**: ⚠️ **PRIVATE** (Importante!)
   - ❌ **NÃO marque** "Initialize this repository with a README"
3. Clique em **"Create repository"**

## ✅ Passo 2: Conectar e Enviar

Após criar o repositório, execute os comandos abaixo no terminal (substitua `SEU_USUARIO` pelo seu usuário do GitHub):

```bash
# Adicionar o repositório remoto
git remote add origin https://github.com/SEU_USUARIO/websitebrud.git

# Verificar se está conectado
git remote -v

# Enviar para o GitHub
git branch -M main
git push -u origin main
```

## 🔐 Autenticação

Se solicitado, você precisará:
- **Usuário**: Seu username do GitHub
- **Senha**: Use um **Personal Access Token** (não sua senha normal)

### Como criar um Personal Access Token:
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token (classic)
3. Dê um nome e selecione escopos: `repo` (acesso completo a repositórios privados)
4. Copie o token gerado e use como senha

## 📝 Comandos Úteis

```bash
# Ver status
git status

# Adicionar mudanças
git add .

# Fazer commit
git commit -m "Descrição das mudanças"

# Enviar para GitHub
git push

# Ver histórico
git log --oneline
```

## ⚠️ Importante

- O repositório está configurado como **PRIVADO**
- Todos os arquivos foram commitados
- O `.gitignore` está configurado corretamente
