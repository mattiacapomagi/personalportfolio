import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.DH5r5GdO.js","_app/immutable/chunks/DxolTw8k.js","_app/immutable/chunks/DzQrzwyc.js","_app/immutable/chunks/NOZ7Rk1I.js","_app/immutable/chunks/BAQOzU1q.js","_app/immutable/chunks/CUb87t4i.js","_app/immutable/chunks/BUApaBEI.js","_app/immutable/chunks/BygNr7_r.js","_app/immutable/chunks/Dso5EaVA.js"];
export const stylesheets = ["_app/immutable/assets/0.DlxPM90l.css"];
export const fonts = [];
