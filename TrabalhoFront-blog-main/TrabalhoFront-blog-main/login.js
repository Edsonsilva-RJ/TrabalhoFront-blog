document.getElementById("form-login").addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("login-email").value;
    const senha = document.getElementById("login-senha").value;
    
    // Pega a lista de usuários que o cadastro.js salvou
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Tenta encontrar o usuário
    const usuarioEncontrado = usuarios.find(user => user.email === email && user.senha === senha);

    if (usuarioEncontrado) {
        localStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado));
        alert(`Bem-vindo, ${usuarioEncontrado.nome}!`);
        window.location.href = "index.html"; // Redireciona para a home
    } else {
        alert("E-mail ou senha incorretos!");
    }
});