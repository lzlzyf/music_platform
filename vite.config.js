import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/sms': {
        target: 'http://172.20.10.11:3600',
        changeOrigin: true,
        // 支持websocket和重写路径（如有需要可开启）
        // ws: true,
        // rewrite: path => path.replace(/^\/sms/, '/sms'),
      }
    }
  }
}); 