import { $ as head, V as attr_class, W as store_get, X as unsubscribe_stores } from "../../../../chunks/index2.js";
import { o as onDestroy } from "../../../../chunks/index-server.js";
import "@sveltejs/kit/internal/server";
import { l as language } from "../../../../chunks/language.js";
import { e as escape_html } from "../../../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let isDragActive = false;
    let history = { past: [], present: 50, future: [] };
    function handleKeyDown(e) {
      if ((e.metaKey || e.ctrlKey) && e.key === "z") {
        e.preventDefault();
        if (e.shiftKey) {
          redo();
        } else {
          undo();
        }
      }
    }
    onDestroy(() => {
      window.removeEventListener("keydown", handleKeyDown);
    });
    function undo() {
      if (history.past.length === 0) return;
      const previous = history.past[history.past.length - 1];
      history = {
        past: history.past.slice(0, -1),
        present: previous,
        future: [history.present, ...history.future]
      };
    }
    function redo() {
      if (history.future.length === 0) return;
      const next = history.future[0];
      history = {
        past: [...history.past, history.present],
        present: next,
        future: history.future.slice(1)
      };
    }
    head("1otn1vq", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>BRICKLAB — MATTIA CAPOMAGI</title>`);
      });
    });
    $$renderer2.push(`<main class="bricklab-tool svelte-1otn1vq">`);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div${attr_class("upload-zone svelte-1otn1vq", void 0, { "active": isDragActive })} role="button" tabindex="0"><input type="file" class="hidden svelte-1otn1vq" accept="image/*,.tiff,.tif,.webp"/> <div class="upload-content svelte-1otn1vq"><h2 class="svelte-1otn1vq">${escape_html(store_get($$store_subs ??= {}, "$language", language) === "en" ? "DROP / CLICK" : "TRASCINA / CLICCA")}</h2> <p class="svelte-1otn1vq">JPG / PNG / GIF / WEBP / TIFF</p></div></div>`);
    }
    $$renderer2.push(`<!--]--></main>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
