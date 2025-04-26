import { ConfigEnv, defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import Inspecct from 'vite-plugin-inspect'
import path from 'path'
import fs from 'fs'

const prefetchPaths:string[]=['src/views/menu/index.tsx']
const prefetchUrls:string[]=[]
const getPrefetchPaths = () => {
      const manifestPath = path.resolve('', 'dist/.vite/manifest.json');
      try {
        if (fs.existsSync(manifestPath)) {
          const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
          prefetchPaths.forEach((item) => {
            const path = manifest[item].file;
            if (path && !prefetchUrls.includes(path)) {
              prefetchUrls.push(path);
            }
          });
        }
      } catch (error) {
        console.error('获取预取路径时出错:', error);
      }
}
getPrefetchPaths()

export const PrefetchLazyPlugins = (path: string[] = []) => {
  return {
    name: 'vite-plugin-prefetch-lazy',
    transformIndexHtml(html: string) {
      if (!path.length) return;
      let prefetchstring = ''
      path.forEach((item) => {
        prefetchstring += `<link rel="prefetch" href="${item}" as="script">`
      })
      return html.replace('</head>', prefetchstring + '</head>')
    }
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }: ConfigEnv) => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  console.log('env', env)
  return {
    
    server: {
      proxy: {
        '/api': {
          target: 'https://m1.apifoxmock.com/m1/6252413-5946368-default',
          changeOrigin: true,
        }
      }
    },
    build: {
      manifest: true,
      rollupOptions: {
        output: {
          // 静态资源分类打包
          // manualChunks: {
          //   'react-vendor': ['react', 'react-dom', 'react-router'],
          //   'antd-vendor': ['antd'],
          //   'echarts-vendor': ['echarts'],
          //   'views-vendor': ['./src/views/user/','./src/views/dept/'],
          // }
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('antd')) {
                return 'antd-vendor'
              }
              if (id.includes('echarts')) {
                return 'echarts-vendor'
              }
              if (id.includes('react')) {
                return 'react-vendor'
              }
            }
            if (id.includes('/views/')) {
              const modulename = id.split('/views/')[1].split('/')[0]
              return 'views-' + modulename
            }
          }
        }
      }
    },
    plugins: [
      react(),
      visualizer({
        open: true,
      }), 
      Inspecct(),
      PrefetchLazyPlugins(prefetchUrls)
    ],
  }
})