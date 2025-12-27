import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.ppSC17mB.js","_app/immutable/chunks/BKzJxjZA.js","_app/immutable/chunks/Djq9OznI.js","_app/immutable/chunks/KfuCNEnq.js","_app/immutable/chunks/OTQZhw8A.js","_app/immutable/chunks/D2c2I-P-.js","_app/immutable/chunks/COVUPwwA.js","_app/immutable/chunks/BUApaBEI.js","_app/immutable/chunks/CA9GzUiC.js"];
export const stylesheets = ["_app/immutable/assets/0.D3dJVRN6.css"];
export const fonts = [];
