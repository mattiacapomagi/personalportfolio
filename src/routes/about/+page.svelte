<script>
  import { language } from "$lib/stores/language";

  const bio_en = `Rome based, 23 years old graphic designer focused on building strong and adaptive brand identities. I don’t believe in limiting myself to a single aesthetic; my approach is fluid, navigating the wide space between precise minimalism and raw brutalism depending on what the project really needs.

Typography is a fundamental pillar of my work. I love experimenting with type design and lettering, treating letters as structural elements that give a specific voice to every concept.

At the same time, I embrace technology to break boundaries. I use artificial intelligence as a dedicated laboratory for experimentation, a tool that allows me to explore new visual territories and generate ideas that go beyond traditional methods.`;

  /* Define social links with icons */
  const socials = [
    {
      name: "Instagram",
      url: "https://www.instagram.com/mattiacapomagi",
      viewBox: "0 0 24 24",
      path: "M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M18,5A1,1 0 0,1 19,6A1,1 0 0,1 18,7A1,1 0 0,1 17,6A1,1 0 0,1 18,5Z",
    },
    {
      name: "Gumroad",
      url: "https://mattiacapomagi.gumroad.com/",
      viewBox: "90.295 93.404 330.706 320.703",
      /* Concatenated paths: Shadow + Main Circle + G Logo. 'evenodd' rule makes overlapping parts transparent. */
      path: "m278.037 414.107c78.957 0 142.964-61.788 142.964-138.008s-64.007-138.009-142.964-138.009-142.965 61.789-142.965 138.009 64.008 138.008 142.965 138.008z m241.141 385.186c83.044 0 150.846-65.055 150.846-145.891 0-80.835-67.802-145.891-150.846-145.891-83.043 0-150.846 65.056-150.846 145.891 0 80.836 67.803 145.891 150.846 145.891z m229.795 312.898c-42.217 0-67.05-34.11-67.05-76.54 0-44.095 27.316-79.869 79.465-79.869 53.806 0 72.016 36.607 72.844 57.405h-38.905c-.827-11.647-10.761-29.118-34.766-29.118-25.66 0-42.216 22.463-42.216 49.918s16.556 49.917 42.216 49.917c23.178 0 33.111-18.303 37.25-36.605h-37.25v-14.976h78.162v76.54h-34.29v-48.254c-2.484 17.472-13.245 51.582-55.46 51.582z",
      fillRule: "evenodd",
    },
    {
      name: "Linkedin",
      url: "https://www.linkedin.com/in/mattia-capomagi-461386221/",
      viewBox: "0 0 24 24",
      path: "M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z",
      /* ... socials array ... */
      // (Assuming socials ends around here, verified by view)
    },
  ];

  /* Restoring deleted form logic */
  let formStatus = $state("idle"); // 'idle', 'submitting', 'success', 'error'
  let formErrors = $state({ name: false, email: false, message: false });

  async function handleSubmit(e) {
    e.preventDefault();

    // Reset errors
    formErrors = { name: false, email: false, message: false };

    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    let isValid = true;

    if (!name) {
      formErrors.name = true;
      isValid = false;
      setTimeout(() => (formErrors.name = false), 3000); // Revert after 3s
    }
    if (!email) {
      formErrors.email = true;
      isValid = false;
      setTimeout(() => (formErrors.email = false), 3000);
    }
    if (!message) {
      formErrors.message = true;
      isValid = false;
      setTimeout(() => (formErrors.message = false), 3000);
    }

    // Captcha Validation - Removed per user request (utilizing FormSubmit default)

    if (!isValid) return;

    formStatus = "submitting";

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/mattia.capomagi@gmail.com",
        {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (response.ok) {
        formStatus = "success";
        e.target.reset();
        setTimeout(() => {
          formStatus = "idle";
        }, 5000);
      } else {
        formStatus = "error";
      }
    } catch (err) {
      formStatus = "error";
    }
  }
</script>

<svelte:head>
  <title>About — MATTIA CAPOMAGI</title>
</svelte:head>

