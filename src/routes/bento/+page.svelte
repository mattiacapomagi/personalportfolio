<script>
  import { base } from "$app/paths";
  import { language } from "$lib/stores/language.js";

  // Social Links
  const links = {
    linkedin: "https://www.linkedin.com/in/mattia-capomagi-461386221/",
    instagram: "https://www.instagram.com/mattiacapomagi",
    gumroad: "https://mattiacapomagi.gumroad.com/",
    portfolio: base + "/",
  };
</script>

<svelte:head>
  <title>Links — MATTIA CAPOMAGI</title>
</svelte:head>

<div class="bento-page">
  <div class="bento-container">
    <!-- HEADER CARD -->
    <a
      href={links.portfolio}
      class="card header-card"
      aria-label="Portfolio Home"
    >
      <div class="avatar-container">
        <img
          src="{base}/media/favicon.jpg"
          alt="Mattia Capomagi"
          class="avatar"
        />
      </div>
      <div class="header-info">
        <h1>Mattia Capomagi</h1>
        <h2>Visual Designer</h2>
        <p class="location">
          <span class="pin">📍</span> Rome, Italy
        </p>
      </div>
      <div class="arrow-icon">
        <svg fill="currentColor" viewBox="0 0 24 24" width="24" height="24"
          ><path d="M5 17.59L15.59 7H9V5h10v10h-2V8.41L6.41 19 5 17.59z" /></svg
        >
      </div>
    </a>

    <!-- PORTFOLIO MAIN CARD -->
    <a
      href={links.portfolio}
      class="card portfolio-card"
      aria-label="View Portfolio"
    >
      <div class="card-content">
        <h3>Portfolio</h3>
        <p>{$language === "en" ? "Selected Works" : "Lavori Selezionati"}</p>
        <span class="domain">mattiacapomagi.it</span>
      </div>
      <div class="card-bg-icon">
        <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor"
          ><path
            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
          /></svg
        >
      </div>
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
        <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor"
          ><path
            d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
          /></svg
        >
      </div>
      <span>LinkedIn</span>
      <div class="mini-arrow">↗</div>
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
          <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"
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
          <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"
            ><path
              d="M12,2C16.97,2 21,6.03 21,11C21,15.97 16.97,20 12,20C7.03,20 3,15.97 3,11C3,6.03 7.03,2 12,2M15.5,16.1C15.5,16.1 16,16 16,14.7C16,13.6 15,13.6 15,13.6V10.1C15,10.1 16.8,10.1 16.8,8.2C16.8,6.8 15.5,6.5 15.5,6.5H12V5H8.5V17.5H12V16.1H15.5M12,8.2H13.2C13.2,8.2 13.5,8.2 13.5,9.2C13.5,10.1 13.2,10.1 13.2,10.1H12V8.2M12,13.6H13.2C13.2,13.6 13.5,13.6 13.5,14.5C13.5,15.4 13.2,15.4 13.2,15.4H12V13.6Z"
            /></svg
          >
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

  /* Font Import if not global (assuming global app.css handles it, but let's be safe) */

  .bento-page {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* Warm Gradient Background - Exact from reference analysis */
    background: linear-gradient(
      135deg,
      #fff8e7 0%,
      #f4a460 100%
    ); /* Cream to Soft Orange */
    overflow-y: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    font-family: "General Sans", sans-serif; /* Fallback to sans-serif */
    color: #5d3a1a; /* Saddle Brown text */
    box-sizing: border-box;
  }

  .bento-container {
    display: grid;
    /* 3 Columns: 2 for Portfolio, 1 for Social Stack */
    grid-template-columns: 2fr 1.2fr;
    grid-template-rows: auto 160px 140px; /* Header / Linkedin / Split */
    gap: 20px;
    width: 100%;
    max-width: 800px;
    height: auto;
  }

  /* --- CARD STYLES --- */
  .card {
    background: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid rgba(255, 255, 255, 0.6);
    border-radius: 32px;
    padding: 24px;
    text-decoration: none;
    color: #5d3a1a;
    transition:
      transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1),
      background 0.3s ease,
      box-shadow 0.3s ease;
    display: flex;
    position: relative;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(93, 58, 26, 0.03);
  }

  .card:hover {
    transform: translateY(-4px);
    background: rgba(255, 255, 255, 0.6);
    box-shadow: 0 12px 40px rgba(93, 58, 26, 0.1);
  }

  /* --- HEADER (Row 1, Full Width) --- */
  .header-card {
    grid-column: 1 / -1; /* Span all columns */
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 24px;
    padding: 24px 32px;
  }

  .avatar-container {
    width: 88px;
    height: 88px;
    border-radius: 20px;
    background: #000;
    overflow: hidden;
    flex-shrink: 0;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .avatar {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .header-info h1 {
    font-size: 2rem;
    font-weight: 700;
    margin: 0;
    line-height: 1.1;
  }

  .header-info h2 {
    font-size: 1.1rem;
    font-weight: 500;
    margin: 4px 0 10px;
    opacity: 0.8;
  }

  .location {
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 6px;
    font-weight: 600;
    opacity: 0.6;
    margin: 0;
  }

  .arrow-icon {
    margin-left: auto;
    opacity: 0.5;
  }

  /* --- GRID LAYOUT FOR BOTTOM SECTION --- */

  /* Portfolio Card */
  .portfolio-card {
    grid-column: 1; /* Left column */
    grid-row: 2 / 4; /* Span rows 2 and 3 */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 320px;
    background: rgba(255, 255, 255, 0.5);
  }

  .portfolio-card h3 {
    font-size: 2rem;
    font-weight: 700;
    margin: 0 0 8px;
  }

  .card-content {
    position: relative;
    z-index: 2;
  }

  .card-content p {
    margin: 0;
    opacity: 0.8;
    font-size: 1.1rem;
    font-weight: 500;
  }

  .domain {
    display: inline-block;
    margin-top: 24px; /* Space it out */
    font-weight: 600;
    font-size: 1rem;
    opacity: 0.5;
    background: rgba(255, 255, 255, 0.4);
    padding: 8px 16px;
    border-radius: 12px;
  }

  .card-bg-icon {
    position: absolute;
    bottom: -30px;
    right: -30px;
    width: 200px;
    height: 200px;
    opacity: 0.08;
    pointer-events: none;
    transform: rotate(-10deg);
  }

  /* Right Column (Social Stack) */
  .linkedin {
    grid-column: 2;
    grid-row: 2; /* First position in column 2 */
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    height: 100%;
  }

  .linkedin .social-icon {
    background: #0077b5;
    color: white;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
  }

  .linkedin span {
    font-size: 1.2rem;
    font-weight: 600;
  }

  .mini-arrow {
    position: absolute;
    top: 20px;
    right: 20px;
    opacity: 0.4;
  }

  /* Social Split Container */
  .social-split {
    grid-column: 2;
    grid-row: 3; /* Below LinkedIn */
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    height: 100%;
  }

  .social-split .instagram,
  .social-split .gumroad {
    aspect-ratio: auto;
    height: 100%;
    justify-content: center;
    align-items: center;
    padding: 0;
    border-radius: 28px; /* Slightly tighter */
  }

  .social-split .instagram .social-icon,
  .social-split .gumroad .social-icon {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.8;
  }

  /* MOBILE RESPONSIVENESS */
  @media (max-width: 768px) {
    .bento-container {
      grid-template-columns: 1fr; /* Single column */
      grid-template-rows: auto;
      gap: 16px;
    }

    .header-card {
      grid-column: 1;
      margin-bottom: 8px;
    }
    .portfolio-card {
      grid-column: 1;
      grid-row: auto;
      min-height: 240px;
    }
    .linkedin {
      grid-column: 1;
      grid-row: auto;
      height: 100px;
      flex-direction: row;
      align-items: center;
    }
    /* Adjust LinkedIn for mobile to be horizontal bar */

    .social-split {
      grid-column: 1;
      grid-row: auto;
      height: 140px; /* Force height for split row */
    }

    .header-info h1 {
      font-size: 1.5rem;
    }
    .header-info h2 {
      font-size: 1rem;
    }
  }
</style>
