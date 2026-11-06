/**
 * Módulo do formulário de inscrição no clube de D&D.
 * Faz validação client-side acessível (mensagens por campo + aria-invalid)
 * e exibe um toast de confirmação ao enviar.
 *
 * Observação: o projeto original integrava com o Firebase. Aqui a submissão
 * é simulada localmente para manter a landing page estática e autocontida;
 * o ponto de integração está marcado em `submitSubscription`.
 */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Cria (ou reaproveita) o elemento de mensagem de erro logo após o campo. */
function getErrorSlot(input) {
  const field = input.closest("label")?.parentElement ?? input.parentElement;
  let slot = input.nextElementSibling;
  if (!slot || !slot.classList.contains("field-error-message")) {
    slot = document.createElement("span");
    slot.className = "field-error-message";
    input.insertAdjacentElement("afterend", slot);
  }
  return slot;
}

function setError(input, message) {
  const slot = getErrorSlot(input);
  slot.textContent = message ?? "";
  input.setAttribute("aria-invalid", message ? "true" : "false");
}

/**
 * Valida um único campo.
 * @returns {boolean} true se válido
 */
function validateField(input) {
  const value = input.value.trim();

  if (!value) {
    setError(input, "Este campo é obrigatório.");
    return false;
  }

  if (input.type === "email" && !EMAIL_REGEX.test(value)) {
    setError(input, "Informe um e-mail válido.");
    return false;
  }

  if (input.id === "txtName" && value.length < 3) {
    setError(input, "Digite seu nome completo.");
    return false;
  }

  setError(input, "");
  return true;
}

/** Simula o envio da inscrição. Troque por uma chamada real (fetch/Firebase). */
async function submitSubscription(data) {
  // --- PONTO DE INTEGRAÇÃO ---
  // Ex.: await addDoc(collection(db, "subscriptions"), data);
  console.info("Nova inscrição no clube de D&D:", data);
  return new Promise((resolve) => setTimeout(resolve, 400));
}

export function initForm({ showToast }) {
  const form = document.querySelector("#section-form form");
  if (!form) return;

  const button = document.getElementById("btnSubscribe");
  const fields = Array.from(form.querySelectorAll("input, textarea"));

  // valida em tempo real ao sair do campo
  fields.forEach((field) => {
    field.addEventListener("blur", () => validateField(field));
    field.addEventListener("input", () => {
      if (field.getAttribute("aria-invalid") === "true") validateField(field);
    });
  });

  const handleSubmit = async (event) => {
    event?.preventDefault();

    const results = fields.map(validateField);
    const allValid = results.every(Boolean);

    if (!allValid) {
      const firstInvalid = fields.find(
        (f) => f.getAttribute("aria-invalid") === "true"
      );
      firstInvalid?.focus();
      showToast?.("Preencha os campos destacados para continuar.");
      return;
    }

    const data = {
      name: form.querySelector("#txtName")?.value.trim(),
      email: form.querySelector("#txtEmail")?.value.trim(),
      level: form.querySelector("#txtLevel")?.value.trim(),
      character: form.querySelector("#txtCharacter")?.value.trim(),
    };

    button.disabled = true;
    const originalLabel = button.textContent;
    button.textContent = "Enviando...";

    try {
      await submitSubscription(data);
      form.reset();
      fields.forEach((f) => f.setAttribute("aria-invalid", "false"));
      showToast?.("Inscrição enviada! Bem-vindo ao clube. 🎲");
    } catch {
      showToast?.("Algo deu errado. Tente novamente.");
    } finally {
      button.disabled = false;
      button.textContent = originalLabel;
    }
  };

  button?.addEventListener("click", handleSubmit);
  form.addEventListener("submit", handleSubmit);
}
