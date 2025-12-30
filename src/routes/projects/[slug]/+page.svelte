<script>
  import ImageCarousel from "$lib/components/ImageCarousel.svelte";
  import { language } from "$lib/stores/language.js";

  let { data } = $props();
  let project = $derived(data.project);
</script>

<svelte:head>
  <title>{project.title} — MATTIA CAPOMAGI</title>
</svelte:head>

<article class="project-detail">
  <header class="project-header">
    <h1 class="project-title">
      {$language === "en" ? project.title : project.title_it || project.title}
    </h1>

    <div class="project-meta">
      <div class="meta-item">
        <span class="meta-label"
          >{$language === "en" ? "Client" : "Cliente"}</span
        >
        <span class="meta-value">{project.client}</span>
      </div>
      <div class="meta-item">
        <span class="meta-label"
          >{$language === "en" ? "Category" : "Categoria"}</span
        >
        <span class="meta-value"
          >{$language === "en" ? project.category : project.category_it}</span
        >
      </div>
      <div class="meta-item">
        <span class="meta-label">{$language === "en" ? "Year" : "Anno"}</span>
        <span class="meta-value">{project.year}</span>
      </div>
    </div>
  </header>

  <div class="project-content">
    <div class="description-container">
      <p class="project-description">
        {$language === "en" ? project.description_en : project.description_it}
      </p>

      {#if project.gumroadLink}
        <a
          href={project.gumroadLink}
          target="_blank"
          rel="noopener noreferrer"
          class="gumroad-button"
        >
          {$language === "en" ? "Get Typeface" : "Ottieni Typeface"}
        </a>
      {/if}
    </div>

    <div class="project-gallery">
      <ImageCarousel images={project.images} />
    </div>
  </div>
</article>

<style>
  .project-detail {
    max-width: var(--max-width);
    margin: 0 auto;
    padding-top: 10px; /* Reduced to minimize space between navbar and content */
  }

  .project-header {
    margin-bottom: 20px;
  }

  .project-title {
    font-family: var(--font-mono);
    font-size: 2.5rem;
    font-weight: 700;
    line-height: 1.1;
    line-height: 1.1;
    margin-bottom: 20px;
    text-transform: uppercase;
  }

  .project-meta {
    font-family: var(--font-mono);
    display: flex;
    gap: 60px;
    display: flex;
    gap: 60px;
  }

  .meta-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .meta-label {
    font-size: 1rem;
    font-weight: 700;
    text-transform: lowercase;
  }

  .meta-value {
    font-size: 1rem;
    font-weight: 400;
    opacity: 0.7;
  }

  .project-content {
    display: flex;
    flex-direction: column;
    gap: 20px; /* Space X (was 40px) */
  }

  .project-content {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .description-container {
    display: flex;
    flex-direction: column; /* Stack vertically below text */
    gap: 20px;
    width: 50%; /* Constrain to left half on desktop */
    min-width: 300px; /* Prevent being too narrow on resizing */
    max-width: 100%;
  }

  .project-description {
    font-size: 1.1rem;
    line-height: 1.5;
    text-align: justify;
    margin: 0;
  }

  .gumroad-button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px 24px;
    width: 100%; /* Match text block width */
    background-color: var(--color-text);
    color: var(--color-bg);
    font-family: var(--font-mono);
    font-weight: 700;
    text-decoration: none;
    text-transform: uppercase;
    white-space: nowrap;
    transition: background-color 0.2s ease;
    border: 1px solid var(--color-text);
    box-sizing: border-box;
  }

  .gumroad-button:hover {
    background-color: var(--color-bg);
    color: var(--color-text);
  }

  .project-gallery {
    width: 100%;
    margin-top: 0;
  }

  @media (max-width: 768px) {
    .project-meta {
      gap: 30px;
      flex-wrap: wrap;
    }

    .project-title {
      font-size: 2rem;
    }

    .description-container {
      width: 100%; /* Full width on mobile */
      display: contents; /* Ungroup items for mobile reordering */
    }

    .project-description {
      font-size: 1rem;
      max-width: 100%;
      order: 1; /* First: Text */
    }

    .project-gallery {
      order: 2; /* Second: Video/Gallery */
    }

    .gumroad-button {
      width: 100%;
      text-align: center;
      order: 3; /* Third: Button (below video) */
      margin-top: 10px;
    }

    .meta-label,
    .meta-value {
      font-size: 0.9rem;
    }
  }

  @media (max-width: 480px) {
    .project-title {
      font-size: 1.5rem;
    }

    .project-meta {
      gap: 10px;
      flex-direction: column;
    }

    .project-description {
      font-size: 0.9rem;
    }
  }
</style>
