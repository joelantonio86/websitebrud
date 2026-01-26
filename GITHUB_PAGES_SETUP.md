# 🚀 Configuração do GitHub Pages para Homologação

## 📋 Passo a Passo Completo

### 1️⃣ Criar Repositório no GitHub

1. Acesse: **https://github.com/new**
2. Preencha:
   - **Repository name**: `websitebrud` (ou outro nome)
   - **Description**: "Site oficial da Banda Racional - Cultura Racional"
   - **Visibilidade**: 
     - ⚠️ **PÚBLICO** (para GitHub Pages gratuito)
     - OU **PRIVADO** (requer GitHub Pro/Team para Pages)
   - ❌ **NÃO marque** "Initialize this repository with a README"
3. Clique em **"Create repository"**

### 2️⃣ Conectar Repositório Local ao GitHub

Execute no terminal (substitua `SEU_USUARIO` pelo seu username):

```bash
# Adicionar repositório remoto
git remote add origin https://github.com/SEU_USUARIO/websitebrud.git

# Renomear branch para main (padrão do GitHub)
git branch -M main

# Enviar código para GitHub
git push -u origin main
```

### 3️⃣ Ativar GitHub Pages

1. No GitHub, vá em: **Settings** → **Pages**
2. Em **Source**, selecione:
   - **Branch**: `main`
   - **Folder**: `/ (root)`
3. Clique em **Save**

### 4️⃣ Acessar o Site

Após alguns minutos, o site estará disponível em:
```
https://SEU_USUARIO.github.io/websitebrud/
```

## 🔐 Autenticação (se necessário)

Se pedir autenticação ao fazer push:

1. **Usuário**: Seu username do GitHub
2. **Senha**: Use um **Personal Access Token**

### Criar Personal Access Token:
1. GitHub → **Settings** → **Developer settings**
2. **Personal access tokens** → **Tokens (classic)**
3. **Generate new token (classic)**
4. Nome: "Website Banda Racional"
5. Escopos: Marque `repo` (acesso completo)
6. **Generate token**
7. **Copie o token** (só aparece uma vez!)
8. Use o token como senha ao fazer push

## 📝 Atualizar o Site

Sempre que fizer mudanças:

```bash
# Adicionar mudanças
git add .

# Fazer commit
git commit -m "Descrição das mudanças"

# Enviar para GitHub
git push
```

O GitHub Pages atualiza automaticamente em 1-2 minutos.

## ⚙️ Configurações Adicionais

### Custom Domain (Opcional)
Se quiser usar um domínio próprio:
1. GitHub → Settings → Pages
2. Adicione seu domínio em **Custom domain**
3. Configure DNS conforme instruções

### Branch de Homologação (Opcional)
Para ter uma versão separada para homologação:

```bash
# Criar branch de homologação
git checkout -b homologacao

# Fazer push da branch
git push -u origin homologacao
```

Depois configure GitHub Pages para usar a branch `homologacao`.

## ✅ Checklist

- [ ] Repositório criado no GitHub
- [ ] Código enviado (git push)
- [ ] GitHub Pages ativado
- [ ] Site acessível em https://SEU_USUARIO.github.io/websitebrud/
- [ ] Testado em diferentes navegadores
- [ ] Compartilhado link com presidente para homologação

## 🔗 Links Úteis

- GitHub Pages: https://pages.github.com/
- Documentação: https://docs.github.com/en/pages
