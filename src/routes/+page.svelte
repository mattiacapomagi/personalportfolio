<script>
  import { projects } from "$lib/data/projects.js";
  import ProjectRow from "$lib/components/ProjectRow.svelte";
  import ImagePreview from "$lib/components/ImagePreview.svelte";

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
    <span class="col">project title</span>
    <span class="col">client</span>
    <span class="col">category</span>
    <span class="col year">year</span>
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
    padding: 40px 0;
  }

  .project-list-header {
    display: grid;
    grid-template-columns: 2fr 1.5fr 1fr 0.5fr;
    gap: 20px;
    padding: 8px 40px 16px;
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 0.05em;
    text-transform: lowercase;
    opacity: 0.5;
  }

  .year {
    text-align: right;
  }

  .project-list {
    display: flex;
    flex-direction: column;
  }
</style>
