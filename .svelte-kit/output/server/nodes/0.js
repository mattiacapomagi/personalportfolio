import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.BggWBjpT.js","_app/immutable/chunks/b0lTQS5A.js","_app/immutable/chunks/DmOxnaRq.js","_app/immutable/chunks/DoLlADei.js","_app/immutable/chunks/DDqOO_dS.js","_app/immutable/chunks/O0WoU0qQ.js","_app/immutable/chunks/DEZKoxLq.js","_app/immutable/chunks/D7wh4c5s.js","_app/immutable/chunks/BUApaBEI.js","_app/immutable/chunks/DQZkoMDm.js"];
export const stylesheets = ["_app/immutable/assets/0.D3dJVRN6.css"];
export const fonts = [];
