import * as universal from '../entries/pages/projects/_slug_/_page.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/projects/_slug_/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/projects/[slug]/+page.js";
export const imports = ["_app/immutable/nodes/4.CHWVaQiz.js","_app/immutable/chunks/DZV18mLI.js","_app/immutable/chunks/DzQrzwyc.js","_app/immutable/chunks/BAQOzU1q.js","_app/immutable/chunks/BUApaBEI.js","_app/immutable/chunks/DxolTw8k.js","_app/immutable/chunks/0cIXwlWQ.js","_app/immutable/chunks/NOZ7Rk1I.js","_app/immutable/chunks/Se_5M871.js","_app/immutable/chunks/DvcljZe4.js","_app/immutable/chunks/BygNr7_r.js"];
export const stylesheets = ["_app/immutable/assets/4.fEez-kgS.css"];
export const fonts = [];
