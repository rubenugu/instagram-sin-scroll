// ==UserScript==
// @name         Instagram sin scroll infinito
// @description  Corta el feed tras N posts, bloquea la pestaña Reels y deja ver solo los reels que te mandan por DM.
// @version      1.0.0
// @match        https://www.instagram.com/*
// @run-at       document-start
// ==/UserScript==

const MAX_POSTS = 10; // posts del feed antes del muro

const css = document.createElement('style');
css.textContent = `
  a[href="/reels/"] { display: none !important; }
  .nis-hidden { display: none !important; }
  #nis-wall { padding: 48px 16px; text-align: center; font: 600 18px -apple-system, sans-serif; }
`;
document.documentElement.append(css);

// ponytail: solo en memoria, recargar la página reinicia el contador; usar sessionStorage si eso se abusa
const seen = new Set();

const postKey = (article) =>
  article.querySelector('a[href*="/p/"], a[href*="/reel/"]')?.getAttribute('href');

function run() {
  const path = location.pathname;

  // Pestaña Reels → inicio. Un reel concreto (/reel/ID) sí abre.
  if (/^\/reels\/?$/.test(path)) return location.replace('/');

  const articles = [...document.querySelectorAll('main article')];

  if (path === '/') {
    for (const art of articles) {
      const key = postKey(art);
      if (!key) continue; // aún cargando
      if (seen.size < MAX_POSTS) seen.add(key);
      if (!seen.has(key)) art.classList.add('nis-hidden');
    }
    if (seen.size >= MAX_POSTS && !document.getElementById('nis-wall')) {
      const last = articles.reverse().find((a) => seen.has(postKey(a)));
      last?.after(Object.assign(document.createElement('div'), {
        id: 'nis-wall',
        textContent: 'Ya terminaste 👋 Cierra Instagram.',
      }));
    }
  } else if (/^\/(p|reels?)\//.test(path)) {
    // Post/reel abierto desde un DM: solo ese, nada de "más publicaciones".
    articles.slice(1).forEach((a) => a.classList.add('nis-hidden'));
  }
}

let queued = false;
new MutationObserver(() => {
  if (queued) return;
  queued = true;
  requestAnimationFrame(() => { queued = false; run(); });
}).observe(document.documentElement, { childList: true, subtree: true });
