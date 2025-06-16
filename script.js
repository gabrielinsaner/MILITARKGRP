<div id="noticias-container"></div>

<script>
const API_URL = "https://kgrp-api.onrender.com/noticias";
const BACKUP_URL = "noticias.json"; // arquivo manual

async function carregarNoticias() {
  const container = document.getElementById("noticias-container");
  container.innerHTML = "<p style='color:white;'>🕐 Carregando notícias...</p>";

  try {
    const res = await fetch(API_URL, { cache: "no-store" });
    if (!res.ok) throw new Error("API offline");
    const noticias = await res.json();
    exibirNoticias(noticias);
  } catch (err) {
    console.warn("⚠️ API fora do ar, carregando backup.");
    try {
      const resBackup = await fetch(BACKUP_URL, { cache: "no-store" });
      const noticiasBackup = await resBackup.json();
      exibirNoticias(noticiasBackup);
    } catch (erroBackup) {
      container.innerHTML = "<p style='color:red;'>❌ Não foi possível carregar as notícias.</p>";
    }
  }
}

function exibirNoticias(noticias) {
  const container = document.getElementById("noticias-container");
  container.innerHTML = "";
  noticias.forEach(noticia => {
    const div = document.createElement("div");
    div.className = "noticia";
    div.innerHTML = `
      <h2 style="color:white;">${noticia.titulo}</h2>
      <p style="color:gray;">${noticia.data}</p>
      <img src="${noticia.imagem}" style="max-width: 100%; height: auto;" />
      <p style="color:white;">${noticia.conteudo}</p>
      <hr style="border-color: #444;"/>
    `;
    container.appendChild(div);
  });
}

// Primeira execução
carregarNoticias();

// Atualiza automaticamente a cada 7 minutos
setInterval(carregarNoticias, 7 * 60 * 1000);
</script>
