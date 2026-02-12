document.addEventListener('DOMContentLoaded', () => {
  const btnTema = document.getElementById('btn-tema');
  btnTema?.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    console.log('Tema alterado! Modo claro ativo:', document.body.classList.contains('light-mode'));
  });

  const modal = document.getElementById('modal');
  const imgModal = document.getElementById('img-modal');
  const fecharBtn = document.getElementById('fechar-modal');

  function abrirModal(src, alt = '') {
    if (!modal || !imgModal) return;
    imgModal.src = src;
    imgModal.alt = alt;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  function fecharModal() {
    if (!modal || !imgModal) return;
    modal.style.display = 'none';
    imgModal.src = '';
    document.body.style.overflow = '';
  }

  window.abrirModal = abrirModal;
  window.fecharModal = fecharModal;

  fecharBtn?.addEventListener('click', fecharModal);
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) fecharModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') fecharModal();
  });

  document.querySelectorAll('.foto-card').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', (e) => {
      e.preventDefault();
      abrirModal(img.src, img.alt || '');
    });
  });
});

