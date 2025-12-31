/**
 * Project data for the portfolio
 * @typedef {Object} Project
 * @property {string} slug - URL-friendly identifier
 * @property {string} title - Project title
 * @property {string} client - Client name
 * @property {string} category - Project category
 * @property {string} year - Year of completion
 * @property {string} description - Project description
 * @property {string[]} images - Array of image paths
 * @property {string} previewImage - Image shown on hover in project list
 */

// Dynamic asset loading
const globbedImages = import.meta.glob('$lib/assets/projects/*/*.{jpg,jpeg,png,webp,mp4,mov,svg,gif,tiff,tif,heic}', {
	eager: true,
	query: '?url',
	import: 'default'
});

// Thumbnails for mobile/previews (Images only, resized)
const globbedThumbnails = import.meta.glob('$lib/assets/projects/*/*.{jpg,jpeg,png,webp,tiff,tif,heic}', {
	eager: true,
	query: { w: 400, format: 'webp' },
	import: 'default'
});

/**
 * Get sorted keys for a project
 * @param {string} slug 
 * @returns {string[]}
 */
function getProjectKeys(slug) {
	const projectKeys = Object.keys(globbedImages).filter(key => key.includes(`/projects/${slug}/`));
	projectKeys.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));
	return projectKeys;
}

/**
 * Get all images (URLs) for a specific project slug
 * @param {string} slug 
 * @returns {string[]}
 */
function getProjectImages(slug) {
	const keys = getProjectKeys(slug);
	return keys.map(key => globbedImages[key]);
}

/**
 * Get the thumbnail corresponding strictly to the first asset (preview image)
 * For videos, it looks for a generated _thumb.webp file
 * @param {string} slug
 * @returns {string|null}
 */
function getProjectThumbnail(slug) {
	const keys = getProjectKeys(slug);
	if (keys.length === 0) return null;
	
	// The first item in the carousel/list
	const firstKey = keys[0];
	
	// Check if the first asset is a video
	const isVideo = firstKey.toLowerCase().endsWith('.mp4') || firstKey.toLowerCase().endsWith('.mov');
	
	if (isVideo) {
		// Look for a corresponding _thumb.webp generated from the video
		// e.g., /projects/slug/1.mp4 -> /projects/slug/1_thumb.webp
		const thumbKey = firstKey.replace(/\.(mp4|mov)$/i, '_thumb.webp');
		if (globbedThumbnails[thumbKey]) {
			return globbedThumbnails[thumbKey];
		}
		// Fallback: check if thumbnail exists in full images glob
		if (globbedImages[thumbKey]) {
			return globbedImages[thumbKey];
		}
	}
	
	// For images, use the resized thumbnail if available
	if (globbedThumbnails[firstKey]) {
		return globbedThumbnails[firstKey];
	}
	
	return null;
}

// ... rawProjects definition ...


