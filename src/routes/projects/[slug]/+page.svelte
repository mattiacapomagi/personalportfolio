<script>
  import ImageCarousel from "$lib/components/ImageCarousel.svelte";

  let { data } = $props();
  const { project } = data;
</script>

<svelte:head>
  <title>{project.title} — MATTIA CAPOMAGI</title>
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
    max-width: var(--max-width);
    margin: 0 auto;
  }

  .project-header {
    margin-bottom: 40px;
  }

  .project-title {
    font-size: 2.5rem; /* Large but not display size */
    font-weight: 700;
    line-height: 1.1;
    margin-bottom: 32px;
    text-transform: uppercase;
  }

  .project-meta {
    display: flex;
    gap: 60px;
    padding-bottom: 24px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
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
    gap: 40px;
  }

  .project-description {
    font-size: 1.1rem;
    line-height: 1.5;
    max-width: 800px;
  }

  .project-gallery {
    width: 100%;
    margin-top: 20px;
  }

  @media (max-width: 768px) {
    .project-meta {
      gap: 30px;
      flex-wrap: wrap;
    }

    .project-title {
      font-size: 2rem;
    }
  }
</style>
