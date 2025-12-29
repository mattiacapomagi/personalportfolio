<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { base } from "$app/paths";
  import { language } from "$lib/stores/language.js";
  // import heic2any from "heic2any"; // SSR Incompatible

  import {
    pixelsToAsciiGrid,
    renderAsciiToCanvas,
    getPresetChars,
  } from "$lib/engines/asciify-engine";

  // State
  let sourceImage: HTMLImageElement | null = $state(null);
  let densitySlider = $state(50); // Slider value 0-100
  let useLetters = $state(true); // Toggle Charset
  let useColor = $state(false); // New Color Mode
  let useEdge = $state(false); // New Edge Detection
  let useTransparentBg = $state(false); // New Transparent Background
  let bgColor = $state("#000000");
  let textColor = $state("#ffffff");

  let isDragActive = $state(false);
  let isProcessing = $state(false);
  let fileInput: HTMLInputElement;
  let canvasRef: HTMLCanvasElement;

  // Reactive processing
  $effect(() => {
    if (sourceImage && canvasRef) {
      processImage();
    }
  });

  // Also re-process when params change
  $effect(() => {
    // Touching these reactive variables triggers this effect
    // sourceImage, densitySlider, useLetters, bgColor, textColor, useColor, useEdge, useTransparentBg, canvasRef
    // We call processImage inside
  });

  function processImage() {
    if (!sourceImage || !canvasRef) return;

    // 1. Create a temporary small canvas to resize image and read pixels
    const ratio = sourceImage.height / sourceImage.width;
    // Map slider 0-100 to Density 150-285 (Detailed Range)
    const minDensity = 150;
    const maxDensity = 285;
    const processWidth = Math.floor(
      minDensity + (densitySlider / 100) * (maxDensity - minDensity)
    );

    const fontCorrection = 0.55;
    const processHeight = Math.floor(processWidth * ratio * fontCorrection);

    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = processWidth;
    tempCanvas.height = processHeight;
    const tempCtx = tempCanvas.getContext("2d");
    if (!tempCtx) return;

    tempCtx.drawImage(sourceImage, 0, 0, processWidth, processHeight);
    const imageData = tempCtx.getImageData(0, 0, processWidth, processHeight);

    // 2. Convert to ASCII Grid (Structured)
    const charset = getPresetChars(useLetters);
    const grid = pixelsToAsciiGrid(imageData, charset, useEdge, useColor);

    // 3. Render High-Res to Main Canvas
    renderAsciiToCanvas(grid, canvasRef, {
      bgColor,
      textColor,
      fontSize: 12,
      fontFamily: "monospace",
      transparentBg: useTransparentBg,
    });
  }

  // --- File Handling ---
  function handleFileChange(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      handleFile(input.files[0]);
    }
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
        const heic2anyModule = await import("heic2any");
        const heic2any = heic2anyModule.default;

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
    if (e.dataTransfer?.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }

  function handleExport() {
    if (!canvasRef) return;
    canvasRef.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = `asciify-${Date.now()}.png`;
      link.href = url;
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 100);
    }, "image/png");
  }

  function reset() {
    sourceImage = null;
    densitySlider = 50;
    useLetters = true;
    useColor = false;
    useEdge = false;
    useTransparentBg = false;
    bgColor = "#000000";
    textColor = "#ffffff";
  }

  function resetParams() {
    densitySlider = 50;
    useLetters = true;
    useColor = false;
    useColor = false;
    useEdge = false;
    useTransparentBg = false;
    bgColor = "#000000";
    textColor = "#ffffff";
    processImage();
  }
</script>

