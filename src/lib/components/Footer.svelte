<script>
  import { onMount, onDestroy } from "svelte";
  import {
    themePreference,
    cycleTheme,
    getResolvedTheme,
  } from "$lib/stores/theme.js";

  let timeStr = $state("");
  let dateStr = $state("");
  let currentYear = new Date().getFullYear();
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

  function handleThemeToggle() {
    themePreference.update((current) => cycleTheme(current));
  }

  // Get icon based on current preference
  let themeIcon = $derived(() => {
    if ($themePreference === "light") return "☀️";
    if ($themePreference === "dark") return "🌙";
    return "🔄"; // system
  });

  let themeLabel = $derived(() => {
    if ($themePreference === "light") return "Light";
    if ($themePreference === "dark") return "Dark";
    return "Auto";
  });
</script>

<footer class="site-footer">
  <div class="copyright">
    <span class="desktop-text">COPYRIGHT MATTIA CAPOMAGI {currentYear}</span>
    <span class="mobile-text">Mattia Capomagi {currentYear}</span>
  </div>

  <button
    class="theme-toggle"
    onclick={handleThemeToggle}
    aria-label="Toggle theme"
  >
    <span class="theme-icon">{themeIcon()}</span>
    <span class="theme-label">{themeLabel()}</span>
  </button>

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
    margin-top: 10px;
    font-size: 1.1rem;
    font-weight: 400;
    text-transform: uppercase;
    color: var(--color-text);
  }

  .timestamp {
    font-variant-numeric: tabular-nums;
  }

  .theme-toggle {
    display: flex;
    align-items: center;
    gap: 6px;
    background: none;
    border: 1px solid var(--color-text);
    padding: 4px 12px;
    font-size: 0.8rem;
    font-weight: 500;
    font-family: var(--font-mono);
    color: var(--color-text);
    cursor: pointer;
    transition: all 0.2s ease;
    text-transform: uppercase;
  }

  .theme-toggle:hover {
    background: var(--color-text);
    color: var(--color-bg);
  }

  .theme-icon {
    font-size: 1rem;
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
      font-size: 1rem;
      margin-top: 10px;
    }

    .theme-toggle {
      padding: 4px 8px;
      font-size: 0.75rem;
    }

    .theme-label {
      display: none;
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
