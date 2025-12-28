<script>
  import "../app.css";
  import Header from "$lib/components/Header.svelte";
  import Footer from "$lib/components/Footer.svelte";
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

    return () => {
      lenis.destroy();
    };
  });

  // Check if we are on a specific tool page (e.g. /tools/bricklab)
  // This logic assumes tools are nested under /tools/ and NOT just the list page (/tools)
  // Check if we are on a specific tool page OR the tools list
  let isToolPage = $derived($page.url.pathname.startsWith("/tools/"));
</script>

{#if isToolPage}
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

<style>
  /* Standard Layout */
  .container {
    display: flex;
    flex-direction: column;
    min-height: 100vh; /* Full viewport height */
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 0 var(--page-padding);
  }

  .main {
    flex: 1; /* Takes up remaining space, pushing footer down */
    padding-bottom: 0;
  }

  /* Tool Layout (Full Width) */
  .tool-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .constrained-wrapper {
    width: 100%;
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 0 var(--page-padding);
  }

  .tool-main {
    flex: 1;
    display: flex; /* Necessary for child to flex-grow */
    flex-direction: column;
    width: 100%;
    /* No max-width constraint here -> Full Width */
  }
</style>
