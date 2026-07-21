// Função chamada pelo evento 'onsubmit' do formulário de contato.
function enviarMsg(event) {
  // Previne o comportamento padrão do formulário, que é recarregar a página.
  event.preventDefault();

  // Obtém o valor (texto) digitado no campo com o id 'nome'.
  const nome = document.getElementById("nome").value;
  // Obtém o valor (texto) digitado no campo com o id 'mensagem'.
  const mensagem = document.getElementById("mensagem").value;
  // Define o número de telefone de destino do WhatsApp. Formato: [código do país][DDD][número].
  const contato = "5541996678019";

  // Cria a mensagem final usando um template string para combinar os textos.
  const texto = `Olá! Meu nome é ${nome}, ${mensagem}`;
  // Codifica a mensagem para que possa ser usada com segurança em uma URL (converte espaços, acentos, etc.).
  const msgFormatada = encodeURIComponent(texto);

  // Monta a URL final do WhatsApp com o número de contato e a mensagem formatada.
  const url = `https://wa.me/${contato}?text=${msgFormatada}`;

  // Abre a URL do WhatsApp em uma nova aba do navegador.
  window.open(url, "_blank");
}

/// =======================================================
// PROJETOS DO GITHUB E DO ARQUIVO projetos.json
// =======================================================

const USUARIO_GITHUB = "sergiocalazans";

const URL_REPOSITORIOS_GITHUB =
  `https://api.github.com/users/${USUARIO_GITHUB}/repos` +
  "?type=owner&sort=updated&direction=desc&per_page=100";

const URL_PROJETOS_JSON = "./projetos.json";

const TOPICO_PORTFOLIO = "portfolio";

const categoriasProjetos = {
  academic: {
    nome: "Acadêmico",
    secaoId: "projetos-academicos",
  },

  "data-analysis": {
    nome: "Análise de Dados",
    secaoId: "projetos-analise-de-dados",
  },

  "automation": {
    nome: "Automação Web e RPA",
    secaoId: "projetos-automacao-web-rpa",
  },

  "database": {
    nome: "Banco de Dados",
    secaoId: "projetos-banco-de-dados",
  },

  "data-science": {
    nome: "Ciência de Dados",
    secaoId: "projetos-ciencia-de-dados",
  },

  "web-development": {
    nome: "Desenvolvimento Web",
    secaoId: "projetos-desenvolvimento-web",
  },

  profissional: {
    nome: "Profissional",
    secaoId: "projetos-profissionais",
  },
};

const imagensCategorias = {
  academic: "./img/banners/academico.jpg",

  "data-analysis":
    "./img/banners/analise-de-dados.jpg",

  "automation":
    "./img/banners/automacao.png",

  "database":
    "./img/banners/banco-de-dados.png",

  "data-science":
    "./img/banners/ciencia-de-dados.jpg",

  "web-development":
    "./img/banners/pessoais.jpg",

  profissional:
    "./img/banners/profissional.jpg",
};

/**
 * Converte textos para um formato padronizado.
 */
