import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.DkeNofVu.js","_app/immutable/chunks/NaKhkbUM.js","_app/immutable/chunks/BOUigU_t.js","_app/immutable/chunks/DL763_SF.js","_app/immutable/chunks/fh9yGuPT.js","_app/immutable/chunks/C4EvjuKB.js","_app/immutable/chunks/BR-tAu5F.js","_app/immutable/chunks/8ZFYXM0u.js","_app/immutable/chunks/CmKcbZgm.js","_app/immutable/chunks/BUApaBEI.js","_app/immutable/chunks/i0eV9rrZ.js"];
export const stylesheets = ["_app/immutable/assets/0.D3dJVRN6.css"];
export const fonts = [];
