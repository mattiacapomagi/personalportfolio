import { _ as head, W as store_get, Z as ensure_array_like, U as attr, V as attr_class, X as unsubscribe_stores } from "../../../chunks/index2.js";
import { l as language } from "../../../chunks/language.js";
import { e as escape_html } from "../../../chunks/context.js";
function _page($$renderer) {
  var $$store_subs;
  const bio_en = `Rome based, 23 years old graphic designer focused on building strong and adaptive brand identities. I don’t believe in limiting myself to a single aesthetic; my approach is fluid, navigating the wide space between precise minimalism and raw brutalism depending on what the project really needs.

Typography is a fundamental pillar of my work. I love experimenting with type design and lettering, treating letters as structural elements that give a specific voice to every concept.

At the same time, I embrace technology to break boundaries. I use artificial intelligence as a dedicated laboratory for experimentation, a tool that allows me to explore new visual territories and generate ideas that go beyond traditional methods.`;
  const socials = [
    {
      name: "Instagram",
      url: "https://www.instagram.com/mattiacapomagi",
      viewBox: "0 0 24 24",
      path: "M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M18,5A1,1 0 0,1 19,6A1,1 0 0,1 18,7A1,1 0 0,1 17,6A1,1 0 0,1 18,5Z"
    },
    {
      name: "Gumroad",
      url: "https://mattiacapomagi.gumroad.com/",
      viewBox: "0 0 24 24",
      /* Simple shopping bag icon for clear "Store" meaning, or generic link if preferred. User asked for "Gumroad", I'll use a recognized Store icon or the G logo if confident. Let's use a clear "Store/Bag" icon or a G. The Gumroad logo is distinct. I will use the actual Gumroad 'G' logo path found in Simple Icons or similar. */
      path: "M15.344 3.033c-2.14 0-2.834.02-3.18.067-2.615 1.583-2.61 1.583-2.61 1.583s-4.575 1.776-4.575 7.027c0 4.254 3.654 4.887 4.717 4.887 1.536 0 3.33-.518 3.858-1.58 0 0 0 3.553-2.613 3.553-2.316 0-3.418-1.543-3.92-2.5l-3.323 1.167C5.32 20.373 8.35 21 9.947 21c5.212 0 6.772-4.04 6.772-8.52V5.11s3.71-1.002 3.71-2.076H15.344M9.993 14.507c-1.22 0-2.327-.55-2.327-2.583 0-2.503 1.488-3.085 2.502-3.085 1.353 0 2.223.75 2.223 2.723 0 2.14-1.357 2.945-2.398 2.945"
    },
    {
      name: "Linkedin",
      url: "https://www.linkedin.com/in/mattia-capomagi-461386221/",
      viewBox: "0 0 24 24",
      path: "M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
    }
  ];
  head("cwls5q", $$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>About — MATTIA CAPOMAGI</title>`);
    });
  });
  $$renderer.push(`<div class="about-container svelte-cwls5q"><div class="about-content svelte-cwls5q"><div class="bio-column svelte-cwls5q"><p class="bio svelte-cwls5q">${escape_html(store_get($$store_subs ??= {}, "$language", language) === "en" ? bio_en : bio_it)}</p> <div class="social-links svelte-cwls5q"><!--[-->`);
  const each_array = ensure_array_like(socials);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let social = each_array[$$index];
    $$renderer.push(`<a${attr("href", social.url)} target="_blank" rel="noopener noreferrer" class="contact-link svelte-cwls5q"${attr("aria-label", social.name)}><span class="link-text svelte-cwls5q">${escape_html(social.name)}</span> <svg class="link-icon svelte-cwls5q"${attr("viewBox", social.viewBox)} width="24" height="24"><path fill="currentColor"${attr("d", social.path)}></path></svg></a>`);
  }
  $$renderer.push(`<!--]--></div></div> <div class="form-column svelte-cwls5q"><h3 class="contact-header svelte-cwls5q">${escape_html(store_get($$store_subs ??= {}, "$language", language) === "en" ? "get in touch with me" : "contattami")}</h3> <form class="contact-form svelte-cwls5q" novalidate><input type="text" name="_honey" style="display:none" class="svelte-cwls5q"/> <input type="hidden" name="_captcha" value="true" class="svelte-cwls5q"/> <input type="hidden" name="_subject" value="New Contact from Portfolio" class="svelte-cwls5q"/> <div class="form-group svelte-cwls5q"><input type="text" name="name"${attr("placeholder", formErrors.name ? store_get($$store_subs ??= {}, "$language", language) === "en" ? "Required field" : "Campo obbligatorio" : store_get($$store_subs ??= {}, "$language", language) === "en" ? "Name" : "Nome")}${attr("disabled", formStatus === "submitting", true)}${attr_class("svelte-cwls5q", void 0, { "input-error": formErrors.name })}/></div> <div class="form-group svelte-cwls5q"><input type="email" name="email"${attr("placeholder", formErrors.email ? store_get($$store_subs ??= {}, "$language", language) === "en" ? "Required field" : "Campo obbligatorio" : "Email")}${attr("disabled", formStatus === "submitting", true)}${attr_class("svelte-cwls5q", void 0, { "input-error": formErrors.email })}/></div> <div class="form-group svelte-cwls5q"><textarea name="message" rows="4"${attr("placeholder", formErrors.message ? store_get($$store_subs ??= {}, "$language", language) === "en" ? "Required field" : "Campo obbligatorio" : store_get($$store_subs ??= {}, "$language", language) === "en" ? "Message" : "Messaggio")}${attr("disabled", formStatus === "submitting", true)}${attr_class("svelte-cwls5q", void 0, { "input-error": formErrors.message })}></textarea></div> <button type="submit"${attr("disabled", formStatus === "submitting", true)} class="svelte-cwls5q">`);
  if (formStatus === "submitting") {
    $$renderer.push("<!--[-->");
    $$renderer.push(`${escape_html(store_get($$store_subs ??= {}, "$language", language) === "en" ? "sending..." : "inviando...")}`);
  } else {
    $$renderer.push("<!--[!-->");
    $$renderer.push(`${escape_html(store_get($$store_subs ??= {}, "$language", language) === "en" ? "send" : "invia")}`);
  }
  $$renderer.push(`<!--]--></button> `);
  if (formStatus === "success") {
    $$renderer.push("<!--[-->");
    $$renderer.push(`<p class="success-message svelte-cwls5q">${escape_html(store_get($$store_subs ??= {}, "$language", language) === "en" ? "Message sent successfully." : "Messaggio inviato con successo.")}</p>`);
  } else {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]--> `);
  if (formStatus === "error") {
    $$renderer.push("<!--[-->");
    $$renderer.push(`<p class="error-message svelte-cwls5q">${escape_html(store_get($$store_subs ??= {}, "$language", language) === "en" ? "Something went wrong. Please try again." : "Qualcosa è andato storto. Riprova.")}</p>`);
  } else {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]--></form></div></div></div>`);
  if ($$store_subs) unsubscribe_stores($$store_subs);
}
export {
  _page as default
};
