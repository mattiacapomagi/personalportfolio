import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.CYYXKrO5.js","_app/immutable/chunks/DmFpseu1.js","_app/immutable/chunks/CRKzMF49.js","_app/immutable/chunks/DyZ0c3b2.js","_app/immutable/chunks/BQNV0UJf.js","_app/immutable/chunks/BdyCbQje.js","_app/immutable/chunks/Dmp5-R_Q.js","_app/immutable/chunks/6Acn-f9c.js","_app/immutable/chunks/CP3Vk0pc.js","_app/immutable/chunks/BUApaBEI.js","_app/immutable/chunks/DU-RyP1c.js"];
export const stylesheets = ["_app/immutable/assets/0.D3dJVRN6.css"];
export const fonts = [];
