<script>
  import { language } from "$lib/stores/language";
  import { base } from "$app/paths";

  /** @type {{ project: import('$lib/data/projects').Project, onhover: (imageUrl: string | null) => void }} */
  let { project, onhover } = $props();

  let previewSource = $derived(project.previewImage || project.images[0]);
  let isVideoPreview = $derived(
    previewSource?.toLowerCase().endsWith(".mp4") ||
      previewSource?.toLowerCase().endsWith(".mov")
  );

  function handleMouseEnter() {
    onhover(previewSource);
  }

  function handleMouseLeave() {
    onhover(null);
  }

  function getAbbreviation(category) {
    const map = {
      "Editorial Design": "Editorial",
      "Design Editoriale": "Editorial",
      "Motion Design": "Motion",
      "Poster Design": "Poster",
      "Type Design": "Type",
      "Packaging Design": "Packaging",
      "Brand/Editorial Design": "Brand/Edit.", // Fallback if not split
      Brand: "Branding", // Normalize brand
      Branding: "Branding",
      "3D Modeling": "3D",
      Motion: "Motion",
      "Brand/Design Editoriale": "Brand/Edit.",
      "Modellazione 3D": "3D",
    };
    // Helper to catch partial matches if exact map fails, or just return trimmed
    return (
      map[category] || category.replace(" Design", "").replace("Design ", "")
    );
  }

  function getCategoryTags(project) {
    const rawCat =
      $language === "en"
        ? project.category
        : project.category_it || project.category;
    // Split by / or +
    return rawCat
      .split(/\/|\+/)
      .map((c) => getAbbreviation(c.trim()))
      .filter(Boolean);
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
    <span class="col category">
      <div class="tags">
        {#each getCategoryTags(project) as tag}
          <span class="category-tag">{tag}</span>
        {/each}
      </div>
    </span>
    <span class="col year">{project.year}</span>
  </div>

  <!-- Mobile Only Preview -->
  <div class="mobile-preview">
    {#if isVideoPreview}
      <video
        src="{base}{previewSource}"
        autoplay
        loop
        muted
        playsinline
        class="preview-media"
      ></video>
    {:else}
      <img
        src="{base}{previewSource}"
        alt={project.title}
        loading="lazy"
        class="preview-media"
      />
    {/if}
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
      border-radius: 0;
    }

    .preview-media {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .col {
      font-size: 0.9rem;
    }

    .category {
      /* Mobile override if needed, or rely on tags flex */
    }
    .title {
      font-size: 1rem;
      font-weight: 700;
      margin-bottom: 2px;
      order: 1;
    }

    .category {
      order: 2;
      margin-bottom: 2px; /* Add some spacing after category tags */
    }

    .client {
      order: 3;
    }

    .year {
      text-align: left;
      font-size: 0.8rem;
      opacity: 0.6;
      order: 4;
    }

    .tags {
      flex-wrap: wrap; /* Wrap tags on mobile if needed */
    }

    .category-tag {
      font-size: 0.75rem; /* Smaller tags on mobile */
      padding: 2px 6px;
    }
  }

  /* Tag Styles */
  .tags {
    display: flex;
    gap: 6px;
    align-items: center;
  }

  .category-tag {
    border: 1px solid currentColor;
    border-radius: 0;
    padding: 2px 8px;
    font-size: 0.85rem;
    text-transform: uppercase;
    font-weight: 500;
    white-space: nowrap;
  }
</style>
