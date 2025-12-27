<script>
  import { page } from "$app/stores";
  import { language } from "$lib/stores/language";

  let activePath = $state("");

  $effect(() => {
    activePath = $page.url.pathname;
  });

  function toggleLanguage() {
    language.update((l) => (l === "en" ? "it" : "en"));
  }
</script>

<header class="header">
  <div class="logo">
    <a href="/">MATTIA CAPOMAGI</a>
  </div>

  <nav class="nav">
    <button class="nav-link lang-toggle" onclick={toggleLanguage}>
      {$language === "en" ? "it" : "en"}
    </button>
    <a href="/" class="nav-link" class:active={activePath === "/"}>
      {$language === "en" ? "projects" : "progetti"}
    </a>
    <a href="/about" class="nav-link" class:active={activePath === "/about"}>
      {$language === "en" ? "about" : "chi sono?"}
    </a>
  </nav>
</header>

<style>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0.5rem 0 0 0; /* Reduced padding */
    width: 100%;
    /* margin-bottom: 2rem; Removed to let page handle spacing */
  }

  .logo a {
    font-size: 1.5rem;
    font-weight: 700;
    text-decoration: none;
    color: var(--color-text);
    text-transform: uppercase;
    display: block;
    line-height: 1;
  }

  .nav {
    display: flex;
    gap: 1.5rem;
  }

  .nav-link {
    font-family: inherit; /* Ensure button inherits font */
    font-size: 1.5rem;
    font-weight: 700;
    text-decoration: none;
    color: #b0b0b0; /* Light gray for inactive state */
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    line-height: 1;
  }

  .nav-link:hover,
  .nav-link.active {
    color: var(--color-accent);
  }
</style>
