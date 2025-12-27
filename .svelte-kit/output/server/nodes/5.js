import * as universal from '../entries/pages/projects/_slug_/_page.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/projects/_slug_/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/projects/[slug]/+page.js";
export const imports = ["_app/immutable/nodes/5.F6IZMFri.js","_app/immutable/chunks/D3ME6hzl.js","_app/immutable/chunks/TnNIaxZu.js","_app/immutable/chunks/Bkp8tJKk.js","_app/immutable/chunks/BLpCFCOf.js","_app/immutable/chunks/BUApaBEI.js","_app/immutable/chunks/Dx0PQoPp.js","_app/immutable/chunks/BGgLnhRo.js","_app/immutable/chunks/Bz24O2Ps.js","_app/immutable/chunks/D6X4LlUT.js","_app/immutable/chunks/BlFArtUX.js","_app/immutable/chunks/CE2xHR8J.js","_app/immutable/chunks/WSDkFEvX.js","_app/immutable/chunks/XUvfZ9fq.js","_app/immutable/chunks/D2h607P3.js","_app/immutable/chunks/Bc2UHMGc.js"];
export const stylesheets = ["_app/immutable/assets/5.GnpsqqtN.css"];
export const fonts = [];
