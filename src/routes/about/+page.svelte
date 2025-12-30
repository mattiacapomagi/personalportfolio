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

  // TRANSLATION DICTIONARY (STRICT JSON)
  const translations = {
    it: {
      interception_title: "Messaggio pronto. Vuoi un preventivo più preciso?",
      interception_sub:
        "Rispondi a poche domande mirate per aiutarmi a capire il contesto.",
      btn_yes: "Sì, specifico il progetto",
      btn_no: "No, invia solo il messaggio",
      service_label: "Di cosa hai bisogno principalmente?",
      services: [
        { value: "branding", label: "Branding & Identità Visiva" },
        { value: "web", label: "Sito Web / UI Design" },
        { value: "social", label: "Social Media & Content" },
        { value: "editorial", label: "Editoriale & Stampa" },
        { value: "other", label: "Altro / Consulenza" },
      ],
      deadline_label: "Che tempistiche hai?",
      deadlines: [
        { value: "flexible", label: "Flessibile (Nessuna fretta)" },
        { value: "standard", label: "Standard (Entro 1 mese)" },
        { value: "fixed", label: "Data tassativa (Ho un evento/lancio)" },
        { value: "rush", label: "Urgente / Ieri (Priorità massima)" },
      ],
      budget_label: "Budget indicativo",
      budgets: [
        { value: "low", label: "< 1.000€ (Start)" },
        { value: "medium", label: "1.000€ - 3.000€" },
        { value: "high", label: "3.000€ - 5.000€" },
        { value: "premium", label: "> 5.000€" },
      ],
      questions: {
        branding: {
          q1: {
            label: "Stato attuale",
            placeholder: "Partiamo da zero o è un restyling?",
          },
          q2: {
            label: "Obiettivo principale",
            placeholder:
              "Es. Essere più professionali, posizionamento lusso...",
          },
          q3: {
            label: "Competitor",
            placeholder: "Chi ammiri o chi vuoi superare?",
          },
        },
        web: {
          q1: {
            label: "Tipologia sito",
            options: [
              "Landing Page",
              "Sito Vetrina",
              "E-commerce",
              "Portfolio",
            ],
          },
          q2: {
            label: "Contenuti (Testi/Foto)",
            options: ["Tutto pronto", "In lavorazione", "Da creare"],
          },
          q3: {
            label: "Link di riferimento",
            placeholder: "incolla qui un link...",
          },
        },
        social: {
          q1: { label: "Piattaforme", placeholder: "Instagram, TikTok..." },
          q2: { label: "Quantità", placeholder: "Es. 10 post/mese" },
          q3: { label: "Stile", placeholder: "Minimal, Pop..." },
        },
        editorial: {
          q1: { label: "Formato", placeholder: "Brochure, Catalogo..." },
          q2: { label: "Stampa", placeholder: "Hai già un tipografo?" },
        },
        other: {
          q1: { label: "Dettagli", placeholder: "Descrivi qui..." },
        },
      },
      buttons: { back: "Indietro", submit: "Invia Richiesta Completa" },
    },
    en: {
      interception_title: "Message ready. Want a precise quote?",
      interception_sub: "Answer a few quick questions to give me context.",
      btn_yes: "Yes, define project",
      btn_no: "No, just send",
      service_label: "What do you need primarily?",
      services: [
        { value: "branding", label: "Branding & Visual Identity" },
        { value: "web", label: "Web Design / UI" },
        { value: "social", label: "Social Media & Content" },
        { value: "editorial", label: "Editorial & Print" },
        { value: "other", label: "Other / Consultancy" },
      ],
      deadline_label: "What's your timeline?",
      deadlines: [
        { value: "flexible", label: "Flexible (No rush)" },
        { value: "standard", label: "Standard (Within 1 month)" },
        { value: "fixed", label: "Hard Deadline (Event/Launch)" },
        { value: "rush", label: "Urgent / Yesterday (High Priority)" },
      ],
      budget_label: "Estimated Budget",
      budgets: [
        { value: "low", label: "< €1k (Start)" },
        { value: "medium", label: "€1k - €3k" },
        { value: "high", label: "€3k - €5k" },
        { value: "premium", label: "> €5k" },
      ],
      questions: {
        branding: {
          q1: {
            label: "Current Status",
            placeholder: "From scratch or Rebranding?",
          },
          q2: {
            label: "Main Goal",
            placeholder: "E.g. Look premium, attract leads...",
          },
          q3: { label: "Competitors", placeholder: "Who do you admire/envy?" },
        },
        web: {
          q1: {
            label: "Scope",
            options: [
              "Landing Page",
              "Corporate Site",
              "E-commerce",
              "Portfolio",
            ],
          },
          q2: {
            label: "Content Status",
            options: ["Ready", "In progress", "To be created"],
          },
          q3: { label: "Benchmark Link", placeholder: "Paste a link here..." },
        },
        social: {
          q1: { label: "Platforms", placeholder: "Instagram, TikTok..." },
          q2: { label: "Volume", placeholder: "E.g. 10 posts/month" },
          q3: { label: "Style", placeholder: "Minimal, Pop..." },
        },
        editorial: {
          q1: { label: "Format", placeholder: "Brochure, Catalog..." },
          q2: { label: "Printing", placeholder: "Do you have a printer?" },
        },
        other: {
          q1: { label: "Details", placeholder: "Describe here..." },
        },
      },
      buttons: { back: "Back", submit: "Send Full Inquiry" },
    },
  };

  let formStep = $state("input"); // 'input', 'choice', 'details', 'submitting', 'success', 'error'
  let formErrors = $state({ name: false, email: false, message: false });

  // Data Storage
  let initialData = $state({});
  let projectDetails = $state({
    service: "",
    budget: "",
    timeline: "", // Used for strategic deadline
    specificDate: "", // Used if timeline is 'Specific Date'

    // Generic Dynamic Answers
    q1: "",
    q2: "",
    q3: "",
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
  // Step 2: Submit with Details
  async function handleFinalSubmit(e) {
    e.preventDefault();

    // Safety check for translation
    const t = translations[$language] || translations["en"];

    // Construct Payload based on Service Type
    let dynamicPayload = {};
    const s = projectDetails.service; // "branding", "web", etc.

    // 1. Map Generic Answers (q1, q2, q3) to Specific Labels from Dictionary
    const questionsDef = t.questions[s];
    if (questionsDef) {
      if (questionsDef.q1 && projectDetails.q1)
        dynamicPayload[questionsDef.q1.label] = projectDetails.q1;
      if (questionsDef.q2 && projectDetails.q2)
        dynamicPayload[questionsDef.q2.label] = projectDetails.q2;
      if (questionsDef.q3 && projectDetails.q3)
        dynamicPayload[questionsDef.q3.label] = projectDetails.q3;
    }

    // 2. Deadline Logic
    let finalDeadline = projectDetails.timeline;
    // Map value 'fixed' to readable label if possible
    const deadlineObj = t.deadlines.find(
      (d) => d.value === projectDetails.timeline
    );
    if (deadlineObj) finalDeadline = deadlineObj.label;

    if (projectDetails.timeline === "fixed") {
      finalDeadline = `Fixed Date: ${projectDetails.specificDate}`;
    }
    if (projectDetails.timeline === "rush" && projectDetails.rushDays) {
      finalDeadline = `RUSH (${projectDetails.rushDays} days)`;
    }

    // 3. INTERNAL QUOTE CALCULATION
    const estimate = calculateQuote(projectDetails);

    // 4. TIMESTAMP (ROME)
    const nowIT = new Date().toLocaleString("it-IT", {
      timeZone: "Europe/Rome",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

    // Map Budget Value to Label
    let finalBudget = projectDetails.budget;
    const budgetObj = t.budgets.find((b) => b.value === projectDetails.budget);
    if (budgetObj) finalBudget = budgetObj.label;

    const combinedData = {
      ...initialData,
      Service: s ? s.toUpperCase() : "Not Specified",
      Budget: finalBudget || "Not Specified",
      Deadline: finalDeadline || "Not Specified",

      "----------------": "----------------",
      ...dynamicPayload,

      "---------------- ": "----------------",
      "*** ESTIMATED RANGE ***": estimate,
      "[SUBMITTED AT]": nowIT,
    };

    await submitFinalData(combinedData);
  }

  // Helper Quote Calculator
  function calculateQuote(details) {
    if (!details.service) return "N/A";
    const hourlyRate = 30;
    let baseHours = 0;
    let addons = 0;
    let multiplier = 1.0;

    switch (
      details.service // lowercase keys
    ) {
      case "branding":
        baseHours = 20;
        break;
      case "web":
        baseHours = 30;
        break;
      case "social":
        baseHours = 10;
        break;
      case "editorial":
        baseHours = 5;
        break;
      case "other":
        baseHours = 5;
        break;
    }

    // Simple heuristic for addons based on text content of answers
    // We check q1, q2, q3 strings
    const allAnswers =
      `${details.q1} ${details.q2} ${details.q3}`.toLowerCase();
    if (details.service === "web" && allAnswers.includes("e-commerce"))
      addons += 15;
    if (details.service === "social" && allAnswers.includes("20")) addons += 10;

    switch (details.timeline) {
      case "rush":
        // Dynamic Rush Multiplier
        multiplier = 1.5; // Default
        if (details.rushDays) {
          const days = parseInt(details.rushDays);
          if (!isNaN(days)) {
            if (days <= 2)
              multiplier = 2.0; // Extreme
            else if (days <= 5)
              multiplier = 1.5; // Standard
            else multiplier = 1.2; // Manageable
          }
        }
        break;
      case "fixed":
        multiplier = 1.2;
        break;
      default:
        multiplier = 1.0;
    }

    const totalHours = baseHours + addons;
    const min = Math.round(totalHours * hourlyRate * multiplier);
    const max = Math.round(min * 1.2);

    return `€${min} - €${max} (Est: ${totalHours}h, x${multiplier})`;
  }

  // Submitter
  async function submitFinalData(dataObject) {
    formStep = "submitting";

    // Convert object to FormData for FormSubmit
    const formData = new FormData();
    formData.append("_captcha", "false");
    formData.append("_template", "table");
    formData.append(
      "_subject",
      `New Lead: ${dataObject.name} (${dataObject.Service})`
    );
    // Note: FormSubmit sends auto-response to the 'email' field by default if not disabled.

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
          <!-- STEP 2: PROJECT DETAILS -->
        {:else if formStep === "details"}
          <form
            class="contact-form details-form"
            onsubmit={handleFinalSubmit}
            in:slide
          >
            <!-- SERVICE TYPE -->
            <div class="form-group">
              <label>{translations[$language].service_label}</label>
              <select bind:value={projectDetails.service}>
                <option value="" disabled selected
                  >{$language === "en" ? "Select..." : "Seleziona..."}</option
                >
                {#each translations[$language].services as s}
                  <option value={s.value}>{s.label}</option>
                {/each}
              </select>
            </div>

            <!-- DYNAMIC QUESTIONS -->
            {#if projectDetails.service && translations[$language].questions[projectDetails.service]}
              {@const qs =
                translations[$language].questions[projectDetails.service]}

              <div class="dynamic-group" in:slide>
                <!-- Q1 -->
                {#if qs.q1}
                  <div class="form-group">
                    <label>{qs.q1.label}</label>
                    {#if qs.q1.options}
                      <select bind:value={projectDetails.q1}>
                        {#each qs.q1.options as opt}
                          <option value={opt}>{opt}</option>
                        {/each}
                      </select>
                    {:else}
                      <input
                        type="text"
                        placeholder={qs.q1.placeholder}
                        bind:value={projectDetails.q1}
                      />
                    {/if}
                  </div>
                {/if}

                <!-- Q2 -->
                {#if qs.q2}
                  <div class="form-group">
                    <label>{qs.q2.label}</label>
                    {#if qs.q2.options}
                      <select bind:value={projectDetails.q2}>
                        {#each qs.q2.options as opt}
                          <option value={opt}>{opt}</option>
                        {/each}
                      </select>
                    {:else}
                      <input
                        type="text"
                        placeholder={qs.q2.placeholder}
                        bind:value={projectDetails.q2}
                      />
                    {/if}
                  </div>
                {/if}

                <!-- Q3 -->
                {#if qs.q3}
                  <div class="form-group">
                    <label>{qs.q3.label}</label>
                    <input
                      type="text"
                      placeholder={qs.q3.placeholder}
                      bind:value={projectDetails.q3}
                    />
                  </div>
                {/if}
              </div>
            {/if}

            <!-- BUDGET -->
            <div class="form-group">
              <label>{translations[$language].budget_label}</label>
              <select bind:value={projectDetails.budget}>
                <option value="" disabled selected
                  >{$language === "en"
                    ? "Select Range..."
                    : "Seleziona Range..."}</option
                >
                {#each translations[$language].budgets as b}
                  <option value={b.value}>{b.label}</option>
                {/each}
              </select>
            </div>

            <!-- DEADLINE -->
            <div class="form-group">
              <label>{translations[$language].deadline_label}</label>
              <div class="radio-group-vertical">
                {#each translations[$language].deadlines as d}
                  <label class="radio-label">
                    <input
                      type="radio"
                      bind:group={projectDetails.timeline}
                      value={d.value}
                    />
                    <span class="radio-text">{d.label}</span>
                  </label>
                {/each}
              </div>
            </div>

            <!-- Conditional Rush Days input -->
            {#if projectDetails.timeline === "rush"}
              <div class="form-group" in:slide>
                <label
                  style="font-size: 0.9em; margin-bottom: 5px; opacity: 0.8;"
                >
                  {translations[$language].rush_days_label}
                </label>
                <input
                  type="number"
                  min="1"
                  placeholder="Es. 2"
                  bind:value={projectDetails.rushDays}
                />
              </div>
            {/if}

            <!-- Conditional Date Picker (logic fixed) -->

            <button type="submit">
              {translations[$language].buttons.submit}
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
