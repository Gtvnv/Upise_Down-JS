/**
 * Módulo de áudio — troca a trilha sonora conforme o mundo ativo.
 * Mundo Normal -> normal-world; Mundo Invertido -> inverted-world.
 *
 * Navegadores bloqueiam autoplay com som antes de uma interação do usuário,
 * então a reprodução só é forçada depois do primeiro clique/toque na página.
 */

import { DARK } from "./theme.js";

const TRACKS = {
  "light-theme": "assets/musics/normal-world.mpeg",
  "dark-theme": "assets/musics/inverted-world.mpeg",
};

let audioEl = null;
let unlocked = false;

/** Troca a fonte do áudio com um pequeno fade para suavizar a transição. */
function changeTrack(theme) {
  if (!audioEl) return;

  const src = TRACKS[theme] ?? TRACKS["light-theme"];
  // evita recarregar se já for a faixa atual
  if (audioEl.getAttribute("src") === src) return;

  audioEl.setAttribute("src", src);
  audioEl.load();

  if (unlocked) {
    audioEl.play().catch(() => {
      /* reprodução pode falhar silenciosamente — tudo bem */
    });
  }
}

/**
 * Conecta o elemento <audio> ao ciclo de vida do tema.
 * Deve ser chamado depois de initTheme para capturar o tema inicial.
 */
export function initAudio() {
  audioEl = document.getElementById("music");
  if (!audioEl) return;

  audioEl.volume = 0.4;

  // destrava o áudio no primeiro gesto do usuário
  const unlock = () => {
    unlocked = true;
    audioEl.play().catch(() => {});
    window.removeEventListener("pointerdown", unlock);
    window.removeEventListener("keydown", unlock);
  };
  window.addEventListener("pointerdown", unlock, { once: true });
  window.addEventListener("keydown", unlock, { once: true });

  // reage à troca de mundo
  window.addEventListener("themechange", (event) => {
    changeTrack(event.detail.theme);
  });

  // garante a faixa correta para o tema inicial
  const initial = document.body.classList.contains(DARK)
    ? "dark-theme"
    : "light-theme";
  changeTrack(initial);
}
