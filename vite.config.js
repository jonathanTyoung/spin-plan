import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
    return {
        base: '/spin-plan/',
        server: {
            open: true,
        },
        build: {
            outDir: 'build',
        },
        plugins: [react(),],
    }});

