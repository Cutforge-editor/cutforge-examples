<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { createEditor } from '@cutforge/editor';
import '@cutforge/editor/style.css';

// Cutforge renders its own UI (with React, bundled as a peer dependency), so from Vue
// you mount it into an element and destroy it when the component goes away.
const host = ref(null);
const status = ref('Drop a video on the editor, then export.');
let editor;

onMounted(() => {
  editor = createEditor(host.value, {
    // No key: watermarked demo (60 s / 720p exports). Put your key in .env to lift it.
    license: import.meta.env.VITE_CUTFORGE_LICENSE,
  });
  // Upload the Blob to your own storage here.
  editor.on('export-complete', ({ blob, filename }) => {
    status.value = `Exported ${filename} (${(blob.size / 1e6).toFixed(1)} MB), rendered on this machine.`;
  });
});

onBeforeUnmount(() => editor?.destroy());
</script>

<template>
  <div class="page">
    <p class="status">{{ status }}</p>
    <div ref="host" class="editor"></div>
  </div>
</template>

<style scoped>
.page { display: grid; grid-template-rows: auto 1fr; height: 100%; }
.status { margin: 0; padding: 8px; font: 14px system-ui; }
.editor { min-height: 0; }
</style>
