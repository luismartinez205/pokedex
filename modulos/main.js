const form = document.getElementById("form");

function setFieldError(field, message) {
  const group = field.closest(".form-group");
  const errorEl = group?.querySelector(".error-message");
  group?.classList.add("error");
  if (errorEl) errorEl.textContent = message;
}

function clearFieldError(field) {
  const group = field.closest(".form-group");
  const errorEl = group?.querySelector(".error-message");
  group?.classList.remove("error");
  if (errorEl) errorEl.textContent = "";
}

function validateRequiredField(field) {
  const value = field.value.trim();

  // Campo vacío
  if (!value) {
    setFieldError(field, "Este campo es requerido");
    return false;
  }

  // Email con formato inválido
  if (field.type === "email" && field.validity.typeMismatch) {
    setFieldError(field, "Please enter a valid email address");
    return false;
  }

  clearFieldError(field);
  return true;
}

function validateRadioGroup() {
  const radios = form.querySelectorAll("input[name='query']");
  const radioGroup = radios[0]?.closest(".form-group");
  const checked = Array.from(radios).some(r => r.checked);

  if (!checked) {
    radioGroup?.classList.add("error");
    return false;
  }

  radioGroup?.classList.remove("error");
  return true;
}

function validateConsentCheckbox() {
  const checkbox = form.querySelector(".checkbox input");
  const checkboxGroup = checkbox?.closest(".form-group");

  if (!checkbox?.checked) {
    checkboxGroup?.classList.add("error");
    return false;
  }

  checkboxGroup?.classList.remove("error");
  return true;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let isValid = true;

  // Inputs y textarea requeridos
  const fields = form.querySelectorAll("input[required], textarea[required]");
  fields.forEach(field => {
    const ok = validateRequiredField(field);
    if (!ok) isValid = false;
  });

  // Radio group
  if (!validateRadioGroup()) isValid = false;

  // Checkbox consentimiento
  if (!validateConsentCheckbox()) isValid = false;

  const toast = document.getElementById("toast");

  if (isValid) {
    toast.classList.add("show");
    form.reset();

    // Limpia estilos de error tras reset
    fields.forEach(clearFieldError);

    setTimeout(() => {
      toast.classList.remove("show");
    }, 4000);
  }
});

// Validación en tiempo real para inputs/textarea
const liveFields = form.querySelectorAll("input[required], textarea[required]");
liveFields.forEach(field => {
  const handler = () => validateRequiredField(field);
  field.addEventListener("input", handler);
  field.addEventListener("blur", handler);
});

// Validación en tiempo real para radios
const radios = form.querySelectorAll("input[name='query']");
const radioGroup = radios[0]?.closest(".form-group");
radios.forEach(radio => {
  radio.addEventListener("change", () => {
    const checked = Array.from(radios).some(r => r.checked);
    if (checked) radioGroup?.classList.remove("error");
  });
});

// Validación en tiempo real para checkbox consentimiento
const consent = form.querySelector(".checkbox input");
const consentGroup = consent?.closest(".form-group");
consent?.addEventListener("change", () => {
  if (consent.checked) consentGroup?.classList.remove("error");
});


