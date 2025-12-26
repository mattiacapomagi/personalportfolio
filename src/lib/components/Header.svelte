<script>
  import { page } from "$app/stores";
</script>

<header class="site-header">
  <div class="logo">
    <a href="/">MATTIA CAPOMAGI</a>
  </div>

  <nav class="main-nav">
    <a
      href="/"
      class:active={$page.url.pathname === "/" ||
        $page.url.pathname.startsWith("/projects")}>projects</a
    >
    <a href="/about" class:active={$page.url.pathname === "/about"}>about</a>
  </nav>
</header>

<style>
  .site-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0; /* Further reduced from 1rem */
    font-weight: 700;
    font-size: 1.1rem;
    text-transform: uppercase;
  }

  .logo a {
    text-decoration: none;
  }

  .main-nav {
    display: flex;
    gap: 1.5rem;
  }

  .main-nav a {
    text-transform: lowercase;
    position: relative;
    color: var(--color-text);
    opacity: 0.4;
    transition:
      opacity 0.2s ease,
      color 0.2s ease;
  }

  .main-nav a:hover {
    opacity: 1;
    color: var(--color-accent);
  }

  .main-nav a.active {
    opacity: 1;
    color: var(--color-text);
  }
</style>
