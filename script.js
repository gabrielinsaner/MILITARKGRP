fetch("https://kgrp-api.onrender.com/noticias")
  .then(res => res.json())
  .then(noticias => {
    const container = document.getElementById("noticias-container");
    noticias.forEach(noticia => {
      const div = document.createElement("div");
      div.className = "noticia";
      div.innerHTML = `
        <h2>${noticia.titulo}</h2>
        <p>${noticia.data}</p>
        <img src="${noticia.imagem}" style="max-width: 100%; height: auto;" />
        <p>${noticia.conteudo}</p>
        <hr/>
      `;
      container.appendChild(div);
    });
  });
