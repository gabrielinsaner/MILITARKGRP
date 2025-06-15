function mostrarNoticias(noticias) {
  const container = document.getElementById('noticias-container');
  container.innerHTML = ''; // Limpa antes de adicionar novas

  noticias.forEach(noticia => {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
      <img src="${noticia.imagem}" alt="Imagem da Notícia">
      <h3>${noticia.titulo}</h3>
      <p>${noticia.conteudo}</p>
      <small>${noticia.data}</small>
    `;

    container.appendChild(card);
  });
}

fetch('https://kgrp-api.onrender.com/noticias')
  .then(res => res.json())
  .then(mostrarNoticias)
  .catch(() => {
    fetch('noticias_backup.json')
      .then(res => res.json())
      .then(mostrarNoticias)
      .catch(() => {
        const container = document.getElementById('noticias-container');
        container.innerHTML = '<p>⚠️ Não foi possível carregar as notícias.</p>';
      });
  });