/** @type {Project[]} */
const rawProjects = [
	{
		slug: 'into-mag',
		title: 'INTO Mag',
		client: 'RUFA x Mag to Mag',
		category: 'Editorial Design',
		category_it: 'Design Editoriale',
		year: '2024',
		description_en: 'A deep dive into the unconscious. INTO is a magazine that visualizes mental landscapes, moving through the layers of human nature. By mixing visual storytelling with abstract typography and experimental layouts, the publication builds an immersive experience where the reader gets lost in the narrative.',
		description_it: 'Un’immersione nell’inconscio. INTO è un magazine che visualizza paesaggi mentali, attraversando i livelli della natura umana. Unendo storytelling visivo, tipografia astratta e layout sperimentali, la pubblicazione costruisce un’esperienza immersiva in cui il lettore si perde nella narrazione.',
	},
	{
		slug: 'poster-treccani',
		title: 'Italian Excellence Posters',
		title_it: 'Poster sulle eccellenze italiane',
		client: 'Treccani Emporium x RUFA',
		category: 'Poster Design',
		category_it: 'Poster Design',
		year: '2025',
		description_en: 'A visual tribute to the craft of gelato, celebrating it as a global icon of Italian artisanship. The design captures the ephemeral nature of the subject through a saturated vintage aesthetic and a highly chromatic palette that evokes immediate sensory pleasure. The custom type “bollente” modifies the Neon NBL typeface to create a deliberate contrast offering an irreverent, contemporary reading of a traditional subject.',
		description_it: 'Un tributo visivo all’arte del gelato, celebrato come icona globale dell’artigianato italiano. Il design cattura la natura effimera del soggetto attraverso un’estetica vintage satura e una palette cromatica accesa che evoca un piacere sensoriale immediato. Il lettering custom “bollente”, modifica della typeface Neon NBL, crea un contrasto deliberato offrendo una lettura irriverente e contemporanea di un soggetto tradizionale.',
	},
	{
		slug: 'coppede',
		title: 'Coppedè: un\'enciclopedia urbana',
		client: 'RUFA',
		category: 'Editorial Design',
		category_it: 'Design Editoriale',
		year: '2025',
		description_en: 'An alternative guide to Rome’s Coppedè district, decoding its dense symbolic language. Beyond the striking aesthetics, this publication identifies and explains the architectural symbols embedded in the district’s fabric. Paired with a functional minimap, the layout serves as a compact tool for navigating and understanding the visual complexity of Gino Coppedè’s vision.',
		description_it: 'Una guida alternativa al quartiere Coppedè di Roma, volta a decodificare il suo denso linguaggio simbolico. Oltre l’estetica impattante, la pubblicazione identifica e spiega i simboli architettonici intessuti nel tessuto del quartiere. Accompagnato da una minimappa funzionale, il layout funge da strumento compatto per navigare e comprendere la complessità visiva della visione di Gino Coppedè.',
	},
	{
		slug: 'naturamatic',
		title: 'Naturamatic',
		client: 'RUFA',
		category: 'Editorial Design',
		category_it: 'Design Editoriale',
		year: '2024/25',
		description_en: 'A collective editorial project that blends deconstructed artworks and lyrics into a continuous visual narrative. The layout mirrors a rising tide, gradually flooding the pages until the final spread is submerged in a dynamic, calibrated chaos.',
		description_it: 'Un progetto editoriale collettivo che fonde opere d’arte decostruite e testi musicali in una narrazione visiva continua. Il layout rispecchia una marea montante, inondando gradualmente le pagine fino a sommergere l’ultima doppia pagina in un caos dinamico e calibrato.',
	},
	{
		slug: 'dottie',
		title: 'DOTTIE',
		client: 'RUFA',
		category: 'Type Design',
		category_it: 'Type Design',
		year: '2025',
		description_en: 'A modular variable font constructed entirely from circular dots and rounded rectangles. Assembled within a strict grid, Dottie explores the tension between geometric purity and typographic readability.',
		description_it: 'Una font variabile modulare costruita interamente da punti circolari e rettangoli arrotondati. Assemblata all’interno di una griglia rigorosa, Dottie esplora la tensione tra purezza geometrica e leggibilità tipografica.',
		gumroadLink: 'https://mattiacapomagi.gumroad.com/l/dottievf',
	},
	{
		slug: 'what-a-mag',
		title: 'What a MAG! Zine',
		client: 'Mag to Mag',
		category: 'Editorial Design',
		category_it: 'Design Editoriale',
		year: '2024',
		description_en: 'An instant-zine created live during the Mag to Mag festival in Milan. Produced in just over 10 hours, the design captures the festival’s raw energy in a folded A4 format, prioritizing speed, impact, and the immediacy of independent publishing.',
		description_it: 'Una instant-zine creata dal vivo durante il festival Mag to Mag a Milano. Prodotta in poco più di 10 ore, il design cattura l’energia grezza del festival in un formato A4 pieghevole, dando priorità a velocità, impatto e immediatezza dell’editoria indipendente.',
	},
	{
		slug: 'utopia-cover',
		title: 'UTOPIA cover redesign',
		client: 'RUFA',
		category: 'Brand/Editorial Design',
		category_it: 'Brand/Design Editoriale',
		year: '2024/25',
		description_en: 'Translating the sonic complexity of Utopia into a visual system. The cover acts as an extension of the album, using spectrograms to visualize frequencies. A clash of handwritten text and sharp sans-serif typography underscores the contrast between organic sound and structural experimentation.',
		description_it: 'Tradurre la complessità sonora di Utopia in un sistema visivo. La cover agisce come estensione dell’album, utilizzando spettrogrammi per visualizzare le frequenze. Lo scontro tra testo manoscritto e tipografia sans-serif affilata sottolinea il contrasto tra suono organico e sperimentazione strutturale.',
	},
	{
		slug: 'kinetic-type-tarantino',
		title: 'Kinetic Type Tarantino',
		client: 'RUFA',
		category: 'Motion Design',
		category_it: 'Motion Design',
		year: '2024/25',
		description_en: 'Kinetic typography exploration based on Tarantino’s ‘Once Upon a Time in Hollywood’. The animation mirrors the film’s distinctive mood, treating text as a narrative actor to enhance storytelling through motion and rhythm.',
		description_it: 'Esplorazione di tipografia cinetica basata su "C’era una volta a... Hollywood" di Tarantino. L’animazione rispecchia il mood distintivo del film, trattando il testo come attore narrativo per potenziare lo storytelling attraverso movimento e ritmo.',
	},
	{
		slug: 'ute-limited-edition',
		title: 'UTE Limited edition',
		client: 'RUFA x Jungle Juice Brewing',
		category: 'Packaging Design',
		category_it: 'Packaging Design',
		year: '2024/25',
		description_en: 'Packaging design for UTE, a Keller Pils by Jungle Juice. The concept captures summery, easygoing vibes through a playful mix of vector art and photography. The can features a back-view figure with branding integrated into the swimwear, while the box references classic ice cooler aesthetics.',
		description_it: 'Packaging design per UTE, una Keller Pils di Jungle Juice. Il concept cattura le vibrazioni estive e spensierate attraverso un mix giocoso di vettoriale e fotografia. La lattina presenta una figura di spalle con il branding integrato nel costume, mentre la scatola cita l’estetica delle classiche borse frigo.',
	},
	{
		slug: 'inception-intro',
		title: 'Inception intro',
		client: 'RUFA',
		category: '3D Modeling + Motion',
		category_it: 'Modellazione 3D + Motion',
		year: '2025',
		description_en: 'A conceptual intro sequence for Christopher Nolan’s Inception. Iconic character totems were modeled with precise attention to form and scale, then animated to evoke the film’s suspended, dreamlike tone. A study in combining 3D precision with atmospheric visual rhythm.',
		description_it: 'Una sequenza intro concettuale per Inception di Christopher Nolan. I totem iconici dei personaggi sono stati modellati con precisa attenzione a forma e scala, poi animati per evocare il tono sospeso e onirico del film. Uno studio nel combinare precisione 3D con ritmo visivo atmosferico.',
	},
];

// Hydrate projects with their images
export const projects = rawProjects.map(p => {
	const images = getProjectImages(p.slug);
  const thumbnail = getProjectThumbnail(p.slug);
	
	return {
		...p,
		images,
    thumbnail,
		// If explicit previewImage is set in data, use it, otherwise use first image/video
		previewImage: p.previewImage || images[0]
	};
});



/**
 * Find a project by its slug
 * @param {string} slug 
 * @returns {Project | undefined}
 */
export function getProjectBySlug(slug) {
	return projects.find(p => p.slug === slug);
}
