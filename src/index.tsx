import '@telegram-apps/telegram-ui/dist/styles.css';
import './main.css';
import { AppRoot } from '@telegram-apps/telegram-ui';
import { createRoot } from 'react-dom/client';
import { App } from './App';

const appElement = document.getElementById('app');
if (!appElement) {
  throw new Error('Failed to find the app element');
}
const root = createRoot(appElement);
root.render(
  <AppRoot platform="ios">
    <App />
  </AppRoot>
);
