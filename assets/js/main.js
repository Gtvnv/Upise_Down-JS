/**
 * Ponto de entrada da aplicação.
 * Orquestra os módulos: tema, áudio, scroll reveal e formulário.
 *
 * Carregado como módulo ES (<script type="module">), então já roda em
 * modo estrito e é adiado por padrão (equivale a defer).
 */

import { initTheme } from "./modules/theme.js";
import { initAudio } from "./modules/audio.js";
import { initScrollReveal } from "./modules/scrollReveal.js";
import { initForm } from "./modules/form.js";
import { showToast } from "./modules/toast.js";

function bootstrap() {
  initTheme(); // 1. restaura/aplica o tema (dispara themechange)
  initAudio(); // 2. conecta a trilha sonora ao tema
  initScrollReveal(); // 3. revela seções ao rolar
  initForm({ showToast }); // 4. valida e envia o formulário
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootstrap);
} else {
  bootstrap();
}
