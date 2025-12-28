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
        class="hamburger"
        class:open={menuOpen}
        onclick={toggleMenu}
        aria-label="Menu"
      >
        <span class="line"></span>
        <span class="line"></span>
      </button>
    </nav>
  </div>
</header>

<!-- Mobile Menu Overlay -->
<div
  class="mobile-menu-overlay"
  class:open={menuOpen}
  onclick={toggleMenu}
></div>

<!-- Mobile Menu -->
<div class="mobile-menu" class:open={menuOpen}>
  <div class="menu-content">
    <a
      href="{base}/"
      class="menu-link"
      class:active={normalizePath(activePath) === normalizePath(base)}
      style="--i: 0"
    >
      <span class="link-text"
        >{$language === "en" ? "projects" : "progetti"}</span
      >
      <span class="link-arrow">→</span>
    </a>
    <a
      href="{base}/tools"
      class="menu-link"
      class:active={normalizePath(activePath).startsWith(
        normalizePath(`${base}/tools`)
      )}
      style="--i: 1"
    >
      <span class="link-text">tools</span>
      <span class="link-arrow">→</span>
    </a>
    <a
      href="{base}/about"
      class="menu-link"
      class:active={normalizePath(activePath) ===
        normalizePath(`${base}/about`)}
      style="--i: 2"
    >
      <span class="link-text">{$language === "en" ? "about" : "chi sono?"}</span
      >
      <span class="link-arrow">→</span>
    </a>
  </div>
</div>

<style>
  /* Sticky Glassmorphic Header */
  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: rgba(var(--color-bg-rgb, 253, 251, 247), 0.85);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(128, 128, 128, 0.15);
  }

  :global([data-theme="dark"]) .header {
    background: rgba(0, 0, 0, 0.85);
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

  /* Minimal Hamburger - 2 lines */
  .hamburger {
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 20px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    gap: 6px;
  }

  .hamburger .line {
    display: block;
    width: 100%;
    height: 2px;
    background: var(--color-text);
    transition: all 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55);
    transform-origin: center;
  }

  .hamburger.open .line:nth-child(1) {
    transform: translateY(4px) rotate(45deg);
  }

  .hamburger.open .line:nth-child(2) {
    transform: translateY(-4px) rotate(-45deg);
  }

  /* Frosted Glass Overlay */
  .mobile-menu-overlay {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    z-index: 998;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.4s ease;
  }

  .mobile-menu-overlay.open {
    opacity: 1;
    pointer-events: auto;
  }

  /* Fullscreen Glassmorphic Menu */
  .mobile-menu {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    pointer-events: none;
    opacity: 0;
  }

  .mobile-menu.open {
    opacity: 1;
    pointer-events: auto;
  }

  .menu-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    max-width: 400px;
    padding: 0 var(--page-padding);
  }

  .menu-link {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 2.5rem;
    font-weight: 700;
    text-decoration: none;
    color: var(--color-text);
    padding: 20px 24px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 16px;
    opacity: 0;
    transform: translateY(30px) scale(0.95);
    transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
    transition-delay: calc(var(--i) * 0.08s);
  }

  :global([data-theme="dark"]) .menu-link {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.1);
  }

  .mobile-menu.open .menu-link {
    opacity: 1;
    transform: translateY(0) scale(1);
  }

  .menu-link:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(0) scale(1.02);
  }

  :global([data-theme="dark"]) .menu-link:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .menu-link.active {
    color: var(--color-accent);
    border-color: var(--color-accent);
  }

  .link-arrow {
    opacity: 0;
    transform: translateX(-10px);
    transition: all 0.3s ease;
  }

  .menu-link:hover .link-arrow,
  .menu-link.active .link-arrow {
    opacity: 1;
    transform: translateX(0);
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
    }

    .nav-link.lang-toggle {
      font-size: 1.3rem;
    }

    .menu-link {
      font-size: 1.8rem;
      padding: 16px 20px;
      border-radius: 12px;
    }
  }
</style>
