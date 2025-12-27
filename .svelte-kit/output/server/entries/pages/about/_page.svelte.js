import { _ as head, W as store_get, Z as ensure_array_like, U as attr, V as attr_class, X as unsubscribe_stores } from "../../../chunks/index2.js";
import { l as language } from "../../../chunks/language.js";
import { e as escape_html } from "../../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
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
        viewBox: "90.295 93.404 330.706 320.703",
        path: "m229.795 312.898c-42.217 0-67.05-34.11-67.05-76.54 0-44.095 27.316-79.869 79.465-79.869 53.806 0 72.016 36.607 72.844 57.405h-38.905c-.827-11.647-10.761-29.118-34.766-29.118-25.66 0-42.216 22.463-42.216 49.918s16.556 49.917 42.216 49.917c23.178 0 33.111-18.303 37.25-36.605h-37.25v-14.976h78.162v76.54h-34.29v-48.254c-2.484 17.472-13.245 51.582-55.46 51.582z"
      },
      {
        name: "Linkedin",
        url: "https://www.linkedin.com/in/mattia-capomagi-461386221/",
        viewBox: "0 0 24 24",
        path: "M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
        /* ... socials array ... */
        // (Assuming socials ends around here, verified by view)
      }
    ];
    let formStatus = "idle";
    let formErrors = { name: false, email: false, message: false };
    head("cwls5q", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>About — MATTIA CAPOMAGI</title>`);
      });
    });
    $$renderer2.push(`<div class="about-container svelte-cwls5q"><div class="about-content svelte-cwls5q"><div class="bio-column svelte-cwls5q"><p class="bio svelte-cwls5q">${escape_html(store_get($$store_subs ??= {}, "$language", language) === "en" ? bio_en : bio_it)}</p> <div class="social-links svelte-cwls5q"><!--[-->`);
    const each_array = ensure_array_like(socials);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let social = each_array[$$index];
      $$renderer2.push(`<a${attr("href", social.url)} target="_blank" rel="noopener noreferrer" class="contact-link svelte-cwls5q"${attr("aria-label", social.name)}><span class="link-text svelte-cwls5q">${escape_html(social.name)}</span> <svg class="link-icon svelte-cwls5q"${attr("viewBox", social.viewBox)} width="24" height="24"><path fill="currentColor"${attr("d", social.path)}></path></svg></a>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="form-column svelte-cwls5q"><h3 class="contact-header svelte-cwls5q">${escape_html(store_get($$store_subs ??= {}, "$language", language) === "en" ? "get in touch with me" : "contattami")}</h3> <form class="contact-form svelte-cwls5q" novalidate><input type="text" name="_honey" style="display:none" class="svelte-cwls5q"/> <input type="hidden" name="_captcha" value="true" class="svelte-cwls5q"/> <input type="hidden" name="_subject" value="New Contact from Portfolio" class="svelte-cwls5q"/> <div class="form-group svelte-cwls5q"><input type="text" name="name"${attr("placeholder", store_get($$store_subs ??= {}, "$language", language) === "en" ? "Name" : "Nome")}${attr("disabled", formStatus === "submitting", true)}${attr_class("svelte-cwls5q", void 0, { "input-error": formErrors.name })}/></div> <div class="form-group svelte-cwls5q"><input type="email" name="email"${attr("placeholder", "Email")}${attr("disabled", formStatus === "submitting", true)}${attr_class("svelte-cwls5q", void 0, { "input-error": formErrors.email })}/></div> <div class="form-group svelte-cwls5q"><textarea name="message" rows="4"${attr("placeholder", store_get($$store_subs ??= {}, "$language", language) === "en" ? "Message" : "Messaggio")}${attr("disabled", formStatus === "submitting", true)}${attr_class("svelte-cwls5q", void 0, { "input-error": formErrors.message })}></textarea></div> <button type="submit"${attr("disabled", formStatus === "submitting", true)} class="svelte-cwls5q">`);
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
