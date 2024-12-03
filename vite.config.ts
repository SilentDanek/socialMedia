import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    server: {
        port: 3000
    },
    preview: {
        port: 3000
    },
    build: {
        rollupOptions: {
            external: (id) => {
                const patterns = /\.(test|stories|e2e)\.(ts|tsx)$/;
                return patterns.test(id);
            }
        }
    }
});
