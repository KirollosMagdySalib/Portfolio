// ============================================================
// Mobile nav toggle
// ============================================================
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');

function closeNav() {
  navToggle.classList.remove('is-open');
  navToggle.setAttribute('aria-expanded', 'false');
  mainNav.classList.remove('is-open');
}

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('is-open');
  navToggle.classList.toggle('is-open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

// Close the mobile menu whenever a nav link is used
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', closeNav);
});

// Close on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeNav();
});

// ============================================================
// Blueprint / Print mode toggle (dark/light switch)
// ============================================================
const modeToggle = document.getElementById('mode-toggle');
const modeLabel = document.getElementById('mode-label');
const root = document.documentElement;

const STORAGE_KEY = 'portfolio-mode';

function applyMode(mode) {
  if (mode === 'print') {
    root.setAttribute('data-mode', 'print');
    modeLabel.textContent = 'Blueprint mode';
    modeToggle.setAttribute('aria-pressed', 'true');
  } else {
    root.removeAttribute('data-mode');
    modeLabel.textContent = 'Print mode';
    modeToggle.setAttribute('aria-pressed', 'false');
  }
}

const saved = localStorageSafeGet(STORAGE_KEY);
if (saved) {
  applyMode(saved);
} else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
  applyMode('print');
}

modeToggle.addEventListener('click', () => {
  const isPrint = root.getAttribute('data-mode') === 'print';
  const next = isPrint ? 'blueprint' : 'print';
  applyMode(next);
  localStorageSafeSet(STORAGE_KEY, next);
});

// Safe localStorage helpers (in case storage is blocked, e.g. private mode)
function localStorageSafeGet(key) {
  try { return window.localStorage.getItem(key); }
  catch (e) { return null; }
}
function localStorageSafeSet(key, value) {
  try { window.localStorage.setItem(key, value); }
  catch (e) { /* ignore */ }
}

// ============================================================
// Contact form validation
// ============================================================
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

const fields = {
  name: {
    input: document.getElementById('name'),
    error: document.getElementById('name-error'),
    validate: (v) => v.trim().length >= 2,
    message: 'Please enter your full name (at least 2 characters).'
  },
  email: {
    input: document.getElementById('email'),
    error: document.getElementById('email-error'),
    validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
    message: 'Please enter a valid email address.'
  },
  message: {
    input: document.getElementById('message'),
    error: document.getElementById('message-error'),
    validate: (v) => v.trim().length >= 10,
    message: 'Tell me a little more (at least 10 characters).'
  }
};

function validateField(field) {
  const value = field.input.value;
  const valid = field.validate(value);
  const row = field.input.closest('.form-row');
  if (valid) {
    row.classList.remove('has-error');
    field.error.textContent = '';
  } else {
    row.classList.add('has-error');
    field.error.textContent = field.message;
  }
  return valid;
}

Object.values(fields).forEach(field => {
  field.input.addEventListener('blur', () => validateField(field));
  field.input.addEventListener('input', () => {
    if (field.input.closest('.form-row').classList.contains('has-error')) {
      validateField(field);
    }
  });
});


const FORM_ENDPOINT = 'https://formspree.io/f/xeeyylyd';

const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const results = Object.values(fields).map(validateField);
  const allValid = results.every(Boolean);

  if (!allValid) {
    status.textContent = 'Please fix the highlighted fields above.';
    status.className = 'form-status error';
    return;
  }

  const originalBtnText = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
  status.textContent = '';
  status.className = 'form-status';

  try {
    const response = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(form)
    });

    if (response.ok) {
      status.textContent = 'Message sent — thanks for reaching out! I\'ll reply soon.';
      status.className = 'form-status success';
      form.reset();
    } else {
      status.textContent = 'Something went wrong. Please email me directly instead.';
      status.className = 'form-status error';
    }
  } catch (err) {
    status.textContent = 'Network error — please email me directly instead.';
    status.className = 'form-status error';
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnText;
  }
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();