<script>
  import { base } from "$app/paths";
  import { tools } from "$lib/data/tools.js";
  import { language } from "$lib/stores/language.js";
</script>

<svelte:head>
  <title>Tools — MATTIA CAPOMAGI</title>
</svelte:head>

<main class="tools-page">
  <div class="tools-list-header">
    <span class="col">{$language === "en" ? "tool" : "strumento"}</span>
    <span class="col year">{$language === "en" ? "year" : "anno"}</span>
  </div>

  <div class="tools-list">
    {#each tools as tool}
      <a href="{base}/tools/{tool.slug}" class="tool-row">
        <span class="col tool-title">{tool.title}</span>
        <span class="col tool-year">{tool.year}</span>
      </a>
    {/each}
  </div>
</main>

<style>
  .tools-page {
    padding: 0;
  }

  /* Header Grid */
  .tools-list-header {
    display: grid;
    grid-template-columns: 1fr 1fr; /* 50% - 50% split */
    gap: 20px;
    padding: 0 0 6px; /* Precise padding from Projects page */
    margin-top: 20px; /* Matching projects page margin */
    margin-bottom: 0;

    font-family: var(--font-mono);
    font-size: 1.1rem;
    font-weight: 700; /* Bold headers as requested */
    color: var(--color-text);
    text-transform: lowercase; /* Matches project list header style */
  }

  /* Column Styles */
  .col {
    /* Base styles shared with header and rows */
    font-family: var(--font-mono);
  }

  .col.year {
    text-align: left; /* Left aligned as requested */
  }

  .tools-list {
    display: flex;
    flex-direction: column;
  }

  /* Row Grid */
  .tool-row {
    display: grid;
    grid-template-columns: 1fr 1fr; /* 50% - 50% split */
    gap: 20px;
    padding: 6px 0; /* Strictly matching ProjectRow */
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    align-items: center;
    text-decoration: none;
    color: var(--color-text);
    transition: color 0.2s ease;
  }

  .tool-row:first-child {
    border-top: 1px solid rgba(0, 0, 0, 0.2);
  }

  .tool-row:hover {
    color: var(--color-accent);
  }

  .tool-title {
    font-size: 1.1rem;
    font-weight: 400;
  }

  .tool-year {
    font-size: 1.1rem;
    font-weight: 400;
    text-align: left; /* Left aligned as requested */
    opacity: 1; /* Remove opacity to be distinct like title? Or keep it? Projects has year right aligned and no opacity change mentioned in styles for .col.year except in mobile. Let's keep it clean. */
  }

  @media (max-width: 768px) {
    .tools-list-header {
      font-size: 1rem;
      gap: 10px;
    }

    .tool-title,
    .tool-year {
      font-size: 1rem;
    }
  }

  @media (max-width: 480px) {
    .tools-list-header {
      display: none;
    }

    .tool-row {
      display: flex;
      justify-content: space-between;
      padding: 16px 0;
    }

    .tool-year {
      text-align: right; /* Revert to right on mobile for better spacing? Or keep left? User said "year left aligned". I'll keep it left unless mobile needs space */
      text-align: left;
    }
  }
</style>