function normalizarTexto(texto = "") {
  return texto
    .toString()
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

/**
 * Busca os repositórios públicos do GitHub.
 */
async function buscarRepositoriosGitHub() {
  const resposta = await fetch(
    URL_REPOSITORIOS_GITHUB,
    {
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );

  if (!resposta.ok) {
    throw new Error(
      `Erro ${resposta.status} ao buscar os repositórios do GitHub.`
    );
  }

  return resposta.json();
}

/**
 * Busca os projetos cadastrados no projetos.json.
 */
async function buscarProjetosJson() {
  const resposta = await fetch(
    URL_PROJETOS_JSON,
    {
      cache: "no-cache",
    }
  );

  if (!resposta.ok) {
    throw new Error(
      `Erro ${resposta.status} ao carregar projetos.json.`
    );
  }

  const projetos = await resposta.json();

  if (!Array.isArray(projetos)) {
    throw new Error(
      "O projetos.json precisa conter um array de projetos."
    );
  }

  return projetos;
}

/**
 * Retorna os tópicos do repositório em letras minúsculas.
 */
function obterTopicosRepositorio(repo) {
  if (!Array.isArray(repo.topics)) {
    return [];
  }

  return repo.topics.map((topico) =>
    normalizarTexto(topico)
  );
}

/**
 * Verifica se o repositório atende às regras do portfólio.
 *
 * O repositório precisa:
 * - ser público;
 * - não ser fork;
 * - não estar arquivado;
 * - possuir o tópico "portfolio";
 * - possuir exatamente um tópico de categoria.
 */
function identificarCategoriaRepositorio(repo) {
  const topicos = obterTopicosRepositorio(repo);

  if (!topicos.includes(TOPICO_PORTFOLIO)) {
    return null;
  }

  const categoriasEncontradas = Object.keys(
    categoriasProjetos
  ).filter((categoria) =>
    topicos.includes(categoria)
  );

  if (categoriasEncontradas.length === 0) {
    console.warn(
      `O repositório "${repo.name}" possui o tópico ` +
      `"portfolio", mas não possui uma categoria válida.`
    );

    return null;
  }

  if (categoriasEncontradas.length > 1) {
    console.warn(
      `O repositório "${repo.name}" possui mais de uma categoria:`,
      categoriasEncontradas
    );

    return null;
  }

  return categoriasEncontradas[0];
}

/**
 * Remove os tópicos usados internamente pelo portfólio.
 */
function obterTecnologiasRepositorio(repo) {
  const topicosControle = [
    TOPICO_PORTFOLIO,
    ...Object.keys(categoriasProjetos),
  ];

  return obterTopicosRepositorio(repo)
    .filter((topico) =>
      !topicosControle.includes(topico)
    )
    .slice(0, 6);
}

/**
 * Formata o nome do repositório como título.
 */
function formatarTituloRepositorio(nome = "") {
  return nome
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (letra) =>
      letra.toUpperCase()
    );
}

/**
 * Remove tecnologias repetidas.
 */
function removerItensDuplicados(itens = []) {
  const encontrados = new Set();

  return itens.filter((item) => {
    const chave = normalizarTexto(item);

    if (!chave || encontrados.has(chave)) {
      return false;
    }

    encontrados.add(chave);
    return true;
  });
}

/**
 * Monta a URL pública do banner armazenado no repositório.
 *
 * Estrutura esperada:
 * img/banner.png
 */
function obterBannerRepositorio(repo) {
  if (!repo.full_name || !repo.default_branch) {
    return "";
  }

  const caminhoBanner = "img/banner.png";

  return (
    `https://raw.githubusercontent.com/` +
    `${repo.full_name}/` +
    `${repo.default_branch}/` +
    `${caminhoBanner}`
  );
}

/**
 * Converte um repositório do GitHub para a estrutura
 * interna utilizada pelo portfólio.
 */
function converterRepositorioGitHub(repo) {
  const categoria =
    identificarCategoriaRepositorio(repo);

  if (!categoria) {
    return null;
  }

  const tecnologias = [];

  if (repo.language) {
    tecnologias.push(repo.language);
  }

  tecnologias.push(
    ...obterTecnologiasRepositorio(repo)
  );

  return {
    id: `github-${repo.id}`,

    categoria,

    titulo:
      formatarTituloRepositorio(repo.name),

    descricao:
      repo.description ||
      "Projeto disponível no GitHub.",

    linkRepositorio:
      repo.html_url,

    linkAplicacao:
      repo.homepage || "",

    /*
     * O banner será carregado diretamente de:
     * img/banner.png
     *
     * dentro do próprio repositório.
     */
    arquivo:
      obterBannerRepositorio(repo),

    tecnologias:
      removerItensDuplicados(tecnologias),

    repositorio:
      normalizarTexto(repo.full_name),

    origem:
      "github",

    destaque:
      obterTopicosRepositorio(repo).includes(
        "destaque"
      ),

    atualizadoEm:
      repo.updated_at,
  };
}

/**
 * Valida e converte um projeto do projetos.json.
 */
function converterProjetoJson(projeto) {
  const categoria =
    normalizarTexto(projeto.categoria);

  if (!categoriasProjetos[categoria]) {
    console.warn(
      `Categoria inválida no projetos.json: "${projeto.categoria}".`,
      projeto
    );

    return null;
  }

  if (!projeto.titulo) {
    console.warn(
      "Projeto sem título no projetos.json:",
      projeto
    );

    return null;
  }

  return {
    id:
      projeto.id ||
      `json-${normalizarTexto(
        projeto.titulo
      ).replace(/\s+/g, "-")}`,

    categoria,

    titulo: projeto.titulo,

    descricao:
      projeto.descricao ||
      "Projeto apresentado no portfólio.",

    linkRepositorio:
      projeto.linkRepositorio ||
      projeto.link ||
      "",

    linkAplicacao:
      projeto.linkAplicacao ||
      "",

    arquivo:
      projeto.arquivo ||
      imagensCategorias[categoria] ||
      "./img/banners/github-projeto.png",

    tecnologias:
      Array.isArray(projeto.tecnologias)
        ? removerItensDuplicados(
          projeto.tecnologias
        )
        : [],

    repositorio:
      projeto.repositorio
        ? normalizarTexto(
          projeto.repositorio
        )
        : "",

    origem:
      projeto.origem ||
      "json",

    destaque:
      Boolean(projeto.destaque),

    atualizadoEm:
      projeto.atualizadoEm ||
      null,
  };
}

/**
 * Cria uma chave utilizada para detectar projetos duplicados.
 */
function criarChaveProjeto(projeto) {
  if (projeto.repositorio) {
    return `repositorio:${projeto.repositorio}`;
  }

  if (projeto.linkRepositorio) {
    return `link:${normalizarTexto(
      projeto.linkRepositorio
    )}`;
  }

  return `titulo:${normalizarTexto(
    projeto.titulo
  ).replace(/\s+/g, "-")}`;
}

/**
 * Remove duplicações entre projetos do GitHub e do JSON.
 *
 * Os projetos do JSON têm prioridade.
 */
function removerProjetosDuplicados(projetos) {
  const projetosUnicos = new Map();

  projetos.forEach((projeto) => {
    const chave = criarChaveProjeto(projeto);

    if (!projetosUnicos.has(chave)) {
      projetosUnicos.set(chave, projeto);
      return;
    }

    const projetoExistente =
      projetosUnicos.get(chave);

    const projetoAtualEhJson =
      projeto.origem !== "github";

    const projetoExistenteEhGitHub =
      projetoExistente.origem === "github";

    if (
      projetoAtualEhJson &&
      projetoExistenteEhGitHub
    ) {
      projetosUnicos.set(chave, projeto);
    }
  });

  return [...projetosUnicos.values()];
}

/**
 * Ordena os projetos:
 * - destaques primeiro;
 * - projetos mais recentes depois;
 * - título como critério final.
 */
function ordenarProjetos(projetos) {
  return projetos.sort(
    (projetoA, projetoB) => {
      if (
        projetoA.destaque !==
        projetoB.destaque
      ) {
        return projetoA.destaque ? -1 : 1;
      }

      if (
        projetoA.atualizadoEm &&
        projetoB.atualizadoEm
      ) {
        const dataA = new Date(
          projetoA.atualizadoEm
        );

        const dataB = new Date(
          projetoB.atualizadoEm
        );

        if (
          dataA.getTime() !==
          dataB.getTime()
        ) {
          return dataB - dataA;
        }
      }

      return projetoA.titulo.localeCompare(
        projetoB.titulo,
        "pt-BR"
      );
    }
  );
}

/**
 * Cria o card usando somente as classes CSS existentes.
 */
function criarCardProjeto(projeto) {
  const card =
    document.createElement("div");

  card.className = "projetos-card";

  const imagem =
    document.createElement("img");

  imagem.src = projeto.arquivo;

  imagem.alt =
    `Imagem do projeto ${projeto.titulo}`;

  imagem.className =
    "projetos-imagem";

  imagem.loading = "lazy";

  imagem.addEventListener(
    "error",
    () => {
      /*
       * Evita um loop caso a imagem de fallback também
       * não seja encontrada.
       */
      if (imagem.dataset.fallbackAplicado === "true") {
        return;
      }

      imagem.dataset.fallbackAplicado = "true";

      imagem.src =
        imagensCategorias[projeto.categoria] ||
        "./img/banners/github-projeto.png";
    }
  );

  const caixaTextos =
    document.createElement("div");

  caixaTextos.className =
    "caixa-textos-projetos";

  const titulo =
    document.createElement("h3");

  titulo.className =
    "info-projetos";

  titulo.textContent =
    projeto.titulo;

  const descricao =
    document.createElement("p");

  descricao.className =
    "p-projetos";

  descricao.textContent =
    projeto.descricao;

  caixaTextos.appendChild(titulo);
  caixaTextos.appendChild(descricao);

  if (
    projeto.tecnologias.length > 0
  ) {
    const tecnologias =
      document.createElement("p");

    tecnologias.className =
      "p-projetos";

    tecnologias.textContent =
      `Tecnologias: ${projeto.tecnologias.join(", ")
      }`;

    caixaTextos.appendChild(
      tecnologias
    );
  }

  if (projeto.linkRepositorio) {
    const linkRepositorio =
      document.createElement("a");

    linkRepositorio.href =
      projeto.linkRepositorio;

    linkRepositorio.target =
      "_blank";

    linkRepositorio.rel =
      "noopener noreferrer";

    linkRepositorio.className =
      "link-projeto";

    linkRepositorio.textContent =
      "Ver repositório →";

    caixaTextos.appendChild(
      linkRepositorio
    );
  }

  if (projeto.linkAplicacao) {
    const linkAplicacao =
      document.createElement("a");

    linkAplicacao.href =
      projeto.linkAplicacao;

    linkAplicacao.target =
      "_blank";

    linkAplicacao.rel =
      "noopener noreferrer";

    linkAplicacao.className =
      "link-projeto";

    linkAplicacao.textContent =
      projeto.linkRepositorio
        ? "Ver aplicação →"
        : "Ver projeto →";

    caixaTextos.appendChild(
      linkAplicacao
    );
  }

  card.appendChild(imagem);
  card.appendChild(caixaTextos);

  return card;
}

/**
 * Obtém o contêiner de uma categoria.
 */
function obterContainerCategoria(
  categoria
) {
  const configuracao =
    categoriasProjetos[categoria];

  if (!configuracao) {
    return null;
  }

  const secao =
    document.getElementById(
      configuracao.secaoId
    );

  if (!secao) {
    console.warn(
      `Seção não encontrada: ${configuracao.secaoId}`
    );

    return null;
  }

  return secao.querySelector(
    ".projetos-caixa"
  );
}

/**
 * Limpa os projetos carregados anteriormente.
 */
function limparContainersProjetos() {
  Object.values(
    categoriasProjetos
  ).forEach((categoria) => {
    const secao =
      document.getElementById(
        categoria.secaoId
      );

    const container =
      secao?.querySelector(
        ".projetos-caixa"
      );

    if (container) {
      container.replaceChildren();
    }

    if (secao) {
      secao.hidden = false;
    }
  });
}

/**
 * Oculta seções sem projetos.
 */
function ocultarCategoriasVazias() {
  Object.values(
    categoriasProjetos
  ).forEach((categoria) => {
    const secao =
      document.getElementById(
        categoria.secaoId
      );

    const container =
      secao?.querySelector(
        ".projetos-caixa"
      );

    if (!secao || !container) {
      return;
    }

    secao.hidden =
      container.children.length === 0;
  });
}

/**
 * Exibe mensagem de erro sem interromper o restante da página.
 */
function mostrarErroProjetos(
  mensagem
) {
  console.error(mensagem);

  const primeiraCategoria =
    Object.keys(categoriasProjetos)[0];

  const container =
    obterContainerCategoria(
      primeiraCategoria
    );

  if (!container) {
    return;
  }

  const textoErro =
    document.createElement("p");

  textoErro.className =
    "p-projetos";

  textoErro.textContent = mensagem;

  container.appendChild(textoErro);
}

/**
 * Carrega e combina as duas fontes.
 */
async function carregarProjetos() {
  limparContainersProjetos();

  const resultados =
    await Promise.allSettled([
      buscarRepositoriosGitHub(),
      buscarProjetosJson(),
    ]);

  const resultadoGitHub =
    resultados[0];

  const resultadoJson =
    resultados[1];

  let projetosGitHub = [];
  let projetosJson = [];

  if (
    resultadoGitHub.status ===
    "fulfilled"
  ) {
    projetosGitHub =
      resultadoGitHub.value
        .filter((repo) =>
          !repo.fork &&
          !repo.archived &&
          !repo.disabled
        )
        .map(
          converterRepositorioGitHub
        )
        .filter(Boolean);
  } else {
    console.error(
      "Não foi possível carregar os repositórios do GitHub:",
      resultadoGitHub.reason
    );
  }

  if (
    resultadoJson.status ===
    "fulfilled"
  ) {
    projetosJson =
      resultadoJson.value
        .map(converterProjetoJson)
        .filter(Boolean);
  } else {
    console.error(
      "Não foi possível carregar o projetos.json:",
      resultadoJson.reason
    );
  }

  if (
    projetosGitHub.length === 0 &&
    projetosJson.length === 0
  ) {
    mostrarErroProjetos(
      "Não foi possível carregar os projetos."
    );

    ocultarCategoriasVazias();
    return;
  }

  /*
   * O JSON aparece primeiro porque possui prioridade
   * na remoção de projetos duplicados.
   */
  const projetosCombinados = [
    ...projetosJson,
    ...projetosGitHub,
  ];

  const projetosUnicos =
    removerProjetosDuplicados(
      projetosCombinados
    );

  const projetosOrdenados =
    ordenarProjetos(
      projetosUnicos
    );

  projetosOrdenados.forEach(
    (projeto) => {
      const container =
        obterContainerCategoria(
          projeto.categoria
        );

      if (!container) {
        return;
      }

      const card =
        criarCardProjeto(projeto);

      container.appendChild(card);
    }
  );

  ocultarCategoriasVazias();

  console.info(
    `${projetosOrdenados.length} projeto(s) carregado(s).`
  );
}

document.addEventListener(
  "DOMContentLoaded",
  carregarProjetos
);
// =======================================================
// LÓGICA DO MENU HAMBÚRGUER (MOBILE)
// =======================================================

// Seleciona os elementos HTML necessários e os armazena em constantes.
const btnMobile = document.getElementById("btn-mobile"); // O botão hambúrguer.
const nav = document.getElementById("navegacao"); // O elemento <nav>.
const menuLinks = document.querySelectorAll(".menu-link"); // Todos os links do menu.
const navLogo = document.querySelector(".nav-logo"); // O logo "Portfólio".

// Função que abre ou fecha o menu.
function toggleMenu(event) {
  // Em dispositivos de toque, previne o "clique fantasma" que pode ocorrer após o evento de toque.
  if (event.type === "touchstart") event.preventDefault();

  // Adiciona/remove a classe 'active' do elemento <nav>. O CSS usa essa classe para mostrar/esconder o menu.
  nav.classList.toggle("active");
  // Verifica se o menu está ativo agora.
  const active = nav.classList.contains("active");
  // Atualiza o atributo 'aria-expanded' para acessibilidade (leitores de tela).
  btnMobile.setAttribute("aria-expanded", active);
  // Atualiza o 'aria-label' para leitores de tela, indicando a ação do botão.
  if (active) {
    btnMobile.setAttribute("aria-label", "Fechar Menu");
  } else {
    btnMobile.setAttribute("aria-label", "Abrir Menu");
  }
}

// Função específica para fechar o menu.
function closeMenu() {
  // Verifica se o menu está aberto (se tem a classe 'active').
  if (nav.classList.contains("active")) {
    // Remove a classe 'active' para fechar o menu.
    nav.classList.remove("active");
    // Redefine os atributos de acessibilidade para o estado fechado.
    btnMobile.setAttribute("aria-expanded", "false");
    btnMobile.setAttribute("aria-label", "Abrir Menu");
  }
}

// Adiciona o evento de 'clique' ao botão para chamar a função toggleMenu.
btnMobile.addEventListener("click", toggleMenu);
// Adiciona o evento de 'toque' para compatibilidade com celulares e tablets.
btnMobile.addEventListener("touchstart", toggleMenu);

// Itera sobre cada link do menu.
menuLinks.forEach((link) => {
  // Adiciona um evento de clique a cada link.
  link.addEventListener("click", closeMenu); // Quando um link for clicado, o menu se fechará.
});
// Adiciona um evento de clique ao logo.
navLogo.addEventListener("click", closeMenu); // Quando o logo for clicado, o menu também se fechará.
