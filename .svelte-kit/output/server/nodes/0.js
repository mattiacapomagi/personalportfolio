import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.DyTO8qqH.js","_app/immutable/chunks/C6Fzc3LW.js","_app/immutable/chunks/1rNHRGA1.js","_app/immutable/chunks/CS-BcSQ8.js","_app/immutable/chunks/VrXSxEuO.js","_app/immutable/chunks/CLSB9qzS.js","_app/immutable/chunks/BLDoYpx2.js","_app/immutable/chunks/Bb2yCXYy.js","_app/immutable/chunks/BdtJ2nZv.js","_app/immutable/chunks/PMPmYSnv.js","_app/immutable/chunks/BBfN09X9.js","_app/immutable/chunks/BUApaBEI.js","_app/immutable/chunks/BOVYNr9C.js","_app/immutable/chunks/DuOiE-uO.js"];
export const stylesheets = ["_app/immutable/assets/0.D3dJVRN6.css"];
export const fonts = [];
