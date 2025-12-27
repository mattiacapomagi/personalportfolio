<script>
  import { projects } from "$lib/data/projects.js";
  import ProjectRow from "$lib/components/ProjectRow.svelte";
  import ImagePreview from "$lib/components/ImagePreview.svelte";
  import { language } from "$lib/stores/language";

  let previewImage = $state(null);
  let mouseX = $state(0);
  let mouseY = $state(0);

  function handleProjectHover(imageUrl) {
    previewImage = imageUrl;
  }

  function handleMouseMove(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
  }
</script>

<svelte:window onmousemove={handleMouseMove} />

<div class="home">
  <div class="project-list-header">
    <span class="col"
      >{$language === "en" ? "project title" : "titolo progetto"}</span
    >
    <span class="col">{$language === "en" ? "client" : "cliente"}</span>
    <span class="col">{$language === "en" ? "category" : "categoria"}</span>
    <span class="col year">{$language === "en" ? "year" : "anno"}</span>
  </div>

  <div class="project-list">
    {#each projects as project}
      <ProjectRow {project} onhover={handleProjectHover} />
    {/each}
  </div>

  <ImagePreview imageUrl={previewImage} x={mouseX} y={mouseY} />
</div>

<style>
  .home {
    padding: 0 0 40px; /* Removed top padding completely */
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
</style>
