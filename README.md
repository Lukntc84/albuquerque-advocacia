# Albuquerque Advocacia

Site institucional de um escritório de advocacia fictício, feito como peça de portfólio.

Design e código por **Luccas Santana**.

## O que tem no site

- Vídeo de fundo no topo, com texto em HTML e CSS por cima
- Cabeçalho fixo e menu próprio para celular
- Áreas de atuação com o "primeiro passo" de cada caso (cartão que segue o cursor no computador)
- Seção "Como trabalhamos" com vídeo e balões que deslizam sozinhos e podem ser arrastados
- Perguntas frequentes em acordeão
- Formulário com validação, máscara de telefone, opção de urgência e consentimento LGPD
- Botão de WhatsApp, barra de contato no celular e botão de voltar ao topo
- Respeita a preferência de movimento reduzido e o modo de economia de dados

## Tecnologia

HTML, CSS e JavaScript puros, sem dependências nem etapa de build.

```
index.html
assets/css/style.css
assets/js/main.js
assets/img/
assets/video/
```

## Rodar localmente

```bash
python -m http.server 8000
```

Depois abra `http://localhost:8000`.

## Observações

- Todos os nomes, telefones, e-mails, endereço e número de OAB são fictícios.
- O envio do formulário é simulado. Para receber mensagens de verdade, troque o trecho indicado em `assets/js/main.js` por uma chamada a um serviço como Formspree ou EmailJS.
