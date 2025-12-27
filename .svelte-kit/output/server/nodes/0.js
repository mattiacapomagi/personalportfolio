import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.CRH-WL17.js","_app/immutable/chunks/DKy7b4A_.js","_app/immutable/chunks/JrRgFM8m.js","_app/immutable/chunks/D-Yuw7ap.js","_app/immutable/chunks/D-ZXI3kI.js","_app/immutable/chunks/CO9aIoSC.js","_app/immutable/chunks/BUApaBEI.js","_app/immutable/chunks/DB6c3oQK.js","_app/immutable/chunks/CSP42d24.js"];
export const stylesheets = ["_app/immutable/assets/0.DXZhMakk.css"];
export const fonts = [];
