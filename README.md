# Cutforge examples

Runnable examples for [Cutforge](https://cutforge.dev), a video editor you embed in your web app. It runs entirely in the browser: WebGPU compositing, WebCodecs decode and encode, and a Rust/WASM core. There are no render servers, and your users' footage is never uploaded.

This repository is also home to Cutforge's [changelog](CHANGELOG.md), an [architecture overview](ARCHITECTURE.md) and the public [issue tracker](../../issues).

## Run an example

Each example installs [`@cutforge/editor`](https://www.npmjs.com/package/@cutforge/editor) from npm and runs as the watermarked demo, so no key or account is needed.

| Example | Stack | Shows |
|---|---|---|
| [`react-vite`](react-vite) | React 19 + Vite | `<Editor>`, driving an export from your own button through a `ref`, `onExportComplete` |
| [`nextjs`](nextjs) | Next.js 16, App Router | Loading the editor client-only with `next/dynamic`, COOP/COEP headers scoped to one route |
| [`vue`](vue) | Vue 3 + Vite | The framework-agnostic `createEditor(el, options)`, `editor.on(...)`, `editor.destroy()` |
| [`vanilla`](vanilla) | No framework + Vite | The same API in a plain script |

```bash
cd react-vite    # or nextjs, vue, vanilla
npm install
npm run dev
```

Open the printed URL, drop a video onto the editor, cut it, and export. The export renders on your machine.

To remove the watermark and the 60-second, 720p export cap, copy `.env.example` to `.env` (`.env.local` for Next.js) and paste your license key.

## Notes that apply to every example

- **Cross-origin isolation.** Every example sends `Cross-Origin-Opener-Policy: same-origin` and `Cross-Origin-Embedder-Policy: require-corp`. That turns on the editor's low-latency audio engine. Without them the editor still works on a simpler audio path.
- **Give the editor a real height.** It fills its container.
- **One editor per page.** Destroy it (or unmount `<Editor>`) when the view goes away; that releases its workers, GPU context and audio.
- **React is a peer dependency,** even from Vue or plain JavaScript: the editor renders its own UI with it.
- **Browsers:** Chromium 105+, Firefox 105+, Safari 17+. The editor needs WebCodecs and WebGPU or WebGL2.

## What leaves the browser

Nothing about your users or their media. The only network request the SDK makes is a license check (the key and the SDK version, at most once a week) when you use a hosted key, and none with an offline key. The [due-diligence page](https://cutforge.dev/evaluate/) lists everything and shows how to verify it.

## Documentation

- [Docs and SDK reference](https://cutforge.dev/docs/)
- [React guide](https://cutforge.dev/guides/react-video-editor/) and [Next.js guide](https://cutforge.dev/guides/nextjs-video-editor/)
- [How Cutforge compares](https://cutforge.dev/compare/) with Rendley, IMG.LY, Remotion and open-source options
- [Live demo](https://app.cutforge.dev)

## Issues and questions

Found a bug or missing a feature? [Open an issue](../../issues/new/choose). For security problems, follow [SECURITY.md](SECURITY.md) instead of opening a public issue. For licensing and sales questions, email [maxence.leguery@gmail.com](mailto:maxence.leguery@gmail.com).

## License

The example code in this repository is [MIT licensed](LICENSE): copy it into your product.

`@cutforge/editor` itself is commercial software under the [Cutforge license](https://cutforge.dev/license/). It runs as a free, watermarked demo until you add a key; see [pricing](https://cutforge.dev/#pricing).
