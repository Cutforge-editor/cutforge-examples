# How Cutforge works

Cutforge is a non-linear video editor that runs entirely in the browser. This page explains the pipeline, for anyone evaluating it or debugging an integration.

The guiding rule: **the main thread does almost nothing.** It runs the UI and dispatches state, and that is all. Decoding, encoding and disk I/O live in workers, pixel work runs on the GPU, the hot CPU loops are Rust compiled to WebAssembly, and every media byte sits in the browser's private file system.

## Pipeline

```
 import                preview                                   export
 ──────                ───────                                   ──────
 File ──► OPFS ──► demux (mp4box.js) ──► VideoDecoder ──► compositor ──► canvas
                                          (worker)       (worker, WebGPU
                                                          on OffscreenCanvas)
                                                               │
                                                               └──► VideoEncoder ──► MP4 / WebM muxer ──► Blob
 audio: AudioDecoder ──► AudioWorklet mixer ──► speakers
                    └──► block mixer ──► AudioEncoder ──────────────┘
```

| Layer | How |
|---|---|
| Compositor | WebGPU (`importExternalTexture` and WGSL effects) on an `OffscreenCanvas` in a worker, with WebGL2 and Canvas2D fallbacks. The backend is chosen at runtime; a small indicator in the preview's corner shows which one is active. |
| Decode | WebCodecs `VideoDecoder` in a worker, with mp4box.js for demuxing. |
| Source I/O | Bytes are streamed from an OPFS file on demand, never read whole. |
| Proxies | Sources above 1080p are re-encoded to 540p H.264 on import. Preview uses the proxy; export always reads the original. |
| Thumbnails | Generated lazily and cached as WebP in OPFS. |
| Audio | An AudioWorklet mixer fed through SharedArrayBuffer ring buffers when the page is cross-origin isolated (COOP and COEP headers), and `AudioBufferSourceNode` otherwise. |
| Export | Frame by frame through a WebCodecs `VideoEncoder`, muxed to MP4 or WebM, faster than realtime. Falls back to `MediaRecorder` where the encoder cannot be configured. |
| Storage | OPFS for media, proxies and thumbnails; IndexedDB for project metadata. |
| Core | Rust compiled to `wasm32` with SIMD: timeline scheduler, audio resampler, waveform peak summaries, software color path. Inlined in the package, so there is nothing extra to host. |

## What touches the network

Only the license check: with a hosted key, one `POST` to `https://license.cutforge.dev/v1/validate` carrying the key and the SDK version, cached for 7 days. Offline keys are verified locally and make no request. There is no analytics or telemetry, and user media is never uploaded. See the [due-diligence page](https://cutforge.dev/evaluate/) for the full list and how to verify it.

## Browser requirements

Chromium 105+ (Chrome, Edge, Arc, Brave), Firefox 105+, Safari 17+. The editor needs `OffscreenCanvas`, WebCodecs and a GPU context (WebGPU, or WebGL2). Below that it refuses to start with a clear "upgrade your browser" error instead of running degraded. Firefox and Safari have partial WebCodecs encoder support, so proxy generation turns off there and preview decodes the full-resolution source.

## Testing

- Unit tests for the timeline, decoding, color (LUT parsing, curves), audio mixing, export, licensing and the embedding API.
- An end-to-end check in a real browser: import a generated clip, export it, and inspect the file with `ffprobe` (resolution, duration, audio, bitrate, demo watermark).
- A real-browser profiling harness that measures CPU, memory, frame rate and export time per scenario, and checks exports frame by frame against a numbered test video.
