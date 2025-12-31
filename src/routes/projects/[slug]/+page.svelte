<script>
  import { base } from "$app/paths";
  import { language } from "$lib/stores/language.js";

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

    <!-- PHASE 2: ImageCarousel will go here -->
    <div
      class="project-gallery-placeholder"
      style="padding: 50px; border: 1px dashed white; text-align: center; margin-top: 40px;"
    >
      <p>Image Carousel is currently disabled for stability testing.</p>
      <p>({project.images ? project.images.length : 0} images available)</p>
    </div>
  </div>
</article>

<style>
  .project-page {
    padding-top: 10px; /* Requested 10px */
    padding-bottom: 10px; /* Requested 10px */
    min-height: 100vh;
    width: 100%;
    color: var(--text-color);
  }

  .project-header {
    margin-bottom: 5px; /* Almost no space between title and info */
    padding: 0 var(--spacing-unit);
  }

  h1 {
    font-family: var(--font-mono); /* forma-djr-mono */
    font-weight: bold; /* Requested Bold */
    font-size: clamp(2rem, 4vw, 3rem);
    text-transform: uppercase;
    margin: 0;
    line-height: 1;
  }

  .info-grid {
    font-family: var(--font-mono); /* forma-djr-mono */
    display: flex;
    flex-wrap: wrap;
    gap: 10px 40px; /* Reduced vertical gap */
    margin-bottom: 20px; /* Reduced from 40px (half) */
    padding: 0 var(--spacing-unit);
    margin-top: 0;
    /* Removed border-top to reduce visual noise and spacing */
  }

  .info-item {
    display: flex;
    gap: 8px;
    align-items: baseline;
  }

  .label {
    font-size: 0.85rem;
    opacity: 0.7;
    text-transform: uppercase;
    font-weight: bold; /* BOLD LABELS requested */
    /* letter-spacing inherited */
  }

  .value {
    font-size: 0.85rem;
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

  @media (max-width: 768px) {
    .project-page {
      padding-top: 10px; /* Consistent with desktop */
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

    .description {
      width: 100%;
      font-size: 1rem;
    }
  }
</style>
