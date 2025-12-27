import { U as attr, Y as stringify, W as store_get, Z as ensure_array_like, X as unsubscribe_stores, V as attr_class } from "../../chunks/index2.js";
import { p as projects } from "../../chunks/projects.js";
import { l as language } from "../../chunks/language.js";
import { b as base } from "../../chunks/server.js";
import "@sveltejs/kit/internal/server";
import { e as escape_html } from "../../chunks/context.js";
import "clsx";
function ProjectRow($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let { project } = $$props;
    let previewSource = project.previewImage || project.images[0];
    let isVideoPreview = previewSource?.toLowerCase().endsWith(".mp4") || previewSource?.toLowerCase().endsWith(".mov");
    function getAbbreviation(category) {
      const map = {
        "Editorial Design": "EDI",
        "Design Editoriale": "EDI",
        "Motion Design": "MOT",
        "Poster Design": "POS",
        "Type Design": "TYP",
        "Packaging Design": "PKG",
        "Brand/Editorial Design": "BRA/EDI",
        // Fallback if not split
        Brand: "BRA",
        Branding: "BRA",
        "3D Modeling": "3D",
        Motion: "MOT",
        "Brand/Design Editoriale": "BRA/EDI",
        "Modellazione 3D": "3D",
        "Brand/Editorial Design": "BRA/EDI"
      };
      const mapped = map[category] || category.replace(" Design", "").replace("Design ", "");
      return mapped.length > 3 ? mapped.substring(0, 3).toUpperCase() : mapped.toUpperCase();
    }
    function getCategoryTags(project2) {
      const rawCat = store_get($$store_subs ??= {}, "$language", language) === "en" ? project2.category : project2.category_it || project2.category;
      return rawCat.split(/\/|\+/).map((c) => getAbbreviation(c.trim())).filter(Boolean);
    }
    $$renderer2.push(`<a${attr("href", `${stringify(base)}/projects/${stringify(project.slug)}`)} class="project-row svelte-1ftngtl"><div class="text-content svelte-1ftngtl"><span class="col title svelte-1ftngtl">${escape_html(store_get($$store_subs ??= {}, "$language", language) === "en" ? project.title : project.title_it || project.title)}</span> <span class="col client svelte-1ftngtl">${escape_html(project.client)}</span> <span class="col category svelte-1ftngtl"><div class="tags svelte-1ftngtl"><!--[-->`);
    const each_array = ensure_array_like(getCategoryTags(project));
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let tag = each_array[$$index];
      $$renderer2.push(`<span class="category-tag svelte-1ftngtl">${escape_html(tag)}</span>`);
    }
    $$renderer2.push(`<!--]--></div></span> <span class="col year svelte-1ftngtl">${escape_html(project.year)}</span></div> <div class="mobile-preview svelte-1ftngtl">`);
    if (isVideoPreview) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<video${attr("src", `${stringify(base)}${stringify(previewSource)}`)} autoplay loop muted playsinline class="preview-media svelte-1ftngtl"></video>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<img${attr("src", `${stringify(base)}${stringify(previewSource)}`)}${attr("alt", project.title)} loading="lazy" class="preview-media svelte-1ftngtl"/>`);
    }
    $$renderer2.push(`<!--]--></div></a>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function ImagePreview($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let selectedCategory = "All";
    function normalizeCategory(c) {
      if (c === "Motion") return "Motion Design";
      if (c === "Brand") return "Branding";
      return c;
    }
    let uniqueCategories = [
      "All",
      ...new Set(projects.flatMap((p) => {
        const cat = store_get($$store_subs ??= {}, "$language", language) === "en" ? p.category : p.category_it || p.category;
        return cat.split(/\/|\+/).map((c) => normalizeCategory(c.trim()));
      }).filter(Boolean))
    ];
    let filteredProjects = projects;
    $$renderer2.push(`<div class="home svelte-1uha8ag"><div class="filter-container svelte-1uha8ag"><!--[-->`);
    const each_array = ensure_array_like(uniqueCategories);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let category = each_array[$$index];
      $$renderer2.push(`<button${attr_class("filter-btn svelte-1uha8ag", void 0, { "active": selectedCategory === category })}>${escape_html(category)}</button>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="project-list-header svelte-1uha8ag"><span class="col svelte-1uha8ag">${escape_html(store_get($$store_subs ??= {}, "$language", language) === "en" ? "project title" : "titolo progetto")}</span> <span class="col svelte-1uha8ag">${escape_html(store_get($$store_subs ??= {}, "$language", language) === "en" ? "client" : "cliente")}</span> <span class="col svelte-1uha8ag">${escape_html(store_get($$store_subs ??= {}, "$language", language) === "en" ? "category" : "categoria")}</span> <span class="col year svelte-1uha8ag">${escape_html(store_get($$store_subs ??= {}, "$language", language) === "en" ? "year" : "anno")}</span></div> <div class="project-list svelte-1uha8ag"><!--[-->`);
    const each_array_1 = ensure_array_like(filteredProjects);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let project = each_array_1[$$index_1];
      ProjectRow($$renderer2, { project });
    }
    $$renderer2.push(`<!--]--></div> `);
    ImagePreview($$renderer2);
    $$renderer2.push(`<!----></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
