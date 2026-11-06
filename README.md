<p align="center">
    <img width="300" src="assets/images/banner/logo.svg" alt="Logo Mundo Invertido">
</p>

-------
Uma jornada para quem não tem medo do desconhecido. O caminho para o Mundo Invertido é incerto, repleto de obstáculos e perigos. Porém, a recompensa é grande: salvar Hawkings e o mundo todo das garras de Vecna. Você está preparado(a)?

## 💻 Tecnologias
- HTML
- CSS
- JavaScript (ES Modules)

## ✨ Destaques
Landing page com foco em **JavaScript modular** e **animações**:

- **Troca de mundos (tema) via JS modular** — sem `onclick` inline. A preferência é
  persistida em `localStorage` e respeita `prefers-color-scheme` na primeira visita.
- **Trilha sonora reativa** — a música acompanha o mundo ativo (normal ↔ invertido),
  destravando o áudio no primeiro gesto do usuário (contorna o bloqueio de autoplay).
- **Animações CSS** — pulsar da logo, "glitch" na troca de mundo, inversão 180° dos
  `.invert-element`, hover na galeria e botões, tudo com `prefers-reduced-motion`.
- **Scroll reveal** — seções surgem ao entrar na viewport via `IntersectionObserver`.
- **Formulário validado** — validação acessível em tempo real (`aria-invalid`,
  mensagens por campo) e feedback por toast; ponto de integração com backend marcado.
- **Acessibilidade e semântica** — `for`/`id` corrigidos, `role` inválidos removidos,
  `aria-pressed` no botão de tema e `aria-live` no toast.

### 🗂️ Organização do JavaScript
```
assets/js/
  main.js                 # ponto de entrada: orquestra os módulos
  modules/
    theme.js              # troca/persistência de tema + evento themechange
    audio.js              # trilha sonora reativa ao mundo
    scrollReveal.js       # reveal de seções via IntersectionObserver
    form.js               # validação acessível + submissão
    toast.js              # feedback não intrusivo (aria-live)
```

> 💡 Quer usar **TypeScript**? A arquitetura modular já está pronta para migração:
> renomeie os módulos para `.ts`, adicione um `tsconfig.json` e compile para `assets/js`.
> Os JSDoc existentes facilitam a tipagem incremental.

### ▶️ Como rodar
Os módulos ES exigem HTTP (não funcionam via `file://`). Suba um servidor estático:
```bash
npx http-server -p 5173 -c-1
# e acesse http://localhost:5173
```

## 💬 Assuntos abordados
- HTML
    - Estruturação da página
    - Semântica
    - Acessibilidade
    - SEO
- CSS
    - Posicionamentos
    - Pseudo-elementos
    - Pseudo-classes
    - Flexbox
    - Animações
- JavaScript
    - Manipulação do DOM
    - ES Modules e separação de responsabilidades
    - IntersectionObserver e CustomEvent
    - Validação de formulário e acessibilidade

## 🎨 Variáveis do Tema CSS
```css
/*** VARIABLES & THEMES ***/

:root {
  --primary-color: #cf0f0f;
  --primary-color-contrast: #ffffff;
  --field-background-color: #000;
}

.light-theme {
  --page-background: linear-gradient(
    180deg,
    #ffffff 0%,
    #ffffff 65%,
    rgba(255, 255, 255, 0.75) 100%
  );
  --header-background-color: #e3e3e3;
  --highlight-color: #000000;
  --featured-font-family: "Archivo", sans-serif;
  --character-top-image-src: url("../images/characters/kids-on-the-bike.svg");
  --character-top-image-color: #ffffff;
  --character-bottom-image-src: url("../images/characters/inverted-world-monster.svg");
  --character-bottom-image-color: #e5e5e5;
  --background-lamp-image: url("../images/backgrounds/lamps.png");
  --footer-background-color: #b5bbbf;
}

.dark-theme {
  --page-background: linear-gradient(
    180deg,
    #050000 0%,
    #130404 65%,
    rgba(19, 1, 1, 0.75) 100%
  );
  --header-background-color: #220f0f;
  --highlight-color: #ffffff;
  --featured-font-family: "Rubik Glitch", sans-serif;
  --character-bottom-image-src: url("../images/characters/kids-on-the-bike.svg");
  --character-bottom-image-color: rgba(255, 255, 255, 0.1);
  --character-top-image-src: url("../images/characters/inverted-world-monster.svg");
  --character-top-image-color: #000;
  --background-lamp-image: url("../images/backgrounds/lamps-inverted.png");
  --footer-background-color: #000;
}
```

## 🔗 Links auxiliares
- [W3C - World Wide Web Consortium](http://w3c.org)
- [WAI - Web Acessibility Initiative](https://www.w3.org/WAI/)
- [WCAG 2](https://www.w3.org/WAI/WCAG21/quickref/)
