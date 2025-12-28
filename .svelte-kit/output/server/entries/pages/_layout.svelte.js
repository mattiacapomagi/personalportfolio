import { U as attr, V as attr_class, W as store_get, X as unsubscribe_stores, Y as stringify } from "../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../chunks/exports.js";
import "../../chunks/utils.js";
import { b as base } from "../../chunks/server.js";
import "@sveltejs/kit/internal/server";
import "../../chunks/state.svelte.js";
import { l as language } from "../../chunks/language.js";
import { g as getContext, e as escape_html } from "../../chunks/context.js";
import { o as onDestroy } from "../../chunks/index-server.js";
import { w as writable } from "../../chunks/index.js";
import "clsx";
const getStores = () => {
  const stores$1 = getContext("__svelte__");
  return {
    /** @type {typeof page} */
    page: {
      subscribe: stores$1.page.subscribe
    },
    /** @type {typeof navigating} */
    navigating: {
      subscribe: stores$1.navigating.subscribe
    },
    /** @type {typeof updated} */
    updated: stores$1.updated
  };
};
const page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};
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
function getInitialTheme() {
  return "system";
}
const themePreference = writable(getInitialTheme());
function Footer($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let timeStr = "";
    let dateStr = "";
    let currentYear = (/* @__PURE__ */ new Date()).getFullYear();
    onDestroy(() => {
    });
    let themeLabel = () => {
      if (store_get($$store_subs ??= {}, "$themePreference", themePreference) === "light") {
        return store_get($$store_subs ??= {}, "$language", language) === "en" ? "LIGHT MODE" : "MODALITÀ CHIARA";
      }
      if (store_get($$store_subs ??= {}, "$themePreference", themePreference) === "dark") {
        return store_get($$store_subs ??= {}, "$language", language) === "en" ? "DARK MODE" : "MODALITÀ SCURA";
      }
      return store_get($$store_subs ??= {}, "$language", language) === "en" ? "SYSTEM MODE" : "MODALITÀ SISTEMA";
    };
    let mobileLabel = () => {
      if (store_get($$store_subs ??= {}, "$themePreference", themePreference) === "light") return "LIGHT";
      if (store_get($$store_subs ??= {}, "$themePreference", themePreference) === "dark") return "DARK";
      return "AUTO";
    };
    $$renderer2.push(`<footer class="site-footer svelte-jz8lnl"><div class="copyright"><span class="desktop-text svelte-jz8lnl">COPYRIGHT MATTIA CAPOMAGI ${escape_html(currentYear)}</span> <span class="mobile-text svelte-jz8lnl">Mattia Capomagi ${escape_html(currentYear)}</span></div> <span class="theme-toggle svelte-jz8lnl" role="button" tabindex="0"><span class="desktop-text svelte-jz8lnl">${escape_html(themeLabel())}</span> <span class="mobile-text svelte-jz8lnl">${escape_html(mobileLabel())}</span></span> <div class="timestamp svelte-jz8lnl"><span class="desktop-text svelte-jz8lnl">${escape_html(dateStr)} ${escape_html(timeStr)}</span> <span class="mobile-text svelte-jz8lnl">${escape_html(timeStr)}</span></div></footer>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let { children } = $$props;
    let isToolPage = store_get($$store_subs ??= {}, "$page", page).url.pathname.startsWith("/tools/");
    if (isToolPage) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="tool-layout svelte-12qhfyh"><div class="constrained-wrapper svelte-12qhfyh">`);
      Header($$renderer2);
      $$renderer2.push(`<!----></div> <main class="tool-main svelte-12qhfyh">`);
      children($$renderer2);
      $$renderer2.push(`<!----></main> <div class="constrained-wrapper svelte-12qhfyh">`);
      Footer($$renderer2);
      $$renderer2.push(`<!----></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="container svelte-12qhfyh">`);
      Header($$renderer2);
      $$renderer2.push(`<!----> <main class="main svelte-12qhfyh">`);
      children($$renderer2);
      $$renderer2.push(`<!----></main> `);
      Footer($$renderer2);
      $$renderer2.push(`<!----></div>`);
    }
    $$renderer2.push(`<!--]-->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _layout as default
};
