// ==UserScript==
// @name         Instagram sin scroll infinito
// @description  Sin feed ni Reels ni grid de Explorar: solo DMs, búsqueda y perfiles. Los reels que te mandan por DM sí abren.
// @version      2.0.0
// @match        https://www.instagram.com/*
// @run-at       document-start
// ==/UserScript==

const css = document.createElement('style');
css.textContent = `
  a[href="/"], a[href="/reels/"] { display: none !important; }
  .nis-explore main a[href*="/p/"], .nis-explore main a[href*="/reel/"] { display: none !important; }
  .nis-hidden { display: none !important; }
`;
document.documentElement.append(css);

function run() {
  const path = location.pathname;

  // Inicio (feed) y pestaña Reels → DMs. Un reel concreto (/reel/ID) sí abre.
  if (path === '/' || /^\/reels\/?$/.test(path)) return location.replace('/direct/inbox/');

  // Explorar: queda la barra de búsqueda, se oculta el grid de publicaciones.
  document.documentElement.classList.toggle('nis-explore', path.startsWith('/explore'));

  // Post/reel abierto desde un DM: solo ese, nada de "más publicaciones".
  if (/^\/(p|reels?)\//.test(path)) {
    [...document.querySelectorAll('main article')].slice(1).forEach((a) => a.classList.add('nis-hidden'));
  }
}

let queued = false;
new MutationObserver(() => {
  if (queued) return;
  queued = true;
  requestAnimationFrame(() => { queued = false; run(); });
}).observe(document.documentElement, { childList: true, subtree: true });
