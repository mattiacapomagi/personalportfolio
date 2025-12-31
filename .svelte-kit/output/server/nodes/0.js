import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.C34GZ16-.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/CJuHBavL.js","_app/immutable/chunks/Cb9t86T3.js","_app/immutable/chunks/SghaoJdB.js","_app/immutable/chunks/BezXv-9L.js","_app/immutable/chunks/DcoDyN5a.js","_app/immutable/chunks/BKD6g708.js","_app/immutable/chunks/By77JFKA.js","_app/immutable/chunks/BRvhCpCp.js","_app/immutable/chunks/sAwDAjVN.js","_app/immutable/chunks/C-gLAxc3.js","_app/immutable/chunks/BUApaBEI.js","_app/immutable/chunks/BE0rlgZa.js","_app/immutable/chunks/euXU11H5.js"];
export const stylesheets = ["_app/immutable/assets/0.Axxl-ys-.css"];
export const fonts = [];
