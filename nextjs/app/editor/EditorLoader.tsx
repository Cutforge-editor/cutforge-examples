'use client';

import dynamic from 'next/dynamic';

// The editor needs browser APIs (GPU, workers, WebCodecs) from its first line, so it must
// never render on the server. `ssr: false` is only allowed inside a client component,
// hence this small loader. Bonus: the editor's code only downloads on this route.
const VideoEditor = dynamic(() => import('./VideoEditor'), {
  ssr: false,
  loading: () => <p style={{ padding: 32 }}>Loading editor…</p>,
});

export default function EditorLoader() {
  return <VideoEditor />;
}
