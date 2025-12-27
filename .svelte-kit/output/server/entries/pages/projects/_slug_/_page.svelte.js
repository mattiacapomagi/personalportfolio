import { z as ensure_array_like, x as attr_class, G as attr_style, y as stringify, w as attr, F as head } from "../../../../chunks/index2.js";
import { b as base } from "../../../../chunks/server.js";
import "@sveltejs/kit/internal/server";
import { e as escape_html } from "../../../../chunks/context.js";
function ImageCarousel($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { images } = $$props;
    let currentIndex = 0;
    let videoRefs = [];
    let isPlaying = [];
    let progress = [];
    let currentCanonicalIndex = images.length > 0 ? (currentIndex % images.length + images.length) % images.length : 0;
    function isVideo(path) {
      return path.toLowerCase().endsWith(".mp4") || path.toLowerCase().endsWith(".mov");
    }
    function getPos(i) {
      if (images.length === 0) return 0;
      const len = images.length;
      let offset = (i - currentIndex) % len;
      if (offset < -len / 2) offset += len;
      else if (offset > len / 2) offset -= len;
      return offset * 100;
    }
    function getZIndex(i) {
      const len = images.length;
      const currentCanonical = (currentIndex % len + len) % len;
      return i === currentCanonical ? 5 : 1;
    }
    let isMobile = false;
    $$renderer2.push(`<div class="carousel svelte-1kl9tqn">`);
    if (images.length > 1) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<button class="nav-btn prev svelte-1kl9tqn" aria-label="Previous image">←</button>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="carousel-track svelte-1kl9tqn"><!--[-->`);
    const each_array = ensure_array_like(images);
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      let media = each_array[i];
      $$renderer2.push(`<div${attr_class("slide svelte-1kl9tqn", void 0, { "active": i === currentCanonicalIndex })}${attr_style(`transform: translateX(${stringify(getPos(i))}%); z-index: ${stringify(getZIndex(i))}`)}>`);
      if (isVideo(media)) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="video-container svelte-1kl9tqn"><video${attr("src", `${stringify(base)}${stringify(media)}`)} class="blur-bg-video svelte-1kl9tqn" autoplay loop muted playsinline></video>  <video${attr("src", `${stringify(base)}${stringify(media)}`)} class="main-video svelte-1kl9tqn" loop muted playsinline${attr("controls", isMobile, true)}></video> <div${attr_class("video-controls svelte-1kl9tqn", void 0, {
          "visible": !isPlaying[i] || i === currentCanonicalIndex
        })}${attr_style("", { display: "flex" })}><div class="control-row svelte-1kl9tqn"><button class="icon-btn play-btn svelte-1kl9tqn"${attr("aria-label", isPlaying[i] ? "Pause" : "Play")}>`);
        if (isPlaying[i]) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"></path></svg>`);
        } else {
          $$renderer2.push("<!--[!-->");
          $$renderer2.push(`<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"></path></svg>`);
        }
        $$renderer2.push(`<!--]--></button> <input type="range" min="0" max="100"${attr("value", progress[i] || 0)} class="seek-bar svelte-1kl9tqn"/> <div class="volume-container svelte-1kl9tqn"><span class="vol-label svelte-1kl9tqn">VOL</span> <input type="range" min="0" max="1" step="0.1"${attr("value", videoRefs[i] ? videoRefs[i].volume : 0.4)} class="volume-bar svelte-1kl9tqn"/></div> <button class="icon-btn fs-btn svelte-1kl9tqn" aria-label="Fullscreen"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"></path></svg></button></div></div></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<div class="image-wrapper svelte-1kl9tqn"><div class="blur-bg svelte-1kl9tqn"${attr_style(`background-image: url('${stringify(base)}${stringify(media)}')`)}></div>  <img${attr("src", `${stringify(base)}${stringify(media)}`)}${attr("alt", `Project slide ${stringify(i + 1)}`)} class="clickable-image svelte-1kl9tqn"/></div>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    if (images.length > 1) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<button class="nav-btn next svelte-1kl9tqn" aria-label="Next image">→</button>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    const { project } = data;
    head("gygcht", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>${escape_html(project.title)} — MATTIA CAPOMAGI</title>`);
      });
    });
    $$renderer2.push(`<article class="project-detail svelte-gygcht"><header class="project-header svelte-gygcht"><h1 class="project-title svelte-gygcht">${escape_html(project.title)}</h1> <div class="project-meta svelte-gygcht"><div class="meta-item svelte-gygcht"><span class="meta-label svelte-gygcht">${escape_html("Client")}</span> <span class="meta-value svelte-gygcht">${escape_html(project.client)}</span></div> <div class="meta-item svelte-gygcht"><span class="meta-label svelte-gygcht">${escape_html("Category")}</span> <span class="meta-value svelte-gygcht">${escape_html(project.category)}</span></div> <div class="meta-item svelte-gygcht"><span class="meta-label svelte-gygcht">${escape_html("Year")}</span> <span class="meta-value svelte-gygcht">${escape_html(project.year)}</span></div></div></header> <div class="project-content svelte-gygcht"><div class="description-container svelte-gygcht"><p class="project-description svelte-gygcht">${escape_html(project.description_en)}</p> `);
    if (project.gumroadLink) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<a${attr("href", project.gumroadLink)} target="_blank" rel="noopener noreferrer" class="gumroad-button svelte-gygcht">${escape_html("Get Typeface")}</a>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> <div class="project-gallery svelte-gygcht">`);
    ImageCarousel($$renderer2, { images: project.images });
    $$renderer2.push(`<!----></div></div></article>`);
  });
}
export {
  _page as default
};
