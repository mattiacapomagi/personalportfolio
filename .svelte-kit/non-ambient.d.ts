
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/" | "/about" | "/projects" | "/projects/[slug]";
		RouteParams(): {
			"/projects/[slug]": { slug: string }
		};
		LayoutParams(): {
			"/": { slug?: string };
			"/about": Record<string, never>;
			"/projects": { slug?: string };
			"/projects/[slug]": { slug: string }
		};
		Pathname(): "/" | "/about" | "/about/" | "/projects" | "/projects/" | `/projects/${string}` & {} | `/projects/${string}/` & {};
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/.nojekyll" | "/fonts/Icon\r" | "/fonts/PPKyoto-Extrabold.woff" | "/fonts/PPKyoto-Extrabold.woff2" | "/fonts/PPKyoto-ExtraboldItalic.woff" | "/fonts/PPKyoto-ExtraboldItalic.woff2" | "/fonts/PPKyoto-Heavy.woff" | "/fonts/PPKyoto-Heavy.woff2" | "/fonts/PPKyoto-HeavyItalic.woff" | "/fonts/PPKyoto-HeavyItalic.woff2" | "/fonts/PPKyoto-Light.woff" | "/fonts/PPKyoto-Light.woff2" | "/fonts/PPKyoto-LightItalic.woff" | "/fonts/PPKyoto-LightItalic.woff2" | "/fonts/PPKyoto-Medium.woff" | "/fonts/PPKyoto-Medium.woff2" | "/fonts/PPKyoto-MediumItalic.woff" | "/fonts/PPKyoto-MediumItalic.woff2" | "/fonts/PPKyoto-Regular.woff" | "/fonts/PPKyoto-Regular.woff2" | "/fonts/PPKyoto-RegularItalic.woff" | "/fonts/PPKyoto-RegularItalic.woff2" | "/fonts/PPKyoto-Thin.woff" | "/fonts/PPKyoto-Thin.woff2" | "/fonts/PPKyoto-ThinItalic.woff" | "/fonts/PPKyoto-ThinItalic.woff2" | "/media/.DS_Store" | "/media/DOTTIE/16-9 video DOTTIE.mov" | "/media/DOTTIE/16-9 video DOTTIE.mp4" | "/media/DOTTIE/mockup specimen.jpg" | "/media/DOTTIE/mockup specimen.webp" | "/media/DOTTIE/mockup1.jpg" | "/media/DOTTIE/mockup1.webp" | "/media/DOTTIE/mockup2.jpg" | "/media/DOTTIE/mockup2.webp" | "/media/DOTTIE/mockup3.jpg" | "/media/DOTTIE/mockup3.webp" | "/media/DOTTIE/specimen16-9.jpg" | "/media/DOTTIE/specimen16-9.webp" | "/media/DOTTIE/specimen16-905.jpg" | "/media/DOTTIE/specimen16-905.webp" | "/media/DOTTIE/specimen16-92.jpg" | "/media/DOTTIE/specimen16-92.webp" | "/media/DOTTIE/specimen16-93.jpg" | "/media/DOTTIE/specimen16-93.webp" | "/media/INTO/.DS_Store" | "/media/INTO/DSC3620.jpg" | "/media/INTO/DSC3620.webp" | "/media/INTO/DSC3762.jpg" | "/media/INTO/DSC3762.webp" | "/media/INTO/DSC3768.jpg" | "/media/INTO/DSC3768.webp" | "/media/INTO/IMG_9599.jpeg" | "/media/INTO/IMG_9599.webp" | "/media/INTO/IMG_9640.jpeg" | "/media/INTO/IMG_9640.webp" | "/media/INTO/IMG_9642.png" | "/media/INTO/IMG_9642.webp" | "/media/INTO/_DSC3648_upscale.jpg" | "/media/INTO/_DSC3648_upscale.webp" | "/media/INTO/animazioneINTO.mp4" | "/media/Inception/.DS_Store" | "/media/Inception/billboard1.jpg" | "/media/Inception/billboard1.webp" | "/media/Inception/billboard2.jpg" | "/media/Inception/billboard2.webp" | "/media/Inception/complessivo_.jpg" | "/media/Inception/complessivo_.webp" | "/media/Inception/dettaglio alfiere.jpg" | "/media/Inception/dettaglio alfiere.webp" | "/media/Inception/dettaglio dado.jpg" | "/media/Inception/dettaglio dado.webp" | "/media/Inception/dettaglio girandola.jpg" | "/media/Inception/dettaglio girandola.webp" | "/media/Inception/dettaglio scale_.jpg" | "/media/Inception/dettaglio scale_.webp" | "/media/Inception/fiche dettaglio.jpg" | "/media/Inception/fiche dettaglio.webp" | "/media/Inception/inception titoli di testa.mp4" | "/media/Inception/poster inception.jpg" | "/media/Inception/poster inception.webp" | "/media/Inception/poster1.jpg" | "/media/Inception/poster1.webp" | "/media/Inception/poster2.jpg" | "/media/Inception/poster2.webp" | "/media/Inception/trottola.jpg" | "/media/Inception/trottola.webp" | "/media/Inception/valigetta dettaglio.jpg" | "/media/Inception/valigetta dettaglio.webp" | "/media/Kinetic Type Tarantino/video.mp4" | "/media/Naturamatic/RISON5.mp4" | "/media/Naturamatic/RISON5_optimized.mp4" | "/media/Naturamatic/coverpic.jpg" | "/media/Naturamatic/coverpic.webp" | "/media/Naturamatic/foto magtomag 2025 naturamatic 2.jpg" | "/media/Naturamatic/foto magtomag 2025 naturamatic 2.webp" | "/media/Naturamatic/foto magtomag 2025 naturamatic.jpg" | "/media/Naturamatic/foto magtomag 2025 naturamatic.webp" | "/media/Naturamatic/libricino.mp4" | "/media/Treccani/mockup gelato 16_9.webp" | "/media/Treccani/poster gelato.webp" | "/media/UTE/mockup lato1.jpg" | "/media/UTE/mockup lato1.webp" | "/media/UTE/mockup lato2.jpg" | "/media/UTE/mockup lato2.webp" | "/media/UTE/mockup lattina.png" | "/media/UTE/mockup lattina.webp" | "/media/UTE/mockup4.png" | "/media/UTE/mockup4.webp" | "/media/UTE/mockup5.png" | "/media/UTE/mockup5.webp" | "/media/UTE/render.jpg" | "/media/UTE/render.webp" | "/media/UTOPIA/back alt.jpg" | "/media/UTOPIA/back alt.webp" | "/media/UTOPIA/back.jpg" | "/media/UTOPIA/back.webp" | "/media/UTOPIA/cover alt.jpg" | "/media/UTOPIA/cover alt.webp" | "/media/UTOPIA/cover.jpg" | "/media/UTOPIA/cover.webp" | "/media/UTOPIA/fronte vinile alt.png" | "/media/UTOPIA/fronte vinile alt.webp" | "/media/UTOPIA/fronte vinile.png" | "/media/UTOPIA/fronte vinile.webp" | "/media/UTOPIA/iOS Stocks 06  —◆ Dark 🍏.png" | "/media/UTOPIA/iOS Stocks 06  —◆ Dark 🍏.webp" | "/media/UTOPIA/iOS Stocks 06  —◇ Light 🍏.png" | "/media/UTOPIA/iOS Stocks 06  —◇ Light 🍏.webp" | "/media/UTOPIA/mockup cd alt fronte retro.png" | "/media/UTOPIA/mockup cd alt fronte retro.webp" | "/media/UTOPIA/mockup cd fronte retro.png" | "/media/UTOPIA/mockup cd fronte retro.webp" | "/media/UTOPIA/video.mp4" | "/media/What a MAG/1.jpg" | "/media/What a MAG/1.webp" | "/media/What a MAG/2-3.jpg" | "/media/What a MAG/2-3.webp" | "/media/What a MAG/4-5.jpg" | "/media/What a MAG/4-5.webp" | "/media/What a MAG/6-7.jpg" | "/media/What a MAG/6-7.webp" | "/media/What a MAG/8.jpg" | "/media/What a MAG/8.webp" | "/media/What a MAG/animazione.mp4" | "/media/coppedè/.DS_Store" | "/media/coppedè/borse.png" | "/media/coppedè/borse.webp" | "/media/coppedè/fotocoppedè_01 - dimensioni grandi.jpeg" | "/media/coppedè/fotocoppedè_01 - dimensioni grandi.webp" | "/media/coppedè/fotocoppedè_02 - dimensioni grandi(1).jpeg" | "/media/coppedè/fotocoppedè_02 - dimensioni grandi(1).webp" | "/media/coppedè/fotocoppedè_03 - dimensioni grandi(1).jpeg" | "/media/coppedè/fotocoppedè_03 - dimensioni grandi(1).webp" | "/media/coppedè/fotocoppedè_04 - dimensioni grandi.jpeg" | "/media/coppedè/fotocoppedè_04 - dimensioni grandi.webp" | "/media/coppedè/fotocoppedè_05 - dimensioni grandi(1).jpeg" | "/media/coppedè/fotocoppedè_05 - dimensioni grandi(1).webp" | "/media/coppedè/fotocoppedè_06 - dimensioni grandi(1).jpeg" | "/media/coppedè/fotocoppedè_06 - dimensioni grandi(1).webp" | "/media/coppedè/fotocoppedè_07 - dimensioni grandi(1).jpeg" | "/media/coppedè/fotocoppedè_07 - dimensioni grandi(1).webp" | "/media/coppedè/fotocoppedè_07 - dimensioni grandi.jpeg" | "/media/coppedè/fotocoppedè_07 - dimensioni grandi.webp" | "/media/coppedè/maglietta mockup.jpg" | "/media/coppedè/maglietta mockup.webp" | "/media/coppedè/tazze.png" | "/media/coppedè/tazze.webp" | "/media/coppedè/totebag1.png" | "/media/coppedè/totebag1.webp" | "/media/coppedè/video_mockup_coppede.mp4" | "/media/favicon.jpg" | string & {};
	}
}