<script>
  /** @type {{ images: string[] }} */
  let { images } = $props();

  let currentIndex = $state(0);

  function next() {
    currentIndex = (currentIndex + 1) % images.length;
  }

  function prev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
  }
</script>

<div class="carousel">
  <button class="nav-btn prev" onclick={prev} aria-label="Previous image">
    ←
  </button>

  <div class="carousel-track">
    {#each images as image, i}
      <div
        class="slide"
        class:active={i === currentIndex}
        style="transform: translateX({(i - currentIndex) * 100}%)"
      >
        <div class="placeholder" style="background-color: #E8E8E8;">
          <span class="placeholder-text">Image {i + 1}</span>
        </div>
      </div>
    {/each}
  </div>

  <button class="nav-btn next" onclick={next} aria-label="Next image">
    →
  </button>

  <div class="indicators">
    {#each images as _, i}
      <button
        class="indicator"
        class:active={i === currentIndex}
        onclick={() => (currentIndex = i)}
        aria-label="Go to slide {i + 1}"
      />
    {/each}
  </div>
</div>

<style>
  .carousel {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 10;
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
    transition: transform 0.4s ease;
  }

  .placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .placeholder-text {
    font-size: 14px;
    color: #999;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .nav-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    color: var(--color-text);
    background: rgba(255, 255, 255, 0.9);
    border-radius: 50%;
    z-index: 10;
    transition:
      background-color 0.2s ease,
      color 0.2s ease;
  }

  .nav-btn:hover {
    background: var(--color-text);
    color: var(--color-bg);
  }

  .prev {
    left: 20px;
  }

  .next {
    right: 20px;
  }

  .indicators {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 8px;
  }

  .indicator {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.3);
    transition: background-color 0.2s ease;
  }

  .indicator.active {
    background: var(--color-text);
  }
</style>
