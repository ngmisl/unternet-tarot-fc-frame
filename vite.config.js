import { defineConfig } from 'vite';

export default defineConfig({
  // Use relative paths instead of absolute for better compatibility with hosts
  base: './',
  build: {
    // Ensure proper MIME types and CSP compatibility
    cssCodeSplit: true,
    sourcemap: true,
    // Avoid using dynamic imports for better CSP compatibility
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  server: {
    // Configure proper headers for local development
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Resource-Policy': 'cross-origin'
    }
  }
});
