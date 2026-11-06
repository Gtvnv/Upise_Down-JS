/**
 * Módulo de toast — mensagens de feedback não intrusivas, acessíveis via
 * aria-live. Reutiliza um único elemento e reinicia o temporizador a cada chamada.
 */

let toastEl = null;
let hideTimer = null;

function ensureToast() {
  if (toastEl) return toastEl;

  toastEl = document.createElement("div");
  toastEl.className = "toast";
  toastEl.setAttribute("role", "status");
  toastEl.setAttribute("aria-live", "polite");
  document.body.appendChild(toastEl);
  return toastEl;
}

/**
 * Exibe uma mensagem por alguns segundos.
 * @param {string} message
 * @param {number} [duration=3200]
 */
export function showToast(message, duration = 3200) {
  const el = ensureToast();
  el.textContent = message;

  // reinicia a animação mesmo se já estiver visível
  el.classList.remove("show");
  void el.offsetWidth; // força reflow
  el.classList.add("show");

  window.clearTimeout(hideTimer);
  hideTimer = window.setTimeout(() => el.classList.remove("show"), duration);
}
