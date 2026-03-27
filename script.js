const header = document.querySelector('.site-header');
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

const setHeaderState = () => {
  header.classList.toggle('scrolled', window.scrollY > 12);
};

setHeaderState();
window.addEventListener('scroll', setHeaderState);

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  },
  {
    threshold: 0.12,
  }
);

document.querySelectorAll('.fade-in-up').forEach((el) => observer.observe(el));

const carousel = document.getElementById('productCarousel');
const prev = document.querySelector('.carousel-btn.prev');
const next = document.querySelector('.carousel-btn.next');

const moveCarousel = (direction) => {
  if (!carousel) return;
  const amount = Math.max(280, carousel.clientWidth * 0.8);
  carousel.scrollBy({ left: amount * direction, behavior: 'smooth' });
};

prev?.addEventListener('click', () => moveCarousel(-1));
next?.addEventListener('click', () => moveCarousel(1));

const form = document.querySelector('.contact-form');
form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const button = form.querySelector('button[type="submit"]');
  if (button) {
    const original = button.textContent;
    button.textContent = 'Отправлено';
    button.disabled = true;
    setTimeout(() => {
      button.textContent = original;
      button.disabled = false;
      form.reset();
    }, 1800);
  }
});