<main class="asciify-tool">
  {#if !sourceImage}
    <!-- Import Screen -->
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
        {#if isProcessing}
          <div class="spinner"></div>
        {:else}
          <h2>{$language === "en" ? "DROP / CLICK" : "TRASCINA / CLICCA"}</h2>
          <p>JPG / PNG / GIF / WEBP / HEIC</p>
        {/if}
      </div>
    </div>
  {:else}
    <!-- Workspace -->
    <div class="workspace">
      <div class="workspace-content">
        <!-- Canvas Area -->
        <div class="canvas-container">
          <canvas bind:this={canvasRef}></canvas>
        </div>

        <!-- Controls Panel -->
        <div class="controls-panel">
          <!-- Density -->
          <div class="control-section">
            <div class="section-header">
              <span class="label"
                >{$language === "en" ? "DENSITY" : "DENSITÀ"}</span
              >
              <button class="reset-link" onclick={resetParams}>RESET</button>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              bind:value={densitySlider}
              class="slider"
            />
          </div>

          <!-- Mode Toggles Row 1: Charset -->
          <div class="control-section">
            <span class="label"
              >{$language === "en" ? "CHARACTERS" : "CARATTERI"}</span
            >
            <div class="toggle-row">
              <button
                class="toggle-btn"
                class:active={useLetters}
                onclick={() => (useLetters = true)}
              >
                High Detail
              </button>
              <button
                class="toggle-btn"
                class:active={!useLetters}
                onclick={() => (useLetters = false)}
              >
                Blocky
              </button>
            </div>
          </div>

          <!-- Mode Toggles Row 2: Color & Edge -->
          <div class="control-section">
            <span class="label">{$language === "en" ? "MODE" : "MODALITÀ"}</span
            >
            <div class="toggle-row">
              <button
                class="toggle-btn"
                class:active={useColor}
                onclick={() => (useColor = !useColor)}
              >
                {useColor ? "Color On" : "Monochrome"}
              </button>
              <button
                class="toggle-btn"
                class:active={useEdge}
                onclick={() => (useEdge = !useEdge)}
              >
                {useEdge ? "Edge (Sobel)" : "Standard"}
              </button>
            </div>
          </div>

          <!-- Colors (Visible only if Mono) -->
          {#if !useColor}
            <div class="control-section">
              <div class="color-row">
                <div class="color-item">
                  <span class="label"
                    >{$language === "en" ? "BG" : "SFONDO"}</span
                  >
                  <div class="color-wrapper">
                    <input type="color" bind:value={bgColor} />
                    <span>{bgColor}</span>
                  </div>
                </div>
                <div class="color-item">
                  <span class="label"
                    >{$language === "en" ? "TEXT" : "TESTO"}</span
                  >
                  <div class="color-wrapper">
                    <input type="color" bind:value={textColor} />
                    <span>{textColor}</span>
                  </div>
                </div>
              </div>
            </div>
          {:else}
            <!-- Only BG color processing for Color Mode -->
            <div class="control-section">
              <span class="label"
                >{$language === "en" ? "BACKGROUND" : "SFONDO"}</span
              >
              <div class="color-wrapper">
                <input type="color" bind:value={bgColor} />
                <span>{bgColor}</span>
              </div>
            </div>
          {/if}

          <!-- Transparent Background Toggle -->
          <div class="control-section">
            <span class="label"
              >{$language === "en" ? "BACKGROUND" : "SFONDO"}</span
            >
            <div class="toggle-row">
              <button
                class="toggle-btn"
                class:active={!useTransparentBg}
                onclick={() => (useTransparentBg = false)}
              >
                {$language === "en" ? "Solid" : "Solido"}
              </button>
              <button
                class="toggle-btn"
                class:active={useTransparentBg}
                onclick={() => (useTransparentBg = true)}
              >
                {$language === "en" ? "Transparent" : "Trasparente"}
              </button>
            </div>
          </div>

          <!-- Actions -->
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
  .asciify-tool {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 0 var(--page-padding);
    font-family: monospace;
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
    border: 3px dashed rgba(128, 128, 128, 0.5);
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
    background: rgba(128, 128, 128, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    min-height: 500px;
  }

  canvas {
    max-width: 100%;
    max-height: 70vh;
    display: block;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    image-rendering: pixelated;
    object-fit: contain;
  }

  /* Controls Panel */
  .controls-panel {
    width: 100%;
    border: 2px solid var(--color-text);
    border-radius: 0;
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
    align-items: center;
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
    font-family: inherit;
  }

  .reset-link:hover {
    background: var(--color-text);
    color: var(--color-bg);
  }

  /* Slider */
  .slider {
    width: 100%;
    height: 8px;
    -webkit-appearance: none;
    appearance: none;
    background: transparent; /* Move color to track */
    cursor: pointer;
    touch-action: pan-y;
  }

  /* Explicit Track Styling to remove iOS default shadows */
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
    box-sizing: border-box; /* Fixes total size to 40px (16px content + 24px border) */
    width: 40px;
    height: 40px;
    border: 12px solid transparent;
    background: var(--color-text);
    background-clip: content-box;
    border-radius: 50%;
    border-radius: 50%;
    cursor: pointer;
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
  }

  /* Toggles */
  .toggle-row {
    display: flex;
    gap: 10px;
  }

  .toggle-btn {
    flex: 1;
    padding: 10px;
    background: none;
    border: 2px solid var(--color-text);
    color: var(--color-text);
    font-family: inherit;
    font-weight: 700;
    cursor: pointer;
    font-size: 0.8rem;
    text-transform: uppercase;
  }

  .toggle-btn:hover {
    background: rgba(128, 128, 128, 0.1);
  }

  .toggle-btn.active {
    background: var(--color-text);
    color: var(--color-bg);
  }

  /* Colors */
  .color-row {
    display: flex;
    gap: 10px;
  }

  .color-item {
    flex: 1;
  }

  .color-wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
    border: 1px solid var(--color-text);
    padding: 4px;
    margin-bottom: 8px;
  }

  input[type="color"] {
    width: 24px;
    height: 24px;
    border: none;
    background: none;
    padding: 0;
    cursor: pointer;
  }

  .color-wrapper span {
    font-size: 0.8rem;
  }

  /* Export Section */
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

  /* Mobile */
  @media (max-width: 600px) {
    .upload-content h2 {
      font-size: 1.8rem;
    }
    .controls-panel {
      padding: 16px;
    }
  }
</style>
