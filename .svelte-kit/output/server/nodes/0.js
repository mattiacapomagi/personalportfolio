import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.CzAZk8uP.js","_app/immutable/chunks/Dx0PQoPp.js","_app/immutable/chunks/Bkp8tJKk.js","_app/immutable/chunks/WSDkFEvX.js","_app/immutable/chunks/Bz24O2Ps.js","_app/immutable/chunks/BlFArtUX.js","_app/immutable/chunks/TnNIaxZu.js","_app/immutable/chunks/BLpCFCOf.js","_app/immutable/chunks/CE2xHR8J.js","_app/immutable/chunks/uSEaUZge.js","_app/immutable/chunks/BUApaBEI.js","_app/immutable/chunks/Bc2UHMGc.js"];
export const stylesheets = ["_app/immutable/assets/0.D3dJVRN6.css"];
export const fonts = [];
