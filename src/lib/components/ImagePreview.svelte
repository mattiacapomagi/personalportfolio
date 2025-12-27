<script>
  /** @type {{ imageUrl: string | null, x: number, y: number }} */
  let { imageUrl, x, y } = $props();

  function isVideo(path) {
    return (
      path &&
      (path.toLowerCase().endsWith(".mp4") ||
        path.toLowerCase().endsWith(".mov"))
    );
  }
</script>

{#if imageUrl}
  <div class="image-preview" style="left: {x + 20}px; top: {y - 100}px;">
    {#if isVideo(imageUrl)}
      <video
        src={imageUrl}
        autoplay
        loop
        muted
        playsinline
        class="preview-media"
      ></video>
    {:else}
      <img src={imageUrl} alt="Preview" class="preview-media" />
    {/if}
  </div>
{/if}

<style>
  .image-preview {
    position: fixed;
    width: 300px;
    height: 200px; /* Force aspect ratio? 16:9 is typical, user didn't specify. 200px fixed height is existing. */
    pointer-events: none;
    z-index: 1000;
    opacity: 1;
    transition: opacity 0.15s ease;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
    background: #000; /* Dark bg for video loading */
    overflow: hidden;
  }

  .preview-media {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  @media (max-width: 768px) {
    .image-preview {
      display: none !important;
    }
  }
</style>
