<div id="noticias-container"></div>

<script>
async function carregarNoticias() {
  const container = document.getElementById("noticias-container");
  container.innerHTML = "<p>🔄 Carregando notícias...</p>";

  try {
    // 1. Tenta buscar da API
    const res = await fetch("https://kgrp-api.onrender.com/noticias");
    if (!res.ok) throw new Error("API offline");

    const noticias = await res.json();
    exibirNoticias(noticias);
    console.log("✅ Notícias carregadas da API");
  } catch (err) {
    console.warn("⚠️ API falhou, usando backup local...");
    // 2. Fallback para JSON local
    try {
      const resBackup = await fetch("noticias.json");
      const noticiasBackup = await resBackup.json();
      exibirNoticias(noticiasBackup);
      console.log("✅ Notícias carregadas do backup local");
    } catch (erroBackup) {
      container.innerHTML = "<p>❌ Erro ao carregar notícias.</p>";
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
      <h2>${noticia.titulo}</h2>
      <p>${noticia.data}</p>
      <img src="${noticia.imagem}" style="max-width: 100%; height: auto;" />
      <p>${noticia.conteudo}</p>
      <hr/>
    `;
    container.appendChild(div);
  });
}

// Executa ao carregar o site
carregarNoticias();

// Recarrega a cada 7 minutos (420000ms)
setInterval(carregarNoticias, 7 * 60 * 1000);
</script>
