import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.FIkytY2K.js","_app/immutable/chunks/DKhHCfAv.js","_app/immutable/chunks/b55XWWnR.js","_app/immutable/chunks/Br3I4bN1.js","_app/immutable/chunks/Cmxyw8bl.js","_app/immutable/chunks/CWNAEeCa.js","_app/immutable/chunks/CqkIaww2.js","_app/immutable/chunks/F449CFpM.js","_app/immutable/chunks/CxsMr_0q.js","_app/immutable/chunks/D5kPPlwT.js","_app/immutable/chunks/ZVBZ1qq8.js","_app/immutable/chunks/CsGeE7Bm.js","_app/immutable/chunks/BUApaBEI.js","_app/immutable/chunks/BGPpam0l.js","_app/immutable/chunks/B6X7luPt.js"];
export const stylesheets = ["_app/immutable/assets/lenis.DIqIik8V.css","_app/immutable/assets/0.D8PuSnqs.css"];
export const fonts = [];
