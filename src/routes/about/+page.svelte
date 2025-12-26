<svelte:head>
  <title>about — MATTIA CAPOMAGI</title>
</svelte:head>

<div class="about">
  <div class="about-content">
    <p class="bio">
      rome based graphic designer specializing in minimalism and brand creation.
      i leverage editorial design to challenge convention, occasionally breaking
      the rules to engineer aesthetic friction and new visual languages.
    </p>

    <div class="contact-info">
      <a href="mailto:mattia.capomagi@gmail.com" class="email"
        >mattia.capomagi@gmail.com</a
      >
      <a
        href="https://instagram.com/mattiacapomagi"
        target="_blank"
        rel="noopener noreferrer">Instagram</a
      >
      <a
        href="https://www.linkedin.com/in/mattiacapomagi/"
        target="_blank"
        rel="noopener noreferrer">LinkedIn</a
      >
    </div>
  </div>
</div>

<style>
  .about {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 80vh; /* Increased to push center point down */
    padding: 0 40px;
  }

  .about-content {
    max-width: 800px;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 48px;
  }

  .bio {
    font-size: 1.5rem;
    font-weight: 400;
    line-height: 1.4;
  }

  .contact-info {
    display: flex;
    flex-direction: row; /* Horizontal alignment */
    justify-content: center;
    flex-wrap: wrap; /* Allow wrapping on small screens */
    gap: 24px;
    font-size: 1.1rem;
    color: var(--color-text);
  }

  .contact-info a {
    text-decoration: none;
    color: var(--color-text);
    transition: color 0.2s ease;
  }

  .contact-info a:hover {
    color: var(--color-accent);
  }
</style>
