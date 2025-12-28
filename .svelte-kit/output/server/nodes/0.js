import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.CVzD-Vyg.js","_app/immutable/chunks/GePmqHF9.js","_app/immutable/chunks/DFoMLWoT.js","_app/immutable/chunks/6ywhq0IS.js","_app/immutable/chunks/DAWcegWQ.js","_app/immutable/chunks/fuNY_Pae.js","_app/immutable/chunks/PtSzMW2J.js","_app/immutable/chunks/hIEC6Vh3.js","_app/immutable/chunks/C3YjKCHP.js","_app/immutable/chunks/CAsSDMRu.js","_app/immutable/chunks/D1FgiSl9.js","_app/immutable/chunks/D5P3Z0d8.js","_app/immutable/chunks/BUApaBEI.js","_app/immutable/chunks/4mQREwzK.js","_app/immutable/chunks/CPSZ3oVx.js"];
export const stylesheets = ["_app/immutable/assets/0.tfTawAaN.css"];
export const fonts = [];
