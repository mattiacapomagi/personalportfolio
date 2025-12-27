<script>
  import { base } from "$app/paths";
  import { language } from "$lib/stores/language.js";
  import { fade } from "svelte/transition";

  // Social Links
  const links = {
    linkedin: "https://www.linkedin.com/in/mattiacapomagi",
    instagram: "https://www.instagram.com/mattiacapomagi",
    gumroad: "https://mattiacapomagi.gumroad.com/",
    portfolio: base + "/",
  };

  let headerText = $state("Mattia Capomagi");
  let subHeaderText = $state("Visual Designer");
  let isEasterEggActive = $state(false);

  function triggerEasterEgg() {
    if (isEasterEggActive) return;
    isEasterEggActive = true;
    const oldHeader = headerText;
    const oldSub = subHeaderText;

    headerText = "Ciao! 👋";
    subHeaderText = "Thanks for visiting!";

    setTimeout(() => {
      headerText = oldHeader;
      subHeaderText = oldSub;
      isEasterEggActive = false;
    }, 2000);
  }
</script>

<svelte:head>
  <title>Links — MATTIA CAPOMAGI</title>
</svelte:head>

<div class="bento-page">
  <div class="bento-container">
    <!-- ROW 1: HEADER (Full Width) -->
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
        {#key headerText}
          <h1 in:fade={{ duration: 200 }}>{headerText}</h1>
        {/key}
        {#key subHeaderText}
          <h2 in:fade={{ duration: 200 }}>{subHeaderText}</h2>
        {/key}
        <p class="location">Rome, Italy</p>
      </div>
    </button>

    <!-- ROW 2: Main Content -->
    <div class="main-row">
      <!-- LEFT: Portfolio (Larger) -->
      <a
        href={links.portfolio}
        class="card portfolio-card"
        aria-label="View Portfolio"
      >
        <h3>Portfolio</h3>
        <span class="domain">mattiacapomagi.it</span>
      </a>

      <!-- RIGHT: Socials Column -->
      <div class="socials-column">
        <!-- LinkedIn -->
        <a
          href={links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          class="card linkedin-card"
          aria-label="LinkedIn Profile"
        >
          <svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"
            ><path
              d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
            /></svg
          >
          <span>LinkedIn</span>
        </a>

        <!-- Small Socials Row -->
        <div class="small-socials-row">
          <a
            href={links.instagram}
            target="_blank"
            rel="noopener noreferrer"
            class="card small-social instagram"
            aria-label="Instagram Profile"
          >
            <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor"
              ><path
                d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M18,5A1,1 0 0,1 19,6A1,1 0 0,1 18,7A1,1 0 0,1 17,6A1,1 0 0,1 18,5Z"
              /></svg
            >
          </a>
          <a
            href={links.gumroad}
            target="_blank"
            rel="noopener noreferrer"
            class="card small-social gumroad"
            aria-label="Gumroad Shop"
          >
            <svg
              viewBox="-200 -200 2900 2900"
              width="32"
              height="32"
              fill="currentColor"
            >
              <path
                d="M1419.3,2462.2c596.9,0,1080.7-467.1,1080.7-1043.3S2016.1,375.6,1419.3,375.6,338.5,842.7,338.5,1418.9s483.9,1043.3,1080.8,1043.3Z"
                fill="currentColor"
              />
              <path
                d="M1140.3,2243.6c627.8,0,1140.3-491.8,1140.3-1102.9S1768.1,37.8,1140.3,37.8,0,529.6,0,1140.7s512.6,1102.9,1140.3,1102.9Z"
                fill="#fff"
                stroke="#000"
                stroke-width="11.8"
                stroke-miterlimit="30.2"
              />
              <path
                d="M1054.6,1697.1c-319.1,0-506.9-257.9-506.9-578.6s206.5-603.8,600.7-603.8,544.4,276.7,550.7,434h-294.1c-6.3-88-81.3-220.1-262.8-220.1s-319.1,169.8-319.1,377.4,125.2,377.4,319.1,377.4,250.3-138.4,281.6-276.7h-281.6v-113.2h590.9v578.6h-259.2v-364.8c-18.8,132.1-100.1,389.9-419.3,389.9h0Z"
                fill="currentColor"
              />
            </svg>
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
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #fff8e7 0%, #f4a460 100%);
    overflow-y: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    font-family: var(--font-mono);
    color: #5d3a1a;
    box-sizing: border-box;
  }

  .bento-container {
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 100%;
    max-width: 900px;
  }

  /* --- CARD BASE --- */
  .card {
    background: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(28px);
    -webkit-backdrop-filter: blur(28px);
    border: 1px solid rgba(255, 255, 255, 0.6);
    border-radius: 32px;
    text-decoration: none;
    color: #5d3a1a;
    transition:
      transform 0.3s ease,
      background 0.3s ease,
      box-shadow 0.3s ease;
    box-shadow: 0 4px 24px rgba(93, 58, 26, 0.04);
  }

  .card:hover {
    transform: translateY(-4px);
    background: rgba(255, 255, 255, 0.6);
    box-shadow: 0 16px 48px rgba(93, 58, 26, 0.1);
  }

  /* --- HEADER CARD --- */
  .header-card {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 28px;
    padding: 32px;
    width: 100%;
    text-align: left;
    cursor: pointer;
  }

  .avatar-container {
    width: 100px;
    height: 100px;
    border-radius: 24px;
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

  .header-info h1 {
    font-size: 2.2rem;
    font-weight: 700;
    margin: 0;
    line-height: 1.1;
  }

  .header-info h2 {
    font-size: 1.2rem;
    font-weight: 500;
    margin: 6px 0 12px;
    opacity: 0.75;
  }

  .location {
    font-size: 1rem;
    font-weight: 600;
    opacity: 0.5;
    margin: 0;
    font-family: var(--font-mono);
  }

  /* --- MAIN ROW (Portfolio + Socials) --- */
  .main-row {
    display: flex;
    gap: 24px;
  }

  /* --- PORTFOLIO CARD --- */
  .portfolio-card {
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 48px 32px;
    min-height: 280px;
  }

  .portfolio-card h3 {
    font-size: 2.8rem;
    font-weight: 700;
    margin: 0;
    line-height: 1;
    font-family: var(--font-mono);
  }

  .domain {
    display: inline-block;
    margin-top: 12px;
    font-weight: 600;
    font-size: 1.2rem;
    opacity: 0.55;
    font-family: var(--font-mono);
  }

  /* --- SOCIALS COLUMN --- */
  .socials-column {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  /* --- LINKEDIN CARD --- */
  .linkedin-card {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;
    padding: 24px;
    flex: 1;
  }

  .linkedin-card span {
    font-size: 1.4rem;
    font-weight: 700;
  }

  /* --- SMALL SOCIALS ROW --- */
  .small-socials-row {
    display: flex;
    gap: 16px;
  }

  .small-social {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    aspect-ratio: 1;
  }

  /* === MOBILE === */
  @media (max-width: 768px) {
    .bento-page {
      padding: 12px;
      align-items: flex-start;
    }

    .bento-container {
      gap: 16px;
    }

    /* Header */
    .header-card {
      padding: 20px;
      gap: 16px;
    }

    .avatar-container {
      width: 70px;
      height: 70px;
      border-radius: 18px;
    }

    .header-info h1 {
      font-size: 1.5rem;
    }

    .header-info h2 {
      font-size: 0.95rem;
      margin: 4px 0 8px;
    }

    .location {
      font-size: 0.85rem;
    }

    /* Main Row becomes Column */
    .main-row {
      flex-direction: column;
      gap: 16px;
    }

    /* Portfolio */
    .portfolio-card {
      min-height: 180px;
      padding: 32px 20px;
    }

    .portfolio-card h3 {
      font-size: 2rem;
    }

    .domain {
      font-size: 1rem;
    }

    /* LinkedIn */
    .linkedin-card {
      padding: 20px;
    }

    .linkedin-card svg {
      width: 32px;
      height: 32px;
    }

    .linkedin-card span {
      font-size: 1.2rem;
    }

    /* Small Socials */
    .small-socials-row {
      gap: 12px;
    }

    .small-social {
      padding: 20px;
    }

    .small-social svg {
      width: 28px;
      height: 28px;
    }

    .card {
      border-radius: 24px;
    }
  }
</style>
