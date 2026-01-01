<script>
  import "../app.css";
  import Header from "$lib/components/Header.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import Loader from "$lib/components/Loader.svelte";
  import CookieConsent from "$lib/components/CookieConsent.svelte";
  import { onMount } from "svelte";
  import Lenis from "lenis";
  import "lenis/dist/lenis.css";

  import { page } from "$app/stores";
  import { afterNavigate } from "$app/navigation";
  import { themePreference, getResolvedTheme } from "$lib/stores/theme.js";

  let { children } = $props();

  let isLoading = $state(true);

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

  // Note: Lenis is initialized in the second onMount block below

  // Check if we are on a specific tool page (e.g. /tools/bricklab)
  let isToolPage = $derived($page.url.pathname.startsWith("/tools/"));

  // Check if we are on bento page (no header/footer)
  let isBentoPage = $derived(
    $page.url.pathname === "/bento" || $page.url.pathname === "/bento/"
  );

  // CHECK SESSION LOGIC
  // ... (unchanged) ...

  // CRITICAL DEBUG: DISABLING LENIS AND SCROLL RESET
  /*
  // Lenis instance stored for navigation reset
  let lenisInstance = $state(null);

  onMount(() => {
    // Check session
    // ...
    
    // Initialize Lenis - DISABLED
    // const lenis = new Lenis();
    // lenisInstance = lenis;

    // function raf(time) {
    //   lenis.raf(time);
    //   requestAnimationFrame(raf);
    // }
    // requestAnimationFrame(raf);

    // Global Error Tracking
    window.addEventListener("error", (event) => {
      // ...
    });

    // return () => lenis.destroy();
  });

  afterNavigate(() => {
    try {
      if (lenisInstance && typeof lenisInstance.scrollTo === "function") {
        lenisInstance.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    } catch (e) {
      console.warn("afterNavigate scroll error:", e);
      window.scrollTo(0, 0);
    }
  });
  */

  // BASIC SCROLL RESET
  afterNavigate(() => {
    window.scrollTo(0, 0);
  });

  // Loader onMount logic
  onMount(() => {
    console.log("[Loader] Init");

    const finishLoading = () => {
      console.log("[Loader] Finishing...");
      setTimeout(() => {
        isLoading = false;
        console.log("[Loader] Done");
      }, 800);
    };

    // Failsafe: Force close after 4s (localhost can be slow)
    const failsafe = setTimeout(() => {
      if (isLoading) {
        console.warn("[Loader] Failsafe timeout");
        finishLoading();
      }
    }, 4000);

    const checkImages = () => {
      const imgs = Array.from(document.images);
      const pending = imgs.filter((img) => !img.complete);

      if (pending.length === 0) {
        // All images loaded
        finishLoading();
        return true;
      }
      return false;
    };

    const handleLoad = () => {
      console.log("[Loader] Window Load Event");
      // Double check images just in case
      if (!checkImages()) {
        // If 'load' fired but strict image check failed (rare), wait a bit then force
        setTimeout(finishLoading, 500);
      }
    };

    if (document.readyState === "complete") {
      console.log("[Loader] Document Complete");
      finishLoading();
    } else {
      window.addEventListener("load", handleLoad);
      return () => {
        window.removeEventListener("load", handleLoad);
        clearTimeout(failsafe);
      };
    }
  });

  // Global Error Handler
  function handleGlobalError(event) {
    if (
      event.message?.includes("ResizeObserver loop") ||
      event.message?.includes("Extension context invalidated")
    ) {
      event.stopPropagation();
      return;
    }
    // Only log, don't break UI for hydration errors unless critical
    console.error("Global Error Caught:", event.error);
  }

  // Global Error Boundary State (Production & Dev)
  let globalError = $state(null);

  if (import.meta.env.DEV && typeof window !== "undefined") {
    window.addEventListener("error", (e) => (globalError = e.message));
    window.addEventListener(
      "unhandledrejection",
      (e) => (globalError = e.reason)
    );
  }
</script>

<svelte:window
  onerror={handleGlobalError}
  onunhandledrejection={(e) => handleGlobalError(e.reason)}
/>

{#if isLoading}
  <Loader />
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

<!-- GLOBAL ERROR BOUNDARY -->
{#if import.meta.env.DEV && globalError}
  <div
    style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.9); z-index: 9999; color: red; padding: 20px; overflow: auto; font-family: monospace; font-size: 14px;"
  >
    <h1>CRITICAL ERROR</h1>
    <pre>{JSON.stringify(
        globalError,
        Object.getOwnPropertyNames(globalError),
        2
      )}</pre>
    <button
      onclick={() => (globalError = null)}
      style="padding: 10px; background: white; color: black;">DISMISS</button
    >
  </div>
{/if}

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
