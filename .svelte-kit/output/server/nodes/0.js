import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.3qyEnv7k.js","_app/immutable/chunks/Bn9cvOQ3.js","_app/immutable/chunks/UO6eIlX8.js","_app/immutable/chunks/CA4l-BPf.js","_app/immutable/chunks/BpMx89at.js","_app/immutable/chunks/LEkUkHSQ.js","_app/immutable/chunks/BIK8TevO.js","_app/immutable/chunks/J-hZdcAB.js","_app/immutable/chunks/DxZHsUt4.js","_app/immutable/chunks/B74C6Xdr.js","_app/immutable/chunks/BhH5i77v.js","_app/immutable/chunks/bNOs3OLr.js","_app/immutable/chunks/BUApaBEI.js","_app/immutable/chunks/Cij3T9bV.js","_app/immutable/chunks/DpI-_mNb.js"];
export const stylesheets = ["_app/immutable/assets/0.DRmfgQj6.css"];
export const fonts = [];
