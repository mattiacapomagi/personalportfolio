<script>
  import "../app.css";
  import Header from "$lib/components/Header.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import CookieConsent from "$lib/components/CookieConsent.svelte";
  import { onMount } from "svelte";
  import Lenis from "lenis";
  import "lenis/dist/lenis.css";

  import { page } from "$app/stores";
  import { themePreference, getResolvedTheme } from "$lib/stores/theme.js";

  let { children } = $props();

  // Apply theme to document
  $effect(() => {
    if (typeof document === "undefined") return;
    const resolved = getResolvedTheme($themePreference);
    document.documentElement.setAttribute("data-theme", resolved);
  });

  // Listen for system preference changes
  $effect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    function handleChange() {
      // Re-trigger the theme application
      if ($themePreference === "system") {
        const resolved = getResolvedTheme("system");
        document.documentElement.setAttribute("data-theme", resolved);
      }
    }

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  });

  onMount(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // --- Global Error Tracking (Phase 10) ---
    function logError(msg, source, lineno, colno, error) {
      if (typeof gtag !== "undefined") {
        gtag("event", "app_error", {
          event_category: "error",
          event_label: `${msg} at ${source}:${lineno}`,
          non_interaction: true,
        });
      }
    }

    window.addEventListener("error", (event) => {
      logError(
        event.message,
        event.filename,
        event.lineno,
        event.colno,
        event.error
      );
    });

    window.addEventListener("unhandledrejection", (event) => {
      logError(event.reason, "promise", 0, 0, event.reason);
    });

    return () => {
      lenis.destroy();
      // Listeners are on window, technically should clean up but they are global for the app
    };
  });

  // Check if we are on a specific tool page (e.g. /tools/bricklab)
  let isToolPage = $derived($page.url.pathname.startsWith("/tools/"));

  // Check if we are on bento page (no header/footer)
  let isBentoPage = $derived(
    $page.url.pathname === "/bento" || $page.url.pathname === "/bento/"
  );

  /* --- Maintenance Mode Logic --- */
  let isUnlocked = $state(false);
  let passwordInput = $state("");
  let textInputRef; // To focus input
  let unlockError = $state(false);

  const MAINTENANCE_MODE = import.meta.env.VITE_MAINTENANCE_MODE === "true";
  const SITE_PASSWORD = import.meta.env.VITE_SITE_PASSWORD || "capomagico";
  const SESSION_TIMEOUT = 10 * 60 * 1000; // 10 Minutes

  // Exclude /bento and check lock status
  let showMaintenance = $derived(
    MAINTENANCE_MODE && !isBentoPage && !isUnlocked
  );

  function checkPassword() {
    console.log("Checking Password...");
    console.log("Expected (Env):", SITE_PASSWORD);
    console.log("Input:", passwordInput);

    if (passwordInput === SITE_PASSWORD) {
      isUnlocked = true;
      updateSession();
    } else {
      console.warn("Access Denied");
      unlockError = true;
      passwordInput = "";
      setTimeout(() => (unlockError = false), 1000);
    }
  }

  function handleKeydown(e) {
    if (e.key === "Enter") checkPassword();
  }

  function updateSession() {
    if (typeof window === "undefined") return;
    localStorage.setItem("site_session_timestamp", Date.now().toString());
  }

  function checkSession() {
    if (typeof window === "undefined") return false;
    const lastActive = localStorage.getItem("site_session_timestamp");
    if (!lastActive) return false;

    const diff = Date.now() - parseInt(lastActive, 10);
    if (diff > SESSION_TIMEOUT) {
      localStorage.removeItem("site_session_timestamp");
      return false;
    }
    return true;
  }

  onMount(() => {
    // Check session
    if (checkSession()) {
      isUnlocked = true;
      updateSession();
    } else {
      isUnlocked = false;
    }

    // Initialize Lenis
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  });

  $effect(() => {
    if (isUnlocked) updateSession();
  });
</script>

{#if showMaintenance}
  <!-- Maintenance Overlay -->
  <div class="maintenance-overlay">
    <div class="maintenance-content">
      <h1 class="m-title">MATTIA CAPOMAGI</h1>
      <p class="m-status">UNDER MAINTENANCE</p>

      <div class="password-group">
        <input
          type="password"
          placeholder="PASSWORD"
          bind:value={passwordInput}
          onkeydown={handleKeydown}
          class:error={unlockError}
          autocomplete="off"
        />
        <button onclick={checkPassword}>ENTER</button>
      </div>

      {#if unlockError}
        <p class="m-error">ACCESS DENIED</p>
      {/if}
    </div>
  </div>
{/if}

{#if isBentoPage}
  <!-- Bento page has no header/footer -->
  <div class="bento-layout">
    {@render children()}
  </div>
{:else if isToolPage}
  <div class="tool-layout">
    <div class="constrained-wrapper">
      <Header />
    </div>
    <main class="tool-main">
      {@render children()}
    </main>
    <div class="constrained-wrapper">
      <Footer />
    </div>
  </div>
{:else}
  <div class="container">
    <Header />
    <main class="main">
      {@render children()}
    </main>
    <Footer />
  </div>
{/if}

<CookieConsent />

<style>
  /* Standard Layout */
  .container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 40px var(--page-padding) 0; /* Top padding for fixed navbar */
  }

  .main {
    flex: 1;
    padding-bottom: 0;
  }

  /* Tool Layout (Full Width) */
  .tool-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    padding-top: 40px; /* Top padding for fixed navbar */
  }

  .constrained-wrapper {
    width: 100%;
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 0 var(--page-padding);
  }

  .tool-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  @media (max-width: 480px) {
    .container {
      padding-top: 60px; /* Smaller padding for mobile navbar */
    }
    .tool-layout {
      padding-top: 60px;
    }
  }

  /* Bento Layout - fullscreen, no header/footer */
  .bento-layout {
    min-height: 100vh;
    width: 100%;
  }

  /* --- Maintenance Overlay Styles --- */
  .maintenance-overlay {
    position: fixed;
    inset: 0;
    z-index: 99999;
    background: #f4f4f4; /* Match site bg */
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: var(--font-mono);
  }

  .maintenance-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    width: 100%;
    max-width: 300px;
    text-align: center;
  }

  .m-title {
    font-family: var(--font-sans);
    font-weight: 900;
    font-size: 3rem;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: -0.02em; /* Relaxed kerning */
    line-height: 0.9;
    white-space: nowrap; /* Prevent wrapping */
  }

  /* Box removed */

  .m-status {
    margin: 0;
    font-size: 1.35rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #f27200;
    font-family: var(--font-mono);
    letter-spacing: -0.02em;
  }

  .password-group {
    display: flex;
    width: 100%;
    gap: 10px;
  }

  input[type="password"] {
    flex: 1;
    background: transparent;
    border: 1px solid black;
    padding: 12px;
    font-family: var(--font-mono);
    font-size: 1rem;
    border-radius: 0;
    outline: none;
    color: black;
  }

  input[type="password"]:focus {
    background: white;
  }

  input[type="password"].error {
    border-color: red;
    color: red;
  }

  button {
    background: black;
    color: white;
    border: 1px solid black;
    padding: 0 20px;
    font-family: var(--font-mono);
    font-weight: 700;
    cursor: pointer;
    border-radius: 0;
    transition: all 0.2s;
  }

  button:hover {
    background: white;
    color: black;
  }

  .m-error {
    color: red;
    font-size: 0.8rem;
    margin: 0;
    font-weight: 700;
  }
</style>
