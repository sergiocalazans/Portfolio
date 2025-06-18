// Função chamada pelo evento 'onsubmit' do formulário de contato.
function enviarMsg(event){
    // Previne o comportamento padrão do formulário, que é recarregar a página.
    event.preventDefault();

    // Obtém o valor (texto) digitado no campo com o id 'nome'.
    const nome = document.getElementById('nome').value;
    // Obtém o valor (texto) digitado no campo com o id 'mensagem'.
    const mensagem = document.getElementById('mensagem').value;
    // Define o número de telefone de destino do WhatsApp. Formato: [código do país][DDD][número].
    const contato = '5541996678019';

    // Cria a mensagem final usando um template string para combinar os textos.
    const texto = `Olá! Meu nome é ${nome}, ${mensagem}`;
    // Codifica a mensagem para que possa ser usada com segurança em uma URL (converte espaços, acentos, etc.).
    const msgFormatada = encodeURIComponent(texto);

    // Monta a URL final do WhatsApp com o número de contato e a mensagem formatada.
    const url = `https://wa.me/${contato}?text=${msgFormatada}`;

    // Abre a URL do WhatsApp em uma nova aba do navegador.
    window.open(url, '_blank');
}

// =======================================================
// SEÇÃO DE CARREGAMENTO DINÂMICO DE PROJETOS
// =======================================================

// 1. Função assíncrona para buscar os dados do arquivo projetos.json.
async function fetchProjetos() {
  // Faz uma requisição de rede para o arquivo 'projetos.json'. 'await' pausa a execução até a resposta chegar.
  const res = await fetch('projetos.json');
  // Verifica se a requisição foi bem-sucedida (ex: status 200). Se não, lança um erro.
  if (!res.ok) throw new Error('Falha ao carregar projetos.json');
  // Converte a resposta em um objeto JavaScript (JSON) e a retorna.
  return res.json();
}

// 2. Objeto para mapear o nome da categoria do JSON para o ID do contêiner no HTML.
const mapaCategorias = {
  "Profissional": "projetos-profissionais",
  "Pessoal": "projetos-pessoais",
  "Academico": "projetos-academicos"
};

// 3. Função que cria um elemento de card HTML para um único projeto.
function criarCard(proj) {
  // Cria o elemento <div> principal do card.
  const card = document.createElement('div');
  // Atribui a ele a classe CSS 'projetos-card' para estilização.
  card.className = 'projetos-card';

  // Cria o elemento de imagem (<img>).
  const img = document.createElement('img');
  // Define o caminho da imagem a partir dos dados do projeto.
  img.src = proj.img;
  // Define o texto alternativo da imagem para acessibilidade.
  img.alt = proj.titulo;
  // Atribui a classe 'projetos-imagem' para estilização.
  img.className = 'projetos-imagem';
  // Anexa a imagem como filha do card.
  card.appendChild(img);

  // Cria a <div> que conterá os textos do card.
  const box = document.createElement('div');
  // Atribui a classe 'caixa-textos-projetos'.
  box.className = 'caixa-textos-projetos';

  // Cria o elemento de título <h3>.
  const h3 = document.createElement('h3');
  // Atribui a classe 'info-projetos'.
  h3.className = 'info-projetos';
  // Define o texto do título a partir dos dados do projeto.
  h3.textContent = proj.titulo;

  // Cria o elemento de parágrafo <p>.
  const p = document.createElement('p');
  // Atribui a classe 'p-projetos'.
  p.className = 'p-projetos';
  // Define o texto da descrição a partir dos dados do projeto.
  p.textContent = proj.descricao;

  // Anexa o título e o parágrafo à caixa de textos.
  box.appendChild(h3);
  box.appendChild(p);

  // Verifica se o objeto do projeto possui uma URL de site.
  if (proj.site) {
    // Se tiver, cria um elemento de link <a>.
    const linkTexto = document.createElement('a');
    // Define o destino do link.
    linkTexto.href = proj.site;
    // Faz o link abrir em uma nova aba.
    linkTexto.target = '_blank';
    // Adiciona atributos de segurança para links que abrem em nova aba.
    linkTexto.rel = 'noopener noreferrer';
    // Atribui uma classe para estilização.
    linkTexto.className = 'link-projeto';
    // Define o texto visível do link.
    linkTexto.textContent = 'Clique para abrir ->';
    // Anexa o link à caixa de textos.
    box.appendChild(linkTexto);
  }

  // Anexa a caixa de textos (com título, descrição e link opcional) ao card.
  card.appendChild(box);

  // Retorna o elemento de card completo, pronto para ser inserido na página.
  return card;
}

