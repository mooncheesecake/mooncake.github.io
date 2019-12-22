import Router from './router.js';

const router = new Router(document.querySelector('.main'));

window.addEventListener('changeRoute', (event) => router.changeRoute(event.detail.route));

window.dispatchEvent(new CustomEvent('changeRoute', { detail: { route: 'login' } }));