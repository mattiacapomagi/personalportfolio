<script>
  import { onMount } from "svelte";

  /** @type {{ images: string[] }} */
  let { images } = $props();

  let currentIndex = $state(0);
  let videoRefs = $state([]); // Array to store video element references
  let isPlaying = $state([]); // Track play state per slide
  let progress = $state([]); // Track progress per slide (0-100)

  // Calculate canonical index for loop logic
  let currentCanonicalIndex = $derived(
    images.length > 0
      ? ((currentIndex % images.length) + images.length) % images.length
      : 0
  );

  // Reset state when images change
  $effect(() => {
    // Reset status arrays, but let binding handle videoRefs
    isPlaying = new Array(images.length).fill(false);
    progress = new Array(images.length).fill(0);
  });

  function isVideo(path) {
    return (
      path.toLowerCase().endsWith(".mp4") || path.toLowerCase().endsWith(".mov")
    );
  }

  function next() {
    currentIndex += 1;
    pauseAllVideos();
  }

  function prev() {
    currentIndex -= 1;
    pauseAllVideos();
  }

  function getPos(i) {
    if (images.length === 0) return 0;
    const len = images.length;
    let offset = (i - currentIndex) % len;

    // Wrap around to keep within reasonable neighbor distance
    if (offset < -len / 2) offset += len;
    else if (offset > len / 2) offset -= len;

    return offset * 100;
  }

  function getZIndex(i) {
    const len = images.length;
    // Calculate canonical current index (0 to len-1)
    const currentCanonical = ((currentIndex % len) + len) % len;
    return i === currentCanonical ? 5 : 1;
  }

  function pauseAllVideos() {
    videoRefs.forEach((video, i) => {
      if (video) {
        video.pause();
        isPlaying[i] = false;
      }
    });
  }

  // Video Controls
  function togglePlay(index) {
    const video = videoRefs[index];
    if (!video) return;

    if (video.paused) {
      // First play adjustment: Unmute and set default volume to 40%
      if (video.muted) {
        video.muted = false;
        video.volume = 0.4;
      }

      video.play().catch((e) => console.error("Play failed:", e));
      isPlaying[index] = true;
    } else {
      video.pause();
      isPlaying[index] = false;
    }
  }

  function handleVolume(e, index) {
    const video = videoRefs[index];
    if (!video) return;
    video.muted = false; // IMPORTANT: Unmute when changing volume
    video.volume = e.currentTarget.value;
  }

  function handleTimeUpdate(e, index) {
    const video = e.target;
    if (video.duration) {
      progress[index] = (video.currentTime / video.duration) * 100;
    }
  }

  let fullscreenImage = $state(null);

  $effect(() => {
    if (fullscreenImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  });

  function openFullscreenImage(src) {
    fullscreenImage = src;
  }

  function closeFullscreenImage() {
    fullscreenImage = null;
  }

  function handleVideoFullscreen(index) {
    const video = videoRefs[index];
    if (video) {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.webkitRequestFullscreen) {
        /* Safari */
        video.webkitRequestFullscreen();
      } else if (video.msRequestFullscreen) {
        /* IE11 */
        video.msRequestFullscreen();
      }
    }
  }
</script>

