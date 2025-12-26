<script>
  /** @type {{ imageUrl: string | null, x: number, y: number }} */
  let { imageUrl, x, y } = $props();
</script>

{#if imageUrl}
  <div class="image-preview" style="left: {x + 20}px; top: {y - 100}px;">
    <div class="placeholder" style="background-color: #E0E0E0;">
      <span class="placeholder-text">Preview</span>
    </div>
  </div>
{/if}

<style>
  .image-preview {
    position: fixed;
    width: 300px;
    height: 200px;
    pointer-events: none;
    z-index: 1000;
    opacity: 1;
    transition: opacity 0.15s ease;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  }

  .placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .placeholder-text {
    font-size: 12px;
    color: #999;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
</style>
