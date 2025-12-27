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
    <!-- HEADER CARD (Easter Egg Interaction) -->
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
      <div class="arrow-icon">
        <svg
          fill="currentColor"
          viewBox="0 0 24 24"
          width="28"
          height="28"
          transform="rotate(45)"
          ><path d="M5 17.59L15.59 7H9V5h10v10h-2V8.41L6.41 19 5 17.59z" /></svg
        >
        <!-- Rotate to point down-ish or just diagonal up-right but acting as decoration -->
      </div>
    </button>

    <!-- PORTFOLIO MAIN CARD -->
    <a
      href={links.portfolio}
      class="card portfolio-card"
      aria-label="View Portfolio"
    >
      <div class="card-content">
        <h3>Portfolio</h3>
        <!-- Removed "Selected Works" as requested -->
        <span class="domain">mattiacapomagi.it</span>
      </div>
      <!-- Removed Star Icon -->
    </a>

    <!-- LINKEDIN -->
    <a
      href={links.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      class="card social-card linkedin"
      aria-label="LinkedIn Profile"
    >
      <div class="social-icon">
        <!-- Black and white icon (currentColor handles text color which is dark brown, so fill current works) -->
        <svg viewBox="0 0 24 24" width="60" height="60" fill="currentColor"
          ><path
            d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
          /></svg
        >
      </div>
      <span>LinkedIn</span>
      <div class="mini-arrow">
        <svg fill="currentColor" viewBox="0 0 24 24" width="24" height="24"
          ><path d="M5 17.59L15.59 7H9V5h10v10h-2V8.41L6.41 19 5 17.59z" /></svg
        >
      </div>
    </a>

    <!-- SPLIT CONTAINER FOR SMALL SOCIALS -->
    <div class="social-split">
      <!-- INSTAGRAM -->
      <a
        href={links.instagram}
        target="_blank"
        rel="noopener noreferrer"
        class="card social-card instagram"
        aria-label="Instagram Profile"
      >
        <div class="social-icon">
          <!-- Much bigger logo -->
          <svg viewBox="0 0 24 24" width="60" height="60" fill="currentColor"
            ><path
              d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M18,5A1,1 0 0,1 19,6A1,1 0 0,1 18,7A1,1 0 0,1 17,6A1,1 0 0,1 18,5Z"
            /></svg
          >
        </div>
      </a>

      <!-- GUMROAD -->
      <a
        href={links.gumroad}
        target="_blank"
        rel="noopener noreferrer"
        class="card social-card gumroad"
        aria-label="Gumroad Shop"
      >
        <div class="social-icon">
          <!-- Using specific Gumroad SVG content from previous files, scaled up -->
          <svg
            viewBox="-200 -200 2900 2900"
            width="60"
            height="60"
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
        </div>
      </a>
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
    /* Warm Gradient Background */
    background: linear-gradient(135deg, #fff8e7 0%, #f4a460 100%);
    overflow-y: auto;
    display: flex;
    align-items: center; /* Center Vertically */
    justify-content: center;
    padding: 20px;
    font-family: var(--font-mono); /* Using Monospaced Font Global */
    color: #5d3a1a;
    box-sizing: border-box;
  }

  .bento-container {
    display: grid;
    /* 3 Columns: 2 for Portfolio, 1 for Social Stack */
    grid-template-columns: 2fr 1.2fr;
    /* Increased heights per "bigger and airier" request */
    grid-template-rows: auto 240px 180px;
    gap: 30px; /* Increased Gap */
    width: 100%;
    max-width: 1000px; /* Increased Max Width */
    height: auto;
  }

  /* --- CARD STYLES --- */
  .card {
    background: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(28px);
    -webkit-backdrop-filter: blur(28px);
    border: 1px solid rgba(255, 255, 255, 0.6);
    border-radius: 40px; /* Bigger Radius */
    padding: 40px; /* Bigger Padding */
    text-decoration: none;
    color: #5d3a1a;
    transition:
      transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1),
      background 0.3s ease,
      box-shadow 0.3s ease;
    display: flex;
    position: relative;
    overflow: hidden;
    box-shadow: 0 4px 24px rgba(93, 58, 26, 0.04);
  }

  .card:hover {
    transform: translateY(-6px);
    background: rgba(255, 255, 255, 0.65);
    box-shadow: 0 20px 60px rgba(93, 58, 26, 0.12);
  }

  /* Reset button styles for Header Card */
  button.card {
    border: 1px solid rgba(255, 255, 255, 0.6);
    text-align: left;
    font-family: var(--font-mono);
    cursor: pointer;
    width: 100%;
  }

  /* --- HEADER --- */
  .header-card {
    grid-column: 1 / -1;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 40px; /* Increased Gap */
    padding: 40px;
  }

  .avatar-container {
    width: 140px; /* Much Bigger */
    height: 140px;
    border-radius: 30px;
    background: #000;
    overflow: hidden;
    flex-shrink: 0;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  }

  .avatar {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .header-info h1 {
    font-size: 3rem; /* Bigger */
    font-weight: 700;
    margin: 0;
    line-height: 1.1;
  }

  .header-info h2 {
    font-size: 1.5rem;
    font-weight: 500;
    margin: 8px 0 16px;
    opacity: 0.8;
  }

  .location {
    font-size: 1.1rem;
    display: flex; /* Flex required for alignment if icon was here, but text only is fine */
    align-items: center;
    gap: 8px;
    font-weight: 600;
    opacity: 0.6;
    margin: 0;
    font-family: var(--font-mono); /* Force Mono */
  }

  .arrow-icon {
    margin-left: auto;
    opacity: 0.5;
  }

  /* --- PORTFOLIO --- */
  .portfolio-card {
    grid-column: 1;
    grid-row: 2 / 4;
    display: flex;
    flex-direction: column;
    justify-content: center; /* Center Vertically */
    align-items: center; /* Center Horizontally */
    text-align: center;
    gap: 10px;
    min-height: 400px; /* Taller */
    background: rgba(255, 255, 255, 0.5);
  }

  .portfolio-card h3 {
    font-size: 3.5rem; /* Hierarchy fix: HUGE */
    font-weight: 700;
    margin: 0;
    line-height: 1;
    font-family: var(--font-mono); /* Force Mono */
  }

  .domain {
    display: inline-block;
    margin-top: 10px;
    font-weight: 600;
    font-size: 1.4rem; /* Readability */
    opacity: 0.6;
    background: none; /* Removed badge style for clean look */
    padding: 0;
    font-family: var(--font-mono); /* Switch to Mono as requested */
  }

  /* --- LINKEDIN --- */
  .linkedin {
    grid-column: 2;
    grid-row: 2;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
  }

  .linkedin .social-icon {
    background: none; /* Removed blue background */
    /* Icon color via currentColor */
    color: #5d3a1a;
    width: auto;
    height: auto;
    display: flex;
    align-items: center;
    padding: 0;
  }

  .linkedin span {
    font-size: 1.8rem; /* Bigger */
    font-weight: 700;
  }

  .mini-arrow {
    position: absolute;
    top: 30px;
    right: 30px;
    opacity: 0.4;
  }

  /* --- SOCIAL SPLIT --- */
  .social-split {
    grid-column: 2;
    grid-row: 3;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
  }

  .social-split .instagram,
  .social-split .gumroad {
    aspect-ratio: auto;
    height: 100%;
    justify-content: center;
    align-items: center;
    padding: 0;
    border-radius: 40px;
  }

  .social-split .instagram .social-icon,
  .social-split .gumroad .social-icon {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.9;
  }

  /* RESPONSIVE */
  @media (max-width: 768px) {
    .bento-page {
      padding: 30px; /* Increased border padding */
    }

    .bento-container {
      grid-template-columns: 1fr;
      grid-template-rows: auto;
      gap: 20px;
      padding-bottom: 40px;
    }

    /* Header: Keep Horizontal */
    .header-card {
      flex-direction: row;
      text-align: left;
      padding: 24px;
      gap: 20px;
      align-items: center;
    }

    .avatar-container {
      width: 80px;
      height: 80px;
      margin-bottom: 0;
      border-radius: 20px;
    }

    .header-info {
      display: block;
      align-items: flex-start;
    }

    .header-info h1 {
      font-size: 1.6rem;
      line-height: 1.1;
    }

    .header-info h2 {
      font-size: 1rem;
      margin-bottom: 6px;
    }
    .location {
      font-size: 0.9rem;
    }
    .arrow-icon {
      display: none;
    }

    /* Portfolio: Wide Horizontal Card */
    .portfolio-card {
      min-height: 200px;
      padding: 30px;
    }

    .portfolio-card h3 {
      font-size: 2.2rem;
    }
    .domain {
      font-size: 1rem;
    }

    /* LinkedIn: Horizontal Bar */
    .linkedin {
      flex-direction: row;
      align-items: center;
      height: 100px;
      padding: 0 30px;
    }

    .linkedin .social-icon svg {
      width: 40px;
      height: 40px;
    }
    .linkedin span {
      font-size: 1.4rem;
    }

    .mini-arrow {
      position: relative;
      top: auto;
      right: auto;
    }

    .social-split {
      height: 120px;
      gap: 20px;
    }

    .social-split svg {
      width: 40px;
      height: 40px;
    }

    .card {
      border-radius: 30px;
    }
  }
</style>
