import { defineConfig } from 'vite';

// COOP + COEP make the page cross-origin isolated, which turns on the editor's
// low-latency audio engine. Without them the editor still works on a simpler audio path.
const isolation = {
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Embedder-Policy': 'require-corp',
};

export default defineConfig({
  server: { headers: isolation },
  preview: { headers: isolation },
});
