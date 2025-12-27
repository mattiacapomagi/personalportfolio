export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "personalportfolio/_app",
	assets: new Set([".nojekyll","fonts/PPNeueMontrealMono-Bold.woff","fonts/PPNeueMontrealMono-Bold.woff2","fonts/PPNeueMontrealMono-BoldItalic.woff","fonts/PPNeueMontrealMono-BoldItalic.woff2","fonts/PPNeueMontrealMono-Book.woff","fonts/PPNeueMontrealMono-Book.woff2","fonts/PPNeueMontrealMono-Light.woff","fonts/PPNeueMontrealMono-Light.woff2","fonts/PPNeueMontrealMono-Medium.woff","fonts/PPNeueMontrealMono-Medium.woff2","fonts/PPNeueMontrealMono-Regular.woff","fonts/PPNeueMontrealMono-Regular.woff2","fonts/PPNeueMontrealMono-RegularItalic.woff","fonts/PPNeueMontrealMono-RegularItalic.woff2","fonts/PPNeueMontrealMono-Thin.woff","fonts/PPNeueMontrealMono-Thin.woff2","fonts/PPNeueMontrealMono-ThinItalic.woff","fonts/PPNeueMontrealMono-ThinItalic.woff2","media/.DS_Store","media/DOTTIE/16-9 video DOTTIE.mov","media/DOTTIE/16-9 video DOTTIE.mp4","media/DOTTIE/mockup specimen.jpg","media/DOTTIE/mockup specimen.webp","media/DOTTIE/mockup1.jpg","media/DOTTIE/mockup1.webp","media/DOTTIE/mockup2.jpg","media/DOTTIE/mockup2.webp","media/DOTTIE/mockup3.jpg","media/DOTTIE/mockup3.webp","media/DOTTIE/specimen16-9.jpg","media/DOTTIE/specimen16-9.webp","media/DOTTIE/specimen16-905.jpg","media/DOTTIE/specimen16-905.webp","media/DOTTIE/specimen16-92.jpg","media/DOTTIE/specimen16-92.webp","media/DOTTIE/specimen16-93.jpg","media/DOTTIE/specimen16-93.webp","media/INTO/.DS_Store","media/INTO/DSC3620.jpg","media/INTO/DSC3620.webp","media/INTO/DSC3762.jpg","media/INTO/DSC3762.webp","media/INTO/DSC3768.jpg","media/INTO/DSC3768.webp","media/INTO/IMG_9599.jpeg","media/INTO/IMG_9599.webp","media/INTO/IMG_9640.jpeg","media/INTO/IMG_9640.webp","media/INTO/IMG_9642.png","media/INTO/IMG_9642.webp","media/INTO/_DSC3648_upscale.jpg","media/INTO/_DSC3648_upscale.webp","media/INTO/animazioneINTO.mp4","media/Inception/.DS_Store","media/Inception/billboard1.jpg","media/Inception/billboard1.webp","media/Inception/billboard2.jpg","media/Inception/billboard2.webp","media/Inception/complessivo_.jpg","media/Inception/complessivo_.webp","media/Inception/dettaglio alfiere.jpg","media/Inception/dettaglio alfiere.webp","media/Inception/dettaglio dado.jpg","media/Inception/dettaglio dado.webp","media/Inception/dettaglio girandola.jpg","media/Inception/dettaglio girandola.webp","media/Inception/dettaglio scale_.jpg","media/Inception/dettaglio scale_.webp","media/Inception/fiche dettaglio.jpg","media/Inception/fiche dettaglio.webp","media/Inception/inception titoli di testa.mp4","media/Inception/poster inception.jpg","media/Inception/poster inception.webp","media/Inception/poster1.jpg","media/Inception/poster1.webp","media/Inception/poster2.jpg","media/Inception/poster2.webp","media/Inception/trottola.jpg","media/Inception/trottola.webp","media/Inception/valigetta dettaglio.jpg","media/Inception/valigetta dettaglio.webp","media/Kinetic Type Tarantino/video.mp4","media/Naturamatic/RISON5.mp4","media/Naturamatic/coverpic.jpg","media/Naturamatic/coverpic.webp","media/Naturamatic/foto magtomag 2025 naturamatic 2.jpg","media/Naturamatic/foto magtomag 2025 naturamatic 2.webp","media/Naturamatic/foto magtomag 2025 naturamatic.jpg","media/Naturamatic/foto magtomag 2025 naturamatic.webp","media/Naturamatic/libricino.mp4","media/Treccani/mockup gelato 16_9.webp","media/Treccani/poster gelato.webp","media/UTE/mockup lato1.jpg","media/UTE/mockup lato1.webp","media/UTE/mockup lato2.jpg","media/UTE/mockup lato2.webp","media/UTE/mockup lattina.png","media/UTE/mockup lattina.webp","media/UTE/mockup4.png","media/UTE/mockup4.webp","media/UTE/mockup5.png","media/UTE/mockup5.webp","media/UTE/render.jpg","media/UTE/render.webp","media/UTOPIA/back alt.jpg","media/UTOPIA/back alt.webp","media/UTOPIA/back.jpg","media/UTOPIA/back.webp","media/UTOPIA/cover alt.jpg","media/UTOPIA/cover alt.webp","media/UTOPIA/cover.jpg","media/UTOPIA/cover.webp","media/UTOPIA/fronte vinile alt.png","media/UTOPIA/fronte vinile alt.webp","media/UTOPIA/fronte vinile.png","media/UTOPIA/fronte vinile.webp","media/UTOPIA/iOS Stocks 06  —◆ Dark 🍏.png","media/UTOPIA/iOS Stocks 06  —◆ Dark 🍏.webp","media/UTOPIA/iOS Stocks 06  —◇ Light 🍏.png","media/UTOPIA/iOS Stocks 06  —◇ Light 🍏.webp","media/UTOPIA/mockup cd alt fronte retro.png","media/UTOPIA/mockup cd alt fronte retro.webp","media/UTOPIA/mockup cd fronte retro.png","media/UTOPIA/mockup cd fronte retro.webp","media/UTOPIA/video.mp4","media/What a MAG/1.jpg","media/What a MAG/1.webp","media/What a MAG/2-3.jpg","media/What a MAG/2-3.webp","media/What a MAG/4-5.jpg","media/What a MAG/4-5.webp","media/What a MAG/6-7.jpg","media/What a MAG/6-7.webp","media/What a MAG/8.jpg","media/What a MAG/8.webp","media/What a MAG/animazione.mp4","media/coppedè/.DS_Store","media/coppedè/borse.png","media/coppedè/borse.webp","media/coppedè/fotocoppedè_01 - dimensioni grandi.jpeg","media/coppedè/fotocoppedè_01 - dimensioni grandi.webp","media/coppedè/fotocoppedè_02 - dimensioni grandi(1).jpeg","media/coppedè/fotocoppedè_02 - dimensioni grandi(1).webp","media/coppedè/fotocoppedè_03 - dimensioni grandi(1).jpeg","media/coppedè/fotocoppedè_03 - dimensioni grandi(1).webp","media/coppedè/fotocoppedè_04 - dimensioni grandi.jpeg","media/coppedè/fotocoppedè_04 - dimensioni grandi.webp","media/coppedè/fotocoppedè_05 - dimensioni grandi(1).jpeg","media/coppedè/fotocoppedè_05 - dimensioni grandi(1).webp","media/coppedè/fotocoppedè_06 - dimensioni grandi(1).jpeg","media/coppedè/fotocoppedè_06 - dimensioni grandi(1).webp","media/coppedè/fotocoppedè_07 - dimensioni grandi(1).jpeg","media/coppedè/fotocoppedè_07 - dimensioni grandi(1).webp","media/coppedè/fotocoppedè_07 - dimensioni grandi.jpeg","media/coppedè/fotocoppedè_07 - dimensioni grandi.webp","media/coppedè/maglietta mockup.jpg","media/coppedè/maglietta mockup.webp","media/coppedè/tazze.png","media/coppedè/tazze.webp","media/coppedè/totebag1.png","media/coppedè/totebag1.webp","media/coppedè/video_mockup_coppede.mp4","media/favicon.jpg"]),
	mimeTypes: {".woff":"font/woff",".woff2":"font/woff2",".mov":"video/quicktime",".mp4":"video/mp4",".jpg":"image/jpeg",".webp":"image/webp",".jpeg":"image/jpeg",".png":"image/png"},
	_: {
		client: {start:"_app/immutable/entry/start.DHggCB9V.js",app:"_app/immutable/entry/app.C5OibnDb.js",imports:["_app/immutable/entry/start.DHggCB9V.js","_app/immutable/chunks/BNLSnOid.js","_app/immutable/chunks/CV95ut3L.js","_app/immutable/chunks/BUApaBEI.js","_app/immutable/chunks/BDkOgad3.js","_app/immutable/chunks/11DH1jP9.js","_app/immutable/entry/app.C5OibnDb.js","_app/immutable/chunks/CV95ut3L.js","_app/immutable/chunks/BErlRb0U.js","_app/immutable/chunks/11DH1jP9.js","_app/immutable/chunks/BQbAl7Kx.js","_app/immutable/chunks/BsrguD1M.js","_app/immutable/chunks/Dmycr4ub.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/about",
				pattern: /^\/about\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/projects/[slug]",
				pattern: /^\/projects\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
