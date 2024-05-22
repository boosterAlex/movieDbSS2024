import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
    appType: 'mpa', // disable history fallback
    plugins: [svgr({ include: '**/*.svg' }), react()],
    server: {
        port: 3000
    },
    resolve: {
        alias: {
            src: '/src'
        }
    }
})
