
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
		RouteId(): "/" | "/about" | "/bento" | "/projects" | "/projects/[slug]" | "/tools" | "/tools/asciify" | "/tools/dithering" | "/tools/[slug]";
		RouteParams(): {
			"/projects/[slug]": { slug: string };
			"/tools/[slug]": { slug: string }
		};
		LayoutParams(): {
			"/": { slug?: string };
			"/about": Record<string, never>;
			"/bento": Record<string, never>;
			"/projects": { slug?: string };
			"/projects/[slug]": { slug: string };
			"/tools": { slug?: string };
			"/tools/asciify": Record<string, never>;
			"/tools/dithering": Record<string, never>;
			"/tools/[slug]": { slug: string }
		};
		Pathname(): "/" | "/about" | "/about/" | "/bento" | "/bento/" | "/projects" | "/projects/" | `/projects/${string}` & {} | `/projects/${string}/` & {} | "/tools" | "/tools/" | "/tools/asciify" | "/tools/asciify/" | "/tools/dithering" | "/tools/dithering/" | `/tools/${string}` & {} | `/tools/${string}/` & {};
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/.DS_Store" | "/.nojekyll" | "/fonts/Icon\r" | "/fonts/PPKyoto-Extrabold.woff" | "/fonts/PPKyoto-Extrabold.woff2" | "/fonts/PPKyoto-ExtraboldItalic.woff" | "/fonts/PPKyoto-ExtraboldItalic.woff2" | "/fonts/PPKyoto-Heavy.woff" | "/fonts/PPKyoto-Heavy.woff2" | "/fonts/PPKyoto-HeavyItalic.woff" | "/fonts/PPKyoto-HeavyItalic.woff2" | "/fonts/PPKyoto-Light.woff" | "/fonts/PPKyoto-Light.woff2" | "/fonts/PPKyoto-LightItalic.woff" | "/fonts/PPKyoto-LightItalic.woff2" | "/fonts/PPKyoto-Medium.woff" | "/fonts/PPKyoto-Medium.woff2" | "/fonts/PPKyoto-MediumItalic.woff" | "/fonts/PPKyoto-MediumItalic.woff2" | "/fonts/PPKyoto-Regular.woff" | "/fonts/PPKyoto-Regular.woff2" | "/fonts/PPKyoto-RegularItalic.woff" | "/fonts/PPKyoto-RegularItalic.woff2" | "/fonts/PPKyoto-Thin.woff" | "/fonts/PPKyoto-Thin.woff2" | "/fonts/PPKyoto-ThinItalic.woff" | "/fonts/PPKyoto-ThinItalic.woff2" | "/media/.DS_Store" | "/media/brand/favicon.jpg" | "/media/brand/gumroad-1 (1).svg" | string & {};
	}
}