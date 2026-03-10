// Recupera os usuários já cadastrados ou inicia um array vazio
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

const formCadastro = document.getElementById("form-cadastro");

// Evento de envio do formulário de cadastro
formCadastro?.addEventListener("submit", function(event) {
    event.preventDefault();

    // Captura os valores dos inputs
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const contato = document.getElementById("cont").value;
    const cpf = document.getElementById("cpf")?.value; // CPF que você adicionou no HTML

    // Verifica se o e-mail já está cadastrado
    const emailExiste = usuarios.find(user => user.email === email);
    if (emailExiste) {
        alert("Este e-mail já está cadastrado! Tente fazer login.");
        return;
    }

    // Cria o objeto do novo usuário
    const novoUsuario = { 
        id: Date.now(), // ID único baseado no tempo
        nome, 
        email, 
        senha, 
        contato,
        cpf 
    };

    // Adiciona ao array de usuários
    usuarios.push(novoUsuario);

    // Salva o array atualizado no localStorage
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Cadastro realizado com sucesso! Agora, faça o seu login.");

    // Redireciona o utilizador para a página de login
    window.location.href = "login.html";
});

/**
 * NOTA PARA O TRABALHO:
 * Removi a função 'atualizarLista' que exibia os dados na tela, 
 * pois num sistema real de Engenharia de Computação, os dados dos 
 * utilizadores (especialmente senhas) não devem ser listados publicamente.
 */
