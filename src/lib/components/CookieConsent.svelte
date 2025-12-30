<script>
  let showBanner = $state(false);
  let consentGiven = $state(false);

  const CONSENT_KEY = "cookie_consent";

  // Check consent on mount
  $effect(() => {
    if (typeof window === "undefined") return;

    const consent = localStorage.getItem(CONSENT_KEY);
    if (consent === "accepted") {
      consentGiven = true;
      loadAnalytics();
    } else if (consent === "declined") {
      consentGiven = false;
    } else {
      // No decision yet, show banner
      showBanner = true;
    }
  });

  function accept() {
    localStorage.setItem(CONSENT_KEY, "accepted");
    consentGiven = true;
    showBanner = false;
    loadAnalytics();
  }

  function decline() {
    localStorage.setItem(CONSENT_KEY, "declined");
    consentGiven = false;
    showBanner = false;
  }

  function loadAnalytics() {
    if (typeof window === "undefined") return;
    if (window.gtag) return; // Already loaded

    // Load GA script dynamically
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-FXENJE6FZ2";
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", "G-FXENJE6FZ2");
  }
</script>

{#if showBanner}
  <div class="cookie-banner">
    <div class="cookie-content">
      <p class="cookie-text">
        Questo sito utilizza cookie analitici (Google Analytics) per migliorare
        l'esperienza utente.
      </p>
      <div class="cookie-actions">
        <button class="cookie-btn accept" onclick={accept}>Accetta</button>
        <button class="cookie-btn decline" onclick={decline}>Rifiuta</button>
      </div>
    </div>
  </div>
{/if}

<style>
  .cookie-banner {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: var(--color-text);
    color: var(--color-bg);
    padding: 1rem;
    z-index: 10000;
    font-family: var(--font-mono);
  }

  .cookie-content {
    max-width: var(--max-width);
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }

  .cookie-text {
    font-size: 0.8rem;
    flex: 1;
    min-width: 200px;
  }

  .cookie-actions {
    display: flex;
    gap: 0.5rem;
  }

  .cookie-btn {
    padding: 0.5rem 1rem;
    font-family: inherit;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    cursor: pointer;
    border: 1px solid var(--color-bg);
    transition: all 0.2s;
  }

  .cookie-btn.accept {
    background: var(--color-bg);
    color: var(--color-text);
  }

  .cookie-btn.accept:hover {
    background: var(--color-accent);
    color: var(--color-bg);
    border-color: var(--color-accent);
  }

  .cookie-btn.decline {
    background: transparent;
    color: var(--color-bg);
  }

  .cookie-btn.decline:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  @media (max-width: 600px) {
    .cookie-content {
      flex-direction: column;
      text-align: center;
    }
    .cookie-actions {
      width: 100%;
      justify-content: center;
    }
  }
</style>
