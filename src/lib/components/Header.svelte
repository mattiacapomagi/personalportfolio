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
      <span class="desktop-text"
        >{$language === "en" ? "projects" : "progetti"}</span
      >
      <span class="mobile-text">prj</span>
    </a>
    <a href="/about" class="nav-link" class:active={activePath === "/about"}>
      <span class="desktop-text"
        >{$language === "en" ? "about" : "chi sono?"}</span
      >
      <span class="mobile-text">{$language === "en" ? "abt" : "bio"}</span>
    </a>
  </nav>
</header>

<style>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0;
    margin-top: 8px;
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

  /* Text Display Logic */
  .mobile-text {
    display: none;
  }

  .desktop-text {
    display: inline;
  }

  @media (max-width: 768px) {
    .logo a,
    .nav-link {
      font-size: 0.9rem; /* Much smaller for tablet */
    }
  }

  @media (max-width: 480px) {
    .header {
      /* Keep row layout */
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      gap: 0;
      margin-bottom: 20px; /* Separation from content */
    }

    .logo a {
      font-size: 1.2rem; /* Increased slightly */
    }

    .nav-link {
      font-size: 1.2rem; /* Increased slightly */
    }

    .nav {
      gap: 0.8rem;
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
