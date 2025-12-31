export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "personalportfolio/_app",
	assets: new Set([".DS_Store",".nojekyll","fonts/Icon\r","fonts/PPKyoto-Extrabold.woff","fonts/PPKyoto-Extrabold.woff2","fonts/PPKyoto-ExtraboldItalic.woff","fonts/PPKyoto-ExtraboldItalic.woff2","fonts/PPKyoto-Heavy.woff","fonts/PPKyoto-Heavy.woff2","fonts/PPKyoto-HeavyItalic.woff","fonts/PPKyoto-HeavyItalic.woff2","fonts/PPKyoto-Light.woff","fonts/PPKyoto-Light.woff2","fonts/PPKyoto-LightItalic.woff","fonts/PPKyoto-LightItalic.woff2","fonts/PPKyoto-Medium.woff","fonts/PPKyoto-Medium.woff2","fonts/PPKyoto-MediumItalic.woff","fonts/PPKyoto-MediumItalic.woff2","fonts/PPKyoto-Regular.woff","fonts/PPKyoto-Regular.woff2","fonts/PPKyoto-RegularItalic.woff","fonts/PPKyoto-RegularItalic.woff2","fonts/PPKyoto-Thin.woff","fonts/PPKyoto-Thin.woff2","fonts/PPKyoto-ThinItalic.woff","fonts/PPKyoto-ThinItalic.woff2","freccia-dx.svg","freccia-sx.svg","media/.DS_Store","media/brand/favicon.jpg","media/brand/gumroad-1 (1).svg"]),
	mimeTypes: {".woff":"font/woff",".woff2":"font/woff2",".svg":"image/svg+xml",".jpg":"image/jpeg"},
	_: {
		client: {start:"_app/immutable/entry/start.TkhJpgpZ.js",app:"_app/immutable/entry/app.CUi77sIc.js",imports:["_app/immutable/entry/start.TkhJpgpZ.js","_app/immutable/chunks/C-gLAxc3.js","_app/immutable/chunks/CJuHBavL.js","_app/immutable/chunks/Cb9t86T3.js","_app/immutable/chunks/SghaoJdB.js","_app/immutable/chunks/BUApaBEI.js","_app/immutable/chunks/sAwDAjVN.js","_app/immutable/chunks/BE0rlgZa.js","_app/immutable/entry/app.CUi77sIc.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/Cb9t86T3.js","_app/immutable/chunks/SghaoJdB.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/CJuHBavL.js","_app/immutable/chunks/BezXv-9L.js","_app/immutable/chunks/BPx99VXY.js","_app/immutable/chunks/BRvhCpCp.js","_app/immutable/chunks/sAwDAjVN.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		remotes: {
			
		},
		routes: [
			
		],
		prerendered_routes: new Set(["/personalportfolio/","/personalportfolio/about/","/personalportfolio/admin/","/personalportfolio/bento/","/personalportfolio/tools/","/personalportfolio/tools/asciify/","/personalportfolio/tools/dithering/","/personalportfolio/projects/into-mag/","/personalportfolio/projects/poster-treccani/","/personalportfolio/projects/coppede/","/personalportfolio/projects/naturamatic/","/personalportfolio/projects/dottie/","/personalportfolio/projects/what-a-mag/","/personalportfolio/projects/utopia-cover/","/personalportfolio/projects/kinetic-type-tarantino/","/personalportfolio/projects/ute-limited-edition/","/personalportfolio/projects/inception-intro/","/personalportfolio/tools/bricklab/"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
