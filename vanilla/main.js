import { createEditor } from '@cutforge/editor';
import '@cutforge/editor/style.css';

const editor = createEditor(document.getElementById('editor'), {
  // No key: watermarked demo (60 s / 720p exports). Put your key in .env to lift it.
  license: import.meta.env.VITE_CUTFORGE_LICENSE,
});

// The export renders on this machine and arrives as a Blob: upload it to your own storage here.
editor.on('export-complete', ({ blob, filename }) => {
  document.getElementById('status').textContent =
    `Exported ${filename} (${(blob.size / 1e6).toFixed(1)} MB), rendered on this machine.`;
});

// In a single-page app, call editor.destroy() when the view goes away: it releases
// the editor's workers, GPU context and audio.
