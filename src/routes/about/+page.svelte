<script>
  import { language } from "$lib/stores/language";

  const bio_en = `Rome based, 23 years old graphic designer focused on building strong and adaptive brand identities. I don’t believe in limiting myself to a single aesthetic; my approach is fluid, navigating the wide space between precise minimalism and raw brutalism depending on what the project really needs.

Typography is a fundamental pillar of my work. I love experimenting with type design and lettering, treating letters as structural elements that give a specific voice to every concept.

At the same time, I embrace technology to break boundaries. I use artificial intelligence as a dedicated laboratory for experimentation, a tool that allows me to explore new visual territories and generate ideas that go beyond traditional methods.`;

  const bio_it = `Graphic designer di 23 anni con base a Roma, focalizzato sulla costruzione di brand identity forti e adattive. Non credo nel limitarmi a un’unica estetica; il mio approccio è fluido e naviga l'ampio spazio tra un minimalismo preciso e un brutalismo crudo, a seconda di ciò che serve davvero al progetto.

La tipografia è un pilastro fondamentale del mio lavoro. Amo sperimentare con il type design e il lettering, trattando le lettere come elementi strutturali che danno una voce specifica a ogni concetto.

Allo stesso tempo, accolgo la tecnologia per superare i confini. Uso l'intelligenza artificiale come un laboratorio dedicato alla sperimentazione, uno strumento che mi permette di esplorare nuovi territori visivi e generare idee che vanno oltre i metodi tradizionali.`;
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
        <a
          href="https://www.instagram.com/mattiacapomagi"
          target="_blank"
          rel="noopener noreferrer"
          class="contact-link">Instagram</a
        >
        <a
          href="https://www.linkedin.com/in/mattia-capomagi-461386221/"
          target="_blank"
          rel="noopener noreferrer"
          class="contact-link">Linkedin</a
        >
      </div>
    </div>

    <div class="form-column">
      <h3 class="contact-header">
        {$language === "en" ? "get in touch with me" : "contattami"}
      </h3>

      <form class="contact-form" onsubmit={handleSubmit} novalidate>
        <!-- Honey pot to avoid spam -->
        <input type="text" name="_honey" style="display:none" />

        <!-- Enable captcha (invisible by default on AJAX, filters spam) -->
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
  .about-container {
    display: flex;
    justify-content: flex-start; /* Aligned left to the page structure */
    align-items: center;
    min-height: 80vh;
    padding: 0; /* Removing padding to align with Header (global padding applies) */
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
    text-align: justify; /* Justified per user request */
  }

  /* Fix for justified text last line handling if needed, but usually default is left */

  .form-column {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 15px; /* Reduced gap per user request */
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

  /* Error state styling */
  .input-error::placeholder {
    color: red; /* Or accent color, but red is clearer for errors */
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
    text-transform: uppercase; /* Capslock per user request */
    transition: color 0.2s ease;
    align-self: flex-start;
  }

  .contact-header {
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--color-text);
    margin: 0;
    line-height: 1.4;
    text-transform: uppercase; /* Uppercase header */
  }

  button:hover {
    color: var(--color-accent);
  }

  button:disabled {
    color: var(--color-border);
    cursor: not-allowed;
  }

  .success-message {
    color: var(--color-accent); /* Or green, but accent fits brand */
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
    /* margin-top: 10px; */
  }

  .contact-link {
    font-size: 1.3rem;
    font-weight: 700;
    text-decoration: none;
    color: var(--color-text);
    transition: color 0.2s ease;
  }

  .contact-link:hover {
    color: var(--color-accent);
  }

  /* Mobile Responsive - Moved to end for proper cascade */
  @media (max-width: 768px) {
    .about-content {
      grid-template-columns: 1fr;
      gap: 80px; /* Increased separation between Bio and Form */
    }

    .bio {
      font-size: 0.9rem;
    }

    .contact-link,
    .contact-header,
    button {
      font-size: 0.9rem;
    }

    input,
    textarea {
      font-size: 0.9rem;
    }
  }

  @media (max-width: 480px) {
    .bio {
      font-size: 0.9rem;
    }

    .contact-link,
    .contact-header,
    button {
      font-size: 0.9rem;
    }
  }
</style>
