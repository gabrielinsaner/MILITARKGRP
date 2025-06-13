document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("https://kgrp-api.onrender.com/noticias");
    const noticias = await response.json();

    const container = document.querySelector("#noticiasContainer");

    noticias.forEach((noticia) => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        ${noticia.imagem ? `<img src="${noticia.imagem}" alt="Imagem da notícia">` : ''}
        <div class="card-body">
          <h3>${noticia.titulo}</h3>
          <p>${noticia.conteudo}</p>
          <span><i>${noticia.data}</i></span>
        </div>
      `;

      container.appendChild(card);
    });
  } catch (error) {
    console.error("Erro ao carregar notícias:", error);
  }
});