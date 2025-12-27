<script>
  import { base } from "$app/paths";
  import { fade } from "svelte/transition";

  // Social Links
  const links = {
    linkedin: "https://www.linkedin.com/in/mattiacapomagi",
    instagram: "https://www.instagram.com/mattiacapomagi",
    gumroad: "https://mattiacapomagi.gumroad.com/",
    portfolio: base + "/",
  };

  let headerText = $state("Mattia Capomagi");
  let isEasterEggActive = $state(false);

  function triggerEasterEgg() {
    if (isEasterEggActive) return;
    isEasterEggActive = true;
    const oldHeader = headerText;
    headerText = "Ciao! 👋";
    setTimeout(() => {
      headerText = oldHeader;
      isEasterEggActive = false;
    }, 2000);
  }
</script>

<svelte:head>
  <title>Links — MATTIA CAPOMAGI</title>
</svelte:head>

<div class="bento-page">
  <div class="bento-container">
    <!-- HEADER CARD -->
    <button
      class="card header-card"
      onclick={triggerEasterEgg}
      aria-label="Activate Easter Egg"
    >
      <div class="avatar-container">
        <img
          src="{base}/media/favicon.jpg"
          alt="Mattia Capomagi"
          class="avatar"
        />
      </div>
      <div class="header-info">
        <p class="role">Visual Designer & Creative Director</p>
        {#key headerText}
          <h1 in:fade={{ duration: 200 }}>{headerText}</h1>
        {/key}
        <p class="bio">
          Crafting bold visual identities, branding systems, and digital
          experiences that really stand out.
        </p>
        <p class="location">
          <strong>Currently based in Rome</strong>, but open for collabs
          worldwide.
        </p>
      </div>
    </button>

    <!-- BOTTOM ROW -->
    <div class="bottom-row">
      <!-- LEFT: Portfolio Card (taller) -->
      <a
        href={links.portfolio}
        class="card portfolio-card"
        aria-label="View Portfolio"
      >
        <h3>Portfolio</h3>
        <span class="domain">mattiacapomagi.it</span>
      </a>

      <!-- RIGHT: Socials Stack -->
      <div class="right-stack">
        <!-- LinkedIn -->
        <a
          href={links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          class="card linkedin-card"
          aria-label="LinkedIn Profile"
        >
          <span class="card-title">LinkedIn</span>
          <span class="card-subtitle">Let's connect!</span>
        </a>

        <!-- Small Socials Row -->
        <div class="small-row">
          <a
            href={links.instagram}
            target="_blank"
            rel="noopener noreferrer"
            class="card small-card"
            aria-label="Instagram Profile"
          >
            <span class="card-title">Instagram</span>
            <span class="card-subtitle">My visual portfolio</span>
          </a>
          <a
            href={links.gumroad}
            target="_blank"
            rel="noopener noreferrer"
            class="card small-card"
            aria-label="Gumroad Shop"
          >
            <span class="card-title">Gumroad</span>
            <span class="card-subtitle">Design resources</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
  }

  .bento-page {
    min-height: 100vh;
    width: 100%;
    background: linear-gradient(135deg, #fff8e7 0%, #f4a460 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    font-family: var(--font-mono);
    color: #5d3a1a;
    box-sizing: border-box;
  }

  .bento-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    max-width: 800px;
  }

  /* --- CARD BASE --- */
  .card {
    background: rgba(255, 255, 255, 0.35);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 28px;
    text-decoration: none;
    color: #5d3a1a;
    transition:
      transform 0.25s ease,
      background 0.25s ease,
      box-shadow 0.25s ease;
    box-shadow: 0 4px 20px rgba(93, 58, 26, 0.04);
  }

  .card:hover {
    transform: translateY(-3px);
    background: rgba(255, 255, 255, 0.55);
    box-shadow: 0 12px 40px rgba(93, 58, 26, 0.08);
  }

  /* --- HEADER CARD --- */
  .header-card {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 24px;
    padding: 28px;
    width: 100%;
    text-align: left;
    cursor: pointer;
  }

  .avatar-container {
    width: 100px;
    height: 100px;
    border-radius: 22px;
    background: #000;
    overflow: hidden;
    flex-shrink: 0;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  }

  .avatar {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .header-info {
    flex: 1;
  }

  .header-info .role {
    font-size: 0.85rem;
    font-weight: 600;
    opacity: 0.7;
    margin: 0 0 6px 0;
  }

  .header-info h1 {
    font-size: 1.8rem;
    font-weight: 700;
    margin: 0 0 12px 0;
    line-height: 1.1;
  }

  .header-info .bio {
    font-size: 0.9rem;
    line-height: 1.45;
    margin: 0 0 8px 0;
    opacity: 0.85;
    font-family: var(--font-body);
  }

  .header-info .location {
    font-size: 0.85rem;
    margin: 0;
    opacity: 0.75;
    font-family: var(--font-body);
  }

  .header-info .location strong {
    color: #c05621;
  }

  /* --- BOTTOM ROW --- */
  .bottom-row {
    display: flex;
    gap: 16px;
  }

  /* --- PORTFOLIO CARD --- */
  .portfolio-card {
    flex: 1.2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 32px 28px;
    min-height: 160px;
  }

  .portfolio-card h3 {
    font-size: 2rem;
    font-weight: 700;
    margin: 0;
    line-height: 1;
    font-family: var(--font-mono);
  }

  .domain {
    display: block;
    margin-top: 8px;
    font-weight: 600;
    font-size: 1rem;
    opacity: 0.55;
    font-family: var(--font-mono);
  }

  /* --- RIGHT STACK --- */
  .right-stack {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  /* --- LINKEDIN CARD --- */
  .linkedin-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px 24px;
    flex: 1;
  }

  .card-title {
    font-size: 1.15rem;
    font-weight: 700;
    display: block;
  }

  .card-subtitle {
    font-size: 0.8rem;
    opacity: 0.6;
    display: block;
    margin-top: 4px;
  }

  /* --- SMALL ROW --- */
  .small-row {
    display: flex;
    gap: 12px;
  }

  .small-card {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 16px 18px;
  }

  .small-card .card-title {
    font-size: 1rem;
  }

  .small-card .card-subtitle {
    font-size: 0.75rem;
  }

  /* === MOBILE === */
  @media (max-width: 600px) {
    .bento-page {
      padding: 16px;
    }

    .bento-container {
      gap: 14px;
    }

    /* Header */
    .header-card {
      padding: 20px;
      gap: 16px;
    }

    .avatar-container {
      width: 80px;
      height: 80px;
      border-radius: 18px;
    }

    .header-info .role {
      font-size: 0.75rem;
    }

    .header-info h1 {
      font-size: 1.4rem;
      margin-bottom: 8px;
    }

    .header-info .bio {
      font-size: 0.8rem;
    }

    .header-info .location {
      font-size: 0.75rem;
    }

    /* Bottom Row */
    .bottom-row {
      gap: 12px;
    }

    .portfolio-card {
      padding: 24px 20px;
      min-height: 140px;
    }

    .portfolio-card h3 {
      font-size: 1.6rem;
    }

    .domain {
      font-size: 0.85rem;
    }

    /* Right Stack */
    .right-stack {
      gap: 10px;
    }

    .linkedin-card {
      padding: 16px 18px;
    }

    .card-title {
      font-size: 1rem;
    }

    .card-subtitle {
      font-size: 0.7rem;
    }

    .small-row {
      gap: 10px;
    }

    .small-card {
      padding: 14px 12px;
    }

    .small-card .card-title {
      font-size: 0.85rem;
    }

    .small-card .card-subtitle {
      font-size: 0.65rem;
    }

    .card {
      border-radius: 22px;
    }
  }
</style>
