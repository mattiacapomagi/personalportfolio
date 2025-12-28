

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
export const imports = ["_app/immutable/nodes/8.42aeB3bt.js","_app/immutable/chunks/BVJI5AyA.js","_app/immutable/chunks/CBbuBPfZ.js","_app/immutable/chunks/BUApaBEI.js","_app/immutable/chunks/GePmqHF9.js","_app/immutable/chunks/DFoMLWoT.js","_app/immutable/chunks/6ywhq0IS.js","_app/immutable/chunks/C3YjKCHP.js","_app/immutable/chunks/DAWcegWQ.js","_app/immutable/chunks/fuNY_Pae.js","_app/immutable/chunks/BlfrmC8U.js","_app/immutable/chunks/CAsSDMRu.js","_app/immutable/chunks/D1FgiSl9.js","_app/immutable/chunks/BLBYh9Zl.js","_app/immutable/chunks/PtSzMW2J.js","_app/immutable/chunks/hIEC6Vh3.js","_app/immutable/chunks/4mQREwzK.js","_app/immutable/chunks/CPSZ3oVx.js"];
export const stylesheets = ["_app/immutable/assets/8.BdAQg4Ww.css"];
export const fonts = [];