// 4. Função principal que orquestra o processo de carregar e exibir os projetos.
async function initProjetos() {
  // O bloco 'try' tenta executar o código. Se um erro ocorrer, o 'catch' é acionado.
  try {
    // Chama a função fetchProjetos e espera pelo array de projetos.
    const projetos = await fetchProjetos();

    // Itera sobre cada objeto de projeto ('proj') no array de projetos.
    projetos.forEach(proj => {
      // Obtém a categoria do projeto atual.
      const cat = proj.categoria;
      // Usa o mapa para encontrar o ID do contêiner HTML correspondente.
      const containerId = mapaCategorias[cat];
      // Se a categoria não estiver no mapa, pula para o próximo projeto.
      if (!containerId) return;

      // Seleciona a seção HTML (ex: <section id="projetos-pessoais">) pelo seu ID.
      const containerSection = document.getElementById(containerId);
      // Se a seção não for encontrada no HTML, exibe um aviso e continua.
      if (!containerSection) {
        console.warn('Seção não encontrada:', containerId);
        return;
      }

      // Dentro da seção, encontra o elemento filho que tem a classe 'projetos-caixa'.
      const box = containerSection.querySelector('.projetos-caixa');
      // Se o contêiner dos cards não for encontrado, exibe um aviso e continua.
      if (!box) {
        console.warn('Container de cards não encontrado em', containerId);
        return;
      }

      // Chama a função para criar o card HTML para o projeto atual.
      const card = criarCard(proj);
      // Anexa o card criado ao contêiner de cards na página.
      box.appendChild(card);
    });
  } catch (err) {
    // Se ocorrer um erro em qualquer parte do bloco 'try', ele é capturado aqui.
    console.error(err); // Exibe o erro no console do navegador para depuração.
  }
}

// 5. Adiciona um ouvinte que executa a função 'initProjetos' quando o HTML da página está totalmente carregado.
document.addEventListener('DOMContentLoaded', initProjetos);

// =======================================================
// LÓGICA DO MENU HAMBÚRGUER (MOBILE)
// =======================================================

// Seleciona os elementos HTML necessários e os armazena em constantes.
const btnMobile = document.getElementById('btn-mobile'); // O botão hambúrguer.
const nav = document.getElementById('navegacao'); // O elemento <nav>.
const menuLinks = document.querySelectorAll('.menu-link'); // Todos os links do menu.
const navLogo = document.querySelector('.nav-logo'); // O logo "Portfólio".

// Função que abre ou fecha o menu.
function toggleMenu(event) {
    // Em dispositivos de toque, previne o "clique fantasma" que pode ocorrer após o evento de toque.
    if (event.type === 'touchstart') event.preventDefault();
    
    // Adiciona/remove a classe 'active' do elemento <nav>. O CSS usa essa classe para mostrar/esconder o menu.
    nav.classList.toggle('active');
    // Verifica se o menu está ativo agora.
    const active = nav.classList.contains('active');
    // Atualiza o atributo 'aria-expanded' para acessibilidade (leitores de tela).
    btnMobile.setAttribute('aria-expanded', active);
    // Atualiza o 'aria-label' para leitores de tela, indicando a ação do botão.
    if (active) {
        btnMobile.setAttribute('aria-label', 'Fechar Menu');
    } else {
        btnMobile.setAttribute('aria-label', 'Abrir Menu');
    }
}

// Função específica para fechar o menu.
function closeMenu() {
    // Verifica se o menu está aberto (se tem a classe 'active').
    if (nav.classList.contains('active')) {
        // Remove a classe 'active' para fechar o menu.
        nav.classList.remove('active');
        // Redefine os atributos de acessibilidade para o estado fechado.
        btnMobile.setAttribute('aria-expanded', 'false');
        btnMobile.setAttribute('aria-label', 'Abrir Menu');
    }
}

// Adiciona o evento de 'clique' ao botão para chamar a função toggleMenu.
btnMobile.addEventListener('click', toggleMenu);
// Adiciona o evento de 'toque' para compatibilidade com celulares e tablets.
btnMobile.addEventListener('touchstart', toggleMenu);

// Itera sobre cada link do menu.
menuLinks.forEach(link => {
    // Adiciona um evento de clique a cada link.
    link.addEventListener('click', closeMenu); // Quando um link for clicado, o menu se fechará.
});
// Adiciona um evento de clique ao logo.
navLogo.addEventListener('click', closeMenu); // Quando o logo for clicado, o menu também se fechará.
