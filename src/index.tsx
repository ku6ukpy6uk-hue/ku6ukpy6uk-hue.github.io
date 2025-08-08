import { render } from 'solid-js/web';
import { onMount } from 'solid-js';
import App from './App';
import './index.css';
import './fallback.css'; // Добавьте эту строку

declare global {
  interface Window {
    Telegram: any;
  }
}

onMount(() => {
  if (window.Telegram?.WebApp) {
    window.Telegram.WebApp.ready();
    window.Telegram.WebApp.expand();
    window.Telegram.WebApp.enableClosingConfirmation();
  }
});

const root = document.getElementById('root');

if (root) {
  // Добавьте fallback
  root.innerHTML = '<div class="loading">Загрузка магазина...</div>';
  
  setTimeout(() => {
    render(() => <App />, root);
  }, 500);
} else {
  console.error("Root element not found");
}
