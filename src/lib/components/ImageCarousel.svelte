<script>
  import { onMount } from "svelte";
  import { base } from "$app/paths";

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

  let isMoving = $state(false);
  let blurNode; // Bound to the SVG filter element
  let animationFrame;

  function triggerBlur() {
    if (isMobile) return; // Disable motion blur on mobile for performance
    isMoving = true;
    const duration = 600; // Match CSS transition duration
    const start = performance.now();
    const maxBlur = 30; // Max horizontal spread (Reduced slightly from 40 to help perf)

    function animate() {
      const now = performance.now();
      const progress = Math.min((now - start) / duration, 1);

      // Calculate blur intensity using a bell curve (Sine ease-in-out ish)
      // 0 at start, 1 at 0.5, 0 at end
      const intensity = Math.sin(progress * Math.PI);

      // Apply directional blur
      if (blurNode) {
        blurNode.setAttribute("stdDeviation", `${intensity * maxBlur} 0`);
      }

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        isMoving = false;
        if (blurNode) blurNode.setAttribute("stdDeviation", "0 0");
      }
    }

    if (animationFrame) cancelAnimationFrame(animationFrame);
    animationFrame = requestAnimationFrame(animate);
  }

  function next() {
    currentIndex += 1;
    triggerBlur();
  }

  function prev() {
    currentIndex -= 1;
    triggerBlur();
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

  // Autoplay management
  $effect(() => {
    // This effect runs whenever currentCanonicalIndex changes (navigation)
    // or when videoRefs updates (initial load)

    // 1. Pause everyone else
    videoRefs.forEach((video, i) => {
      if (i !== currentCanonicalIndex && video) {
        video.pause();
        isPlaying[i] = false;
      }
    });

    // 2. Play current
    if (isMobile) return;

    const currentVideo = videoRefs[currentCanonicalIndex];
    if (currentVideo) {
      // Ensure muted if not already set (autoplay usually requires mute)
      // We rely on the <video muted> attribute initially.
      const playPromise = currentVideo.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            isPlaying[currentCanonicalIndex] = true;
          })
          .catch((error) => {
            console.log("Autoplay prevented:", error);
            isPlaying[currentCanonicalIndex] = false;
          });
      }
    }
  });

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

  function handleSeek(e, index) {
    const video = videoRefs[index];
    if (!video || !video.duration) return;
    const seekTime = (e.currentTarget.value / 100) * video.duration;
    video.currentTime = seekTime;
    progress[index] = e.currentTarget.value;
  }

  let fullscreenImage = $state(null);
  let isMobile = $state(false);

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

  onMount(() => {
    const checkMobile = () => {
      isMobile = window.matchMedia("(max-width: 768px)").matches;
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
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
  <!-- Viewport for Images (Overflow Hidden) -->
  <div class="viewport">
    <!-- Directional Motion Blur Filter -->
    <svg style="position: absolute; width: 0; height: 0;">
      <filter id="motion-blur-filter">
        <!-- Controlled via JS -->
        <feGaussianBlur
          in="SourceGraphic"
          stdDeviation="0 0"
          bind:this={blurNode}
        />
      </filter>
    </svg>

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
                controls={isMobile}
                ontimeupdate={(e) => handleTimeUpdate(e, i)}
                onclick={() => !isMobile && togglePlay(i)}
              ></video>

              <!-- Custom Controls (Desktop Overlay) -->
              <div
                class="video-controls"
                class:visible={!isMobile &&
                  (!isPlaying[i] || i === currentCanonicalIndex)}
                style:display={isMobile ? "none" : "flex"}
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

                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={progress[i] || 0}
                    oninput={(e) => handleSeek(e, i)}
                    class="seek-bar"
                    onclick={(e) => e.stopPropagation()}
                  />

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
              <div
                class="blur-bg"
                style="background-image: url('{media}')"
              ></div>
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
  </div>

  <!-- Navigation Buttons (Inside container but separate from viewport) -->
  {#if images.length > 1}
    <div class="nav-controls">
      <button class="nav-btn prev" onclick={prev} aria-label="Previous image">
        <img src="/freccia-sx.svg" alt="Previous" />
      </button>
      <button class="nav-btn next" onclick={next} aria-label="Next image">
        <img src="/freccia-dx.svg" alt="Next" />
      </button>
    </div>
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
    /* aspect-ratio removed here, handled by viewport */
    background: transparent;
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  /* The actual image area */
  /* The actual image area */
  .viewport {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    background: transparent; /* Transparent to show blurred image + site bg */
    overflow: hidden;
  }

  /* Navigation Controls Container */
  .nav-controls {
    pointer-events: none; /* Let clicks pass through container */
    position: absolute;
    inset: 0;
    z-index: 10;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
  }

  .nav-btn {
    pointer-events: auto; /* Re-enable buttons */
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
    transition: transform 0.2s ease;
    cursor: pointer;
    /* Removed absolute position from buttons themselves, handled by flex container */
  }

  .nav-btn:hover {
    transform: scale(1.1);
  }

  /* Desktop hover state for buttons */
  @media (hover: hover) {
    .nav-btn {
      opacity: 0.6;
    }
    .nav-btn:hover {
      opacity: 1;
    }
  }

  .carousel-track {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .slide {
    position: absolute;
    inset: 0;
    transition: transform 0.6s cubic-bezier(0.65, 0, 0.35, 1);
    display: flex;
    justify-content: center;
    align-items: center;
    will-change: transform;
    filter: url(#motion-blur-filter);
  }

  /* ... (Rest of existing CSS for videos, images, controls remains mostly same but checked) ... */
  .motion-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: transform 0.2s ease-out;
    will-change: transform;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
    position: relative;
    z-index: 1;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
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
    opacity: 0.25;
    mix-blend-mode: multiply;
  }

  /* Video Styles */
  .video-container {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
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
    opacity: 0.25;
    mix-blend-mode: multiply;
  }

  @media (max-width: 768px) {
    .carousel {
      margin-bottom: 20px;
    }

    .nav-controls {
      position: static;
      padding: 0;
      margin-top: 5px;
      justify-content: space-between;
      gap: 0;
      border: none;
      width: 100%;
    }

    .nav-btn {
      mix-blend-mode: normal;
      color: var(--color-text);
      padding: 10px 15px;
      background: transparent !important;
      border: none !important;
      box-shadow: none !important;
      border-radius: 0;
      opacity: 1;
    }

    .nav-btn img {
      width: 40px;
      height: auto;
      display: block;
      box-shadow: none !important;
      /* Invert for visibility on light backgrounds */
      filter: invert(1);
    }
  }

  /* Dark Mode Mobile: Keep White SVG (No Invert) */
  :global([data-theme="dark"]) .nav-btn img {
    filter: none !important;
  }

  /* Desktop Nav Overlay & Styles */
  @media (min-width: 769px) {
    /* ... */
    .nav-btn {
      pointer-events: auto;
      width: 80px;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent !important;
      border: none !important;
      box-shadow: none !important;
      transition: transform 0.2s ease;
      cursor: pointer;
      opacity: 1;
      filter: none;
    }

    .nav-btn img {
      width: 100%;
      height: auto;
      display: block;
      filter: none !important;
      box-shadow: none !important;
      background: none !important;
    }

    .nav-btn:hover {
      transform: scale(1.1);
    }
  }

  /* Dark Mode Mobile Arrow Support */
  :global([data-theme="dark"]) .nav-btn img {
    filter: invert(1);
  }

  /* Video Controls Desktop */
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
    pointer-events: none;
    z-index: 10;
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
    font-family: var(--font-mono);
    pointer-events: auto;
  }

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
    min-width: 30px; /* Ensure clickable */
    min-height: 30px;
  }

  .icon-btn:hover {
    color: var(--color-accent, #f27200);
    transform: scale(1.1);
  }

  .play-btn {
    justify-content: center;
    align-items: center;
  }

  .seek-bar {
    flex-grow: 1;
    height: 4px;
    -webkit-appearance: none;
    appearance: none;
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
    appearance: none;
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

  /* Lightbox Styles */
  .lightbox {
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px;
    backdrop-filter: blur(20px) grayscale(100%);
    -webkit-backdrop-filter: blur(20px) grayscale(100%);
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
