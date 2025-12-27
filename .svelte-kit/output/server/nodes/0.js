import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.Cg6kqfMm.js","_app/immutable/chunks/DfkQbdpi.js","_app/immutable/chunks/BCnZ4NdG.js","_app/immutable/chunks/BS2nFZ6n.js","_app/immutable/chunks/CtUz5q2A.js","_app/immutable/chunks/DV8IpM4n.js","_app/immutable/chunks/DXU1owEJ.js","_app/immutable/chunks/BUApaBEI.js","_app/immutable/chunks/_84opX3Q.js"];
export const stylesheets = ["_app/immutable/assets/0.D3dJVRN6.css"];
export const fonts = [];
