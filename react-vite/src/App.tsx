import { useRef, useState } from 'react';
import { Editor, type CutforgeCommands } from '@cutforge/editor';
import '@cutforge/editor/style.css';

export default function App() {
  const editor = useRef<CutforgeCommands>(null);
  const [status, setStatus] = useState('Drop a video on the editor, then export.');

  // Driving the export from your own UI: `export()` resolves with the Blob and does
  // not download it, so what happens next is up to you (this example downloads it).
  async function exportFromHost() {
    const result = await editor.current?.export({ format: 'mp4' });
    if (!result) return;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(result.blob);
    a.download = result.filename;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  return (
    <div style={{ display: 'grid', gridTemplateRows: 'auto 1fr', height: '100%' }}>
      <header style={{ display: 'flex', gap: 12, alignItems: 'center', padding: 8, font: '14px system-ui' }}>
        <button onClick={exportFromHost}>Export MP4 from the host app</button>
        <span>{status}</span>
      </header>
      <Editor
        ref={editor}
        // No key: watermarked demo (60 s / 720p exports). Put your key in .env to lift it.
        license={import.meta.env.VITE_CUTFORGE_LICENSE}
        // Fires after every export, from the editor's own Export button (which also
        // downloads the file) or from export(). Upload the Blob to your storage here.
        onExportComplete={({ blob, filename }) =>
          setStatus(`Exported ${filename} (${(blob.size / 1e6).toFixed(1)} MB), rendered on this machine.`)
        }
        style={{ minHeight: 0 }}
      />
    </div>
  );
}
