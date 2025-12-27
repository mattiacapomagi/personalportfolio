import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.DfAL8F6t.js","_app/immutable/chunks/ou9Hy1h7.js","_app/immutable/chunks/CDe51vAy.js","_app/immutable/chunks/BeNeh7a2.js","_app/immutable/chunks/DB--NVAW.js","_app/immutable/chunks/CmQdOxCZ.js","_app/immutable/chunks/Dpzvr0PQ.js","_app/immutable/chunks/BUApaBEI.js","_app/immutable/chunks/D389SB_Y.js"];
export const stylesheets = ["_app/immutable/assets/0.BZEmXZxg.css"];
export const fonts = [];
