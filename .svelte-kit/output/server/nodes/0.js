import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.Cdh4vN4d.js","_app/immutable/chunks/Bgew_erx.js","_app/immutable/chunks/DR3uJ3cb.js","_app/immutable/chunks/uUN-slXE.js","_app/immutable/chunks/B10M_oo2.js","_app/immutable/chunks/DyVOIVPW.js","_app/immutable/chunks/j1qUzuxd.js","_app/immutable/chunks/BUApaBEI.js","_app/immutable/chunks/CveJ5mTl.js"];
export const stylesheets = ["_app/immutable/assets/0.CzLG_ZqG.css"];
export const fonts = [];
