import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@ant-design/v5-patch-for-react-19';
import './styles/theme.less'
import './index.css'
import App from './App.tsx';
import storage from './utils/storage.ts';

const isDark = storage.get('isDark') === 'true';
if (isDark) {
    document.documentElement.dataset.theme = 'dark';
    document.documentElement.classList.add('dark');
} else {
    document.documentElement.dataset.theme = 'light';
    document.documentElement.classList.remove('dark');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App></App>
  </StrictMode>,
)
