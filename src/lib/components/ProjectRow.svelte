<script>
  import { language } from "$lib/stores/language";
  import { base } from "$app/paths";

  /** @type {{ project: import('$lib/data/projects').Project, onhover: (imageUrl: string | null) => void }} */
  let { project, onhover } = $props();

  function handleMouseEnter() {
    onhover(project.images[0] || project.previewImage);
  }

  function handleMouseLeave() {
    onhover(null);
  }
</script>

<a
  href="{base}/projects/{project.slug}"
  class="project-row"
  onmouseenter={handleMouseEnter}
  onmouseleave={handleMouseLeave}
>
  <div class="text-content">
    <span class="col title"
      >{$language === "en"
        ? project.title
        : project.title_it || project.title}</span
    >
    <span class="col client">{project.client}</span>
    <span class="col category"
      >{$language === "en" ? project.category : project.category_it}</span
    >
    <span class="col year">{project.year}</span>
  </div>

  <!-- Mobile Only Preview -->
  <div class="mobile-preview">
    <img
      src="{base}{project.images[0] || project.previewImage}"
      alt={project.title}
      loading="lazy"
    />
  </div>
</a>

<style>
  .project-row {
    display: grid;
    grid-template-columns: 2fr 1.5fr 1fr 0.5fr;
    gap: 20px;
    padding: 6px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    align-items: baseline;
    text-decoration: none;
    color: inherit; /* Ensure color inherits */
  }

  .text-content {
    display: contents; /* Seamlessly integrate into parent grid */
  }

  .mobile-preview {
    display: none;
  }

  .project-row:first-child {
    border-top: 1px solid rgba(0, 0, 0, 0.2);
  }

  .project-row:hover {
    color: var(--color-accent);
  }

  .col {
    font-size: 1.1rem;
    font-weight: 400;
  }

  .title {
    font-weight: 500;
  }

  .year {
    text-align: right;
  }

  @media (max-width: 768px) {
    .col {
      font-size: 1rem;
    }
    .project-row {
      gap: 10px;
    }
  }

  @media (max-width: 480px) {
    .project-row {
      display: flex; /* Flexbox for row layout */
      flex-direction: row;
      justify-content: space-between;
      align-items: center; /* Center vertically */
      gap: 15px;
      padding: 15px 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }

    .text-content {
      display: flex;
      flex-direction: column;
      width: 50%;
      gap: 4px;
    }

    .mobile-preview {
      display: block;
      width: 50%;
      aspect-ratio: 16 / 9; /* Standard preview ratio */
      overflow: hidden;
      border-radius: 4px;
    }

    .mobile-preview img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .col {
      font-size: 0.9rem;
    }

    .title {
      font-size: 1rem;
      font-weight: 700;
      margin-bottom: 2px;
    }

    .year {
      text-align: left;
      font-size: 0.8rem;
      opacity: 0.6;
    }
  }
</style>
