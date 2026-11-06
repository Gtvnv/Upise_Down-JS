/**
 * Módulo de tema — alterna entre o Mundo Normal (light) e o Mundo Invertido (dark).
 * Persiste a escolha do usuário no localStorage e dispara um evento customizado
 * `themechange` para que outros módulos (ex.: áudio) possam reagir.
 */

const STORAGE_KEY = "upside-down:theme";
const LIGHT = "light-theme";
const DARK = "dark-theme";

/** @returns {"light-theme" | "dark-theme"} o tema atualmente aplicado no body */
function getCurrentTheme() {
  return document.body.classList.contains(DARK) ? DARK : LIGHT;
}

/**
 * Aplica um tema ao body e atualiza atributos de acessibilidade.
 * @param {"light-theme" | "dark-theme"} theme
 */
function applyTheme(theme) {
  const isDark = theme === DARK;

  document.body.classList.toggle(DARK, isDark);
  document.body.classList.toggle(LIGHT, !isDark);

  const label = isDark
    ? "O site está utilizando o tema do Mundo Invertido"
    : "O site está utilizando o tema do Mundo Normal";
  document.body.setAttribute("aria-label", label);

  const button = document.getElementById("switch-theme-button");
  if (button) {
    button.setAttribute("aria-pressed", String(isDark));
  }

  // efeito de "glitch" momentâneo na troca
  document.body.classList.add("theme-switching");
  window.setTimeout(() => document.body.classList.remove("theme-switching"), 500);

  // notifica o resto da aplicação
  window.dispatchEvent(new CustomEvent("themechange", { detail: { theme } }));
}

/** Inverte o mundo atual (light <-> dark) e persiste a escolha. */
export function switchTheme() {
  const next = getCurrentTheme() === DARK ? LIGHT : DARK;
  applyTheme(next);

  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    /* localStorage pode estar indisponível (modo privado) — segue sem persistir */
  }
}

/**
 * Inicializa o tema: restaura a preferência salva (ou a do sistema) e
 * conecta o botão de troca, dispensando o onclick inline no HTML.
 */
export function initTheme() {
  let saved = null;
  try {
    saved = localStorage.getItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }

  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const initial = saved ?? (prefersDark ? DARK : LIGHT);
  applyTheme(initial);

  const button = document.getElementById("switch-theme-button");
  button?.addEventListener("click", switchTheme);
}

export { getCurrentTheme, DARK, LIGHT };
