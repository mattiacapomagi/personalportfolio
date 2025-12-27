import * as universal from '../entries/pages/projects/_slug_/_page.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/projects/_slug_/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/projects/[slug]/+page.js";
export const imports = ["_app/immutable/nodes/4.y6CdeZEo.js","_app/immutable/chunks/BxtAlgF1.js","_app/immutable/chunks/D2c2I-P-.js","_app/immutable/chunks/Djq9OznI.js","_app/immutable/chunks/BUApaBEI.js","_app/immutable/chunks/BKzJxjZA.js","_app/immutable/chunks/BkqE6qpl.js","_app/immutable/chunks/OTQZhw8A.js","_app/immutable/chunks/VvEHyax7.js","_app/immutable/chunks/KfuCNEnq.js","_app/immutable/chunks/DhmtLaua.js","_app/immutable/chunks/BdkDHQX-.js","_app/immutable/chunks/9-WgiuFK.js"];
export const stylesheets = ["_app/immutable/assets/4.GnpsqqtN.css"];
export const fonts = [];
