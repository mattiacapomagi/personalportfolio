<script>
  import "../app.css";
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

<div class="container">
  <Header />
  <main class="main">
    {@render children()}
  </main>
  <Footer />
</div>

<style>
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
</style>
