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
    <span class="col">tool</span>
    <span class="col">{$language === "en" ? "description" : "descrizione"}</span
    >
    <span class="col">{$language === "en" ? "year" : "anno"}</span>
  </div>

  <div class="tools-list">
    {#each tools as tool}
      <a href="{base}/tools/{tool.slug}" class="tool-row">
        <span class="col tool-title">{tool.title}</span>
        <span class="col tool-desc"
          >{$language === "en" ? tool.description : tool.description_it}</span
        >
        <span class="col tool-year">{tool.year}</span>
      </a>
    {/each}
  </div>
</main>

<style>
  .tools-page {
    padding: 0 30px;
  }

  /* Header Grid */
  .tools-list-header {
    display: grid;
    grid-template-columns: 1fr 2fr 0.5fr; /* Tool narrow, Desc wide, Year narrow */
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

  /* Column Styles */
  .col {
    /* Base styles shared with header and rows */
    font-family: var(--font-mono);
  }

  .col:last-child {
    text-align: right;
  }

  .tools-list {
    display: flex;
    flex-direction: column;
  }

  /* Row Grid */
  .tool-row {
    display: grid;
    grid-template-columns: 1fr 2fr 0.5fr; /* Match header */
    gap: 20px;
    padding: 6px 0;
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
      display: none; /* Hide header on mobile like projects */
    }

    .tool-row {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      gap: 15px;
      padding: 20px 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }

    .tool-row .col {
      font-size: 0.9rem;
    }

    /* Left side: title + year stacked */
    .tool-title {
      font-size: 1rem;
      font-weight: 700;
      order: 1;
    }

    .tool-year {
      font-size: 0.8rem;
      opacity: 0.6;
      text-align: left;
      order: 2;
    }

    /* Right side: description */
    .tool-desc {
      display: block;
      text-align: right;
      font-size: 0.85rem;
      opacity: 0.7;
      order: 3;
      max-width: 50%;
    }
  }
</style>
