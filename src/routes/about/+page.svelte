<svelte:head>
  <title>about — MATTIA CAPOMAGI</title>
</svelte:head>

<div class="about">
  <div class="about-content">
    <p class="bio">
      Graphic designer based in Rome. <br />
      Exploring visual storytelling, typography, and experimental layouts.
    </p>

    <div class="contact-info">
      <a href="mailto:mattia.capomagi@gmail.com" class="email"
        >mattia.capomagi@gmail.com</a
      >

      <nav class="social-links">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer">Instagram</a
        >
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
          >LinkedIn</a
        >
      </nav>
    </div>
  </div>
</div>

<style>
  .about {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 60vh; /* Centered visually in the viewport */
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
    flex-direction: column;
    gap: 16px;
    font-size: 1.1rem;
    color: var(--color-text);
  }

  .email {
    text-decoration: none;
  }

  .email:hover,
  .social-links a:hover {
    color: var(--color-accent);
  }

  .social-links {
    display: flex;
    justify-content: center;
    gap: 24px;
  }
</style>
