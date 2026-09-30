'use client';

import { Editor } from '@cutforge/editor';
import '@cutforge/editor/style.css';

export default function VideoEditor() {
  return (
    <Editor
      // No key: watermarked demo (60 s / 720p exports). Put your key in .env.local to lift it.
      license={process.env.NEXT_PUBLIC_CUTFORGE_LICENSE}
      // The export renders in the browser and arrives here as a Blob: upload it to your
      // own storage (for example with a presigned URL from a route handler).
      onExportComplete={({ blob, filename }) => console.log('exported', filename, blob.size, 'bytes')}
      style={{ height: '100vh' }}
    />
  );
}
