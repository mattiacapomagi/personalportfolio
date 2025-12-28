import { $ as head, W as store_get, _ as ensure_array_like, U as attr, Y as stringify, X as unsubscribe_stores } from "../../../chunks/index2.js";
import { b as base } from "../../../chunks/server.js";
import "@sveltejs/kit/internal/server";
import { t as tools } from "../../../chunks/tools.js";
import { l as language } from "../../../chunks/language.js";
import { e as escape_html } from "../../../chunks/context.js";
function _page($$renderer) {
  var $$store_subs;
  head("171l7w4", $$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>Tools — MATTIA CAPOMAGI</title>`);
    });
  });
  $$renderer.push(`<main class="tools-page svelte-171l7w4"><div class="tools-list-header svelte-171l7w4"><span class="col svelte-171l7w4">tool</span> <span class="col svelte-171l7w4">${escape_html(store_get($$store_subs ??= {}, "$language", language) === "en" ? "description" : "descrizione")}</span> <span class="col svelte-171l7w4">${escape_html(store_get($$store_subs ??= {}, "$language", language) === "en" ? "year" : "anno")}</span></div> <div class="tools-list svelte-171l7w4"><!--[-->`);
  const each_array = ensure_array_like(tools);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let tool = each_array[$$index];
    $$renderer.push(`<a${attr("href", `${stringify(base)}/tools/${stringify(tool.slug)}`)} class="tool-row svelte-171l7w4"><span class="col tool-title svelte-171l7w4">${escape_html(tool.title)}</span> <span class="col tool-desc svelte-171l7w4">${escape_html(store_get($$store_subs ??= {}, "$language", language) === "en" ? tool.description : tool.description_it)}</span> <span class="col tool-year svelte-171l7w4">${escape_html(tool.year)}</span></a>`);
  }
  $$renderer.push(`<!--]--></div></main>`);
  if ($$store_subs) unsubscribe_stores($$store_subs);
}
export {
  _page as default
};
