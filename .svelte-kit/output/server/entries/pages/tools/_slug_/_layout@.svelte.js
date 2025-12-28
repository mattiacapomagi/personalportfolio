import "clsx";
import { H as Header, F as Footer } from "../../../../chunks/lenis.js";
function _layout_($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { children } = $$props;
    $$renderer2.push(`<div class="tool-layout svelte-11wgw0l"><div class="constrained-wrapper svelte-11wgw0l">`);
    Header($$renderer2);
    $$renderer2.push(`<!----></div> <main class="tool-main svelte-11wgw0l">`);
    children($$renderer2);
    $$renderer2.push(`<!----></main> <div class="constrained-wrapper svelte-11wgw0l">`);
    Footer($$renderer2);
    $$renderer2.push(`<!----></div></div>`);
  });
}
export {
  _layout_ as default
};
