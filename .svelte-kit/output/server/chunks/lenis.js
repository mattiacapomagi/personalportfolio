import { V as attr, W as attr_class, X as store_get, Y as unsubscribe_stores, Z as stringify } from "./index2.js";
import "@sveltejs/kit/internal";
import "./exports.js";
import "./utils.js";
import { b as base } from "./server.js";
import "@sveltejs/kit/internal/server";
import "./state.svelte.js";
import { l as language } from "./language.js";
import { e as escape_html } from "./context.js";
import "clsx";
import { o as onDestroy } from "./index-server.js";
function Header($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let activePath = "";
    function normalizePath(path) {
      if (!path) return "/";
      if (!path.startsWith("/")) path = "/" + path;
      return path.endsWith("/") && path.length > 1 ? path.slice(0, -1) : path;
    }
    $$renderer2.push(`<header class="header svelte-1elxaub"><div class="logo svelte-1elxaub"><a${attr("href", `${stringify(base)}/`)} class="svelte-1elxaub">MATTIA CAPOMAGI</a></div> <nav class="nav svelte-1elxaub"><button type="button" class="nav-link lang-toggle svelte-1elxaub">${escape_html(store_get($$store_subs ??= {}, "$language", language) === "en" ? "it" : "en")}</button> <a${attr("href", `${stringify(base)}/`)}${attr_class("nav-link svelte-1elxaub", void 0, { "active": normalizePath(activePath) === normalizePath(base) })}><span class="desktop-text svelte-1elxaub">${escape_html(store_get($$store_subs ??= {}, "$language", language) === "en" ? "projects" : "progetti")}</span> <span class="mobile-text svelte-1elxaub">prj</span></a> <a${attr("href", `${stringify(base)}/tools`)}${attr_class("nav-link svelte-1elxaub", void 0, {
      "active": normalizePath(activePath).startsWith(normalizePath(`${base}/tools`))
    })}><span class="desktop-text svelte-1elxaub">tools</span> <span class="mobile-text svelte-1elxaub">tls</span></a> <a${attr("href", `${stringify(base)}/about`)}${attr_class("nav-link svelte-1elxaub", void 0, {
      "active": normalizePath(activePath) === normalizePath(`${base}/about`)
    })}><span class="desktop-text svelte-1elxaub">${escape_html(store_get($$store_subs ??= {}, "$language", language) === "en" ? "about" : "chi sono?")}</span> <span class="mobile-text svelte-1elxaub">${escape_html(store_get($$store_subs ??= {}, "$language", language) === "en" ? "abt" : "bio")}</span></a></nav></header>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function Footer($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let timeStr = "";
    let dateStr = "";
    let currentYear = (/* @__PURE__ */ new Date()).getFullYear();
    onDestroy(() => {
    });
    $$renderer2.push(`<footer class="site-footer svelte-jz8lnl"><div class="copyright"><span class="desktop-text svelte-jz8lnl">COPYRIGHT MATTIA CAPOMAGI ${escape_html(currentYear)}</span> <span class="mobile-text svelte-jz8lnl">Mattia Capomagi ${escape_html(currentYear)}</span></div> <div class="timestamp svelte-jz8lnl"><span class="desktop-text svelte-jz8lnl">${escape_html(dateStr)} ${escape_html(timeStr)}</span> <span class="mobile-text svelte-jz8lnl">${escape_html(timeStr)}</span></div></footer>`);
  });
}
export {
  Footer as F,
  Header as H
};
