<script>
  import { page } from "$app/stores";
  import { base } from "$app/paths";
  import { language, toggleLanguage } from "$lib/stores/language.js";

  let activePath = $state("");
  let menuOpen = $state(false);

  $effect(() => {
    activePath = $page.url.pathname;
  });

  // Close menu on navigation
  $effect(() => {
    if (activePath) {
      menuOpen = false;
    }
  });

  function normalizePath(path) {
    if (!path) return "/";
    if (!path.startsWith("/")) path = "/" + path;
    return path.endsWith("/") && path.length > 1 ? path.slice(0, -1) : path;
  }

  function toggleMenu() {
    menuOpen = !menuOpen;
  }
</script>

<header class="header" class:menu-open={menuOpen}>
  <div class="header-content">
    <div class="logo">
      <a href="{base}/">MATTIA CAPOMAGI</a>
    </div>

    <!-- Desktop Nav -->
    <nav class="nav desktop-nav">
      <button
        type="button"
        class="nav-link lang-toggle"
        onclick={toggleLanguage}
      >
        {$language === "en" ? "it" : "en"}
      </button>
      <a
        href="{base}/"
        class="nav-link"
        class:active={normalizePath(activePath) === normalizePath(base)}
      >
        {$language === "en" ? "projects" : "progetti"}
      </a>
      <a
        href="{base}/tools"
        class="nav-link"
        class:active={normalizePath(activePath).startsWith(
          normalizePath(`${base}/tools`)
        )}
      >
        tools
      </a>
      <a
        href="{base}/about"
        class="nav-link"
        class:active={normalizePath(activePath) ===
          normalizePath(`${base}/about`)}
      >
        {$language === "en" ? "about" : "chi sono?"}
      </a>
    </nav>

    <!-- Mobile Nav -->
    <nav class="nav mobile-nav">
      <button
        type="button"
        class="nav-link lang-toggle"
        onclick={toggleLanguage}
      >
        {$language === "en" ? "it" : "en"}
      </button>
      <button
        type="button"
        class="more-btn"
        onclick={toggleMenu}
        aria-label="Menu"
      >
        {$language === "en" ? "MORE" : "ALTRO"}
      </button>
    </nav>
  </div>
</header>

<!-- Fullscreen Menu Overlay -->
<div class="menu-overlay" class:open={menuOpen}>
  <div class="blur-bg" onclick={toggleMenu}></div>

  <div class="menu-header">
    <button
      type="button"
      class="close-btn"
      onclick={toggleMenu}
      aria-label="Close"
    >
      ×
    </button>
  </div>

  <div class="menu-content">
    <a
      href="{base}/"
      class="menu-link"
      class:active={normalizePath(activePath) === normalizePath(base)}
      style="--i: 0"
    >
      {$language === "en" ? "projects" : "progetti"}
    </a>
    <a
      href="{base}/tools"
      class="menu-link"
      class:active={normalizePath(activePath).startsWith(
        normalizePath(`${base}/tools`)
      )}
      style="--i: 1"
    >
      tools
    </a>
    <a
      href="{base}/about"
      class="menu-link"
      class:active={normalizePath(activePath) ===
        normalizePath(`${base}/about`)}
      style="--i: 2"
    >
      {$language === "en" ? "about" : "chi sono?"}
    </a>
  </div>
</div>

<style>
  /* Header - slides up when menu opens */
  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: rgba(253, 251, 247, 0.7);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    transform: translateY(0);
    transition: transform 0.4s ease;
  }

  :global([data-theme="dark"]) .header {
    background: rgba(0, 0, 0, 0.7);
  }

  .header.menu-open {
    transform: translateY(-100%);
  }

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px var(--page-padding);
    max-width: var(--max-width);
    margin: 0 auto;
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
    align-items: center;
  }

  .nav-link {
    font-family: inherit;
    font-size: 1.5rem;
    font-weight: 700;
    text-decoration: none;
    color: #b0b0b0;
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    line-height: 1;
    transition: color 0.2s ease;
    text-transform: uppercase;
  }

  .nav-link:hover,
  .nav-link.active {
    color: var(--color-accent);
  }

  /* Desktop/Mobile Nav Toggle */
  .mobile-nav {
    display: none;
  }

  .desktop-nav {
    display: flex;
  }

  /* MORE Button */
  .more-btn {
    display: none;
    font-family: inherit;
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--color-text);
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
  }

  /* Fullscreen Menu Overlay */
  .menu-overlay {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.4s ease;
  }

  .menu-overlay.open {
    opacity: 1;
    pointer-events: auto;
  }

  .blur-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
  }

  :global([data-theme="dark"]) .blur-bg {
    background: rgba(0, 0, 0, 0.5);
  }

  /* Menu Header with Close Button */
  .menu-header {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    padding: 12px var(--page-padding);
    display: flex;
    justify-content: flex-end;
    align-items: center;
    opacity: 0;
    transform: translateY(-20px);
    transition: all 0.4s ease 0.1s;
  }

  .menu-overlay.open .menu-header {
    opacity: 1;
    transform: translateY(0);
  }

  .close-btn {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--color-text);
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    line-height: 0.7;
    transition: color 0.2s ease;
  }

  .close-btn:hover {
    color: var(--color-accent);
  }

  /* Menu Content */
  .menu-content {
    position: absolute;
    top: 60px;
    right: var(--page-padding);
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 12px;
  }

  .menu-link {
    font-size: 1.5rem;
    font-weight: 700;
    text-decoration: none;
    color: var(--color-text);
    opacity: 0;
    transform: translateY(-15px);
    transition: all 0.4s ease;
    transition-delay: calc(0.15s + var(--i) * 0.05s);
    text-transform: uppercase;
  }

  .menu-overlay.open .menu-link {
    opacity: 1;
    transform: translateY(0);
  }

  .menu-link:hover {
    color: var(--color-accent);
  }

  .menu-link.active {
    color: var(--color-accent);
  }

  @media (max-width: 768px) {
    .logo a,
    .nav-link {
      font-size: 0.9rem;
    }
  }

  @media (max-width: 480px) {
    .header-content {
      padding: 12px var(--page-padding);
    }

    .logo a {
      font-size: 1.3rem;
    }

    .desktop-nav {
      display: none;
    }

    .mobile-nav {
      display: flex;
      gap: 1.5rem;
    }

    .more-btn {
      display: block;
    }

    .menu-overlay {
      display: block;
    }

    .nav-link.lang-toggle {
      font-size: 1.3rem;
    }

    .menu-header {
      padding: 12px var(--page-padding);
    }

    .menu-content {
      top: 55px;
    }
  }
</style>
