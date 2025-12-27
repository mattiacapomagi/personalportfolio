import * as universal from '../entries/pages/projects/_slug_/_page.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/projects/_slug_/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/projects/[slug]/+page.js";
export const imports = ["_app/immutable/nodes/4.BcG0g9py.js","_app/immutable/chunks/CyMdHxPt.js","_app/immutable/chunks/CV95ut3L.js","_app/immutable/chunks/CTMHzUqY.js","_app/immutable/chunks/BUApaBEI.js","_app/immutable/chunks/BErlRb0U.js","_app/immutable/chunks/ICZKnOk9.js","_app/immutable/chunks/BsrguD1M.js","_app/immutable/chunks/BQbAl7Kx.js","_app/immutable/chunks/Cyp8qPxu.js","_app/immutable/chunks/Dmycr4ub.js","_app/immutable/chunks/vDxmdE1j.js"];
export const stylesheets = ["_app/immutable/assets/4.hzm-L8WI.css"];
export const fonts = [];
