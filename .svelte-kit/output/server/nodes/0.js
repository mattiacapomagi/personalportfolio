import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.Cxxcr7cG.js","_app/immutable/chunks/BBtkc_yj.js","_app/immutable/chunks/Bct5q5Jl.js","_app/immutable/chunks/vMEyNdyp.js","_app/immutable/chunks/B2laj_VG.js","_app/immutable/chunks/myS3fj3Z.js","_app/immutable/chunks/DbgeaQY9.js","_app/immutable/chunks/lkBl5Ncq.js","_app/immutable/chunks/BBCOyUuG.js","_app/immutable/chunks/2schDTMw.js","_app/immutable/chunks/DJbM_1Dr.js","_app/immutable/chunks/DeoI2wa1.js","_app/immutable/chunks/BUApaBEI.js","_app/immutable/chunks/fEgMhhkd.js","_app/immutable/chunks/GiQyGDmY.js"];
export const stylesheets = ["_app/immutable/assets/0.CoKc_Ifa.css"];
export const fonts = [];
