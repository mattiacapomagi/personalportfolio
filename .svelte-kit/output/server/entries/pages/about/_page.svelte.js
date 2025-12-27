import { _ as head, U as attr, V as attr_class, W as store_get, X as unsubscribe_stores } from "../../../chunks/index2.js";
import { l as language } from "../../../chunks/language.js";
import { e as escape_html } from "../../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    const bio_en = `rome based, 23 years old graphic designer focused on building strong and adaptive brand identities. i don’t believe in limiting myself to a single aesthetic; my approach is fluid, navigating the wide space between precise minimalism and raw brutalism depending on what the project really needs.

typography is a fundamental pillar of my work. i love experimenting with type design and lettering, treating letters as structural elements that give a specific voice to every concept.

at the same time, i embrace technology to break boundaries. i use artificial intelligence as a dedicated laboratory for experimentation, a tool that allows me to explore new visual territories and generate ideas that go beyond traditional methods.`;
    const bio_it = `graphic designer di 23 anni con base a roma, focalizzato sulla costruzione di brand identity forti e adattive. non credo nel limitarmi a un’unica estetica; il mio approccio è fluido e naviga l'ampio spazio tra un minimalismo preciso e un brutalismo crudo, a seconda di ciò che serve davvero al progetto.

la tipografia è un pilastro fondamentale del mio lavoro. amo sperimentare con il type design e il lettering, trattando le lettere come elementi strutturali che danno una voce specifica a ogni concetto.

allo stesso tempo, accolgo la tecnologia per superare i confini. uso l'intelligenza artificiale come un laboratorio dedicato alla sperimentazione, uno strumento che mi permette di esplorare nuovi territori visivi e generare idee che vanno oltre i metodi tradizionali.`;
    let formStatus = "idle";
    let formErrors = { name: false, email: false, message: false };
    head("cwls5q", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>About — MATTIA CAPOMAGI</title>`);
      });
    });
    $$renderer2.push(`<div class="about-container svelte-cwls5q"><div class="about-content svelte-cwls5q"><div class="bio-column svelte-cwls5q"><p class="bio svelte-cwls5q">${escape_html(store_get($$store_subs ??= {}, "$language", language) === "en" ? bio_en : bio_it)}</p> <div class="social-links svelte-cwls5q"><a href="https://www.instagram.com/mattiacapomagi" target="_blank" rel="noopener noreferrer" class="contact-link svelte-cwls5q">instagram</a> <a href="https://www.linkedin.com/in/mattia-capomagi-461386221/" target="_blank" rel="noopener noreferrer" class="contact-link svelte-cwls5q">linkedin</a></div></div> <div class="form-column svelte-cwls5q"><h3 class="contact-header svelte-cwls5q">${escape_html(store_get($$store_subs ??= {}, "$language", language) === "en" ? "get in touch with me" : "contattami")}</h3> <form class="contact-form svelte-cwls5q" novalidate><input type="text" name="_honey" style="display:none" class="svelte-cwls5q"/> <input type="hidden" name="_captcha" value="true" class="svelte-cwls5q"/> <input type="hidden" name="_subject" value="New Contact from Portfolio" class="svelte-cwls5q"/> <div class="form-group svelte-cwls5q"><input type="text" name="name"${attr("placeholder", store_get($$store_subs ??= {}, "$language", language) === "en" ? "Name" : "Nome")}${attr("disabled", formStatus === "submitting", true)}${attr_class("svelte-cwls5q", void 0, { "input-error": formErrors.name })}/></div> <div class="form-group svelte-cwls5q"><input type="email" name="email"${attr("placeholder", "Email")}${attr("disabled", formStatus === "submitting", true)}${attr_class("svelte-cwls5q", void 0, { "input-error": formErrors.email })}/></div> <div class="form-group svelte-cwls5q"><textarea name="message" rows="4"${attr("placeholder", store_get($$store_subs ??= {}, "$language", language) === "en" ? "Message" : "Messaggio")}${attr("disabled", formStatus === "submitting", true)}${attr_class("svelte-cwls5q", void 0, { "input-error": formErrors.message })}></textarea></div> <button type="submit"${attr("disabled", formStatus === "submitting", true)} class="svelte-cwls5q">`);
    {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`${escape_html(store_get($$store_subs ??= {}, "$language", language) === "en" ? "send" : "invia")}`);
    }
    $$renderer2.push(`<!--]--></button> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></form></div></div></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
