<script>
  import "../../../app.css";
  import Header from "$lib/components/Header.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import { onMount } from "svelte";
  import Lenis from "lenis";
  import "lenis/dist/lenis.css";

  let { children } = $props();

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
</script>

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

<style>
  .tool-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  /* Questo wrapper serve solo per Header e Footer */
  .constrained-wrapper {
    width: 100%;
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 0 var(--page-padding);
  }

  .tool-main {
    flex: 1;
    width: 100%;
    /* Nessun limite di larghezza, così il tool "esplode" fuori */
  }
</style>
