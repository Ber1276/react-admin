import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {RouterProvider} from 'react-router'
import '@ant-design/v5-patch-for-react-19';
import './index.css'
import router from './router/index.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
