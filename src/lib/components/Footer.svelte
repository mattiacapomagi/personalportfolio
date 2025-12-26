<script>
  import { onMount, onDestroy } from "svelte";

  let timestamp = $state("");
  let interval;

  function updateTime() {
    const now = new Date();
    // Format: DD/MM/YYYY HH:MM:SS
    const date = now.toLocaleDateString("en-GB"); // DD/MM/YYYY
    const time = now.toLocaleTimeString("en-GB"); // HH:MM:SS
    timestamp = `${date} ${time}`;
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
  <div class="copyright">COPYRIGHT MATTIA CAPOMAGI 2025</div>
  <div class="timestamp">
    {timestamp}
  </div>
</footer>

<style>
  .site-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 0 0.5rem; /* Bottom padding matches header top (0.5rem) */
    margin-top: 40px; /* Reduced since flex handles spacing */
    font-size: 1.1rem;
    font-weight: 400; /* Normal weight */
    text-transform: uppercase;
    color: var(--color-text);
  }

  .timestamp {
    /* Ensure monospace alignment */
    font-variant-numeric: tabular-nums;
  }
</style>
