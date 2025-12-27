<script>
  import { projects } from "$lib/data/projects.js";
  import ProjectRow from "$lib/components/ProjectRow.svelte";
  import ImagePreview from "$lib/components/ImagePreview.svelte";
  import { language } from "$lib/stores/language";

  let previewImage = $state(null);
  let mouseX = $state(0);
  let mouseY = $state(0);
  let selectedCategory = $state("All");

  let uniqueCategories = $derived([
    "All",
    ...new Set(
      projects
        .flatMap((p) => {
          const cat =
            $language === "en" ? p.category : p.category_it || p.category;
          // Split by / or +, trim whitespace
          return cat.split(/\/|\+/).map((c) => c.trim());
        })
        .filter(Boolean)
    ),
  ]);

  let filteredProjects = $derived(
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => {
          const currentCat =
            $language === "en" ? p.category : p.category_it || p.category;
          // Check if selected category is part of the project's category string
          // We split the project category similarly to match exact segments
          const projectCategories = currentCat
            .split(/\/|\+/)
            .map((c) => c.trim());
          return projectCategories.includes(selectedCategory);
        })
  );

  function handleProjectHover(imageUrl) {
    previewImage = imageUrl;
  }

  function handleMouseMove(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
  }

  function setCategory(cat) {
    selectedCategory = cat;
  }
</script>

<svelte:window onmousemove={handleMouseMove} />

<div class="home">
  <!-- Category Filter -->
  <div class="filter-container">
    {#each uniqueCategories as category}
      <button
        class="filter-btn"
        class:active={selectedCategory === category}
        onclick={() => setCategory(category)}
      >
        {category}
      </button>
    {/each}
  </div>

  <div class="project-list-header">
    <span class="col"
      >{$language === "en" ? "project title" : "titolo progetto"}</span
    >
    <span class="col">{$language === "en" ? "client" : "cliente"}</span>
    <span class="col">{$language === "en" ? "category" : "categoria"}</span>
    <span class="col year">{$language === "en" ? "year" : "anno"}</span>
  </div>

  <div class="project-list">
    {#each filteredProjects as project}
      <ProjectRow {project} onhover={handleProjectHover} />
    {/each}
  </div>

  <ImagePreview imageUrl={previewImage} x={mouseX} y={mouseY} />
</div>

<style>
  .home {
    padding: 0;
  }

  /* Filter Styles */
  .filter-container {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-bottom: 20px;
    margin-top: 10px;
  }

  .filter-btn {
    background: none;
    border: 1px solid var(--color-text);
    color: var(--color-text);
    padding: 5px 15px;
    border-radius: 20px;
    cursor: pointer;
    font-family: inherit;
    font-size: 0.9rem;
    font-weight: 500;
    transition: all 0.2s ease;
    text-transform: capitalize;
  }

  .filter-btn:hover {
    background: var(--color-text);
    color: var(--color-bg);
  }

  .filter-btn.active {
    background: var(--color-accent);
    border-color: var(--color-accent);
    color: white;
  }

  .project-list-header {
    display: grid;
    grid-template-columns: 2fr 1.5fr 1fr 0.5fr;
    gap: 20px;
    padding: 0 0 6px; /* User requested 6px bottom */
    margin-top: 10px; /* User requested 10px top */
    font-size: 1.1rem;
    font-weight: 700; /* Bold as per screenshot */
    text-transform: lowercase; /* Actually screenshot shows 'project title' lowercase but bold */
    color: var(--color-text);
    opacity: 1; /* Fully visible */
  }

  .year {
    text-align: right;
  }

  .project-list {
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 768px) {
    .project-list-header {
      font-size: 1rem;
      gap: 10px;
    }
  }

  @media (max-width: 480px) {
    .project-list-header {
      display: none; /* Hide header rows on mobile as layout shifts to cards/rows */
    }
  }

  @media (max-width: 768px) {
    .project-list-header {
      font-size: 0.9rem;
      /* Hide non-essential columns on tablet? Usually better to simplify grid */
      grid-template-columns: 2fr 1fr 1fr;
    }
    .col:last-child {
      /* Keep Year if important, otherwise maybe grid changes */
      display: none; /* Hide year on tablet/mobile if needed, or adjust */
    }
    /* Actually, let's just scale text first as requested */
  }

  @media (max-width: 768px) {
    .project-list-header {
      font-size: 1rem;
      /* Keep grid but tighter? */
      gap: 10px;
    }
  }

  @media (max-width: 480px) {
    .project-list-header {
      display: none; /* Often header is hidden on mobile for lists */
    }
    /* Or just smaller */
  }
</style>
