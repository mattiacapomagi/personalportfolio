import "clsx";
import { H as Header, F as Footer } from "../../chunks/lenis.js";
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { children } = $$props;
    $$renderer2.push(`<div class="container svelte-12qhfyh">`);
    Header($$renderer2);
    $$renderer2.push(`<!----> <main class="main svelte-12qhfyh">`);
    children($$renderer2);
    $$renderer2.push(`<!----></main> `);
    Footer($$renderer2);
    $$renderer2.push(`<!----></div>`);
  });
}
export {
  _layout as default
};
