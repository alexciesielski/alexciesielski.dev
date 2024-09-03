/// <reference types="vitest" />

import analog from '@analogjs/platform';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { defineConfig, loadEnv, splitVendorChunkPlugin } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    root: __dirname,
    cacheDir: `../node_modules/.vite`,
    build: {
      outDir: '../dist/./app/client',
      reportCompressedSize: true,
      target: ['es2020'],
    },
    server: {
      fs: {
        allow: ['.'],
      },
    },
    plugins: [
      analog({
        ssr: false,
        prerender: {
          routes: async () => ['/', '/blog', '/cv'],
        },
        nitro: {
          routeRules: {
            '/cv': {
              headers: { 'X-Robots-Tag': 'noindex' },
            },
          },
        },
      }),
      nxViteTsPaths(),
      splitVendorChunkPlugin(),
    ],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['src/test-setup.ts'],
      include: ['**/*.spec.ts'],
      reporters: ['default'],
    },
    define: {
      'import.meta.vitest': mode !== 'production',
      'import.meta.vite_env': env,
      'vite.import.meta.vite_env': env,
      __APP_ENV__: JSON.stringify(env),
    },
  };
});
