import * as universal from '../entries/pages/projects/_slug_/_page.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/projects/_slug_/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/projects/[slug]/+page.js";
export const imports = ["_app/immutable/nodes/5.DPE_qnaa.js","_app/immutable/chunks/D6_D2-hW.js","_app/immutable/chunks/BeisixUQ.js","_app/immutable/chunks/CtxozCNc.js","_app/immutable/chunks/BUApaBEI.js","_app/immutable/chunks/Ba2q5WNa.js","_app/immutable/chunks/DO2VzowN.js","_app/immutable/chunks/CZkgNoQ_.js","_app/immutable/chunks/CSRnd0-m.js","_app/immutable/chunks/fcS9VyxB.js","_app/immutable/chunks/BmyesUdL.js","_app/immutable/chunks/DGhLQAWL.js","_app/immutable/chunks/gnRxYiXa.js","_app/immutable/chunks/C2IWVeq2.js","_app/immutable/chunks/CqHIhMXb.js"];
export const stylesheets = ["_app/immutable/assets/5.GnpsqqtN.css"];
export const fonts = [];
