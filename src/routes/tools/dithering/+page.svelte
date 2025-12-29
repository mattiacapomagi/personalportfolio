<script lang="ts">
  import { onMount } from "svelte";
  import { base } from "$app/paths";
  import { language } from "$lib/stores/language.js";
  import {
    ditherImage,
    applyBlur,
    applyGrain,
    quantizeImage,
    PALETTES,
    type DitherAlgorithm,
    type Color,
  } from "$lib/engines/dithering-engine";

  // State
  let sourceImage: HTMLImageElement | null = $state(null);
  let isDragActive = $state(false);
  let isProcessing = $state(false);
  let fileInput: HTMLInputElement;
  let canvasRef: HTMLCanvasElement;

  // Params
  let scale = $state(60); // Effect Density (Pixelation) - 100% means low pixelation, 10% means giant pixels
  let selectedAlgo: DitherAlgorithm = $state("FloydSteinberg");
  let selectedPaletteName = $state("GRAYSCALE");
  let blurAmount = $state(0);
  let grainAmount = $state(0);

  // Pre-filled custom colors (16 slots)
  let customColors: string[] = $state([
    "#000000",
    "#ffffff",
    "#ff0000",
    "#00ff00",
    "#0000ff",
    "#ffff00",
    "#00ffff",
    "#ff00ff",
    "#800000",
    "#008000",
    "#000080",
    "#808000",
    "#008080",
    "#800080",
    "#c0c0c0",
    "#808080",
  ]);

  // Options
  const algoOptions: DitherAlgorithm[] = [
    "FloydSteinberg",
    "FalseFloydSteinberg",
    "Atkinson",
    "Stucki",
    "Burkes",
    "Bayer2x2",
    "Bayer4x4",
    "Bayer8x8",
    "Bayer16x16",
    "SimpleNoise",
    "Threshold",
  ];

  const paletteOptions = [
    ...Object.keys(PALETTES),
    "Original Colors",
    "Custom (2)",
    "Custom (4)",
    "Custom (8)",
    "Custom (16)",
  ];

  $effect(() => {
    if (sourceImage && canvasRef) {
      processImage();
    }
  });

  $effect(() => {
    // Reactive dependencies
    // sourceImage, scale, selectedAlgo, selectedPaletteName, blurAmount, grainAmount
    processImage(); // Re-trigger
  });

  function processImage() {
    if (!sourceImage || !canvasRef) return;

    // Fixed Canvas / Responsive Logic
    // We want the canvas to be high resolution (or matching display), but the processing to happen at 'scale'
    // Actually, 'scale' here acts as 'Pixel Density'.
    // 100% -> Full Resolution Processing
    // 10% -> Processing at 1/10th resolution, then scaled up.

    // Original Dimensions (Capped at 3000px width for performance)
    let origW = sourceImage.width;
    let origH = sourceImage.height;

    if (origW > 3000) {
      const ratio = 3000 / origW;
      origW = 3000;
      origH = Math.round(origH * ratio);
    }

    // Processing Dimensions (Density)
    // Map slider 1-100 to factor 0.05-0.25 (User requested max density to be 50% of previous 0.5, i.e. 25% total resolution)
    const maxDensity = 0.25;
    const factor = (scale / 100) * maxDensity;
    const processW = Math.max(50, Math.floor(origW * factor));
    const processH = Math.floor(processW * (origH / origW));

    // Create temp buffer for processing
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = processW;
    tempCanvas.height = processH;
    const tempCtx = tempCanvas.getContext("2d");
    if (!tempCtx) return;

    // Draw Source to Temp (Resizing)
    tempCtx.drawImage(sourceImage, 0, 0, processW, processH);
    const imageData = tempCtx.getImageData(0, 0, processW, processH);

    // --- PREPROCESSING ---
    applyBlur(imageData, blurAmount);
    applyGrain(imageData, grainAmount * 1.5); // Boost multiplier for visibility

    // --- PALETTE PREP ---
    let palette: Color[] = [];
    if (selectedPaletteName.startsWith("Custom")) {
      const count = parseInt(selectedPaletteName.split("(")[1]);
      const activeHexes = customColors.slice(0, count);
      const hexToRgb = (hex: string) => {
        const bigint = parseInt(hex.slice(1), 16);
        return {
          r: (bigint >> 16) & 255,
          g: (bigint >> 8) & 255,
          b: bigint & 255,
        };
      };
      palette = activeHexes.map(hexToRgb);
    } else if (selectedPaletteName === "Original Colors") {
      // "Original" implies capturing the essence, 32 colors is a good balance for clustering
      palette = quantizeImage(imageData, 32);
    } else {
      palette = PALETTES[selectedPaletteName as keyof typeof PALETTES];
    }

    // --- DITHERING ---
    ditherImage(imageData, selectedAlgo, palette);
    tempCtx.putImageData(imageData, 0, 0);

    // --- OUTPUT ---
    // Draw temp canvas to Main Canvas (Crisp upscaling)
    // Main canvas stays fixed size/layout relative to container?
    // User asked "maintain workspace canvas size always equal, scaling density".
    // So Main Canvas should match Source Image resolution (or valid display size).
    canvasRef.width = origW;
    canvasRef.height = origH;
    const ctx = canvasRef.getContext("2d");
    if (!ctx) return;

    ctx.imageSmoothingEnabled = false; // Nearest Neighbor for pixel look
    ctx.drawImage(tempCanvas, 0, 0, origW, origH);
  }

  // --- Handlers ---
  function handleFileChange(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files[0]) handleFile(input.files[0]);
  }

  async function handleFile(file: File) {
    let processFile: File | Blob = file;

    // Handle HEIC
    if (
      file.type === "image/heic" ||
      file.name.toLowerCase().endsWith(".heic")
    ) {
      isProcessing = true;
      try {
        // Dynamic import to avoid SSR 500 error
        const heic2any = (await import("heic2any")).default;
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
            ? "Failed to convert HEIC. Try another image."
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
      alert($language === "en" ? "Invalid image" : "Immagine non valida");
      isProcessing = false;
    };
    img.src = URL.createObjectURL(processFile);
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault();
    isDragActive = false;
    if (e.dataTransfer?.files?.[0]) handleFile(e.dataTransfer.files[0]);
  }

  function handleExport() {
    if (!canvasRef) return;
    canvasRef.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = `dither-${Date.now()}.png`;
      link.href = url;
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 100);
    }, "image/png");
  }

  function reset() {
    sourceImage = null;
    scale = 60;
    blurAmount = 0;
    grainAmount = 0;
    selectedAlgo = "FloydSteinberg";
    selectedPaletteName = "GRAYSCALE";
  }

  function resetParams() {
    scale = 60;
    blurAmount = 0;
    grainAmount = 0;
    selectedAlgo = "FloydSteinberg";
    selectedPaletteName = "GRAYSCALE";
    selectedPaletteName = "GRAYSCALE";
    processImage();
  }

  function randomizeColors() {
    customColors = customColors.map(() => {
      return (
        "#" +
        Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, "0")
      );
    });
  }
