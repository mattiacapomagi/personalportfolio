<script>
  import { onMount, onDestroy } from "svelte";

  let canvas;
  let ctx;
  let animationFrame;

  // Configuration
  const COLOR_RGB = "242, 114, 0"; // #f27200
  const GRAVITY = 0.4;
  const AIR_DRAG = 0.99;
  const PILE_HEIGHT_ADD = 5.0;
  const EROSION_RATE = 0.15;
  const SMOOTHING_FACTOR = 2; // Smoother, rounder piles (was 0.1)
  const MAX_PARTICLES = 1000;

  let particles = [];
  let floors = [];

  let mouse = { x: 0, y: 0 };
  let lastMouse = { x: 0, y: 0 };
  let width = 0;
  let height = 0;

  class Particle {
    constructor(x, y, vx, vy) {
      this.x = x;
      this.y = y;
      this.vx = vx;
      this.vy = vy;
      this.size = Math.random() * 1.5 + 0.5;
    }

    update(boundsHeight, boundsWidth) {
      if (this.life <= 0) return true; // Optim: Dead check first

      this.vy += GRAVITY;
      this.vx *= AIR_DRAG;
      this.vy *= AIR_DRAG;

      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x >= boundsWidth) return true;

      const floorIndex = Math.floor(this.x);
      if (floorIndex < 0 || floorIndex >= floors.length) return true;

      const currentFloorY = boundsHeight - floors[floorIndex];

      if (this.y >= currentFloorY) {
        floors[floorIndex] += PILE_HEIGHT_ADD;
        if (floorIndex > 0) floors[floorIndex - 1] += PILE_HEIGHT_ADD * 0.5;
        if (floorIndex < floors.length - 1)
          floors[floorIndex + 1] += PILE_HEIGHT_ADD * 0.5;
        return true;
      }

      return false;
    }

    draw(context) {
      context.fillStyle = `rgba(${COLOR_RGB}, 1)`;
      context.fillRect(this.x, this.y, this.size, this.size);
    }
  }

  function handleMouseMove(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    if (lastMouse.x === 0 && lastMouse.y === 0) {
      lastMouse.x = mouse.x;
      lastMouse.y = mouse.y;
    }

    const dx = mouse.x - lastMouse.x;
    const dy = mouse.y - lastMouse.y;
    const dist = Math.hypot(dx, dy);

    // Optimization: Interpolate every 5px (was 1px)
    const stepSize = 5;
    const steps = Math.ceil(dist / stepSize);

    // Reduced multiplier logic (max 3 extra particles)
    const speedFactor = Math.min(dist * 0.1, 3);
    const countPerStep = 1 + Math.floor(Math.random() * speedFactor);

    for (let i = 0; i < steps; i++) {
      if (particles.length >= MAX_PARTICLES) break; // Hard stop

      const t = i / steps;
      const x = lastMouse.x + dx * t;
      const y = lastMouse.y + dy * t;

      for (let j = 0; j < countPerStep; j++) {
        if (particles.length >= MAX_PARTICLES) break;

        const spread = 2;
        const px = x + (Math.random() - 0.5) * spread;
        const py = y + (Math.random() - 0.5) * spread;

        const pvx = (Math.random() - 0.5) * 2 + dx * 0.05;
        const pvy = (Math.random() - 0.5) * 2 + dy * 0.05;

        particles.push(new Particle(px, py, pvx, pvy));
      }
    }

    lastMouse.x = mouse.x;
    lastMouse.y = mouse.y;
  }

  function updateFloors() {
    // 1. Smoothing / Avalanche
    // If a pixel is much higher than neighbors, smooth happens normally
    // We can do a simple blur pass
    for (let i = 1; i < floors.length - 1; i++) {
      const avg = (floors[i - 1] + floors[i] + floors[i + 1]) / 3;
      floors[i] = floors[i] * (1 - SMOOTHING_FACTOR) + avg * SMOOTHING_FACTOR;
    }

    // 2. Erosion / Decay
    for (let i = 0; i < floors.length; i++) {
      if (floors[i] > 0) {
        floors[i] -= EROSION_RATE;
        if (floors[i] < 0) floors[i] = 0;
      }
    }
  }

  function render() {
    if (!ctx || !canvas) return;

    // Resize
    if (
      canvas.width !== window.innerWidth ||
      canvas.height !== window.innerHeight
    ) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      width = canvas.width;
      height = canvas.height;
      // Reset floors on resize (or resize array, but reset is safer/easier)
      floors = new Float32Array(width).fill(0);
    }

    // Initialize floors if empty
    if (floors.length !== width) {
      floors = new Float32Array(width).fill(0);
    }

    ctx.clearRect(0, 0, width, height);

    // Update Particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      const dead = p.update(height, width);
      if (dead) {
        particles.splice(i, 1);
      } else {
        p.draw(ctx);
      }
    }

    // Update Dunes
    updateFloors();

    // Draw Dunes
    ctx.fillStyle = `rgba(${COLOR_RGB}, 0.8)`;
    ctx.beginPath();
    ctx.moveTo(0, height);

    // Draw the contour
    for (let x = 0; x < width; x += 2) {
      // Skip steps for perf if needed, 2 is fine
      if (floors[x] > 0.5) {
        // Only draw if significant
        ctx.lineTo(x, height - floors[x]);
      } else {
        ctx.lineTo(x, height);
      }
    }

    ctx.lineTo(width, height);
    ctx.closePath();
    ctx.fill();

    animationFrame = requestAnimationFrame(render);
  }

  onMount(() => {
    const matchMedia = window.matchMedia("(pointer: fine)");
    if (!matchMedia.matches) return;

    ctx = canvas.getContext("2d");
    width = window.innerWidth;
    height = window.innerHeight;

    floors = new Float32Array(width).fill(0);

    lastMouse.x = 0;
    lastMouse.y = 0;

    window.addEventListener("mousemove", handleMouseMove);
    render();
  });

  onDestroy(() => {
    if (typeof window !== "undefined") {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrame);
    }
  });
</script>

<canvas bind:this={canvas} class="cursor-trail"></canvas>

<style>
  .cursor-trail {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    z-index: 9999;
    mix-blend-mode: normal;
  }

  @media (hover: none) {
    .cursor-trail {
      display: none;
    }
  }
</style>
