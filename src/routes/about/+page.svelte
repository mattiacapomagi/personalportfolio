<script>
  import { language } from "$lib/stores/language.js";
  import { fade, slide } from "svelte/transition";
  import { quintOut } from "svelte/easing";

  const bio_en = `Rome based, 23 years old graphic designer focused on building strong and adaptive brand identities. I don’t believe in limiting myself to a single aesthetic; my approach is fluid, navigating the wide space between precise minimalism and raw brutalism depending on what the project really needs.

Typography is a fundamental pillar of my work. I love experimenting with type design and lettering, treating letters as structural elements that give a specific voice to every concept.

At the same time, I embrace technology to break boundaries. I use artificial intelligence as a dedicated laboratory for experimentation, a tool that allows me to explore new visual territories and generate ideas that go beyond traditional methods.`;

  const bio_it = `Graphic designer romano di 23 anni, concentrato sulla creazione di identità di marca solide e adattive. Non credo nel limitarmi a un'unica estetica; il mio approccio è fluido, navigando l'ampio spazio tra il minimalismo preciso e il brutalismo grezzo a seconda di ciò che il progetto richiede veramente.

La tipografia è un pilastro fondamentale del mio lavoro. Amo sperimentare con il type design e il lettering, trattando le lettere come elementi strutturali che danno una voce specifica a ogni concetto.

Allo stesso tempo, abbraccio la tecnologia per superare i confini. Uso l'intelligenza artificiale come un laboratorio dedicato alla sperimentazione, uno strumento che mi permette di esplorare nuovi territori visivi e generare idee che vanno oltre i metodi tradizionali.`;

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
      viewBox: "-200 -200 2900 2900",
      content: `<path d="M1419.3,2462.2c596.9,0,1080.7-467.1,1080.7-1043.3S2016.1,375.6,1419.3,375.6,338.5,842.7,338.5,1418.9s483.9,1043.3,1080.8,1043.3Z" fill="currentColor"/><path d="M1140.3,2243.6c627.8,0,1140.3-491.8,1140.3-1102.9S1768.1,37.8,1140.3,37.8,0,529.6,0,1140.7s512.6,1102.9,1140.3,1102.9Z" fill="#fff" stroke="#000" stroke-width="11.8" stroke-miterlimit="30.2"/><path d="M1054.6,1697.1c-319.1,0-506.9-257.9-506.9-578.6s206.5-603.8,600.7-603.8,544.4,276.7,550.7,434h-294.1c-6.3-88-81.3-220.1-262.8-220.1s-319.1,169.8-319.1,377.4,125.2,377.4,319.1,377.4,250.3-138.4,281.6-276.7h-281.6v-113.2h590.9v578.6h-259.2v-364.8c-18.8,132.1-100.1,389.9-419.3,389.9h0Z" fill="currentColor"/>`,
    },
    {
      name: "Linkedin",
      url: "https://www.linkedin.com/in/mattia-capomagi-461386221/",
      viewBox: "0 0 24 24",
      path: "M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z",
    },
  ];

  /* --- PROGRESSIVE FORM LOGIC --- */
  let formStep = $state("input"); // 'input', 'choice', 'details', 'submitting', 'success', 'error'
  let formErrors = $state({ name: false, email: false, message: false });

  // Data Storage
  let initialData = $state({});
  let projectDetails = $state({
    service: "",
    budget: "",
    timeline: "", // Used for strategic deadline
    specificDate: "", // Used if timeline is 'Specific Date'

    // Dynamic Fields
    brandingVibe: "",
    brandingCompetitors: "",
    brandingMedium: "",

    webScope: [], // ['Landing', 'Ecom', etc]
    webContent: "",
    webBenchmark: "",

    photoQty: "",
    photoRights: "",
    photoMood: "",

    otherDetails: "",
  });

  // Deadline Options
  const deadlineOptions = [
    "Flexible",
    "Within 1 month",
    "Specific Date",
    "ASAP (Rush)",
  ];

  // Step 1: Validate Basic Info & Show Choice
  function handleInitialSubmit(e) {
    e.preventDefault();
    formErrors = { name: false, email: false, message: false };

    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    let isValid = true;
    if (!name) {
      formErrors.name = true;
      isValid = false;
    }
    if (!email) {
      formErrors.email = true;
      isValid = false;
    }
    if (!message) {
      formErrors.message = true;
      isValid = false;
    }

    if (!isValid) {
      setTimeout(
        () => (formErrors = { name: false, email: false, message: false }),
        3000
      );
      return;
    }

    // Save Data & Move to Choice
    initialData = { name, email, message };
    formStep = "choice";
  }

  // Option B: Quick Send
  async function handleQuickSend() {
    await submitFinalData(initialData);
  }

  // Option A: Deep Dive
  function handleDeepDive() {
    formStep = "details";
  }

  // Step 2: Submit with Details
  // Step 2: Submit with Details
  async function handleFinalSubmit(e) {
    e.preventDefault();

    // Construct Payload based on Service Type
    let dynamicPayload = {};
    const s = projectDetails.service;

    if (s === "Branding") {
      dynamicPayload = {
        "Current vs Desired Vibe": projectDetails.brandingVibe,
        Competitors: projectDetails.brandingCompetitors,
        "Primary Medium": projectDetails.brandingMedium,
      };
    } else if (s === "Web Design") {
      dynamicPayload = {
        Scope: projectDetails.webScope.join(", "),
        "Content Ready?": projectDetails.webContent,
        "Benchmark URL": projectDetails.webBenchmark,
      };
    } else if (s === "Motion" || s === "Editorial") {
      // Using Photo/Editorial logic
      dynamicPayload = {
        "Asset Qty": projectDetails.photoQty,
        "Usage Rights": projectDetails.photoRights,
        "Mood/Style": projectDetails.photoMood,
      };
    } else if (s === "Other") {
      dynamicPayload = {
        Details: projectDetails.otherDetails,
      };
    }

    // Deadline Logic
    let finalDeadline = projectDetails.timeline;
    if (projectDetails.timeline === "Specific Date") {
      finalDeadline = `Specific Date: ${projectDetails.specificDate}`;
    }

    const combinedData = {
      ...initialData,
      "Service Type": projectDetails.service || "Not Specified",
      "Budget Override": projectDetails.budget || "Not Specified",
      "Strategic Deadline": finalDeadline || "Not Specified",
      ...dynamicPayload,
    };

    await submitFinalData(combinedData);
  }

  // Submitter
  async function submitFinalData(dataObject) {
    formStep = "submitting";

    // Convert object to FormData for FormSubmit
    const formData = new FormData();
    formData.append("_captcha", "true");
    formData.append("_subject", "New Contact from Portfolio");

    for (const [key, value] of Object.entries(dataObject)) {
      formData.append(key, value);
    }

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/mattia.capomagi@gmail.com",
        {
          method: "POST",
          body: formData,
          headers: { Accept: "application/json" },
        }
      );

      if (response.ok) {
        formStep = "success";
        // Reset after delay
        setTimeout(() => {
          formStep = "input";
          initialData = {};
          // Reset all details
          projectDetails = {
            service: "",
            budget: "",
            timeline: "",
            specificDate: "",
            brandingVibe: "",
            brandingCompetitors: "",
            brandingMedium: "",
            webScope: [],
            webContent: "",
            webBenchmark: "",
            photoQty: "",
            photoRights: "",
            photoMood: "",
            otherDetails: "",
          };
        }, 5000);
      } else {
        formStep = "error";
      }
    } catch (err) {
      formStep = "error";
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
              {#if social.content}
                {@html social.content}
              {:else}
                <path
                  fill="currentColor"
                  d={social.path}
                  fill-rule={social.fillRule || "nonzero"}
                />
              {/if}
            </svg>
          </a>
        {/each}
      </div>
    </div>

    <!-- ... form column ... -->
    <div class="form-column">
      <h3 class="contact-header">
        {$language === "en" ? "get in touch with me" : "contattami"}
      </h3>

      <!-- PROGRESSIVE FORM CONTAINER -->
      <div class="form-wrapper">
        <!-- STEP 1: BASIC INPUT -->
        {#if formStep === "input"}
          <form
            class="contact-form"
            onsubmit={handleInitialSubmit}
            novalidate
            in:fade
          >
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
              ></textarea>
            </div>
            <button type="submit">
              {$language === "en" ? "next" : "avanti"}
            </button>
          </form>

          <!-- INTERSTITIAL CHOICE -->
        {:else if formStep === "choice"}
          <div class="choice-ui" in:fade={{ duration: 300 }}>
            <p class="choice-text">
              {$language === "en"
                ? "Message ready. Want to make your inquiry more effective?"
                : "Messaggio pronto. Vuoi rendere la tua richiesta più efficace?"}
            </p>
            <div class="choice-buttons">
              <button class="btn-primary" onclick={handleDeepDive}>
                {$language === "en"
                  ? "Yes, define the project"
                  : "Sì, definisci il progetto"}
              </button>
              <button class="btn-secondary" onclick={handleQuickSend}>
                {$language === "en" ? "No, send as is" : "No, invia così"}
              </button>
            </div>
          </div>

          <!-- STEP 2: PROJECT DETAILS -->
        {:else if formStep === "details"}
          <form
            class="contact-form details-form"
            onsubmit={handleFinalSubmit}
            in:slide
          >
            <!-- SERVICE TYPE -->
            <div class="form-group">
              <label
                >{$language === "en"
                  ? "Service Type"
                  : "Tipo di Servizio"}</label
              >
              <select bind:value={projectDetails.service}>
                <option value="" disabled selected
                  >{$language === "en" ? "Select..." : "Seleziona..."}</option
                >
                <option value="Branding">Branding / Identity</option>
                <option value="Web Design">Web Design / UI</option>
                <option value="Motion">Photo / Video / Motion</option>
                <option value="Other">Other (General)</option>
              </select>
            </div>

            <!-- DYNAMIC FIELDS BASED ON SERVICE -->
            {#if projectDetails.service === "Branding"}
              <div class="dynamic-group" in:slide>
                <div class="form-group">
                  <textarea
                    placeholder={$language === "en"
                      ? "Current Vibe vs Desired Vibe..."
                      : "Vibe Attuale vs Vibe Desiderata..."}
                    rows="2"
                    bind:value={projectDetails.brandingVibe}
                  ></textarea>
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    placeholder={$language === "en"
                      ? "Top 3 Competitors"
                      : "Top 3 Competitors"}
                    bind:value={projectDetails.brandingCompetitors}
                  />
                </div>
                <div class="form-group">
                  <label
                    >{$language === "en"
                      ? "Primary Medium"
                      : "Supporto Principale"}</label
                  >
                  <select bind:value={projectDetails.brandingMedium}>
                    <option value="Digital">Digital First</option>
                    <option value="Print">Print / Packaging</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
              </div>
            {:else if projectDetails.service === "Web Design"}
              <div class="dynamic-group" in:slide>
                <div class="form-group checkbox-group">
                  <label
                    >{$language === "en"
                      ? "Project Scope"
                      : "Scopo del Progetto"}</label
                  >
                  <div class="checkbox-row">
                    <label class="checkbox-label"
                      ><input
                        type="checkbox"
                        bind:group={projectDetails.webScope}
                        value="Landing Page"
                      /> Landing</label
                    >
                    <label class="checkbox-label"
                      ><input
                        type="checkbox"
                        bind:group={projectDetails.webScope}
                        value="Corporate Site"
                      /> Corporate</label
                    >
                    <label class="checkbox-label"
                      ><input
                        type="checkbox"
                        bind:group={projectDetails.webScope}
                        value="E-commerce"
                      /> E-com</label
                    >
                  </div>
                </div>
                <div class="form-group">
                  <label
                    >{$language === "en"
                      ? "Content Readiness"
                      : "Stato Contenuti"}</label
                  >
                  <select bind:value={projectDetails.webContent}>
                    <option value="Ready">Ready (Copy & Images)</option>
                    <option value="In Progress">In Progress</option>
                    <option value="None">Starting from scratch</option>
                  </select>
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    placeholder={$language === "en"
                      ? "Benchmark Link (Site you admire)"
                      : "Link Benchmark (Sito che ammiri)"}
                    bind:value={projectDetails.webBenchmark}
                  />
                </div>
              </div>
            {:else if projectDetails.service === "Motion"}
              <div class="dynamic-group" in:slide>
                <div class="form-group">
                  <input
                    type="text"
                    placeholder={$language === "en"
                      ? "Est. Quantity of Assets"
                      : "Quantità stimata asset"}
                    bind:value={projectDetails.photoQty}
                  />
                </div>
                <div class="form-group">
                  <label
                    >{$language === "en"
                      ? "Usage Rights"
                      : "Diritti Utilizzo"}</label
                  >
                  <select bind:value={projectDetails.photoRights}>
                    <option value="Social">Social Only</option>
                    <option value="Web">Web / Digital</option>
                    <option value="Advertising">Advertising / Billboard</option>
                  </select>
                </div>
                <div class="form-group">
                  <textarea
                    placeholder={$language === "en"
                      ? "Mood / Style Reference..."
                      : "Riferimento Mood / Stile..."}
                    rows="2"
                    bind:value={projectDetails.photoMood}
                  ></textarea>
                </div>
              </div>
            {:else if projectDetails.service === "Other"}
              <div class="dynamic-group" in:slide>
                <div class="form-group">
                  <textarea
                    placeholder={$language === "en"
                      ? "Tell me more about your needs..."
                      : "Dimmi di più..."}
                    rows="4"
                    bind:value={projectDetails.otherDetails}
                  ></textarea>
                </div>
              </div>
            {/if}

            <div class="form-group">
              <label>Budget (EUR)</label>
              <select bind:value={projectDetails.budget}>
                <option value="" disabled selected
                  >{$language === "en"
                    ? "Select Range..."
                    : "Seleziona Range..."}</option
                >
                <option value="< 1k">&lt; 1.000 €</option>
                <option value="1k - 3k">1.000 € - 3.000 €</option>
                <option value="3k - 5k">3.000 € - 5.000 €</option>
                <option value="5k - 10k">5.000 € - 10.000 €</option>
                <option value="> 10k">&gt; 10.000 €</option>
              </select>
            </div>

            <!-- STRATEGIC DEADLINE -->
            <div class="form-group">
              <label>{$language === "en" ? "Deadline" : "Deadline"}</label>
              <div class="radio-group-vertical">
                {#each deadlineOptions as opt}
                  <label class="radio-label">
                    <input
                      type="radio"
                      bind:group={projectDetails.timeline}
                      value={opt}
                    />
                    <span class="radio-text">
                      {#if opt === "Flexible"}
                        {$language === "en"
                          ? "Flexible (Standard Rate)"
                          : "Flessibile (Tariffa Standard)"}
                      {:else if opt === "Within 1 month"}
                        {$language === "en" ? "Within 1 month" : "Entro 1 mese"}
                      {:else if opt === "Specific Date"}
                        {$language === "en"
                          ? "Specific Hard Deadline"
                          : "Data Specifica"}
                      {:else if opt === "ASAP (Rush)"}
                        {$language === "en"
                          ? "ASAP (Rush Fee likely)"
                          : "ASAP (Possibile Rush Fee)"}
                      {/if}
                    </span>
                  </label>
                {/each}
              </div>
            </div>

            {#if projectDetails.timeline === "Specific Date"}
              <div class="form-group" in:slide>
                <input type="date" bind:value={projectDetails.specificDate} />
              </div>
            {/if}

            <button type="submit">
              {$language === "en" ? "send request" : "invia richiesta"}
            </button>
          </form>

          <!-- SUBMITTING / SUCCESS / ERROR -->
        {:else if formStep === "submitting"}
          <div class="loading-ui">
            {$language === "en" ? "sending..." : "inviando..."}
          </div>
        {:else if formStep === "success"}
          <p class="success-message" in:fade>
            {$language === "en"
              ? "Message sent successfully."
              : "Messaggio inviato con successo."}
          </p>
        {:else if formStep === "error"}
          <p class="error-message" in:fade>
            {$language === "en"
              ? "Something went wrong. Please try again."
              : "Qualcosa è andato storto. Riprova."}
          </p>
          <button onclick={() => (formStep = "input")}>Retry</button>
        {/if}
      </div>
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
    border: 1px solid var(--color-text);
    text-align: center;
    padding: 10px 20px;
    font-family: inherit;
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--color-text);
    cursor: pointer;
    text-transform: uppercase;
    transition: all 0.2s ease;
    align-self: flex-start;
  }

  .contact-header {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-text);
    margin: 0;
    line-height: 1.4;
    text-transform: uppercase;
  }

  button:hover {
    background: var(--color-text);
    color: var(--color-bg);
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

    /* Compress form on mobile */
    .contact-form {
      gap: 12px;
    }

    .form-group {
      gap: 4px;
    }

    input,
    textarea {
      padding: 8px 0;
    }

    textarea {
      min-height: 60px;
    }

    .contact-header {
      font-size: 1.1rem;
    }

    button {
      padding: 8px 16px;
      font-size: 0.9rem;
    }
  }

  /* SELECT INPUT STYLES */
  select {
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
    appearance: none; /* Remove default arrow */
    cursor: pointer;
  }

  label {
    font-size: 0.8rem;
    opacity: 0.6;
    text-transform: uppercase;
  }

  /* CHOICE UI */
  .choice-ui {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px 0;
  }

  .choice-text {
    font-size: 1.2rem;
    line-height: 1.4;
  }

  .choice-buttons {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  .btn-primary {
    background: var(--color-text);
    color: var(--color-bg);
    border: 1px solid var(--color-text);
  }
  .btn-primary:hover {
    background: transparent;
    color: var(--color-text);
  }

  .btn-secondary {
    background: transparent;
    color: var(--color-text);
    border: 1px solid var(--color-text);
    opacity: 0.7;
  }
  .btn-secondary:hover {
    opacity: 1;
    background: rgba(128, 128, 128, 0.1);
  }

  .form-wrapper {
    width: 100%;
    min-height: 400px; /* Increased prevent layout shift */
  }

  .dynamic-group {
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding-left: 10px;
    border-left: 2px solid var(--color-accent);
    margin-bottom: 20px;
  }

  /* RADIO STYLES */
  .radio-group-vertical {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .radio-label {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    font-size: 1rem;
    opacity: 0.8;
    transition: opacity 0.2s;
  }
  .radio-label:hover {
    opacity: 1;
  }

  input[type="radio"] {
    appearance: none;
    width: 16px;
    height: 16px;
    border: 1px solid var(--color-text);
    border-radius: 50%;
    outline: none;
    margin: 0;
    padding: 0;
    position: relative;
  }

  input[type="radio"]:checked {
    background: var(--color-text);
  }

  .checkbox-row {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
  }

  .checkbox-label {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 0.9rem;
  }

  input[type="checkbox"] {
    width: 14px;
    height: 14px;
    border: 1px solid var(--color-text);
    appearance: none;
    border-radius: 0; /* Square */
    margin: 0;
    padding: 0;
  }
  input[type="checkbox"]:checked {
    background: var(--color-text);
  }

  @media (max-width: 480px) {
    .bio {
      font-size: 0.9rem;
    }
    .choice-buttons {
      flex-direction: column;
    }
    .checkbox-row {
      flex-direction: column;
      gap: 8px;
    }
  }
</style>
