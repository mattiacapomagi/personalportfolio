<script>
  import { base } from "$app/paths";
  import { tools } from "$lib/data/tools.js";
  import { language } from "$lib/stores/language.js";
</script>

<svelte:head>
  <title>Tools — MATTIA CAPOMAGI</title>
</svelte:head>

<main class="tools-page">
  <!-- Simulating the Project List Header -->
  <div class="tools-list-header">
    <span class="col">{$language === "en" ? "tool" : "strumento"}</span>
    <span class="col year">{$language === "en" ? "year" : "anno"}</span>
  </div>

  <div class="tools-list">
    {#each tools as tool}
      <a href="{base}/tools/{tool.slug}" class="tool-row">
        <span class="tool-title">{tool.title}</span>
        <span class="tool-year">{tool.year}</span>
      </a>
    {/each}
  </div>
</main>

<style>
  .tools-page {
    padding-top: 0;
  }

  /* Header Grid matches row grid */
  .tools-list-header {
    display: grid;
    grid-template-columns: 1fr auto;
    padding: 10px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    margin-bottom: 0;
    margin-top: 40px;
  }

  .col {
    font-family: var(--font-mono);
    font-size: 1.1rem;
    font-weight: 400;
    text-transform: lowercase;
    opacity: 0.5;
  }

  .col.year {
    text-align: right;
  }

  .tools-list {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .tool-row {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 20px;
    padding: 6px 0; /* Strictly matching ProjectRow */
    border-bottom: 1px solid rgba(0, 0, 0, 0.1); /* ProjectRow uses 0.2 but this file had 0.1, matching ProjectRow 0.2 now for consistency? ProjectRow has 0.2. Let's match 0.2 */
    /* text-decoration, color, transition handled by base styles or explicit */
    text-decoration: none;
    color: var(--color-text);
    transition: color 0.2s ease;
    align-items: center;
  }

  .tool-row:hover {
    color: var(--color-accent);
  }

  .tool-title {
    font-size: 1.1rem; /* Strictly matching ProjectRow .col */
    font-weight: 400;
    /* font-family inherited from body (mono) */
  }

  .tool-year {
    font-size: 1.1rem; /* Strictly matching ProjectRow .col */
    font-weight: 400;
    text-align: right;
    /* font-family inherited */
  }

  @media (max-width: 768px) {
    .tool-title {
      font-size: 1.4rem;
    }

    .tool-year {
      font-size: 1rem;
    }

    .tool-row {
      padding: 16px 0;
    }
  }

  @media (max-width: 480px) {
    .tools-list-header {
      display: none; /* Often hidden on mobile projects too, or we can keep it */
    }

    .tool-row {
      display: flex; /* Switch to flex on very small screens if needed, though grid works fine for 2 cols */
      justify-content: space-between;
    }
  }
</style>
