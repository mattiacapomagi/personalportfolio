

export const index = 8;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/tools/_slug_/_page.svelte.js')).default;
export const universal = {
  "prerender": true,
  "trailingSlash": "always",
  "ssr": false,
  "load": null
};
export const universal_id = "src/routes/tools/[slug]/+page.js";
export const imports = ["_app/immutable/nodes/8.njqFDd6W.js","_app/immutable/chunks/BVJI5AyA.js","_app/immutable/chunks/CBbuBPfZ.js","_app/immutable/chunks/BUApaBEI.js","_app/immutable/chunks/Bn9cvOQ3.js","_app/immutable/chunks/UO6eIlX8.js","_app/immutable/chunks/CA4l-BPf.js","_app/immutable/chunks/DxZHsUt4.js","_app/immutable/chunks/BpMx89at.js","_app/immutable/chunks/LEkUkHSQ.js","_app/immutable/chunks/BQjBlUda.js","_app/immutable/chunks/B74C6Xdr.js","_app/immutable/chunks/BhH5i77v.js","_app/immutable/chunks/B2yM3VP2.js","_app/immutable/chunks/BIK8TevO.js","_app/immutable/chunks/J-hZdcAB.js","_app/immutable/chunks/CSXEvdP1.js","_app/immutable/chunks/DpI-_mNb.js"];
export const stylesheets = ["_app/immutable/assets/8.CSX-aniQ.css"];
export const fonts = [];
