// Seleciona o botão pelo ID
const btnTema = document.getElementById('btn-tema');

// Adiciona o evento de clique
btnTema.addEventListener('click', function() {
    // Alterna a classe 'light-mode' no corpo da página
    document.body.classList.toggle('light-mode');
    
    // Log de teste para o VS Code / Navegador
    console.log("Tema alterado! Modo claro ativo:", document.body.classList.contains('light-mode'));
});

