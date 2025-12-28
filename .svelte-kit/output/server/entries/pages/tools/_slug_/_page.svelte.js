import { $ as head, U as attr, W as store_get, X as unsubscribe_stores, Y as stringify } from "../../../../chunks/index2.js";
import { b as base } from "../../../../chunks/server.js";
import "@sveltejs/kit/internal/server";
import { l as language } from "../../../../chunks/language.js";
import { e as escape_html } from "../../../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let { data } = $$props;
    const tool = data.tool;
    head("1otn1vq", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>${escape_html(tool.title)} — MATTIA CAPOMAGI</title>`);
      });
    });
    $$renderer2.push(`<main class="tool-detail svelte-1otn1vq"><div class="tool-header svelte-1otn1vq"><a${attr("href", `${stringify(base)}/tools`)} class="back-link svelte-1otn1vq">← ${escape_html(store_get($$store_subs ??= {}, "$language", language) === "en" ? "Back to Tools" : "Torna agli Strumenti")}</a> <div class="tool-meta svelte-1otn1vq"><h1 class="tool-title svelte-1otn1vq">${escape_html(tool.title)}</h1> <span class="tool-year svelte-1otn1vq">${escape_html(tool.year)}</span></div> <p class="tool-description svelte-1otn1vq">${escape_html(store_get($$store_subs ??= {}, "$language", language) === "en" ? tool.description : tool.description_it)}</p></div> <div class="tool-embed svelte-1otn1vq">`);
    if (tool.slug === "bricklab") {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<iframe src="https://mattiacapomagi.github.io/BRICKLAB/"${attr("title", tool.title)} class="embed-iframe svelte-1otn1vq" allow="clipboard-write"></iframe>`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (tool.externalUrl) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<a${attr("href", tool.externalUrl)} target="_blank" rel="noopener noreferrer" class="external-link svelte-1otn1vq">${escape_html(store_get($$store_subs ??= {}, "$language", language) === "en" ? "Open Tool" : "Apri Strumento")} →</a>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div></main>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
