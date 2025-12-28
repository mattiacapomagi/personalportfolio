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

<header class="header">
  <div class="logo">
    <a href="{base}/">MATTIA CAPOMAGI</a>
  </div>

  <!-- Desktop Nav -->
  <nav class="nav desktop-nav">
    <button type="button" class="nav-link lang-toggle" onclick={toggleLanguage}>
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
    <button type="button" class="nav-link lang-toggle" onclick={toggleLanguage}>
      {$language === "en" ? "it" : "en"}
    </button>
    <button
      type="button"
      class="hamburger"
      class:open={menuOpen}
      onclick={toggleMenu}
      aria-label="Menu"
    >
      <span class="line"></span>
      <span class="line"></span>
      <span class="line"></span>
    </button>
  </nav>
</header>

<!-- Mobile Menu Overlay -->
{#if menuOpen}
  <div class="mobile-menu-overlay" onclick={toggleMenu}></div>
{/if}

<div class="mobile-menu" class:open={menuOpen}>
  <a
    href="{base}/"
    class="menu-link"
    class:active={normalizePath(activePath) === normalizePath(base)}
    style="--delay: 0.05s"
  >
    {$language === "en" ? "projects" : "progetti"}
  </a>
  <a
    href="{base}/tools"
    class="menu-link"
    class:active={normalizePath(activePath).startsWith(
      normalizePath(`${base}/tools`)
    )}
    style="--delay: 0.1s"
  >
    tools
  </a>
  <a
    href="{base}/about"
    class="menu-link"
    class:active={normalizePath(activePath) === normalizePath(`${base}/about`)}
    style="--delay: 0.15s"
  >
    {$language === "en" ? "about" : "chi sono?"}
  </a>
</div>

<style>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0;
    margin-top: 8px;
    width: 100%;
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

  /* Hamburger Button */
  .hamburger {
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 28px;
    height: 24px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    gap: 5px;
  }

  .hamburger .line {
    display: block;
    width: 100%;
    height: 2px;
    background: var(--color-text);
    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
    transform-origin: center;
  }

  .hamburger.open .line:nth-child(1) {
    transform: translateY(7px) rotate(45deg);
  }

  .hamburger.open .line:nth-child(2) {
    opacity: 0;
    transform: scaleX(0);
  }

  .hamburger.open .line:nth-child(3) {
    transform: translateY(-7px) rotate(-45deg);
  }

  /* Mobile Menu Overlay */
  .mobile-menu-overlay {
    display: none;
  }

  /* Mobile Menu */
  .mobile-menu {
    display: none;
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    background: var(--color-bg);
    padding: 0 var(--page-padding);
    flex-direction: column;
    gap: 0;
    z-index: 999;
    overflow: hidden;
    max-height: 0;
    opacity: 0;
    transition:
      max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1),
      opacity 0.3s ease;
  }

  .mobile-menu.open {
    max-height: 300px;
    opacity: 1;
    padding-bottom: 20px;
  }

  .menu-link {
    font-size: 1.3rem;
    font-weight: 700;
    text-decoration: none;
    color: var(--color-text);
    padding: 12px 0;
    border-bottom: 1px solid rgba(128, 128, 128, 0.3);
    opacity: 0;
    transform: translateX(-20px);
    transition:
      opacity 0.3s ease,
      transform 0.3s ease,
      color 0.2s ease;
    transition-delay: var(--delay);
  }

  .mobile-menu.open .menu-link {
    opacity: 1;
    transform: translateX(0);
  }

  .menu-link:hover,
  .menu-link.active {
    color: var(--color-accent);
  }

  .menu-link:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    .logo a,
    .nav-link {
      font-size: 0.9rem;
    }
  }

  @media (max-width: 480px) {
    .header {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      gap: 0;
      margin-bottom: 20px;
    }

    .logo a {
      font-size: 1.3rem;
    }

    .desktop-nav {
      display: none;
    }

    .mobile-nav {
      display: flex;
      gap: 1rem;
    }

    .hamburger {
      display: flex;
    }

    .mobile-menu {
      display: flex;
    }

    .mobile-menu-overlay {
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: transparent;
      z-index: 998;
    }

    .nav-link.lang-toggle {
      font-size: 1.3rem;
    }
  }
</style>
