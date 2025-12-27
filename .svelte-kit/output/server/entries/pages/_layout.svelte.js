import "clsx";
import { U as attr, V as attr_class, W as store_get, X as unsubscribe_stores, Y as stringify } from "../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../chunks/exports.js";
import "../../chunks/utils.js";
import { b as base } from "../../chunks/server.js";
import "@sveltejs/kit/internal/server";
import "../../chunks/state.svelte.js";
import { l as language } from "../../chunks/language.js";
import { b as ssr_context, e as escape_html } from "../../chunks/context.js";
function onDestroy(fn) {
  /** @type {SSRContext} */
  ssr_context.r.on_destroy(fn);
}
function Header($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let activePath = "";
    function normalizePath(path) {
      if (!path) return "";
      return path.endsWith("/") && path.length > 1 ? path.slice(0, -1) : path;
    }
    $$renderer2.push(`<header class="header svelte-1elxaub"><div class="logo svelte-1elxaub"><a${attr("href", `${stringify(base)}/`)} class="svelte-1elxaub">MATTIA CAPOMAGI</a></div> <nav class="nav svelte-1elxaub"><button class="nav-link lang-toggle svelte-1elxaub">${escape_html(store_get($$store_subs ??= {}, "$language", language) === "en" ? "it" : "en")}</button> <a${attr("href", `${stringify(base)}/`)}${attr_class("nav-link svelte-1elxaub", void 0, { "active": normalizePath(activePath) === normalizePath(base) })}><span class="desktop-text svelte-1elxaub">${escape_html(store_get($$store_subs ??= {}, "$language", language) === "en" ? "projects" : "progetti")}</span> <span class="mobile-text svelte-1elxaub">prj</span></a> <a${attr("href", `${stringify(base)}/about`)}${attr_class("nav-link svelte-1elxaub", void 0, {
      "active": normalizePath(activePath) === normalizePath(`${base}/about`)
    })}><span class="desktop-text svelte-1elxaub">${escape_html(store_get($$store_subs ??= {}, "$language", language) === "en" ? "about" : "chi sono?")}</span> <span class="mobile-text svelte-1elxaub">${escape_html(store_get($$store_subs ??= {}, "$language", language) === "en" ? "abt" : "bio")}</span></a></nav></header>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function Footer($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let timeStr = "";
    let dateStr = "";
    onDestroy(() => {
    });
    $$renderer2.push(`<footer class="site-footer svelte-jz8lnl"><div class="copyright"><span class="desktop-text svelte-jz8lnl">COPYRIGHT MATTIA CAPOMAGI 2025</span> <span class="mobile-text svelte-jz8lnl">Mattia Capomagi 2025</span></div> <div class="timestamp svelte-jz8lnl"><span class="desktop-text svelte-jz8lnl">${escape_html(dateStr)} ${escape_html(timeStr)}</span> <span class="mobile-text svelte-jz8lnl">${escape_html(timeStr)}</span></div></footer>`);
  });
}
function _layout($$renderer, $$props) {
  let { children } = $$props;
  $$renderer.push(`<div class="container svelte-12qhfyh">`);
  Header($$renderer);
  $$renderer.push(`<!----> <main class="main svelte-12qhfyh">`);
  children($$renderer);
  $$renderer.push(`<!----></main> `);
  Footer($$renderer);
  $$renderer.push(`<!----></div>`);
}
export {
  _layout as default
};