</script>

<main class="dither-tool">
  {#if !sourceImage}
    <!-- Import Zone -->
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
        accept="image/*,.heic,.tiff"
        onchange={handleFileChange}
      />
      <div class="upload-content">
        <h2>{$language === "en" ? "DROP / CLICK" : "TRASCINA / CLICCA"}</h2>
        <p style="font-family: monospace;">
          JPG / PNG / GIF / WEBP / HEIC / TIFF
        </p>
      </div>
    </div>
  {:else}
    <!-- Workspace -->
    <div class="workspace">
      <div class="workspace-content">
        <!-- Canvas -->
        <div class="canvas-container">
          <canvas bind:this={canvasRef}></canvas>
        </div>

        <!-- Controls -->
        <div class="controls-panel">
          <!-- Pixelation / Scale -->
          <div class="control-section">
            <div class="section-header">
              <span class="label"
                >{$language === "en" ? "PIXEL DENSITY" : "DENSITÀ PIXEL"}
                {scale}%</span
              >
              <button class="reset-link" onclick={resetParams}>RESET</button>
            </div>
            <input
              type="range"
              min="5"
              max="100"
              step="1"
              bind:value={scale}
              class="slider"
            />
          </div>

          <!-- Preprocessing -->
          <div class="control-section">
            <span class="label">PRE-PROCESSING</span>
            <div class="slider-row">
              <label>Blur</label>
              <input
                type="range"
                min="0"
                max="10"
                step="1"
                bind:value={blurAmount}
                class="slider mini"
              />
            </div>
            <div class="slider-row">
              <label>Grain</label>
              <input
                type="range"
                min="0"
                max="50"
                step="1"
                bind:value={grainAmount}
                class="slider mini"
              />
            </div>
          </div>

          <!-- Algorithm -->
          <div class="control-section">
            <span class="label"
              >{$language === "en" ? "ALGORITHM" : "ALGORITMO"}</span
            >
            <select bind:value={selectedAlgo} class="dropdown">
              {#each algoOptions as algo}
                <option value={algo}>{algo}</option>
              {/each}
            </select>
          </div>

          <!-- Palette -->
          <div class="control-section">
            <span class="label">Palette</span>
            <select bind:value={selectedPaletteName} class="dropdown">
              {#each paletteOptions as p}
                <option value={p}>{p}</option>
              {/each}
            </select>
          </div>

          <!-- Custom Colors Grid -->
          {#if selectedPaletteName.startsWith("Custom")}
            {@const count = parseInt(selectedPaletteName.split("(")[1])}
            <div class="control-section">
              <div class="section-header">
                <span class="label">Custom Colors</span>
                <button class="reset-link" onclick={randomizeColors}
                  >RANDOMIZE</button
                >
              </div>
              <div class="color-grid">
                {#each customColors.slice(0, count) as _, i}
                  <div class="color-wrapper">
                    <input type="color" bind:value={customColors[i]} />
                    <span>{i + 1}</span>
                  </div>
                {/each}
              </div>
            </div>
          {/if}

          <!-- Export -->
          <div class="export-section">
            <button class="export-btn primary" onclick={handleExport}>
              {$language === "en" ? "EXPORT PNG" : "ESPORTA PNG"}
            </button>
            <button class="export-btn new-image" onclick={reset}>
              {$language === "en" ? "NEW IMAGE" : "NUOVA IMMAGINE"}
            </button>
          </div>
        </div>
      </div>
    </div>
  {/if}
</main>

<style>
  /* Base Styles */
  .dither-tool {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 0 var(--page-padding);
    font-family: monospace;
  }

  .upload-zone {
    flex: 1;
    min-height: 60vh;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.2s ease;
    border: 3px dashed rgba(128, 128, 128, 0.5);
    border-radius: 0;
    margin: 20px 0 10px 0;
  }
  .upload-zone:hover {
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
    margin-bottom: 8px;
    color: var(--color-text);
  }
  .upload-content p {
    font-size: 0.85rem;
    opacity: 0.5;
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

  .canvas-container {
    flex: 1;
    border: 2px solid var(--color-text);
    padding: 16px;
    background: rgba(128, 128, 128, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    min-height: 500px;
  }
  canvas {
    max-width: 100%;
    max-height: 70vh;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    image-rendering: pixelated;
    object-fit: contain;
  }

  /* Controls */
  .controls-panel {
    width: 100%;
    border: 2px solid var(--color-text);
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

  .control-section {
    margin-bottom: 24px;
  }
  .section-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
  }
  .label {
    font-size: 0.9rem;
    font-weight: 700;
    display: block;
    margin-bottom: 8px;
    text-transform: uppercase;
  }
  .reset-link {
    background: none;
    border: 1px solid var(--color-text);
    padding: 2px 6px;
    font-size: 0.7rem;
    font-weight: 700;
    color: var(--color-text);
    cursor: pointer;
  }
  .reset-link:hover {
    background: var(--color-text);
    color: var(--color-bg);
  }

  .slider {
    width: 100%;
    height: 8px;
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
    outline: none;
    cursor: pointer;
    touch-action: pan-y;
  }

  .slider::-webkit-slider-runnable-track {
    width: 100%;
    height: 8px;
    background: #ddd;
    border-radius: 4px;
    border: none;
    box-shadow: none;
  }

  .slider::-moz-range-track {
    width: 100%;
    height: 8px;
    background: #ddd;
    border-radius: 4px;
    border: none;
    box-shadow: none;
  }
  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    box-sizing: border-box;
    width: 40px;
    height: 40px;
    border: 12px solid transparent;
    background: var(--color-text);
    background-clip: content-box;
    border-radius: 50%;
    cursor: pointer;
    margin-top: -16px;
    box-shadow: none;
  }

  .slider::-moz-range-thumb {
    box-sizing: border-box;
    width: 40px;
    height: 40px;
    border: 12px solid transparent;
    background: var(--color-text);
    background-clip: content-box;
    border-radius: 50%;
    cursor: pointer;
    border: none;
    box-shadow: none;
  }

  .slider-row {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 8px;
  }
  .slider-row label {
    font-size: 0.8rem;
    width: 40px;
  }
  .slider.mini {
    flex: 1;
  }

  .dropdown {
    width: 100%;
    padding: 10px;
    border: 2px solid var(--color-text);
    background: var(--color-bg);
    color: var(--color-text);
    font-family: inherit;
    font-weight: 700;
    border-radius: 0;
    cursor: pointer;
  }

  .color-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
  }
  .color-wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
    border: 1px solid var(--color-text);
    padding: 4px;
  }
  input[type="color"] {
    width: 24px;
    height: 24px;
    border: none;
    background: none;
    padding: 0;
    cursor: pointer;
  }

  .export-section {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 30px;
    padding-top: 20px;
    border-top: 1px solid rgba(128, 128, 128, 0.3);
  }
  .export-btn {
    width: 100%;
    padding: 16px 24px;
    font-size: 0.95rem;
    font-weight: 700;
    font-family: inherit;
    cursor: pointer;
    border: 2px solid var(--color-text);
    border-radius: 0;
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
  .export-btn.new-image {
    background: transparent;
    color: var(--color-text);
    border-style: dashed;
    opacity: 0.6;
  }
  .export-btn.new-image:hover {
    opacity: 1;
    border-style: solid;
    background: rgba(0, 0, 0, 0.05);
  }

  @media (max-width: 600px) {
    .upload-content h2 {
      font-size: 1.8rem;
    }
    .controls-panel {
      padding: 16px;
    }
  }
</style>
