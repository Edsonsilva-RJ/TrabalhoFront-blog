// Aguarda o carregamento completo do DOM antes de executar o código
document.addEventListener('DOMContentLoaded', () => {

  // Seleciona o botão de alternância de tema pelo ID
  const btnTema = document.getElementById('btn-tema');

  // Adiciona evento de clique ao botão de tema (se existir)
  btnTema?.addEventListener('click', () => {
    // Alterna a classe 'light-mode' no body (ativa/desativa modo claro)
    document.body.classList.toggle('light-mode');
    // Exibe no console se o modo claro está ativo
    console.log('Tema alterado! Modo claro ativo:', document.body.classList.contains('light-mode'));
  });

  // Seleciona elementos do modal
  const modal = document.getElementById('modal');        // Container do modal
  const imgModal = document.getElementById('img-modal'); // Imagem exibida dentro do modal
  const fecharBtn = document.getElementById('fechar-modal'); // Botão de fechar modal

  // Função para abrir o modal com uma imagem
  function abrirModal(src, alt = '') {
    if (!modal || !imgModal) return; // Se não existir modal ou imagem, sai da função
    imgModal.src = src;              // Define o caminho da imagem
    imgModal.alt = alt;              // Define o texto alternativo da imagem
    modal.style.display = 'block';   // Exibe o modal
    document.body.style.overflow = 'hidden'; // Bloqueia rolagem da página
  }

  // Função para fechar o modal
  function fecharModal() {
    if (!modal || !imgModal) return; // Se não existir modal ou imagem, sai da função
    modal.style.display = 'none';    // Oculta o modal
    imgModal.src = '';               // Remove a imagem exibida
    document.body.style.overflow = ''; // Restaura a rolagem da página
  }

  // Torna as funções acessíveis globalmente (ex: chamadas via HTML)
  window.abrirModal = abrirModal;
  window.fecharModal = fecharModal;

  // Adiciona evento de clique ao botão de fechar (se existir)
  fecharBtn?.addEventListener('click', fecharModal);

  // Fecha o modal ao clicar fora da imagem (na área escura)
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) fecharModal();
  });

  // Fecha o modal ao pressionar a tecla ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') fecharModal();
  });

  // Seleciona todas as imagens com classe 'foto-card'
  document.querySelectorAll('.foto-card').forEach(img => {
    img.style.cursor = 'zoom-in'; // Define cursor indicando zoom
    // Adiciona evento de clique em cada imagem
    img.addEventListener('click', (e) => {
      e.preventDefault(); // Evita comportamento padrão (ex: abrir link)
      abrirModal(img.src, img.alt || ''); // Abre modal com a imagem clicada
    });
  });
});

// // Recupera usuários salvos no localStorage ou inicia vazio
// let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

// const formCadastro = document.getElementById("form-cadastro");
// const listaUsuarios = document.getElementById("lista-usuarios");

// // Atualiza lista ao carregar a página
// atualizarLista();

// // Evento de envio do formulário
// formCadastro.addEventListener("submit", function(event) {
//     event.preventDefault();

//     const nome = document.getElementById("nome").value;
//     const email = document.getElementById("email").value;
//     const senha = document.getElementById("senha").value;
//     const contato = document.getElementById("cont").value;
//     // Cria objeto JSON
//     const usuario = { nome, email, senha, contato };

//     // Adiciona ao array
//     usuarios.push(usuario);

//     // Salva no localStorage
//     localStorage.setItem("usuarios", JSON.stringify(usuarios));

//     // Atualiza lista
//     atualizarLista();

//     // Limpa formulário
//     formCadastro.reset();
// });

// // Função para atualizar lista de usuários
// function atualizarLista() {
//     listaUsuarios.innerHTML = "";
//     usuarios.forEach((user, index) => {
//         const li = document.createElement("li");
//         li.textContent = `${index + 1}. ${user.nome} - ${user.email} - ${user.contato}`;
//         listaUsuarios.appendChild(li);

//         console.log(`Usuário ${index + 1}:`, user); // Loga cada usuário no console
//     });
// }



// script.js

// Seleciona todos os botões de compra
const botoesComprar = document.querySelectorAll(".btn-trabalho");
const listaCarrinho = document.getElementById("lista-carrinho");
const totalSpan = document.getElementById("total");

let total = 0;

// Função para formatar valores em reais
function formatarPreco(valor) {
    return "R$ " + valor.toFixed(2).replace(".", ",");
}

// Adiciona evento de clique em cada botão
botoesComprar.forEach(botao => {
    botao.addEventListener("click", () => {
        const item = botao.parentElement;
        const nome = item.querySelector("h3").textContent;
        const precoTexto = item.querySelector("p").textContent.replace("R$ ", "").replace(",", ".");
        const preco = parseFloat(precoTexto);

        // Cria um novo item no carrinho
        const li = document.createElement("li");
        li.textContent = `${nome} - ${formatarPreco(preco)}`;

        // Botão de remover
        const btnRemover = document.createElement("button");
        btnRemover.textContent = "Remover";
        btnRemover.textContent = "Remover";
btnRemover.classList.add("btn-remover");

        btnRemover.style.marginLeft = "10px";
        btnRemover.addEventListener("click", () => {
            listaCarrinho.removeChild(li);
            total -= preco;
            totalSpan.textContent = formatarPreco(total);
        });

        li.appendChild(btnRemover);
        listaCarrinho.appendChild(li);

        // Atualiza o total
        total += preco;
        totalSpan.textContent = formatarPreco(total);
    });
});

// Finalizar compra
document.querySelector(".btn-finalizar").addEventListener("click", () => {
    if (total > 0) {
        alert("Compra finalizada! Total: " + formatarPreco(total));
        listaCarrinho.innerHTML = "";
        total = 0;
        totalSpan.textContent = formatarPreco(total);
    } else {
        alert("Seu carrinho está vazio!");
    }
});
