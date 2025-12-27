<script>
  import ImageCarousel from "$lib/components/ImageCarousel.svelte";
  import { language } from "$lib/stores/language";

  let { data } = $props();
  const { project } = data;
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
    <p class="project-description">
      {$language === "en" ? project.description_en : project.description_it}
    </p>

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
    margin-bottom: 20px; /* Space X */
  }

  .project-title {
    font-size: 2.5rem;
    font-weight: 700;
    line-height: 1.1;
    margin-bottom: 20px; /* Space X */
    text-transform: uppercase;
  }

  .project-meta {
    display: flex;
    gap: 60px;
    /* Removed border and padding */
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

  .project-description {
    font-size: 1.1rem;
    line-height: 1.5;
    max-width: 800px;
    text-align: justify;
  }

  .project-gallery {
    width: 100%;
    margin-top: 0; /* Removed to rely on flex gap */
  }

  @media (max-width: 768px) {
    .project-meta {
      gap: 30px;
      flex-wrap: wrap;
    }

    .project-title {
      font-size: 2rem;
    }

    .project-description {
      font-size: 1rem;
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
