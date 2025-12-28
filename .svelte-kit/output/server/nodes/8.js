

export const index = 8;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/tools/_slug_/_page.svelte.js')).default;
export const universal = {
  "prerender": true,
  "trailingSlash": "always",
  "ssr": false,
  "load": null
};
export const universal_id = "src/routes/tools/[slug]/+page.js";
export const imports = ["_app/immutable/nodes/8.D-1Us6bl.js","_app/immutable/chunks/BVJI5AyA.js","_app/immutable/chunks/CBbuBPfZ.js","_app/immutable/chunks/BUApaBEI.js","_app/immutable/chunks/C4KXQIWK.js","_app/immutable/chunks/Bct5q5Jl.js","_app/immutable/chunks/vMEyNdyp.js","_app/immutable/chunks/D5WjkzW7.js","_app/immutable/chunks/B2laj_VG.js","_app/immutable/chunks/myS3fj3Z.js","_app/immutable/chunks/BoL__K91.js","_app/immutable/chunks/2schDTMw.js","_app/immutable/chunks/DJbM_1Dr.js","_app/immutable/chunks/BRhue5fj.js","_app/immutable/chunks/DbgeaQY9.js","_app/immutable/chunks/lkBl5Ncq.js","_app/immutable/chunks/CereoTex.js","_app/immutable/chunks/GiQyGDmY.js"];
export const stylesheets = ["_app/immutable/assets/8.C6HnVGx2.css"];
export const fonts = [];
