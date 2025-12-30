<script>
  import { base } from "$app/paths";
  import { tools } from "$lib/data/tools.js";
  import { language } from "$lib/stores/language.js";
  import infoIcon from "$lib/assets/icons/info.svg";
  /* Popup State */
  let activeInfoTool = $state(null);

  function toggleInfo(tool, event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    activeInfoTool = activeInfoTool === tool ? null : tool;
  }
</script>

<svelte:head>
  <title>Tools — MATTIA CAPOMAGI</title>
</svelte:head>

<main class="tools-page">
  <div class="tools-list-header">
    <span class="col">tool</span>
    <span class="col">{$language === "en" ? "description" : "descrizione"}</span
    >
    <span class="col">{$language === "en" ? "year" : "anno"}</span>
  </div>

  <div class="tools-list">
    {#each tools as tool}
      <a
        href="{base}/tools/{tool.slug}"
        class="tool-row"
        onclick={(e) => {
          if (activeInfoTool) activeInfoTool = null;
        }}
      >
        <div class="title-group">
          <span class="col tool-title">{tool.title}</span>
          <!-- Mobile Info Button -->
          <button
            class="info-btn"
            onclick={(e) => toggleInfo(tool, e)}
            aria-label="Info"
          >
            <img src={infoIcon} alt="Info" />
          </button>
        </div>

        <span class="col tool-desc"
          >{$language === "en" ? tool.description : tool.description_it}</span
        >
        <span class="col tool-year">{tool.year}</span>
      </a>
    {/each}
  </div>

  <!-- Mobile Info Popup -->
  {#if activeInfoTool}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="info-popup-overlay" onclick={() => (activeInfoTool = null)}>
      <div class="info-popup" onclick={(e) => e.stopPropagation()}>
        <h3 class="popup-title">{activeInfoTool.title}</h3>
        <p class="popup-desc">
          {$language === "en"
            ? activeInfoTool.description
            : activeInfoTool.description_it}
        </p>
        <button class="popup-close" onclick={() => (activeInfoTool = null)}
          >Close</button
        >
      </div>
    </div>
  {/if}
</main>

<style>
  /* ... Existing Desktop Styles ... */
  .tools-page {
    padding: 0 30px;
  }
  .tools-list-header {
    display: grid;
    grid-template-columns: 1fr 2fr 0.5fr;
    gap: 20px;
    padding: 0 0 6px;
    margin-top: 20px;
    margin-bottom: 0;
    font-family: var(--font-mono);
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--color-text);
    text-transform: lowercase;
  }
  .col {
    font-family: var(--font-mono);
  }
  .col:last-child {
    text-align: right;
  }
  .tools-list {
    display: flex;
    flex-direction: column;
  }
  .tool-row {
    display: grid;
    grid-template-columns: 1fr 2fr 0.5fr;
    gap: 20px;
    padding: 6px 0;
    border-bottom: 1px solid rgba(128, 128, 128, 0.4);
    align-items: center;
    text-decoration: none;
    color: var(--color-text);
    transition: color 0.2s ease;
    position: relative;
  }
  .tool-row:first-child {
    border-top: 1px solid rgba(128, 128, 128, 0.4);
  }
  .tool-row:hover {
    color: var(--color-accent);
  }
  .tool-title {
    font-size: 1.1rem;
    font-weight: 400;
  }
  .tool-desc {
    font-size: 1rem;
    font-weight: 400;
    opacity: 0.7;
  }
  .tool-year {
    font-size: 1.1rem;
    font-weight: 400;
    text-align: right;
  }

  /* Info Button (Desktop Hidden) */
  .info-btn {
    display: none;
  }
  .title-group {
    display: contents;
  } /* Default to grid placement */

  /* Mobile Styles */
  @media (max-width: 768px) {
    .tools-list-header {
      display: none;
    } /* Hide Header completely on mobile */

    .tool-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 0;
      gap: 10px;
    }

    .title-group {
      display: flex;
      align-items: center;
      gap: 10px;
      flex: 1;
    }

    .tool-title {
      font-size: 2rem; /* +15% from 1.61rem */
      font-weight: 700;
      transform: translateY(
        -4.5px
      ); /* Adjusted offset: -5px was too high, -2px too low */
      line-height: 1; /* Tight line height for better centering */
    }

    /* Hide Description & Year on Mobile */
    .tool-desc,
    .tool-year {
      display: none;
    }

    /* Show Info Button */
    .info-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      border: none;
      background: none;
      padding: 0;
      cursor: pointer;
      transform: translateY(-1.5px);
    }

    .info-btn img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }

  /* Popup Styles */
  .info-popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }

  .info-popup {
    background: var(--color-bg);
    border: 1px solid var(--color-text);
    padding: 20px;
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    gap: 8px; /* Reduced gap from 15px */
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  }

  .popup-title {
    font-family: var(--font-mono);
    font-size: 1.2rem;
    font-weight: 700;
    margin: 0;
    text-transform: uppercase;
  }

  .popup-desc {
    font-family: var(--font-sans);
    font-size: 1rem;
    line-height: 1.5;
    margin: 0;
  }

  .popup-close {
    align-self: flex-end;
    background: var(--color-text);
    color: var(--color-bg);
    border: none;
    padding: 8px 16px;
    font-family: var(--font-mono);
    font-weight: 700;
    cursor: pointer;
    text-transform: uppercase;
  }
</style>
