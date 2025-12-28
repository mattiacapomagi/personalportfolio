import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.Dt9q_HSz.js","_app/immutable/chunks/C4KXQIWK.js","_app/immutable/chunks/Bct5q5Jl.js","_app/immutable/chunks/vMEyNdyp.js","_app/immutable/chunks/myS3fj3Z.js","_app/immutable/chunks/D5WjkzW7.js","_app/immutable/chunks/2schDTMw.js","_app/immutable/chunks/DJbM_1Dr.js","_app/immutable/chunks/DbgeaQY9.js","_app/immutable/chunks/lkBl5Ncq.js","_app/immutable/chunks/DBNqA5X-.js","_app/immutable/chunks/BUApaBEI.js","_app/immutable/chunks/Cs5VOeUV.js","_app/immutable/chunks/GiQyGDmY.js"];
export const stylesheets = ["_app/immutable/assets/0.D3dJVRN6.css"];
export const fonts = [];
