export default function Home() {
  return (
    <main style={{ padding: 32 }}>
      <h1>Cutforge + Next.js</h1>
      {/* A plain <a>, not next/link: the COOP/COEP headers on /editor only take effect on a full page load. */}
      <a href="/editor">Open the editor</a>
    </main>
  );
}
