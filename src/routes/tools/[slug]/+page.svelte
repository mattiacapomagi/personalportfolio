<script>
  import { base } from "$app/paths";
  import { language } from "$lib/stores/language.js";

  let { data } = $props();
  const tool = data.tool;
</script>

<svelte:head>
  <title>{tool.title} — MATTIA CAPOMAGI</title>
</svelte:head>

<main class="tool-detail">
  <div class="tool-header">
    <a href="{base}/tools" class="back-link">
      ← {$language === "en" ? "Back to Tools" : "Torna agli Strumenti"}
    </a>
    <div class="tool-meta">
      <h1 class="tool-title">{tool.title}</h1>
      <span class="tool-year">{tool.year}</span>
    </div>
    <p class="tool-description">
      {$language === "en" ? tool.description : tool.description_it}
    </p>
  </div>

  <div class="tool-embed">
    {#if tool.slug === "bricklab"}
      <iframe
        src="https://mattiacapomagi.github.io/BRICKLAB/"
        title={tool.title}
        class="embed-iframe"
        allow="clipboard-write"
      ></iframe>
    {:else if tool.externalUrl}
      <a
        href={tool.externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        class="external-link"
      >
        {$language === "en" ? "Open Tool" : "Apri Strumento"} →
      </a>
    {/if}
  </div>
</main>

<style>
  .tool-detail {
    padding-top: 40px;
  }

  .tool-header {
    margin-bottom: 40px;
  }

  .back-link {
    font-size: 1rem;
    color: var(--color-text);
    opacity: 0.6;
    text-decoration: none;
    transition: opacity 0.2s ease;
    display: inline-block;
    margin-bottom: 24px;
  }

  .back-link:hover {
    opacity: 1;
    color: var(--color-accent);
  }

  .tool-meta {
    display: flex;
    align-items: baseline;
    gap: 20px;
    margin-bottom: 16px;
  }

  .tool-title {
    font-size: 2.5rem;
    font-weight: 700;
    margin: 0;
    color: var(--color-text);
  }

  .tool-year {
    font-size: 1.2rem;
    font-weight: 500;
    opacity: 0.5;
    font-family: var(--font-mono);
  }

  .tool-description {
    font-size: 1.1rem;
    line-height: 1.6;
    opacity: 0.8;
    max-width: 700px;
    font-family: var(--font-body);
  }

  .tool-embed {
    width: 100%;
    border-radius: 16px;
    overflow: hidden;
    background: #1a1a1a;
  }

  .embed-iframe {
    width: 100%;
    height: 80vh;
    min-height: 600px;
    border: none;
    display: block;
  }

  .external-link {
    display: inline-block;
    padding: 16px 32px;
    background: var(--color-text);
    color: var(--color-bg);
    text-decoration: none;
    font-weight: 700;
    font-size: 1.2rem;
    border-radius: 8px;
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
  }

  .external-link:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    .tool-title {
      font-size: 1.8rem;
    }

    .tool-meta {
      flex-direction: column;
      gap: 8px;
    }

    .embed-iframe {
      height: 70vh;
      min-height: 500px;
    }
  }
</style>
