

export const index = 9;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/tools/_slug_/_page.svelte.js')).default;
export const universal = {
  "prerender": true,
  "trailingSlash": "always",
  "ssr": false,
  "load": null
};
export const universal_id = "src/routes/tools/[slug]/+page.js";
export const imports = ["_app/immutable/nodes/9.DR5PHXzV.js","_app/immutable/chunks/BVJI5AyA.js","_app/immutable/chunks/CBbuBPfZ.js","_app/immutable/chunks/BUApaBEI.js","_app/immutable/chunks/DKhHCfAv.js","_app/immutable/chunks/b55XWWnR.js","_app/immutable/chunks/Br3I4bN1.js","_app/immutable/chunks/CqkIaww2.js","_app/immutable/chunks/CRWaFG3w.js","_app/immutable/chunks/CWNAEeCa.js","_app/immutable/chunks/C05RCOmR.js","_app/immutable/chunks/F449CFpM.js","_app/immutable/chunks/CxsMr_0q.js","_app/immutable/chunks/1ZYVe3xj.js","_app/immutable/chunks/D5kPPlwT.js","_app/immutable/chunks/ZVBZ1qq8.js","_app/immutable/chunks/BGPpam0l.js","_app/immutable/chunks/B6X7luPt.js"];
export const stylesheets = ["_app/immutable/assets/9.CFRFuwXP.css"];
export const fonts = [];
