import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.fLxW3bah.js","_app/immutable/chunks/DIx35Wrs.js","_app/immutable/chunks/BfI2MBsp.js","_app/immutable/chunks/BtqNpEsy.js","_app/immutable/chunks/qoXgobhe.js","_app/immutable/chunks/BXOBqdvS.js","_app/immutable/chunks/CcfiXjrA.js","_app/immutable/chunks/FLi8JY8W.js","_app/immutable/chunks/Cw0s4t2j.js","_app/immutable/chunks/DCnRvCD5.js","_app/immutable/chunks/DQHAV-e5.js","_app/immutable/chunks/BUApaBEI.js","_app/immutable/chunks/CND6NaeG.js"];
export const stylesheets = ["_app/immutable/assets/0.D3dJVRN6.css"];
export const fonts = [];
