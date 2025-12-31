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
        <span class="label">CLIENT:</span>
        <span class="value">{project.client}</span>
      </div>
      <div class="info-item">
        <span class="label">YEAR:</span>
        <span class="value">{project.year}</span>
      </div>
      <div class="info-item">
        <span class="label">CATEGORY:</span>
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
    padding-top: 80px; /* Reduced from 120px to match navbar height roughly */
    padding-bottom: 100px;
    min-height: 100vh;
    width: 100%;
    color: var(--text-color);
  }

  .project-header {
    margin-bottom: 10px; /* Minimal space between title and info */
    padding: 0 var(--spacing-unit);
  }

  h1 {
    font-weight: 400;
    font-size: clamp(
      2rem,
      4vw,
      3rem
    ); /* Slightly smaller to match mono aesthetic */
    text-transform: uppercase;
    margin: 0;
    line-height: 1;
    /* Font inherited from body (var(--font-mono)) as requested */
  }

  .info-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 20px 40px; /* Gap between items */
    margin-bottom: 40px;
    padding: 0 var(--spacing-unit);
    /* Removed border-top to reduce visual noise and spacing */
  }

  .info-item {
    display: flex;
    gap: 10px;
    align-items: baseline;
  }

  .label {
    font-size: 0.85rem;
    opacity: 0.7;
    text-transform: uppercase;
    /* letter-spacing inherited */
  }

  .value {
    font-size: 0.85rem;
    text-transform: uppercase;
  }

  .description {
    width: 50%; /* Requested 50% width */
    margin: 0; /* Aligned left, so no margin: 0 auto */
    padding: 0 var(--spacing-unit);
    font-family: "PP Kyoto", sans-serif; /* Exceptions for description */
    font-size: 1.1rem; /* Smaller size */
    line-height: 1.3;
    font-weight: 300;
    text-align: justify; /* Justified text */
  }

  @media (max-width: 768px) {
    .project-page {
      padding-top: 70px;
    }

    h1 {
      font-size: 2rem;
      margin-bottom: 20px;
    }

    .info-grid {
      flex-direction: column;
      gap: 5px;
      margin-bottom: 30px;
    }

    .description {
      width: 100%; /* Full width on mobile */
      font-size: 1rem;
    }
  }
</style>
