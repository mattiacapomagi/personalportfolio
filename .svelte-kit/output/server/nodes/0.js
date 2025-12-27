import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.D5dkvLAz.js","_app/immutable/chunks/Ba2q5WNa.js","_app/immutable/chunks/CtxozCNc.js","_app/immutable/chunks/DGhLQAWL.js","_app/immutable/chunks/CZkgNoQ_.js","_app/immutable/chunks/fcS9VyxB.js","_app/immutable/chunks/BeisixUQ.js","_app/immutable/chunks/BmyesUdL.js","_app/immutable/chunks/CIMgs4-f.js","_app/immutable/chunks/BUApaBEI.js","_app/immutable/chunks/CqHIhMXb.js"];
export const stylesheets = ["_app/immutable/assets/0.D3dJVRN6.css"];
export const fonts = [];
