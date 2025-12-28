<script>
  import { base } from "$app/paths";
  import { tools } from "$lib/data/tools.js";
  import { language } from "$lib/stores/language.js";
</script>

<svelte:head>
  <title>Tools — MATTIA CAPOMAGI</title>
</svelte:head>

<main class="tools-page">
  <h1 class="page-title">{$language === "en" ? "Tools" : "Strumenti"}</h1>

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
    padding-top: 40px;
  }

  .page-title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 40px;
    color: var(--color-text);
  }

  .tools-list {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .tool-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 20px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    text-decoration: none;
    color: var(--color-text);
    transition: color 0.2s ease;
  }

  .tool-row:first-child {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }

  .tool-row:hover {
    color: var(--color-accent);
  }

  .tool-title {
    font-size: 1.8rem;
    font-weight: 700;
    font-family: var(--font-mono);
  }

  .tool-year {
    font-size: 1.2rem;
    font-weight: 500;
    opacity: 0.6;
    font-family: var(--font-mono);
  }

  @media (max-width: 768px) {
    .page-title {
      font-size: 2rem;
      margin-bottom: 30px;
    }

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
</style>
