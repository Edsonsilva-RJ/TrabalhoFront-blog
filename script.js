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


