document.addEventListener('DOMContentLoaded', () => {
    
  // ==========================================
  // 1. TEMA E INTERFACE BÁSICA
  // ==========================================
  const btnTema = document.getElementById('btn-tema');
  btnTema?.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
  });

  // ==========================================
  // 2. CONTROLE DO MODAL (GALERIA)
  // ==========================================
  const modal = document.getElementById('modal');
  const imgModal = document.getElementById('img-modal');
  const fecharBtn = document.getElementById('fechar-modal');

  // Tornamos a função global para ser chamada pelo HTML se necessário
  window.abrirModal = (src, alt = '') => {
      if (!modal || !imgModal) return;
      imgModal.src = src;
      imgModal.alt = alt;
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
  };

  const fecharModal = () => {
      if (!modal) return;
      modal.style.display = 'none';
      document.body.style.overflow = '';
  };

  fecharBtn?.addEventListener('click', fecharModal);
  
  // Fecha o modal ao clicar fora da imagem
  modal?.addEventListener('click', (e) => {
      if (e.target === modal) fecharModal();
  });

  // ==========================================
  // 3. LOGICA DE LOGIN E SESSÃO (MENU)
  // ==========================================
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
  const linkLogin = document.getElementById("link-login");
  const linkCadastro = document.getElementById("link-cadastro");
  const usuarioInfo = document.getElementById("usuario-info");
  const nomeUsuarioHeader = document.getElementById("nome-usuario-header");

  if (usuarioLogado) {
      if(linkLogin) linkLogin.style.display = "none";
      if(linkCadastro) linkCadastro.style.display = "none";
      if(usuarioInfo) {
          usuarioInfo.style.display = "inline-block";
          nomeUsuarioHeader.textContent = usuarioLogado.nome;
      }
  }

  // Botão Sair (Logout)
  document.getElementById("btn-sair")?.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("usuarioLogado");
      localStorage.removeItem("carrinho"); // Opcional: limpa o carrinho ao sair
      window.location.href = "index.html";
  });

  // ==========================================
  // 4. SISTEMA DE CARRINHO DE COMPRAS
  // ==========================================
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const listaCarrinho = document.getElementById("lista-carrinho");
  const totalSpan = document.getElementById("total");

  function atualizarInterfaceCarrinho() {
      if (!listaCarrinho) return;
      listaCarrinho.innerHTML = "";
      let total = 0;

      carrinho.forEach((item, index) => {
          const li = document.createElement("li");
          li.style.display = "flex";
          li.style.justifyContent = "space-between";
          li.style.marginBottom = "10px";
          
          li.innerHTML = `
              <span>${item.nome} - R$ ${item.preco.toFixed(2).replace(".", ",")}</span>
          `;
          
          const btnRemover = document.createElement("button");
          btnRemover.textContent = "Remover";
          btnRemover.style.backgroundColor = "#ff4d4d";
          btnRemover.onclick = () => removerDoCarrinho(index);
          
          li.appendChild(btnRemover);
          listaCarrinho.appendChild(li);
          total += item.preco;
      });

      if (totalSpan) totalSpan.textContent = `R$ ${total.toFixed(2).replace(".", ",")}`;
  }

  window.adicionarAoCarrinho = (nome, preco) => {
      // Bloqueia a compra se não houver ninguém logado
      if (!usuarioLogado) {
          alert("Por favor, faça login para adicionar itens ao carrinho!");
          window.location.href = "login.html";
          return;
      }

      carrinho.push({ nome, preco });
      localStorage.setItem("carrinho", JSON.stringify(carrinho));
      atualizarInterfaceCarrinho();
      alert(`${nome} adicionado ao carrinho!`);
  };

  function removerDoCarrinho(index) {
      carrinho.splice(index, 1);
      localStorage.setItem("carrinho", JSON.stringify(carrinho));
      atualizarInterfaceCarrinho();
  }

  // Captura cliques nos botões de "Adicionar ao carrinho" das páginas
  document.querySelectorAll(".btn-trabalho").forEach(botao => {
      // Evita conflito com botões de formulário
      if (botao.type === "submit") return;

      botao.addEventListener("click", (e) => {
          const card = e.target.closest(".foto-item") || e.target.closest(".card");
          if (!card) return;

          const nome = card.querySelector("h3").textContent;
          const precoTexto = card.querySelector("p")?.textContent.replace("R$ ", "").replace(",", ".") || "0";
          window.adicionarAoCarrinho(nome, parseFloat(precoTexto));
      });
  });

  // Finalizar Compra
  document.querySelector(".btn-finalizar")?.addEventListener("click", () => {
      if (!usuarioLogado) {
          alert("Acesse sua conta para finalizar a compra.");
          return;
      }
      
      if (carrinho.length > 0) {
          alert(`Obrigado pela compra, ${usuarioLogado.nome}!`);
          carrinho = [];
          localStorage.removeItem("carrinho");
          atualizarInterfaceCarrinho();
      } else {
          alert("Seu carrinho está vazio!");
      }
  });

  // Inicializa a visualização do carrinho se estiver na página correta
  atualizarInterfaceCarrinho();
});