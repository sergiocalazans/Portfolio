# Portfólio Pessoal — Sérgio Calazans

Este repositório contém o meu portfólio pessoal, uma aplicação web moderna e responsiva desenvolvida para apresentar minha trajetória, habilidades técnicas, experiências e principais projetos.

O site foi construído com foco em organização, desempenho, responsividade e facilidade de manutenção, utilizando HTML, CSS e JavaScript puro, sem a necessidade de frameworks de front-end.

## ▶️ Acesso

O portfólio está publicado na Vercel e pode ser acessado pelo link abaixo:

**[➡️ Acessar o Portfólio](https://sergiocalazans.github.io/Portfolio/)**

## ✨ Funcionalidades

O portfólio possui funcionalidades voltadas à apresentação profissional e ao carregamento dinâmico de conteúdo.

### 🔄 Integração com o GitHub

Os projetos públicos são carregados automaticamente por meio da API REST do GitHub.

Para que um repositório seja exibido, ele precisa possuir:

* o tópico obrigatório `portfolio`;
* exatamente um tópico correspondente à categoria do projeto.

Os repositórios elegíveis são buscados, processados e inseridos automaticamente em suas respectivas seções.

### 📄 Projetos complementares pelo JSON

O arquivo `projetos.json` continua sendo utilizado para projetos que:

* não estão disponíveis no GitHub;
* pertencem a repositórios compartilhados;
* possuem repositórios privados;
* estão hospedados em plataformas externas;
* precisam de título, descrição, imagem ou links personalizados.

Os projetos cadastrados no JSON têm prioridade sobre os projetos carregados automaticamente, evitando duplicações e permitindo personalizações.

### 🗂️ Categorização de projetos

Os projetos são organizados nas seguintes categorias:

* **Acadêmico**
* **Análise de Dados**
* **Automação Web e RPA**
* **Banco de Dados**
* **Ciência de Dados**
* **Desenvolvimento Web**
* **Profissional**

As categorias que não possuem projetos são ocultadas automaticamente.

### 🖼️ Banners dos repositórios

Os projetos carregados pelo GitHub utilizam automaticamente o banner localizado no próprio repositório:

```text
img/banner.png
```

Quando o banner não é encontrado, o portfólio utiliza uma imagem padrão correspondente à categoria.

### 🎥 Apresentação em vídeo

A seção **Sobre Mim** possui um vídeo incorporado por meio de um `iframe`, permitindo uma apresentação mais dinâmica da minha trajetória, experiências e objetivos profissionais.

### 📱 Design responsivo

A interface se adapta a diferentes tamanhos de tela, oferecendo uma boa experiência de navegação em:

* computadores;
* notebooks;
* tablets;
* smartphones.

### 🍔 Menu mobile

Em telas menores, a navegação é transformada em um menu hambúrguer animado e acessível, controlado por JavaScript.

### 💬 Integração com WhatsApp

O formulário de contato captura o nome e a mensagem do visitante e abre uma conversa no WhatsApp com o conteúdo preenchido automaticamente.

### ✨ Estilo moderno

O portfólio utiliza recursos visuais como:

* efeito de *glassmorphism*;
* fundos com gradientes;
* sombras;
* bordas translúcidas;
* animações de entrada;
* efeitos de hover;
* transições suaves.

## 🛠️ Tecnologias utilizadas

O projeto foi desenvolvido utilizando tecnologias web fundamentais.

### HTML5

Responsável pela estrutura semântica das páginas e organização das seções.

Principais recursos utilizados:

* elementos semânticos;
* atributos de acessibilidade;
* formulários;
* navegação por âncoras;
* incorporação de vídeo com `iframe`.

### CSS3

Responsável por toda a identidade visual e responsividade.

Principais recursos utilizados:

* Flexbox;
* CSS Grid;
* variáveis CSS;
* `backdrop-filter`;
* animações com `@keyframes`;
* transições;
* pseudo-elementos;
* Media Queries;
* layout responsivo;
* efeito de *glassmorphism*.

### JavaScript ES6+

Responsável pela interatividade e pelo carregamento dinâmico dos projetos.

Principais recursos utilizados:

* manipulação do DOM;
* Fetch API;
* `async/await`;
* `Promise.allSettled`;
* integração com a API REST do GitHub;
* leitura do arquivo `projetos.json`;
* filtragem por tópicos;
* categorização automática;
* remoção de projetos duplicados;
* tratamento de erros;
* carregamento e fallback de imagens;
* Event Listeners;
* controle do menu mobile;
* integração com WhatsApp.

### JSON

Utilizado como fonte complementar de dados para projetos externos, privados ou compartilhados.

## 🔗 Regras para projetos do GitHub

Para que um repositório próprio seja exibido automaticamente, ele precisa ser público e possuir o tópico:

```text
portfolio
```

Também deve possuir exatamente um tópico de categoria:

```text
academic
data-analysis
automation
database
data-science
web-development
profissional
```

Exemplo de tópicos para um projeto de desenvolvimento web:

```text
portfolio
web-development
javascript
html
css
```

Exemplo para um projeto de Ciência de Dados:

```text
portfolio
data-science
python
pandas
scikit-learn
```

O tópico opcional abaixo pode ser utilizado para priorizar o projeto:

```text
destaque
```

Projetos com esse tópico são exibidos antes dos demais dentro da categoria.

## 🖼️ Estrutura esperada dos repositórios

Cada repositório exibido automaticamente deve possuir o banner no seguinte caminho:

```text
nome-do-repositorio/
├── img/
│   └── banner.png
├── README.md
└── arquivos-do-projeto
```

O nome do arquivo deve ser exatamente:

```text
banner.png
```

O GitHub diferencia letras maiúsculas e minúsculas. Portanto, nomes como `Banner.png` ou `banner.PNG` não serão reconhecidos pelo carregamento automático.

## 📄 Estrutura do `projetos.json`

Projetos externos ou compartilhados podem ser cadastrados no arquivo `projetos.json`.

Exemplo:

```json
{
  "id": "projeto-compartilhado",
  "categoria": "web-development",
  "titulo": "Projeto Compartilhado",
  "descricao": "Aplicação web desenvolvida em equipe.",
  "linkRepositorio": "https://github.com/organizacao/projeto",
  "linkAplicacao": "https://projeto.exemplo.com",
  "arquivo": "./img/banners/projeto.png",
  "repositorio": "organizacao/projeto",
  "origem": "github-compartilhado",
  "destaque": true
}
```

Para projetos sem repositório:

```json
{
  "id": "projeto-privado",
  "categoria": "profissional",
  "titulo": "Automação Interna",
  "descricao": "Automação desenvolvida para otimizar processos administrativos.",
  "linkRepositorio": "",
  "linkAplicacao": "",
  "arquivo": "./img/banners/automacao-interna.png",
  "repositorio": "",
  "origem": "privado",
  "destaque": false
}
```

## 📂 Estrutura do projeto

```text
.
├── index.html
├── projetos.json
├── script.js
├── styles.css
├── README.md
│
├── css/
│   ├── animations.css
│   ├── components.css
│   ├── navigation.css
│   ├── responsive.css
│   └── sections.css
│
└── img/
    ├── banners/
    └── icons/
```

### Arquivos principais

* **`index.html`**
  Contém a estrutura principal do portfólio, incluindo navegação, apresentação, tecnologias, categorias de projetos, vídeo e formulário de contato.

* **`script.js`**
  Responsável pela integração com a API do GitHub, leitura do JSON, categorização, criação dos cards, remoção de duplicações, carregamento de banners, menu mobile e integração com WhatsApp.

* **`projetos.json`**
  Armazena projetos complementares que não são carregados automaticamente pelo perfil do GitHub.

* **`styles.css`**
  Arquivo principal responsável por importar os módulos de estilização.

* **`css/navigation.css`**
  Estilos da barra de navegação e do menu mobile.

* **`css/sections.css`**
  Estilos das principais seções do portfólio.

* **`css/components.css`**
  Estilos dos cards, formulários, imagens, links e componentes reutilizáveis.

* **`css/animations.css`**
  Animações, transições e efeitos visuais.

* **`css/responsive.css`**
  Media Queries e ajustes de responsividade.

## 🚀 Execução local

Como o projeto utiliza `fetch()` para carregar o `projetos.json`, recomenda-se executá-lo por meio de um servidor local.

### Visual Studio Code com Live Server

1. Abra o projeto no Visual Studio Code.
2. Instale a extensão **Live Server**.
3. Clique com o botão direito no arquivo `index.html`.
4. Selecione **Open with Live Server**.

### Python

Também é possível iniciar um servidor local com Python:

```bash
python -m http.server 8000
```

Depois, acesse:

```text
http://localhost:8000
```

Abrir diretamente o arquivo `index.html` pelo explorador de arquivos pode impedir o carregamento do JSON devido às políticas de segurança do navegador.

## 🌐 Publicação

O portfólio está hospedado na Github Pages.

As atualizações enviadas para o repositório podem ser publicadas automaticamente conforme a configuração de integração entre GitHub e o Pages.

## 📌 Manutenção dos projetos

Para adicionar um novo projeto próprio ao portfólio:

1. Crie ou atualize o repositório público no GitHub.
2. Preencha a descrição do repositório.
3. Adicione o tópico `portfolio`.
4. Adicione exatamente um tópico de categoria.
5. Adicione os tópicos técnicos relevantes.
6. Crie o arquivo `img/banner.png`.
7. Preencha o campo **Website** do GitHub quando houver uma aplicação publicada.

Para projetos externos, privados ou compartilhados, adicione um novo objeto ao arquivo `projetos.json`.

## 👨‍💻 Autor

**Sérgio Calazans**

* GitHub: [github.com/sergiocalazans](https://github.com/sergiocalazans)
* LinkedIn: [linkedin.com/in/sergiocalazans](https://www.linkedin.com/in/sergiocalazans/)
* Portfólio: [sergiocalazans.github.io/Portfolio/](https://sergiocalazans.github.io/Portfolio/)