<div class="carousel">
  {#if images.length > 1}
    <button class="nav-btn prev" onclick={prev} aria-label="Previous image">
      ←
    </button>
  {/if}

  <div class="carousel-track">
    {#each images as media, i}
      <div
        class="slide"
        class:active={i === currentCanonicalIndex}
        style="transform: translateX({getPos(i)}%); z-index: {getZIndex(i)}"
      >
        {#if isVideo(media)}
          <div class="video-container">
            <!-- Blurred Background Video -->
            <!-- svelte-ignore a11y_media_has_caption -->
            <video
              src={media}
              class="blur-bg-video"
              autoplay
              loop
              muted
              playsinline
            ></video>

            <!-- Main Video -->
            <!-- svelte-ignore a11y_media_has_caption -->
            <video
              src={media}
              class="main-video"
              bind:this={videoRefs[i]}
              loop
              muted
              playsinline
              ontimeupdate={(e) => handleTimeUpdate(e, i)}
              onclick={() => togglePlay(i)}
            ></video>

            <!-- Custom Controls -->
            <div
              class="video-controls"
              class:visible={!isPlaying[i] || i === currentCanonicalIndex}
            >
              <div class="control-row">
                <button
                  class="icon-btn play-btn"
                  onclick={(e) => {
                    e.stopPropagation();
                    togglePlay(i);
                  }}
                  aria-label={isPlaying[i] ? "Pause" : "Play"}
                >
                  {#if isPlaying[i]}
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      ><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" /></svg
                    >
                  {:else}
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"><path d="M8 5v14l11-7z" /></svg
                    >
                  {/if}
                </button>

                <!-- Range: Progress -->
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progress[i] || 0}
                  oninput={(e) => handleSeek(e, i)}
                  class="seek-bar"
                  onclick={(e) => e.stopPropagation()}
                />

                <!-- Range: Volume -->
                <div
                  class="volume-container"
                  onclick={(e) => e.stopPropagation()}
                >
                  <span class="vol-label">VOL</span>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={videoRefs[i] ? videoRefs[i].volume : 0.4}
                    oninput={(e) => handleVolume(e, i)}
                    class="volume-bar"
                  />
                </div>

                <!-- Fullscreen Button -->
                <button
                  class="icon-btn fs-btn"
                  onclick={(e) => {
                    e.stopPropagation();
                    handleVideoFullscreen(i);
                  }}
                  aria-label="Fullscreen"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    ><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg
                  >
                </button>
              </div>
            </div>
          </div>
        {:else}
          <div class="image-wrapper">
            <div class="blur-bg" style="background-image: url('{media}')"></div>
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
            <img
              src={media}
              alt="Project slide {i + 1}"
              onclick={() => openFullscreenImage(media)}
              class="clickable-image"
            />
          </div>
        {/if}
      </div>
    {/each}
  </div>

  {#if images.length > 1}
    <button class="nav-btn next" onclick={next} aria-label="Next image">
      →
    </button>
  {/if}

  <!-- Lightbox Overlay -->
  {#if fullscreenImage}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="lightbox" onclick={closeFullscreenImage}>
      <button class="close-btn" aria-label="Close">×</button>
      <img
        src={fullscreenImage}
        alt="Fullscreen preview"
        onclick={(e) => e.stopPropagation()}
      />
    </div>
  {/if}
</div>

<style>
  .carousel {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    background: #f4f4f4;
    overflow: hidden;
  }

  .carousel-track {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .slide {
    position: absolute;
    inset: 0;
    transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1); /* Smoother, no bounce */
    display: flex;
    justify-content: center;
    align-items: center;
    /* Removed background: #000 to avoid black edges showing through blur */
    will-change: transform; /* Performance hint */
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain; /* Don't crop */
    display: block;
    position: relative;
    z-index: 1; /* Above blur */
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5); /* Optional: Separation shadow */
  }

  .clickable-image {
    cursor: zoom-in;
    transition: transform 0.2s ease;
  }

  .clickable-image:active {
    transform: scale(0.98);
  }

  .image-wrapper {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }

  .blur-bg {
    position: absolute;
    inset: -150px;
    background-size: cover;
    background-position: center;
    filter: blur(80px) brightness(0.7);
    transform: scale(1.5);
    z-index: 0;
  }

  /* Video Styles */
  .video-container {
    width: 100%;
    height: 100%;
    position: relative;
    /* background: #000; Removed to fix black edges */
    overflow: hidden; /* Contain the blur */
  }

  .blur-bg-video {
    position: absolute;
    inset: -150px;
    width: calc(100% + 300px);
    height: calc(100% + 300px);
    object-fit: cover;
    filter: blur(80px) brightness(0.7);
    transform: scale(1.5);
    z-index: 0;
    opacity: 0.9;
  }

  .main-video {
    width: 100%;
    height: 100%;
    object-fit: contain;
    cursor: pointer;
    position: relative;
    z-index: 1; /* Above blur */
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  }

  .video-controls {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 20px;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
    display: flex;
    flex-direction: column;
    pointer-events: none; /* Let clicks pass unless strictly on controls */
    z-index: 10; /* Ensure controls are above video */
  }

  .video-container:hover .video-controls,
  .video-controls.visible {
    opacity: 1;
  }

  .control-row {
    display: flex;
    align-items: center;
    gap: 15px;
    width: 100%;
    font-family: inherit;
    pointer-events: auto; /* Re-enable pointer events for buttons */
  }

  /* Icon Buttons */
  .icon-btn {
    background: none;
    border: none;
    color: white;
    padding: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    border-radius: 4px;
  }

  .icon-btn:hover {
    color: var(--color-accent, #f27200);
    transform: scale(1.1);
  }

  .play-btn {
    display: flex; /* Ensure proper centering if needed, or just remove if redundant */
    justify-content: center;
    align-items: center;
  }

  /* Seek Bar (Progress) */
  .seek-bar {
    flex-grow: 1;
    height: 4px;
    -webkit-appearance: none;
    appearance: none; /* Standard property */
    background: rgba(255, 255, 255, 0.3);
    border-radius: 0;
    cursor: pointer;
  }

  .seek-bar::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 12px;
    height: 12px;
    background: var(--color-accent, #f27200);
    cursor: pointer;
    border: none;
  }

  /* Volume Controls */
  .volume-container {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .vol-label {
    color: white;
    font-size: 0.8rem;
    font-weight: 700;
  }

  .volume-bar {
    width: 60px;
    height: 4px;
    -webkit-appearance: none;
    appearance: none; /* Standard property */
    background: rgba(255, 255, 255, 0.3);
    cursor: pointer;
  }

  .volume-bar::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 8px;
    height: 8px;
    background: white;
    cursor: pointer;
    border: none;
  }

  /* Navigation */
  .nav-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: auto;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    color: white;
    mix-blend-mode: difference;
    background: none;
    border: none;
    z-index: 10;
    transition: transform 0.2s ease;
    opacity: 0.6;
    padding: 20px;
    cursor: pointer;
  }

  .nav-btn:hover {
    opacity: 1;
    transform: translateY(-50%) scale(1.1);
  }

  .prev {
    left: 20px;
  }
  .next {
    right: 20px;
  }

  /* Lightbox Styles */
  .lightbox {
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: rgba(
      0,
      0,
      0,
      0.3
    ); /* Semi-transparent to show blurred content */
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px;
    backdrop-filter: blur(20px) grayscale(100%); /* Blur + Desaturate */
    -webkit-backdrop-filter: blur(20px) grayscale(100%); /* Safari support */
    transition: all 0.3s ease;
  }

  .lightbox img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    box-shadow: none;
  }

  .close-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    background: none;
    border: none;
    color: white;
    font-size: 2rem;
    cursor: pointer;
    z-index: 10000;
    opacity: 0.8;
    transition: opacity 0.2s;
  }

  .close-btn:hover {
    opacity: 1;
  }
</style>
