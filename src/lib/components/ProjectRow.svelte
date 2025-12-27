<script>
  import { language } from "$lib/stores/language.js";
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
      "Editorial Design": "EDI",
      "Design Editoriale": "EDI",
      "Motion Design": "MOT",
      "Poster Design": "POS",
      "Type Design": "TYP",
      "Packaging Design": "PKG",
      "Brand/Editorial Design": "BRA/EDI", // Fallback if not split
      Brand: "BRA",
      Branding: "BRA",
      "3D Modeling": "3D",
      Motion: "MOT",
      "Brand/Design Editoriale": "BRA/EDI",
      "Modellazione 3D": "3D",
      "Brand/Editorial Design": "BRA/EDI",
    };
    // Helper to catch partial matches if exact map fails, or just return trimmed 3 chars
    const mapped =
      map[category] || category.replace(" Design", "").replace("Design ", "");
    return mapped.length > 3
      ? mapped.substring(0, 3).toUpperCase()
      : mapped.toUpperCase();
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
    align-items: center;
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

  @media (hover: hover) {
    .project-row:hover {
      color: var(--color-accent);
    }
  }

  .col {
    font-size: 1.1rem;
    font-weight: 400;
  }

  .title {
    font-weight: 400;
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
      height: 250px; /* Fixed height as requested */
      padding: 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }

    .text-content {
      display: flex;
      flex-direction: column;
      width: 50%;
      height: 100%; /* Fill height to center content vertically */
      justify-content: center;
      gap: 4px;
    }

    .mobile-preview {
      display: block;
      width: 50%;
      height: 100%; /* Fill the fixed 250px height */
      /* aspect-ratio removed */
      border-radius: 0;
      /* box-shadow removed, moving to image filter */
      padding: 15px; /* Add breathing room so images don't touch edges */
      box-sizing: border-box; /* Ensure padding is included in width/height */
    }

    .preview-media {
      width: 100%;
      height: 100%;
      object-fit: contain; /* Show full image without cropping */
      display: block;
      filter: drop-shadow(
        0 4px 6px rgba(0, 0, 0, 0.15)
      ); /* Shadow applies to the image itself */
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
