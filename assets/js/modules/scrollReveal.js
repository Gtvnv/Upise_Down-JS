/**
 * Módulo de scroll reveal — revela os elementos conforme entram na viewport,
 * usando IntersectionObserver (performático e sem listeners de scroll).
 *
 * Marca com a classe `.reveal` as seções principais e aplica `.is-visible`
 * quando elas cruzam o limiar de visibilidade.
 */

const REVEAL_SELECTORS = [
  "#section-inverted-world",
  "#section-stranger-things-trailer",
  "#section-stranger-things-gallery .section-text",
  "#section-form",
  "footer",
];

export function initScrollReveal() {
  const targets = REVEAL_SELECTORS.flatMap((selector) =>
    Array.from(document.querySelectorAll(selector))
  );

  targets.forEach((el) => el.classList.add("reveal"));

  // sem suporte a IntersectionObserver: mostra tudo de uma vez
  if (!("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target); // anima só uma vez
        }
      });
    },
    { threshold: 0.15 }
  );

  targets.forEach((el) => observer.observe(el));
}
