import { $ as head, W as store_get, _ as ensure_array_like, V as attr, Y as stringify, X as unsubscribe_stores } from "../../../chunks/index2.js";
import { b as base } from "../../../chunks/server.js";
import "@sveltejs/kit/internal/server";
import { t as tools } from "../../../chunks/tools.js";
import { l as language } from "../../../chunks/language.js";
import { e as escape_html } from "../../../chunks/context.js";
const infoIcon = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'?%3e%3csvg%20id='Layer_2'%20data-name='Layer%202'%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20902.94%20902.94'%3e%3cg%20id='Layer_1-2'%20data-name='Layer%201'%3e%3cg%3e%3cpath%20d='M272.06,689.76v-62.71c0-3.48,2.09-5.57,5.57-5.57h126.81l.7-105.21-.7-105.9h-119.84c-3.48,0-5.57-2.09-5.57-5.57v-62.71c0-3.48,2.09-5.57,5.57-5.57h220.17c3.48,0,5.57,1.74,5.57,5.57l-1.39,174.88.7,104.51h115.66c3.48,0,5.57,2.09,5.57,5.57v62.71c0,3.48-2.09,5.57-5.57,5.57h-347.67c-3.48,0-5.57-2.09-5.57-5.57ZM404.44,296.1v-82.91c0-3.48,2.09-5.57,5.57-5.57h94.76c3.48,0,5.57,2.09,5.57,5.57v82.91c0,3.48-2.09,5.57-5.57,5.57h-94.76c-3.48,0-5.57-2.09-5.57-5.57Z'/%3e%3cpath%20d='M451.47,902.94c-60.93,0-120.06-11.94-175.74-35.49-53.77-22.74-102.04-55.29-143.49-96.74-41.45-41.45-74-89.73-96.74-143.5C11.94,571.53,0,512.4,0,451.47s11.94-120.06,35.49-175.74c22.74-53.77,55.29-102.04,96.74-143.49,41.45-41.45,89.73-74,143.49-96.74C331.41,11.94,390.54,0,451.47,0s120.06,11.94,175.74,35.49c53.77,22.74,102.04,55.29,143.5,96.74,41.45,41.45,74,89.73,96.74,143.49,23.55,55.68,35.49,114.81,35.49,175.74s-11.94,120.06-35.49,175.74c-22.74,53.77-55.29,102.04-96.74,143.5s-89.73,74-143.5,96.74c-55.68,23.55-114.81,35.49-175.74,35.49ZM451.47,70c-101.89,0-197.69,39.68-269.74,111.73-72.05,72.05-111.73,167.85-111.73,269.74s39.68,197.69,111.73,269.74c72.05,72.05,167.85,111.73,269.74,111.73s197.69-39.68,269.74-111.73c72.05-72.05,111.73-167.85,111.73-269.74s-39.68-197.69-111.73-269.74c-72.05-72.05-167.85-111.73-269.74-111.73Z'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e";
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
    $$renderer.push(`<a${attr("href", `${stringify(base)}/tools/${stringify(tool.slug)}`)} class="tool-row svelte-171l7w4"><div class="title-group svelte-171l7w4"><span class="col tool-title svelte-171l7w4">${escape_html(tool.title)}</span> <button class="info-btn svelte-171l7w4" aria-label="Info"><img${attr("src", infoIcon)} alt="Info" class="svelte-171l7w4"/></button></div> <span class="col tool-desc svelte-171l7w4">${escape_html(store_get($$store_subs ??= {}, "$language", language) === "en" ? tool.description : tool.description_it)}</span> <span class="col tool-year svelte-171l7w4">${escape_html(tool.year)}</span></a>`);
  }
  $$renderer.push(`<!--]--></div> `);
  {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]--></main>`);
  if ($$store_subs) unsubscribe_stores($$store_subs);
}
export {
  _page as default
};
