<script>
  import { onMount, onDestroy } from "svelte";
  import { themePreference, cycleTheme } from "$lib/stores/theme.js";
  import { language } from "$lib/stores/language.js";

  let timeStr = $state("");
  let dateStr = $state("");
  let currentYear = new Date().getFullYear();
  let interval;

  function updateTime() {
    const now = new Date();
    dateStr = now.toLocaleDateString("en-GB");
    timeStr = now.toLocaleTimeString("en-GB");
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

  // Get label based on current preference and language
  let themeLabel = $derived(() => {
    if ($themePreference === "light") {
      return $language === "en" ? "LIGHT MODE" : "MODALITÀ CHIARA";
    }
    if ($themePreference === "dark") {
      return $language === "en" ? "DARK MODE" : "MODALITÀ SCURA";
    }
    return $language === "en" ? "SYSTEM MODE" : "MODALITÀ SISTEMA";
  });

  // Mobile labels - universal short words
  let mobileLabel = $derived(() => {
    if ($themePreference === "light") return "LIGHT";
    if ($themePreference === "dark") return "DARK";
    return "AUTO";
  });
</script>

<footer class="site-footer">
  <div class="copyright">
    <span class="desktop-text">COPYRIGHT MATTIA CAPOMAGI {currentYear}</span>
    <span class="mobile-text">Mattia Capomagi {currentYear}</span>
  </div>

  <span
    class="theme-toggle"
    onclick={handleThemeToggle}
    role="button"
    tabindex="0"
    onkeydown={(e) => e.key === "Enter" && handleThemeToggle()}
  >
    <span class="desktop-text">{themeLabel()}</span>
    <span class="mobile-text">{mobileLabel()}</span>
  </span>

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
    cursor: pointer;
    transition: color 0.2s ease;
  }

  .theme-toggle:hover {
    color: var(--color-accent);
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
      font-size: 0.85rem;
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
