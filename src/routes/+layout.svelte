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
  let isToolPage = $derived($page.url.pathname.startsWith("/tools/"));

  // Check if we are on bento page (no header/footer)
  let isBentoPage = $derived(
    $page.url.pathname === "/bento" || $page.url.pathname === "/bento/"
  );
</script>

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
</style>
