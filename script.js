/* Shared language and navigation behavior for both pages. */
(() => {
  'use strict';
  document.documentElement.classList.remove('no-js');
  const buttons = [...document.querySelectorAll('.langBtn')];
  const menuButton = document.querySelector('.menu-toggle');
  const menu = document.querySelector('#primary-nav');
  function closeMenu() {
    menuButton?.setAttribute('aria-expanded', 'false');
    menu?.classList.remove('is-open');
  }
  function setLanguage(value) {
    const language = value === 'en' ? 'en' : 'pt';
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en';
    document.querySelectorAll('[data-pt][data-en]').forEach(element => {
      element.textContent = element.dataset[language];
    });
    buttons.forEach(button => {
      const selected = button.dataset.lang === language;
      button.classList.toggle('active', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    menu?.setAttribute('aria-label', language === 'pt' ? 'Navegação principal' : 'Main navigation');
    if (document.body.classList.contains('profile-page')) {
      document.title = language === 'pt'
        ? 'Vander Nelson Spósito | Business Intelligence, PMO e BPM'
        : 'Vander Nelson Spósito | Business Intelligence, PMO & BPM';
      document.querySelector('meta[name="description"]').content = language === 'pt'
        ? 'Consultor sênior em Business Intelligence, gestão de projetos e BPM. Power BI, experiência internacional em seis países e mais de 40 anos em tecnologia.'
        : 'Senior consultant in Business Intelligence, project management and BPM. Power BI, international project experience across six countries and over 40 years in technology.';
    }
    try { localStorage.setItem('lang', language); } catch { /* Optional persistence. */ }
  }
  let initialLanguage = 'pt';
  try { initialLanguage = localStorage.getItem('lang') || 'pt'; } catch { /* Use default. */ }
  setLanguage(initialLanguage);
  buttons.forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.lang)));
  menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    menu?.classList.toggle('is-open', open);
  });
  menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuButton?.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      menuButton.focus();
    }
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('header')) closeMenu();
  });
  matchMedia('(min-width: 901px)').addEventListener('change', closeMenu);
})();
