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
        class="more-btn"
        class:open={menuOpen}
        onclick={toggleMenu}
        aria-label="Menu"
      >
        <span class="more-text">MORE</span>
        <span class="close-text">×</span>
      </button>
    </nav>
  </div>
</header>

<!-- Blur Overlay -->
<div class="blur-overlay" class:open={menuOpen} onclick={toggleMenu}></div>

<!-- Radial Menu -->
<div class="radial-menu" class:open={menuOpen}>
  <a
    href="{base}/"
    class="radial-link"
    class:active={normalizePath(activePath) === normalizePath(base)}
    style="--angle: -60deg; --distance: 100px"
  >
    {$language === "en" ? "projects" : "progetti"}
  </a>
  <a
    href="{base}/tools"
    class="radial-link"
    class:active={normalizePath(activePath).startsWith(
      normalizePath(`${base}/tools`)
    )}
    style="--angle: 0deg; --distance: 120px"
  >
    tools
  </a>
  <a
    href="{base}/about"
    class="radial-link"
    class:active={normalizePath(activePath) === normalizePath(`${base}/about`)}
    style="--angle: 60deg; --distance: 100px"
  >
    {$language === "en" ? "about" : "chi sono?"}
  </a>
</div>

<style>
  /* Sticky Glassmorphic Header */
  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: rgba(253, 251, 247, 0.85);
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

  /* MORE Button */
  .more-btn {
    display: none;
    position: relative;
    font-family: inherit;
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--color-text);
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    width: 50px;
    height: 24px;
    overflow: hidden;
  }

  .more-text,
  .close-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
  }

  .close-text {
    font-size: 2rem;
    opacity: 0;
    transform: translate(-50%, -50%) scale(0) rotate(-180deg);
  }

  .more-btn.open .more-text {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0) rotate(180deg);
  }

  .more-btn.open .close-text {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1) rotate(0deg);
  }

  /* Blur Overlay */
  .blur-overlay {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    z-index: 998;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.4s ease;
  }

  .blur-overlay.open {
    opacity: 1;
    pointer-events: auto;
  }

  /* Radial Menu */
  .radial-menu {
    display: none;
    position: fixed;
    top: 45px;
    right: var(--page-padding);
    z-index: 999;
    pointer-events: none;
  }

  .radial-link {
    position: absolute;
    right: 25px;
    top: 12px;
    font-size: 1.2rem;
    font-weight: 700;
    text-decoration: none;
    color: var(--color-text);
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    padding: 10px 16px;
    border-radius: 20px;
    border: 1px solid rgba(128, 128, 128, 0.2);
    white-space: nowrap;
    opacity: 0;
    transform: translate(0, 0) scale(0.5);
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    pointer-events: none;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }

  :global([data-theme="dark"]) .radial-link {
    background: rgba(40, 40, 40, 0.95);
    border-color: rgba(255, 255, 255, 0.1);
  }

  .radial-menu.open .radial-link {
    opacity: 1;
    transform: translateX(calc(cos(var(--angle)) * var(--distance) * -1))
      translateY(calc(sin(var(--angle)) * var(--distance))) scale(1);
    pointer-events: auto;
  }

  .radial-link:nth-child(1) {
    transition-delay: 0.05s;
  }
  .radial-link:nth-child(2) {
    transition-delay: 0.1s;
  }
  .radial-link:nth-child(3) {
    transition-delay: 0.15s;
  }

  .radial-link:hover {
    background: var(--color-accent);
    color: white;
    transform: translateX(calc(cos(var(--angle)) * var(--distance) * -1))
      translateY(calc(sin(var(--angle)) * var(--distance))) scale(1.05);
  }

  .radial-link.active {
    color: var(--color-accent);
    border-color: var(--color-accent);
  }

  .radial-link.active:hover {
    color: white;
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

    .more-btn {
      display: block;
    }

    .radial-menu {
      display: block;
    }

    .blur-overlay {
      display: block;
    }

    .nav-link.lang-toggle {
      font-size: 1.3rem;
    }
  }
</style>
