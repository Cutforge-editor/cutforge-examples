# Changelog

Notable changes to [`@cutforge/editor`](https://www.npmjs.com/package/@cutforge/editor). Versions are `major.minor.patch`; see [maintained versions](#maintained-versions) for which lines still get fixes.

## 1.2.0 (30 September 2026)

### Upgrade notes

- **`customCss` selectors changed.** Every editor class now has a `cf-` prefix, so your page's classes cannot collide with the editor's: `.cutforge-root .topbar` becomes `.cutforge-root .cf-topbar`, `.timeline` becomes `.cf-timeline`, and so on. Your page's CSS also stops reaching inside the editor, so anything it styled there by accident moves to `theme` or `customCss`.
- **One editor per page.** A second editor mounted at the same time used to share the first one's project silently; it now reports an `error` instead.

### Added

- `<Editor>` takes `className`, `style`, a `ref` to the editor commands, and a controlled `project` / `onProjectChange` pair.

### Fixed

- On WebGPU (Chrome's default on Windows and macOS), frames with two or more layers (picture-in-picture, text over video, crossfades) rendered black.
- Exports are frame-exact: seeks settle on the requested frame, MP4 edit lists are honoured (B-frame H.264 no longer plays 2 frames behind its audio), and the last frames are flushed from the decoder.
- Clips cut from the same source render correctly, including one source on screen twice at once.
- Thumbnails for B-frame footage, and waveforms for long files.
- Unmounting releases the editor's workers, GPU context and audio.
- Software WebGPU adapters are skipped in favour of hardware WebGL2.

### Performance

- Layers hidden under an opaque full-frame clip are neither drawn nor decoded.
- Playback streams audio instead of decoding whole tracks (a 10-minute file: 234 MB to 17 MB), and exports mix audio block by block.
- Only the playhead re-renders during playback, and edits send only the changed clips to the compositor.
- Thumbnails decode from a keyframe inside their tile when there is one: idle CPU after an import drops from 2.85 to 0.33 cores.
- The bundle is about 40% smaller.

## 1.1.2 (29 September 2026)

### Fixed

- The stylesheet is scoped to `.cutforge-root`, and the editor fills its container instead of the viewport.
- `react/jsx-runtime` is no longer bundled, and worker files are referenced relative to the bundle.

## 1.1.1 (9 September 2026)

### Fixed

- Export reads the original media, not the editing proxy.
- Proxy generation for sources above 1080p.

### Performance

- Export no longer stalls near the end: audio is encoded before video (a 30-second pause at 98% becomes 160 ms).
- Color: LUT interpolation takes 27% less time, and simple effects run 5.5x faster.

## 1.1.0 (9 September 2026)

### Added

- Offline license keys: signed keys verified inside the browser, with no call to the license server. Available with Enterprise and for trials.

## 1.0.0 (21 June 2026)

First stable release.

- Multi-track video and audio timeline: trim, split, duplicate, snapping, speed changes.
- WebGPU compositor with WebGL2 and Canvas2D fallbacks; WebCodecs decode and export to MP4 or WebM.
- Per-clip transform, opacity, fades and crossfades; text overlays; keyframe animation with easing.
- Color grading: exposure, temperature, tint, brightness, contrast, saturation, curves, `.cube` LUTs and presets.
- Web Audio mixer with per-clip volume and per-track mute and solo.
- Projects saved locally in OPFS and IndexedDB.
- Embedding API: `createEditor` and `<Editor>`, theming, white-label branding, toolbar customization, localization with right-to-left support, presets, import and export hooks, `assetProvider`, events and commands.

## Maintained versions

| Line | npm tag | Status |
|---|---|---|
| 1.2 | `latest` | Active: features, bug fixes, security fixes |
| 1.1 | `release-1.1` | Security fixes |
| 1.0 | `release-1.0` | Security fixes |
