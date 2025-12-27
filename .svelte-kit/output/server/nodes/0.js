import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.CP4-HuoC.js","_app/immutable/chunks/BErlRb0U.js","_app/immutable/chunks/CV95ut3L.js","_app/immutable/chunks/BsrguD1M.js","_app/immutable/chunks/CTMHzUqY.js","_app/immutable/chunks/Cyp8qPxu.js","_app/immutable/chunks/BNLSnOid.js","_app/immutable/chunks/BUApaBEI.js","_app/immutable/chunks/BDkOgad3.js","_app/immutable/chunks/11DH1jP9.js"];
export const stylesheets = ["_app/immutable/assets/0.BZEmXZxg.css"];
export const fonts = [];
