import * as universal from '../entries/pages/projects/_slug_/_page.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/projects/_slug_/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/projects/[slug]/+page.js";
export const imports = ["_app/immutable/nodes/5.DVt0lljX.js","_app/immutable/chunks/BJ7BnG-4.js","_app/immutable/chunks/BR-tAu5F.js","_app/immutable/chunks/BOUigU_t.js","_app/immutable/chunks/BUApaBEI.js","_app/immutable/chunks/NaKhkbUM.js","_app/immutable/chunks/Df0e7uGU.js","_app/immutable/chunks/fh9yGuPT.js","_app/immutable/chunks/BDLEfaaf.js","_app/immutable/chunks/C4EvjuKB.js","_app/immutable/chunks/8ZFYXM0u.js","_app/immutable/chunks/DL763_SF.js","_app/immutable/chunks/-30s_cW_.js","_app/immutable/chunks/BEsfB5Rb.js","_app/immutable/chunks/BhJ_Fedy.js"];
export const stylesheets = ["_app/immutable/assets/5.GnpsqqtN.css"];
export const fonts = [];
