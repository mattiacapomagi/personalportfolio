<script>
  /** @type {{ project: import('$lib/data/projects').Project, onhover: (imageUrl: string | null) => void }} */
  let { project, onhover } = $props();

  function handleMouseEnter() {
    onhover(project.previewImage);
  }

  function handleMouseLeave() {
    onhover(null);
  }
</script>

<a
  href="/projects/{project.slug}"
  class="project-row"
  onmouseenter={handleMouseEnter}
  onmouseleave={handleMouseLeave}
>
  <span class="col title">{project.title}</span>
  <span class="col client">{project.client}</span>
  <span class="col category">{project.category}</span>
  <span class="col year">{project.year}</span>
</a>

<style>
  .project-row {
    display: grid;
    grid-template-columns: 2fr 1.5fr 1fr 0.5fr;
    gap: 20px;
    padding: 16px 40px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    transition: color 0.2s ease;
    cursor: pointer;
  }

  .project-row:first-child {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }

  .project-row:hover {
    color: var(--color-accent);
  }

  .col {
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0.02em;
  }

  .title {
    font-weight: 500;
  }

  .year {
    text-align: right;
  }
</style>
