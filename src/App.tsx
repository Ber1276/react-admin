import { RouterProvider } from 'react-router'
import router from './router'
import './App.css'
import { ConfigProvider, theme } from 'antd'
import { useStore } from './store'
function App() {
  const {isDark}=useStore()
  return (
    <ConfigProvider theme={{
      algorithm:isDark?theme.darkAlgorithm:theme.defaultAlgorithm,
    }}>
    <RouterProvider router={router}></RouterProvider>
    </ConfigProvider>
  )
}

export default App
