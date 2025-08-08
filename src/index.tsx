import { render } from 'solid-js/web';
import { onMount } from 'solid-js';
import App from './App';
import './index.css';

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
  render(() => <App />, root);
} else {
  console.error("Root element not found");
}
