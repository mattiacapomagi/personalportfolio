<svelte:head>
  <title>About — PORTFOLIO</title>
</svelte:head>

<div class="about">
  <div class="about-content">
    <p class="bio">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattia Capomagi
      is a graphic designer based in Milan, Italy, specializing in editorial
      design, branding, and visual identity systems. With a focus on clean
      aesthetics and thoughtful typography, each project is approached with
      attention to detail and a commitment to meaningful visual communication.
    </p>
    <p class="bio">
      Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
      ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
      ex ea commodo consequat.
    </p>

    <nav class="contact-links">
      <a href="mailto:hello@mattiacapomagi.com" class="contact-link">Email</a>
      <a
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        class="contact-link">Instagram</a
      >
      <a
        href="https://linkedin.com"
        target="_blank"
        rel="noopener noreferrer"
        class="contact-link">LinkedIn</a
      >
    </nav>
  </div>
</div>

<style>
  .about {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 160px);
    padding: 40px;
  }

  .about-content {
    max-width: 600px;
    text-align: center;
  }

  .bio {
    font-size: 14px;
    line-height: 1.8;
    margin-bottom: 24px;
  }

  .bio:last-of-type {
    margin-bottom: 48px;
  }

  .contact-links {
    display: flex;
    justify-content: center;
    gap: 32px;
  }

  .contact-link {
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0.02em;
    transition: color 0.2s ease;
  }

  .contact-link:hover {
    color: var(--color-accent);
  }
</style>