<div class="about-container">
  <div class="about-content">
    <div class="bio-column">
      <p class="bio">
        {$language === "en" ? bio_en : bio_it}
      </p>

      <div class="social-links">
        {#each socials as social}
          <a
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            class="contact-link"
            aria-label={social.name}
          >
            <span class="link-text">{social.name}</span>
            <svg
              class="link-icon"
              viewBox={social.viewBox}
              width="24"
              height="24"
            >
              <path
                fill="currentColor"
                d={social.path}
                fill-rule={social.fillRule || "nonzero"}
              />
            </svg>
          </a>
        {/each}
      </div>
    </div>

    <!-- ... form column ... -->
    <div class="form-column">
      <!-- ... (keeping form content same as before) ... -->
      <h3 class="contact-header">
        {$language === "en" ? "get in touch with me" : "contattami"}
      </h3>
      <!-- ... form ... -->
      <form class="contact-form" onsubmit={handleSubmit} novalidate>
        <!-- ... inputs ... -->
        <input type="text" name="_honey" style="display:none" />
        <input type="hidden" name="_captcha" value="true" />
        <input
          type="hidden"
          name="_subject"
          value="New Contact from Portfolio"
        />

        <div class="form-group">
          <input
            type="text"
            name="name"
            class:input-error={formErrors.name}
            placeholder={formErrors.name
              ? $language === "en"
                ? "Required field"
                : "Campo obbligatorio"
              : $language === "en"
                ? "Name"
                : "Nome"}
            disabled={formStatus === "submitting"}
          />
        </div>
        <div class="form-group">
          <input
            type="email"
            name="email"
            class:input-error={formErrors.email}
            placeholder={formErrors.email
              ? $language === "en"
                ? "Required field"
                : "Campo obbligatorio"
              : "Email"}
            disabled={formStatus === "submitting"}
          />
        </div>
        <div class="form-group">
          <textarea
            name="message"
            rows="4"
            class:input-error={formErrors.message}
            placeholder={formErrors.message
              ? $language === "en"
                ? "Required field"
                : "Campo obbligatorio"
              : $language === "en"
                ? "Message"
                : "Messaggio"}
            disabled={formStatus === "submitting"}
          ></textarea>
        </div>

        <button type="submit" disabled={formStatus === "submitting"}>
          {#if formStatus === "submitting"}
            {$language === "en" ? "sending..." : "inviando..."}
          {:else}
            {$language === "en" ? "send" : "invia"}
          {/if}
        </button>

        {#if formStatus === "success"}
          <p class="success-message">
            {$language === "en"
              ? "Message sent successfully."
              : "Messaggio inviato con successo."}
          </p>
        {/if}

        {#if formStatus === "error"}
          <p class="error-message">
            {$language === "en"
              ? "Something went wrong. Please try again."
              : "Qualcosa è andato storto. Riprova."}
          </p>
        {/if}
      </form>
    </div>
  </div>
</div>

<style>
  /* ... existing styles ... */
  .about-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    min-height: 80vh;
    padding: 0;
  }

  .about-content {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: start;
    text-align: left;
  }

  .bio-column {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .bio {
    font-size: 1.3rem;
    font-weight: 400;
    line-height: 1.4;
    white-space: pre-line;
    text-align: justify;
  }

  .form-column {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 15px;
  }

  .contact-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  input,
  textarea {
    width: 100%;
    background: transparent;
    border: none;
    border-bottom: 1px solid var(--color-text);
    padding: 10px 0;
    font-family: inherit;
    font-size: 1.1rem;
    color: var(--color-text);
    outline: none;
    border-radius: 0;
    resize: none;
  }

  input:focus,
  textarea:focus {
    border-bottom-color: var(--color-accent);
  }

  input:disabled,
  textarea:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  .input-error::placeholder {
    color: red;
    opacity: 1;
  }

  button {
    background: none;
    border: none;
    text-align: left;
    padding: 10px 0;
    font-family: inherit;
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--color-text);
    cursor: pointer;
    text-transform: uppercase;
    transition: color 0.2s ease;
    align-self: flex-start;
  }

  .contact-header {
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--color-text);
    margin: 0;
    line-height: 1.4;
    text-transform: uppercase;
  }

  button:hover {
    color: var(--color-accent);
  }
  button:disabled {
    color: var(--color-border);
    cursor: not-allowed;
  }
  .success-message {
    color: var(--color-accent);
    font-size: 1rem;
    margin-top: -10px;
  }
  .error-message {
    color: red;
    font-size: 1rem;
    margin-top: -10px;
  }

  .social-links {
    display: flex;
    gap: 20px;
    align-items: center; /* Center icons */
  }

  .contact-link {
    font-size: 1.3rem;
    font-weight: 700;
    text-decoration: none;
    color: var(--color-text);
    transition: color 0.2s ease;
    display: flex;
    align-items: center;
  }

  .contact-link:hover {
    color: var(--color-accent);
  }

  .link-icon {
    display: none; /* Hidden by default on desktop */
  }

  .link-text {
    display: block; /* Shown by default on desktop */
  }

  @media (max-width: 768px) {
    .about-content {
      grid-template-columns: 1fr;
      gap: 60px; /* Adjusted gap */
    }

    .bio {
      font-size: 0.9rem;
    }
    .contact-header,
    button {
      font-size: 0.9rem;
    }
    input,
    textarea {
      font-size: 0.9rem;
    }

    /* Switch links to icons on mobile */
    .link-text {
      display: none;
    }
    .link-icon {
      display: block;
      width: 28px; /* Good touch size */
      height: 28px;
    }

    .contact-link {
      font-size: 0; /* Hide any fallback text spacing */
    }
  }

  @media (max-width: 480px) {
    .bio {
      font-size: 0.9rem;
    }
    /* ... rest ... */
  }
</style>
