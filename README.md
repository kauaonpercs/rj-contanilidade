# RJ Contabilidade — Landing Page

Site institucional profissional para RJ Contabilidade, escritório de contabilidade em Catalão/GO.

## Características

- **Design Moderno & Dark**: Paleta de cores com verde profissional e fundos escuros para máximo contraste
- **Responsivo**: Totalmente adaptado para mobile, tablet e desktop
- **Formulário com Upload**: Formulário de contato com suporte para upload de documentos (PDF, DOC, DOCX, PNG, JPG)
- **Animações Suaves**: Gradiente dinâmico de fundo que muda conforme o usuário rola a página
- **Acessibilidade**: Keyboard navigation, ARIA labels e focus states
- **Sem Dependências Pesadas**: HTML5, CSS (Tailwind CDN), Vanilla JavaScript

## Estrutura

```
.
├── index.html          # Main page
├── styles.css          # Custom brand styles
├── script.js           # Interactions (menu, FAQ, form, scroll gradient)
├── robots.txt          # SEO
├── sitemap.xml         # SEO
└── README.md          # This file
```

## Cores da Paleta

- **Fundo Principal**: `#020202`
- **Verde Primário**: `#3F7A43`
- **Verde Escuro**: `#2E5C33`
- **Neon**: `#2EDB48`
- **Texto Principal**: `#FFFFFF`
- **Texto Secundário**: `#CFCFCF`

## Como Usar Localmente

### Opção 1: Python (mais rápido)

```bash
cd c:\Users\sukita\Downloads\landing-pro-html-css-js
python -m http.server 8000
```

Abra `http://localhost:8000` no navegador.

### Opção 2: Node.js

```bash
# Instale http-server globalmente
npm install -g http-server

# Na pasta do projeto
http-server -p 8000
```

## Como Fazer Upload para GitHub

### 1. Instale Git

- **Windows**: Baixe em [git-scm.com](https://git-scm.com/download/win)
- **Mac**: `brew install git`
- **Linux**: `sudo apt install git`

### 2. Configure Git (primeira vez)

```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"
```

### 3. Crie um Repositório no GitHub

1. Acesse [github.com](https://github.com)
2. Faça login ou crie uma conta
3. Clique em **+ → New repository**
4. Nome: `rj-contabilidade` (ou o que preferir)
5. Clique em **Create repository**

### 4. Faça Push do Seu Código

Na pasta do projeto, execute:

```bash
git init
git add .
git commit -m "Initial commit: RJ Contabilidade landing page"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/rj-contabilidade.git
git push -u origin main
```

> **Nota**: Substitua `SEU_USUARIO` pelo seu usuário do GitHub.

### 5. Implante Gratuitamente (Vercel ou Netlify)

Após fazer push no GitHub:

**Vercel:**
1. Acesse [vercel.com](https://vercel.com)
2. Clique em **New Project**
3. Conecte seu repositório GitHub
4. Deploy automático

**Netlify:**
1. Acesse [netlify.com](https://netlify.com)
2. Clique em **New site from Git**
3. Conecte seu repositório GitHub
4. Deploy automático

## Funcionalidades Implementadas

✅ Hero com headline e CTA  
✅ Seção de Serviços (6 cards)  
✅ Regimes Tributários (3 cards)  
✅ Seção Institucional (Missão, Equipe, Localização)  
✅ FAQ (6 perguntas com accordion)  
✅ CTA Final com Orçamento  
✅ Formulário de Contato com Upload de Documentos  
✅ Footer com Info de Contato  
✅ Gradiente de Fundo Dinâmico ao Rolar  
✅ Menu Mobile Responsivo  

## Contato

**RJ Contabilidade**  
Rua 26, Nº 07  
Catalão, GO — 75706-360  
Brasil

📧 contato@rjcontabilidade.com.br  
📞 (64) 9999-9999

---

**Desenvolvido com ❤️ — 2026**
