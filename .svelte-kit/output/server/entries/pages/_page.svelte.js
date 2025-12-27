import { X as attr, Y as stringify, V as store_get, W as unsubscribe_stores, Z as ensure_array_like } from "../../chunks/index2.js";
import { p as projects } from "../../chunks/projects.js";
import { l as language } from "../../chunks/language.js";
import { e as escape_html } from "../../chunks/context.js";
import "clsx";
function ProjectRow($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let { project } = $$props;
    $$renderer2.push(`<a${attr("href", `/projects/${stringify(project.slug)}`)} class="project-row svelte-1ftngtl"><span class="col title svelte-1ftngtl">${escape_html(store_get($$store_subs ??= {}, "$language", language) === "en" ? project.title : project.title_it || project.title)}</span> <span class="col client svelte-1ftngtl">${escape_html(project.client)}</span> <span class="col category svelte-1ftngtl">${escape_html(store_get($$store_subs ??= {}, "$language", language) === "en" ? project.category : project.category_it)}</span> <span class="col year svelte-1ftngtl">${escape_html(project.year)}</span></a>`);
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
function _page($$renderer) {
  var $$store_subs;
  $$renderer.push(`<div class="home svelte-1uha8ag"><div class="project-list-header svelte-1uha8ag"><span class="col svelte-1uha8ag">${escape_html(store_get($$store_subs ??= {}, "$language", language) === "en" ? "project title" : "titolo progetto")}</span> <span class="col svelte-1uha8ag">${escape_html(store_get($$store_subs ??= {}, "$language", language) === "en" ? "client" : "cliente")}</span> <span class="col svelte-1uha8ag">${escape_html(store_get($$store_subs ??= {}, "$language", language) === "en" ? "category" : "categoria")}</span> <span class="col year svelte-1uha8ag">${escape_html(store_get($$store_subs ??= {}, "$language", language) === "en" ? "year" : "anno")}</span></div> <div class="project-list svelte-1uha8ag"><!--[-->`);
  const each_array = ensure_array_like(projects);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let project = each_array[$$index];
    ProjectRow($$renderer, { project });
  }
  $$renderer.push(`<!--]--></div> `);
  ImagePreview($$renderer);
  $$renderer.push(`<!----></div>`);
  if ($$store_subs) unsubscribe_stores($$store_subs);
}
export {
  _page as default
};
