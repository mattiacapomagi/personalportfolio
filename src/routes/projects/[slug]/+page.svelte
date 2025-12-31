<script>
  import { base } from "$app/paths";
  import { language } from "$lib/stores/language.js";
  import ImageCarousel from "$lib/components/ImageCarousel.svelte";

  let { data } = $props();
  let project = $derived(data.project);
</script>

<svelte:head>
  <title>{project.title} - Mattia Capomagi</title>
  <meta name="description" content={project.description_en} />
</svelte:head>

<article class="project-page">
  <div class="project-header">
    <h1>{project.title}</h1>
  </div>

  <div class="project-content">
    <div class="info-grid">
      <div class="info-item">
        <span class="label">{$language === "en" ? "CLIENT:" : "CLIENTE:"}</span>
        <span class="value">{project.client}</span>
      </div>
      <div class="info-item">
        <span class="label">{$language === "en" ? "YEAR:" : "ANNO:"}</span>
        <span class="value">{project.year}</span>
      </div>
      <div class="info-item">
        <span class="label"
          >{$language === "en" ? "CATEGORY:" : "CATEGORIA:"}</span
        >
        <span class="value">
          {$language === "en"
            ? project.category
            : project.category_it || project.category}
        </span>
      </div>
    </div>

    <div class="description">
      <p>
        {$language === "en" ? project.description_en : project.description_it}
      </p>
    </div>

    {#if project.gumroadLink}
      <div class="gumroad-wrapper">
        <a
          href={project.gumroadLink}
          target="_blank"
          rel="noopener noreferrer"
          class="gumroad-btn"
        >
          GET TYPECAFE
        </a>
      </div>
    {/if}

    <div class="project-gallery">
      {#if project.images && project.images.length > 0}
        <ImageCarousel images={project.images} />
      {/if}
    </div>
  </div>
</article>

<style>
  .project-page {
    padding-top: 10px;
    padding-bottom: 10px;
    min-height: 100vh;
    width: 100%;
    color: var(--text-color);
  }

  .project-header {
    margin-bottom: 5px;
    padding: 0 var(--spacing-unit);
  }

  h1 {
    font-family: var(--font-mono);
    font-weight: bold;
    font-size: clamp(2rem, 4vw, 3rem);
    text-transform: uppercase;
    margin: 0;
    line-height: 1;
  }

  .info-grid {
    font-family: var(--font-mono);
    display: flex;
    flex-wrap: wrap;
    gap: 10px 40px;
    margin-bottom: 20px;
    padding: 0 var(--spacing-unit);
    margin-top: 0;
  }

  .info-item {
    display: flex;
    gap: 8px;
    align-items: baseline;
  }

  .label {
    font-size: 1.05rem; /* Desktop increased size */
    opacity: 0.7;
    text-transform: uppercase;
    font-weight: bold;
  }

  .value {
    font-size: 1.05rem; /* Desktop increased size */
    text-transform: uppercase;
  }

  .description {
    width: 50%;
    margin: 0;
    padding: 0 var(--spacing-unit);
    font-family: "PP Kyoto", sans-serif;
    font-size: 1.1rem;
    line-height: 1.35;
    font-weight: 300;
    text-align: justify;
  }

  .gumroad-wrapper {
    width: 50%;
    padding: 20px var(--spacing-unit);
    display: flex;
    justify-content: flex-start;
  }

  .gumroad-btn {
    display: inline-block;
    padding: 12px 24px;
    border: 1px solid var(--text-color);
    color: var(--text-color);
    text-decoration: none;
    font-family: var(--font-mono);
    font-weight: bold;
    text-transform: uppercase;
    font-size: 0.9rem;
    background: transparent;
    transition: all 0.2s ease;
    cursor: pointer;
  }

  .gumroad-btn:hover {
    background: var(--text-color);
    color: var(--bg-color);
  }

  .project-gallery {
    margin-top: 40px;
    width: 100%;
    /* removed padding constraint to let carousel handle it or use var(--spacing-unit) if needed? 
       Previous carousel usage had no extra styles here. */
  }

  @media (max-width: 768px) {
    .project-page {
      padding-top: 10px;
    }

    h1 {
      font-size: 2rem;
      margin-bottom: 10px;
    }

    .info-grid {
      flex-direction: column;
      gap: 5px;
      margin-bottom: 20px;
    }

    .label,
    .value {
      font-size: 0.85rem; /* Mobile original size */
    }

    .description {
      width: 100%;
      font-size: 1rem;
    }

    .gumroad-wrapper {
      width: 100%;
    }
  }
</style>
