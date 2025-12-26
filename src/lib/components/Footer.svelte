<script>
  import { onMount, onDestroy } from "svelte";

  let currentTime = $state("");
  let intervalId;

  function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    currentTime = `${hours}:${minutes}:${seconds}`;
  }

  onMount(() => {
    updateTime();
    intervalId = setInterval(updateTime, 1000);
  });

  onDestroy(() => {
    if (intervalId) clearInterval(intervalId);
  });
</script>

<footer class="footer">
  <span class="copyright">COPYRIGHT MATTIA CAPOMAGI 2024</span>
  <span class="timestamp">{currentTime}</span>
</footer>

<style>
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px 40px;
    z-index: 100;
    background-color: var(--color-bg);
    font-size: 12px;
    font-weight: 400;
    letter-spacing: 0.02em;
  }

  .copyright,
  .timestamp {
    opacity: 0.6;
  }
</style>
