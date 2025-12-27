import { _ as head, U as attr, Y as stringify } from "../../../chunks/index2.js";
import { b as base } from "../../../chunks/server.js";
import "@sveltejs/kit/internal/server";
import { e as escape_html } from "../../../chunks/context.js";
function _page($$renderer) {
  const links = {
    linkedin: "https://www.linkedin.com/in/mattiacapomagi",
    instagram: "https://www.instagram.com/mattiacapomagi",
    gumroad: "https://mattiacapomagi.gumroad.com/",
    portfolio: base + "/"
  };
  let headerText = "Mattia Capomagi";
  head("1n1j6xb", $$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>Links — MATTIA CAPOMAGI</title>`);
    });
  });
  $$renderer.push(`<div class="bento-page svelte-1n1j6xb"><div class="bento-container svelte-1n1j6xb"><button class="card header-card svelte-1n1j6xb" aria-label="Activate Easter Egg"><div class="avatar-container svelte-1n1j6xb"><img${attr("src", `${stringify(base)}/media/favicon.jpg`)} alt="Mattia Capomagi" class="avatar svelte-1n1j6xb"/></div> <div class="header-info svelte-1n1j6xb"><p class="role svelte-1n1j6xb">Visual Designer &amp; Creative Director</p> <!---->`);
  {
    $$renderer.push(`<h1 class="svelte-1n1j6xb">${escape_html(headerText)}</h1>`);
  }
  $$renderer.push(`<!----> <p class="bio svelte-1n1j6xb">Crafting bold visual identities, branding systems, and digital
          experiences that really stand out.</p> <p class="location svelte-1n1j6xb"><strong class="svelte-1n1j6xb">Currently based in Rome</strong>, but open for collabs
          worldwide.</p></div></button> <div class="bottom-row svelte-1n1j6xb"><a${attr("href", links.portfolio)} class="card portfolio-card svelte-1n1j6xb" aria-label="View Portfolio"><h3 class="svelte-1n1j6xb">Portfolio</h3> <span class="domain svelte-1n1j6xb">mattiacapomagi.it</span></a> <div class="right-stack svelte-1n1j6xb"><a${attr("href", links.linkedin)} target="_blank" rel="noopener noreferrer" class="card linkedin-card svelte-1n1j6xb" aria-label="LinkedIn Profile"><span class="card-title svelte-1n1j6xb">LinkedIn</span> <span class="card-subtitle svelte-1n1j6xb">Let's connect!</span></a> <div class="small-row svelte-1n1j6xb"><a${attr("href", links.instagram)} target="_blank" rel="noopener noreferrer" class="card small-card svelte-1n1j6xb" aria-label="Instagram Profile"><span class="card-title svelte-1n1j6xb">Instagram</span> <span class="card-subtitle svelte-1n1j6xb">My visual portfolio</span></a> <a${attr("href", links.gumroad)} target="_blank" rel="noopener noreferrer" class="card small-card svelte-1n1j6xb" aria-label="Gumroad Shop"><span class="card-title svelte-1n1j6xb">Gumroad</span> <span class="card-subtitle svelte-1n1j6xb">Design resources</span></a></div></div></div></div></div>`);
}
export {
  _page as default
};
