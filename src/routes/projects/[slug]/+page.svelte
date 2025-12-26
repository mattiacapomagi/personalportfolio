<script>
  import ImageCarousel from "$lib/components/ImageCarousel.svelte";

  let { data } = $props();
  const { project } = data;
</script>

<svelte:head>
  <title>{project.title} — PORTFOLIO</title>
</svelte:head>

<article class="project-detail">
  <header class="project-header">
    <h1 class="project-title">{project.title}</h1>

    <div class="project-meta">
      <div class="meta-item">
        <span class="meta-label">Client</span>
        <span class="meta-value">{project.client}</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">Category</span>
        <span class="meta-value">{project.category}</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">Year</span>
        <span class="meta-value">{project.year}</span>
      </div>
    </div>
  </header>

  <div class="project-content">
    <p class="project-description">{project.description}</p>

    <div class="project-gallery">
      <ImageCarousel images={project.images} />
    </div>
  </div>
</article>

<style>
  .project-detail {
    padding: 40px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .project-header {
    margin-bottom: 60px;
  }

  .project-title {
    font-size: clamp(48px, 8vw, 96px);
    font-weight: 700;
    line-height: 1;
    margin-bottom: 40px;
    letter-spacing: -0.02em;
  }

  .project-meta {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 40px;
    max-width: 600px;
  }

  .meta-item {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .meta-label {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    opacity: 0.5;
  }

  .meta-value {
    font-size: 14px;
    font-weight: 400;
  }

  .project-content {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 60px;
    align-items: start;
  }

  .project-description {
    font-size: 14px;
    line-height: 1.7;
    max-width: 400px;
  }

  .project-gallery {
    width: 100%;
  }

  @media (max-width: 900px) {
    .project-content {
      grid-template-columns: 1fr;
    }

    .project-meta {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
