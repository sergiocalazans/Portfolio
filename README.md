# Portfólio Pessoal - Sérgio Calazans

Este é o repositório do meu portfólio pessoal, uma página web moderna e responsiva projetada para apresentar minhas habilidades, projetos e informações de contato. O site foi construído com foco em um design limpo, performance e boas práticas de desenvolvimento web.

## ▶️ Acesso

O projeto está hospedado e pode ser acessado através do seguinte link:

**[➡️ Visite o Portfólio aqui! ⬅️](https://portfolio-ten-lemon-23.vercel.app/)**

## ✨ Funcionalidades

O portfólio implementa diversas funcionalidades para criar uma experiência de usuário rica e dinâmica:

-   **Carregamento Dinâmico de Projetos:** Os projetos exibidos na página não são fixos no HTML. Eles são carregados de forma assíncrona a partir de um arquivo `projetos.json`, permitindo fácil atualização e manutenção sem a necessidade de alterar o código HTML.
-   **Categorização de Projetos:** Os projetos são organizados em três seções claras e distintas: **Acadêmicos**, **Pessoais** e **Profissionais**, facilitando a navegação do visitante.
-   **Design Totalmente Responsivo:** A interface se adapta perfeitamente a diferentes tamanhos de tela, desde desktops a dispositivos móveis, garantindo uma ótima experiência de visualização em qualquer dispositivo.
-   **Menu Hambúrguer Funcional:** Em telas menores, um menu "hambúrguer" animado, construído com JavaScript puro, oferece uma navegação intuitiva e fluida.
-   **Estilo Moderno (Glassmorphism):** O design utiliza o efeito de *glassmorphism* (vidro fosco) com `backdrop-filter`, além de um fundo gradiente animado, criando uma estética visualmente atraente e moderna.
-   **Integração com WhatsApp:** O formulário de contato utiliza JavaScript para capturar os dados do usuário e abrir uma conversa no WhatsApp com uma mensagem pré-formatada, agilizando o primeiro contato.
-   **Animações com CSS:** O site possui animações sutis em elementos como a foto de perfil (efeito de flutuação) e cards (efeito de *fade-in* e *hover*), melhorando a interatividade.

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído utilizando tecnologias web fundamentais, sem a necessidade de frameworks de front-end complexos.

-   **HTML5:** Para a estrutura semântica e acessível do conteúdo.
-   **CSS3:** Para toda a estilização, incluindo:
    -   **Flexbox** e **Grid Layout** para a organização dos componentes.
    -   **Variáveis CSS** (`:root`) para um tema de cores consistente e fácil de manter.
    -   **Animações** e **Transições** (`@keyframes`, `transition`) para os efeitos visuais.
    -   **Media Queries** para garantir a responsividade.
-   **JavaScript (ES6+):** Para toda a interatividade e lógica do site:
    -   **Manipulação do DOM** para criar e inserir os cards de projetos dinamicamente.
    -   **Fetch API** com `async/await` para consumir o arquivo `projetos.json`.
    -   **Event Listeners** para controlar o menu mobile e o formulário de contato.
-   **JSON:** Utilizado como um banco de dados leve para armazenar as informações dos projetos, separando os dados da apresentação.

## 📂 Estrutura do Projeto

O código está organizado de forma modular para facilitar a manutenção e escalabilidade.

```
.
├── 📄 index.html             # Arquivo principal com a estrutura da página
├── 📄 projetos.json           # Banco de dados com as informações dos projetos
├── 🧠 script.js               # Lógica de interatividade e carregamento de dados
├── 🎨 styles.css             # Arquivo CSS principal que importa os demais
├── 📁 css/                   # Pasta com os arquivos CSS modulares
│   ├── animations.css
│   ├── components.css
│   ├── navigation.css
│   ├── responsive.css
│   └── sections.css
└── 📁 img/                    # Pasta para imagens (ícones, banners, etc.)
```

-   **`index.html`**: Contém a estrutura base de todas as seções do portfólio.
-   **`script.js`**: Responsável pela funcionalidade do menu hambúrguer, pela lógica do formulário de contato e, principalmente, pelo carregamento e renderização dos projetos a partir do JSON.
-   **`projetos.json`**: Funciona como uma API local, armazenando os dados de cada projeto de forma estruturada.
-   **`css/`**: A pasta de estilos é modularizada, dividindo as responsabilidades: `navigation` para a barra de navegação, `sections` para o layout das seções, `components` para elementos reutilizáveis como cards, e assim por diante.
