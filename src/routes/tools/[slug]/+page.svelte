<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { base } from "$app/paths";
  import { language } from "$lib/stores/language.js";
  import heic2any from "heic2any";
  import {
    computeMosaicGrid,
    renderGridToCanvas,
    renderGridToSVG,
    type Grid,
  } from "$lib/engines/bricklab-engine";

  // State
  let sourceImage: HTMLImageElement | null = $state(null);
  let blockSize = $state(50);
  let isDragActive = $state(false);
  let isProcessing = $state(false);
  let canvasElement: HTMLCanvasElement | null = $state(null);
  let fileInput: HTMLInputElement | null = $state(null);

  // History for Undo/Redo
  let history = $state({
    past: [] as number[],
    present: 50,
    future: [] as number[],
  });

  // Derived UI value (inverted scale: 0 = low density, 100 = high density)
  // Scale adjusted for max density (min block size 5px): (50 - 5) = 45 delta. Factor 0.45
  let uiValue = $derived(Math.round((50 - blockSize) / 0.45));

  // Process Image Effect
  $effect(() => {
    // Guard: only run in browser
    if (typeof window === "undefined") return;
    if (!sourceImage || !canvasElement) return;

    isProcessing = true;
    const ctx = canvasElement.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    // Calculate display dimensions
    let w = sourceImage.width;
    let h = sourceImage.height;
    const MAX_DISPLAY = 1500;
    if (w > MAX_DISPLAY || h > MAX_DISPLAY) {
      const ratio = w / h;
      if (w > h) {
        w = MAX_DISPLAY;
        h = MAX_DISPLAY / ratio;
      } else {
        h = MAX_DISPLAY;
        w = MAX_DISPLAY * ratio;
      }
    }

    // Ensure divisible by block size
    w = Math.floor(w / blockSize) * blockSize;
    h = Math.floor(h / blockSize) * blockSize;

    canvasElement.width = w;
    canvasElement.height = h;

    // Create analysis canvas
    const analysisCanvas = document.createElement("canvas");
    analysisCanvas.width = w;
    analysisCanvas.height = h;
    const aCtx = analysisCanvas.getContext("2d")!;
    aCtx.drawImage(sourceImage, 0, 0, w, h);

    // Compute and render
    const grid = computeMosaicGrid(analysisCanvas, blockSize);
    ctx.clearRect(0, 0, w, h);
    renderGridToCanvas(ctx, grid, blockSize);

    isProcessing = false;
  });

  // Keyboard shortcuts
  function handleKeyDown(e: KeyboardEvent) {
    if ((e.metaKey || e.ctrlKey) && e.key === "z") {
      e.preventDefault();
      if (e.shiftKey) {
        redo();
      } else {
        undo();
      }
    }
  }

  onMount(() => {
    window.addEventListener("keydown", handleKeyDown);
  });

  onDestroy(() => {
    window.removeEventListener("keydown", handleKeyDown);
  });

  function snapshot() {
    history = {
      past: [...history.past, history.present],
      present: blockSize,
      future: [],
    };
  }

  function undo() {
    if (history.past.length === 0) return;
    const previous = history.past[history.past.length - 1];
    history = {
      past: history.past.slice(0, -1),
      present: previous,
      future: [history.present, ...history.future],
    };
    blockSize = previous;
  }

  function redo() {
    if (history.future.length === 0) return;
    const next = history.future[0];
    history = {
      past: [...history.past, history.present],
      present: next,
      future: history.future.slice(1),
    };
    blockSize = next;
  }

  async function handleFile(file: File) {
    let processFile: File | Blob = file;

    // HEIC Conversion
    if (
      file.type === "image/heic" ||
      file.type === "image/heif" ||
      file.name.toLowerCase().endsWith(".heic") ||
      file.name.toLowerCase().endsWith(".heif")
    ) {
      try {
        isProcessing = true;
        const convertedBlob = await heic2any({
          blob: file,
          toType: "image/jpeg",
          quality: 0.9,
        });
        processFile = Array.isArray(convertedBlob)
          ? convertedBlob[0]
          : convertedBlob;
      } catch (error) {
        console.error("HEIC conversion failed:", error);
        alert(
          $language === "en"
            ? "Failed to convert HEIC file. Please try a different image."
            : "Conversione HEIC fallita. Prova un'altra immagine."
        );
        isProcessing = false;
        return;
      }
    }

    const img = new Image();
    img.onload = () => {
      sourceImage = img;
      isProcessing = false;
    };
    img.onerror = () => {
      alert(
        $language === "en"
          ? "Invalid image format"
          : "Formato immagine non valido"
      );
      isProcessing = false;
    };
    img.src = URL.createObjectURL(processFile);
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault();
    isDragActive = false;
    if (e.dataTransfer?.files?.[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }

  function handleFileChange(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.files?.[0]) {
      handleFile(input.files[0]);
    }
  }

  function handleSliderChange(val: number) {
    // New density logic: 0..100 maps to 50..5
    const internal = 50 - val * 0.45;
    blockSize = Math.max(5, Math.min(50, internal));
    history = { ...history, present: blockSize };
  }

  function resetTool() {
    snapshot();
    blockSize = 50;
    history = { ...history, present: 50 };
  }

  function resetImage() {
    sourceImage = null;
    blockSize = 50;
    history = { past: [], present: 50, future: [] };
  }

  function downloadPNG() {
    if (!sourceImage) return;

    const targetH = Math.max(sourceImage.height, 5000);

    let previewW = sourceImage.width;
    let previewH = sourceImage.height;
    const MAX_DISPLAY = 1500;
    if (previewW > MAX_DISPLAY || previewH > MAX_DISPLAY) {
      const ratio = previewW / previewH;
      if (previewW > previewH) {
        previewW = MAX_DISPLAY;
        previewH = MAX_DISPLAY / ratio;
      } else {
        previewH = MAX_DISPLAY;
        previewW = MAX_DISPLAY * ratio;
      }
    }
    const cols = Math.floor(previewW / blockSize);
    const rows = Math.floor(previewH / blockSize);

    const exportBlockSize = Math.floor(targetH / rows);
    const finalH = rows * exportBlockSize;
    const finalW = cols * exportBlockSize;

    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = finalW;
    tempCanvas.height = finalH;
    const tCtx = tempCanvas.getContext("2d")!;
    tCtx.drawImage(sourceImage, 0, 0, finalW, finalH);

    const grid = computeMosaicGrid(tempCanvas, exportBlockSize);

    const exportCanvas = document.createElement("canvas");
    exportCanvas.width = finalW;
    exportCanvas.height = finalH;
    const eCtx = exportCanvas.getContext("2d")!;
    renderGridToCanvas(eCtx, grid, exportBlockSize);

    const now = new Date();
    const dateStr = now.toISOString().split("T")[0];
    const timeStr = now.toTimeString().split(" ")[0].replace(/:/g, ".");
    const link = document.createElement("a");
    link.download = `BRICKLAB ${dateStr} ${timeStr}.png`;
    exportCanvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      link.href = url;
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 100);
    }, "image/png");
  }

  function downloadSVG() {
    if (!sourceImage) return;

    let previewW = sourceImage.width;
    let previewH = sourceImage.height;
    const MAX_DISPLAY = 1500;
    if (previewW > MAX_DISPLAY || previewH > MAX_DISPLAY) {
      const ratio = previewW / previewH;
      if (previewW > previewH) {
        previewW = MAX_DISPLAY;
        previewH = MAX_DISPLAY / ratio;
      } else {
        previewH = MAX_DISPLAY;
        previewW = MAX_DISPLAY * ratio;
      }
    }
    previewW = Math.floor(previewW / blockSize) * blockSize;
    previewH = Math.floor(previewH / blockSize) * blockSize;

    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = previewW;
    tempCanvas.height = previewH;
    const tCtx = tempCanvas.getContext("2d")!;
    tCtx.drawImage(sourceImage, 0, 0, previewW, previewH);

    const grid = computeMosaicGrid(tempCanvas, blockSize);
    const svgString = renderGridToSVG(grid, previewW, previewH);

    const blob = new Blob([svgString], { type: "image/svg+xml" });
    const now = new Date();
    const dateStr = now.toISOString().split("T")[0];
    const timeStr = now.toTimeString().split(" ")[0].replace(/:/g, ".");
    const link = document.createElement("a");
    link.download = `BRICKLAB ${dateStr} ${timeStr}.svg`;
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 100);
  }
