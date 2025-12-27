<script>
  import { onMount, onDestroy } from "svelte";

  let timeStr = $state("");
  let dateStr = $state("");
  let interval;

  function updateTime() {
    const now = new Date();
    dateStr = now.toLocaleDateString("en-GB"); // DD/MM/YYYY
    timeStr = now.toLocaleTimeString("en-GB"); // HH:MM:SS
  }

  onMount(() => {
    updateTime();
    interval = setInterval(updateTime, 1000);
  });

  onDestroy(() => {
    if (interval) clearInterval(interval);
  });
</script>

<footer class="site-footer">
  <div class="copyright">
    <span class="desktop-text">COPYRIGHT MATTIA CAPOMAGI 2025</span>
    <span class="mobile-text">Mattia Capomagi 2025</span>
  </div>
  <div class="timestamp">
    <span class="desktop-text">{dateStr} {timeStr}</span>
    <span class="mobile-text">{timeStr}</span>
  </div>
</footer>

<style>
  .site-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    margin-bottom: 8px;
    margin-top: 10px; /* Reduced from 40px */
    font-size: 1.1rem;
    font-weight: 400; /* Normal weight */
    text-transform: uppercase;
    color: var(--color-text);
  }

  .timestamp {
    /* Ensure monospace alignment */
    font-variant-numeric: tabular-nums;
  }

  /* Text Display Logic */
  .mobile-text {
    display: none;
  }

  .desktop-text {
    display: inline;
  }

  @media (max-width: 480px) {
    .site-footer {
      font-size: 1.2rem; /* Increased slightly */
      margin-top: 10px;
    }

    /* Toggle Text */
    .desktop-text {
      display: none;
    }
    .mobile-text {
      display: inline;
    }
  }
</style>
