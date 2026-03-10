let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

const formCadastro = document.getElementById("form-cadastro");
const listaUsuarios = document.getElementById("lista-usuarios");

// Atualiza lista ao carregar a página
atualizarLista();

// Evento de envio do formulário
formCadastro.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const contato = document.getElementById("cont").value;
    // Cria objeto JSON
    const usuario = { nome, email, senha, contato };

    // Adiciona ao array
    usuarios.push(usuario);

    // Salva no localStorage
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    // Atualiza lista
    atualizarLista();

    // Limpa formulário
    formCadastro.reset();
});

// Função para atualizar lista de usuários
function atualizarLista() {
    listaUsuarios.innerHTML = "";
    usuarios.forEach((user, index) => {
        const li = document.createElement("li");
        li.textContent = `${index + 1}. ${user.nome} - ${user.email} - ${user.contato}`;
        listaUsuarios.appendChild(li);

        console.log(`Usuário ${index + 1}:`, user); // Loga cada usuário no console
    });
}
