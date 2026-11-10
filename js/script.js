const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileNav = document.getElementById('mobile-nav');

mobileMenuButton.addEventListener('click', () => {
  const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
  mobileMenuButton.setAttribute('aria-expanded', String(!isExpanded));
  mobileMenuButton.setAttribute('aria-label', isExpanded ? 'Abrir menú de navegación' : 'Cerrar menú de navegación');
  mobileMenuButton.innerHTML = `<i class="fa-solid ${isExpanded ? 'fa-bars' : 'fa-xmark'}" aria-hidden="true"></i>`;
  mobileNav.classList.toggle('hidden', isExpanded);
});

mobileNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileNav.classList.add('hidden');
    mobileMenuButton.setAttribute('aria-expanded', 'false');
    mobileMenuButton.setAttribute('aria-label', 'Abrir menú de navegación');
    mobileMenuButton.innerHTML = '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
  });
});

document.getElementById('download-cv').addEventListener('click', () => {
  window.print();
});

const skillTabs = document.querySelectorAll('.skill-tab');
const skillPanels = document.querySelectorAll('.skill-panel');

skillTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    skillTabs.forEach((button) => {
      button.classList.remove('active', 'border-emerald-500/30', 'bg-emerald-500/15', 'text-emerald-300');
      button.classList.add('border-slate-700', 'bg-slate-900/60', 'text-slate-300');
    });

    tab.classList.add('active', 'border-emerald-500/30', 'bg-emerald-500/15', 'text-emerald-300');
    tab.classList.remove('border-slate-700', 'bg-slate-900/60', 'text-slate-300');

    const target = tab.dataset.target;
    skillPanels.forEach((panel) => {
      panel.classList.toggle('hidden', panel.dataset.panel !== target);
    });
  });
});

const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((filterButton) => {
      filterButton.classList.remove('active', 'border-emerald-500/30', 'bg-emerald-500/15', 'text-emerald-300');
      filterButton.classList.add('border-slate-700', 'bg-slate-900/60', 'text-slate-300');
    });

    button.classList.add('active', 'border-emerald-500/30', 'bg-emerald-500/15', 'text-emerald-300');
    button.classList.remove('border-slate-700', 'bg-slate-900/60', 'text-slate-300');

    const filter = button.dataset.filter;
    projectCards.forEach((card) => {
      const matches = filter === 'all' || card.dataset.category === filter;
      card.style.display = matches ? 'block' : 'none';
    });
  });
});

const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !message) {
    status.textContent = 'Por favor, completa todos los campos.';
    status.classList.remove('hidden');
    return;
  }

  if (!emailRegex.test(email)) {
    status.textContent = 'Introduce un email válido.';
    status.classList.remove('hidden');
    return;
  }

  const subject = encodeURIComponent(`Contacto desde el portfolio: ${name}`);
  const body = encodeURIComponent(`Nombre: ${name}\nEmail: ${email}\n\n${message}`);
  status.textContent = 'Se abrirá tu aplicación de correo para enviar el mensaje.';
  status.classList.remove('hidden');
  window.location.href = `mailto:arturojimenezaparicio@gmail.com?subject=${subject}&body=${body}`;
});

document.getElementById('year').textContent = new Date().getFullYear();
