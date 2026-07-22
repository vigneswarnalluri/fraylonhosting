import { defineConfig } from 'vite';
import { resolve } from 'path';
import { readdirSync } from 'fs';
import { spawn } from 'child_process';

// Multi-page app: build EVERY top-level *.html file as its own entry point.
// Using a glob over the project root (instead of a hand-maintained list) means
// new pages are picked up automatically. Forgetting to register a page is what
// caused the post-payment blank page: success.html was missing from the build,
// so cart.js's redirect to success.html 404'd. A glob prevents that whole class
// of bug — add an HTML file, it ships.
const htmlEntries = Object.fromEntries(
    readdirSync(__dirname)
        .filter((file) => file.endsWith('.html'))
        .map((file) => [file.replace(/\.html$/, ''), resolve(__dirname, file)])
);

function startBackendServerPlugin() {
    let serverProcess = null;
    return {
        name: 'start-backend-server',
        configureServer(server) {
            console.log('[vite] Spawning backend API server (node server/server.js)...');
            serverProcess = spawn('node', ['server/server.js'], {
                stdio: 'inherit',
                shell: true
            });
            
            // Clean up process on close
            server.httpServer?.on('close', () => {
                if (serverProcess) {
                    console.log('[vite] Terminating backend API server...');
                    serverProcess.kill();
                }
            });
        }
    };
}

export default defineConfig({
    plugins: [startBackendServerPlugin()],
    css: {
        postcss: {},
    },
    server: {
        open: '/index.html',
        proxy: {
            // Dev-only: forward /api/* to the Node payment server on :4242
            '/api': {
                target: 'http://localhost:4242',
                changeOrigin: true,
            },
        },
    },
    build: {
        rollupOptions: {
            input: htmlEntries,
        },
    },
});
