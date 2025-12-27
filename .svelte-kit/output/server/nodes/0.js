import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.CiQSvzwk.js","_app/immutable/chunks/DKy7b4A_.js","_app/immutable/chunks/JrRgFM8m.js","_app/immutable/chunks/CSP42d24.js","_app/immutable/chunks/D-Yuw7ap.js","_app/immutable/chunks/2uw0lNEO.js","_app/immutable/chunks/0hdIRJWC.js","_app/immutable/chunks/BUApaBEI.js","_app/immutable/chunks/ASQoLyeS.js"];
export const stylesheets = ["_app/immutable/assets/0.D3dJVRN6.css"];
export const fonts = [];
