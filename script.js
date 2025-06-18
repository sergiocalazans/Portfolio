function enviarMsg(event){
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const mensagem = document.getElementById('mensagem').value;
    const contato = '5541996678019';

    const texto = `Olá! Meu nome é ${nome}, ${mensagem}`;
    const msgFormatada = encodeURIComponent(texto);

    const url = `https://wa.me/${contato}?text=${msgFormatada}`;

    window.open(url, '_blank');
}

// 1. Função para buscar o JSON local
async function fetchProjetos() {
  const res = await fetch('projetos.json');
  if (!res.ok) throw new Error('Falha ao carregar projetos.json');
  return res.json();
}

// 2. Mapear categoria para o id do container no HTML
const mapaCategorias = {
  "Profissional": "projetos-profissionais",
  "Pessoal": "projetos-pessoais",
  "Academico": "projetos-academicos"
};

// 3. Criar um card de projeto
function criarCard(proj) {
  const card = document.createElement('div');
  card.className = 'projetos-card';

  const link = document.createElement('a');
  link.href = proj.site || '#';
  link.target = '_blank';

  const img = document.createElement('img');
  img.src = proj.img;
  img.alt = proj.titulo;
  img.className = 'projetos-imagem';

  link.appendChild(img);

  const box = document.createElement('div');
  box.className = 'caixa-textos-projetos';

  const h3 = document.createElement('h3');
  h3.className = 'info-projetos';
  h3.textContent = proj.titulo;

  const p = document.createElement('p');
  p.className = 'p-projetos';
  p.textContent = proj.descricao;

  box.appendChild(h3);
  box.appendChild(p);

  card.appendChild(link);
  card.appendChild(box);

  return card;
}

// 4. Função principal: montar os projetos no DOM
async function initProjetos() {
  try {
    const projetos = await fetchProjetos();

    projetos.forEach(proj => {
      const cat = proj.categoria;
      const containerId = mapaCategorias[cat];
      if (!containerId) return; // categoria não mapeada ignora

      const containerSection = document.getElementById(containerId);
      if (!containerSection) {
        console.warn('Seção não encontrada:', containerId);
        return;
      }

      // dentro de section, buscar o box com classe 'projetos-caixa'
      const box = containerSection.querySelector('.projetos-caixa');
      if (!box) {
        console.warn('Container de cards não encontrado em', containerId);
        return;
      }

      const card = criarCard(proj);
      box.appendChild(card);
    });
  } catch (err) {
    console.error(err);
  }
}

// 5. Iniciar ao carregar a página
document.addEventListener('DOMContentLoaded', initProjetos);

// --- LÓGICA DO MENU HAMBÚRGUER ---
const btnMobile = document.getElementById('btn-mobile');
const nav = document.getElementById('navegacao');
const menuLinks = document.querySelectorAll('.menu-link');
const navLogo = document.querySelector('.nav-logo'); // Pega o novo logo

function toggleMenu(event) {
    if (event.type === 'touchstart') event.preventDefault();
    
    nav.classList.toggle('active');
    const active = nav.classList.contains('active');
    btnMobile.setAttribute('aria-expanded', active);
    if (active) {
        btnMobile.setAttribute('aria-label', 'Fechar Menu');
    } else {
        btnMobile.setAttribute('aria-label', 'Abrir Menu');
    }
}

// Função para fechar o menu
function closeMenu() {
    if (nav.classList.contains('active')) {
        nav.classList.remove('active');
        btnMobile.setAttribute('aria-expanded', 'false');
        btnMobile.setAttribute('aria-label', 'Abrir Menu');
    }
}

// Adiciona eventos de abrir/fechar ao botão
btnMobile.addEventListener('click', toggleMenu);
btnMobile.addEventListener('touchstart', toggleMenu);

// Adiciona eventos para fechar o menu ao clicar em um link ou no logo
menuLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});
navLogo.addEventListener('click', closeMenu);