</script>

<svelte:head>
  <title>BRICKLAB — MATTIA CAPOMAGI</title>
</svelte:head>

<main class="bricklab-tool">
  {#if !sourceImage}
    <!-- Upload Zone -->
    <div
      class="upload-zone"
      class:active={isDragActive}
      role="button"
      tabindex="0"
      ondragenter={(e) => {
        e.preventDefault();
        isDragActive = true;
      }}
      ondragleave={(e) => {
        e.preventDefault();
        isDragActive = false;
      }}
      ondragover={(e) => e.preventDefault()}
      ondrop={handleDrop}
      onclick={() => fileInput?.click()}
      onkeydown={(e) => e.key === "Enter" && fileInput?.click()}
    >
      <input
        bind:this={fileInput}
        type="file"
        class="hidden"
        accept="image/*,.tiff,.tif,.webp,.heic,.heif"
        onchange={handleFileChange}
      />
      <div class="upload-content">
        <h2>{$language === "en" ? "DROP / CLICK" : "TRASCINA / CLICCA"}</h2>
        <p>JPG / PNG / GIF / WEBP / TIFF / HEIC</p>
      </div>
    </div>
  {:else}
    <!-- Workspace -->
    <div class="workspace">
      <div class="workspace-content">
        <!-- Canvas Area -->
        <div class="canvas-container">
          <canvas bind:this={canvasElement}></canvas>
          {#if isProcessing}
            <div class="processing-overlay">
              <div class="spinner"></div>
            </div>
          {/if}
        </div>

        <!-- Controls -->
        <div class="controls-panel">
          <div class="slider-section">
            <div class="slider-header">
              <span class="slider-label">
                {$language === "en" ? "BLOCK DENSITY" : "DENSITÀ BLOCCHI"}: {uiValue}
              </span>
              <button class="reset-btn" onclick={resetTool}>RESET</button>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={uiValue}
              onpointerdown={snapshot}
              oninput={(e) =>
                handleSliderChange(
                  parseInt((e.target as HTMLInputElement).value)
                )}
            />
          </div>

          <div class="export-section">
            <button class="export-btn primary" onclick={downloadPNG}>
              {$language === "en" ? "EXPORT PNG" : "ESPORTA PNG"}
            </button>
            <button class="export-btn secondary" onclick={downloadSVG}>
              {$language === "en" ? "EXPORT SVG" : "ESPORTA SVG"}
            </button>
            <button class="export-btn new-image" onclick={resetImage}>
              {$language === "en" ? "NEW IMAGE" : "NUOVA IMMAGINE"}
            </button>
          </div>
        </div>
      </div>
    </div>
  {/if}
</main>

<style>
  .bricklab-tool {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 0 var(--page-padding);
  }

  /* Upload Zone */
  .upload-zone {
    flex: 1;
    min-height: 60vh;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition:
      background 0.2s ease,
      border-color 0.2s ease;
    border: 3px dashed rgba(128, 128, 128, 0.5); /* Gray visible in both modes */
    border-radius: 0;
    margin: 20px 0 10px 0;
  }

  .upload-zone:hover,
  .upload-zone.active {
    background: rgba(0, 0, 0, 0.03);
    border-color: var(--color-accent);
  }

  .upload-content {
    text-align: center;
    pointer-events: none;
  }

  .upload-content h2 {
    font-size: 2.5rem;
    font-weight: 700;
    font-family: var(--font-mono);
    margin: 0 0 8px 0;
    color: var(--color-text);
  }

  .upload-content p {
    font-size: 0.85rem;
    opacity: 0.5;
    font-family: var(--font-mono);
  }

  .hidden {
    display: none;
  }

  /* Workspace */
  .workspace {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px 0;
  }

  .workspace-content {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  @media (min-width: 900px) {
    .workspace-content {
      flex-direction: row;
      align-items: flex-start;
    }
  }

  /* Canvas Container */
  .canvas-container {
    flex: 1;
    border: 2px solid var(--color-text);
    border-radius: 0;
    padding: 16px;
    background: rgba(128, 128, 128, 0.1); /* Subtle contrast from bg */
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
  }

  canvas {
    max-width: 100%;
    max-height: 70vh;
    display: block;
  }

  .processing-overlay {
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(4px);
  }

  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid var(--color-accent);
    border-top-color: transparent;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  /* Controls Panel */
  .controls-panel {
    width: 100%;
    border: 2px solid var(--color-text);
    border-radius: 0; /* Zero radius */
    padding: 24px;
    background: var(--color-bg);
  }

  @media (min-width: 900px) {
    .controls-panel {
      width: 320px;
      flex-shrink: 0;
      position: sticky;
      top: 100px;
    }
  }

  .slider-section {
    margin-bottom: 24px;
  }

  .slider-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }

  .slider-label {
    font-size: 0.9rem;
    font-weight: 700;
    font-family: var(--font-mono);
    color: var(--color-text);
  }

  .reset-btn {
    background: none;
    border: 1px solid var(--color-text);
    padding: 4px 10px;
    font-size: 0.7rem;
    font-weight: 700;
    font-family: var(--font-mono);
    color: var(--color-text);
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .reset-btn:hover {
    background: var(--color-text);
    color: var(--color-bg);
  }

  input[type="range"] {
    width: 100%;
    height: 8px;
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
    border-radius: 4px;
    cursor: pointer;
    touch-action: pan-y;
  }

  input[type="range"]::-webkit-slider-runnable-track {
    width: 100%;
    height: 8px;
    background: #ddd;
    border-radius: 4px;
    border: none;
    box-shadow: none;
  }

  input[type="range"]::-moz-range-track {
    width: 100%;
    height: 8px;
    background: #ddd;
    border-radius: 4px;
    border: none;
    box-shadow: none;
  }

  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    box-sizing: border-box;
    width: 40px;
    height: 40px;
    border: 12px solid transparent;
    background: var(--color-text);
    background-clip: content-box;
    border-radius: 50%;
    border-radius: 50%;
    margin-top: -16px;
  }

  input[type="range"]::-moz-range-thumb {
    box-sizing: border-box;
    width: 40px;
    height: 40px;
    border: 12px solid transparent;
    background: var(--color-text);
    background-clip: content-box;
    border-radius: 50%;
    cursor: pointer;
    border: none;
  }

  /* Export Section */
  .export-section {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .export-btn {
    width: 100%;
    padding: 16px 24px;
    font-size: 0.95rem;
    font-weight: 700;
    font-family: var(--font-mono);
    cursor: pointer;
    border: 2px solid var(--color-text);
    border-radius: 0; /* Zero radius */
    transition: all 0.2s ease;
  }

  .export-btn.primary {
    background: var(--color-text);
    color: var(--color-bg);
  }

  .export-btn.primary:hover {
    background: var(--color-accent);
    border-color: var(--color-accent);
  }

  .export-btn.secondary {
    background: var(--color-bg);
    color: var(--color-text);
  }

  .export-btn.secondary:hover {
    background: var(--color-text);
    color: var(--color-bg);
  }

  .export-btn.new-image {
    background: transparent;
    color: var(--color-text);
    border-style: dashed;
    opacity: 0.6;
    margin-top: 8px;
  }

  .export-btn.new-image:hover {
    opacity: 1;
    border-style: solid;
    background: rgba(0, 0, 0, 0.05);
  }

  /* Mobile */
  @media (max-width: 600px) {
    .upload-content h2 {
      font-size: 1.8rem;
    }

    .controls-panel {
      padding: 16px;
    }

    .export-btn {
      padding: 14px 20px;
      font-size: 0.85rem;
    }
  }
</style>
