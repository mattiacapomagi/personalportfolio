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

/** @type {Project[]} */
export const projects = [
	{
		slug: 'into-mag',
		title: 'INTO Mag',
		client: 'RUFA x Mag to Mag',
		category: 'Editorial Design',
		year: '2024',
		description: 'A comprehensive editorial design project exploring the intersection of modern typography and layout. Created for the Mag to Mag collaboration.',
		images: ['/images/placeholder-1.jpg'],
		previewImage: '/images/placeholder-1.jpg'
	},
	{
		slug: 'poster-treccani',
		title: 'Poster treccani emporium x rufa',
		client: 'Treccani Emporium x RUFA',
		category: 'Poster Design',
		year: '2025',
		description: 'Series of posters designed for Treccani Emporium, focusing on visual synthesis and cultural heritage.',
		images: ['/images/placeholder-2.jpg'],
		previewImage: '/images/placeholder-2.jpg'
	},
	{
		slug: 'coppede',
		title: 'Coppedè: un\'enciclopedia urbana',
		client: 'RUFA',
		category: 'Editorial Design',
		year: '2025',
		description: 'An urban encyclopedia project documenting the architectural and historical nuances of the Coppedè district.',
		images: ['/images/placeholder-3.jpg'],
		previewImage: '/images/placeholder-3.jpg'
	},
	{
		slug: 'naturamatic',
		title: 'Naturamatic',
		client: 'RUFA',
		category: 'Editorial Design',
		year: '2024/25',
		description: 'Editorial project blending natural themes with automatic design processes.',
		images: ['/images/placeholder-1.jpg'],
		previewImage: '/images/placeholder-1.jpg'
	},
	{
		slug: 'dottie',
		title: 'DOTTIE',
		client: 'RUFA',
		category: 'Type Design',
		year: '2025',
		description: 'A custom typeface designed with a focus on geometric purity and readability.',
		images: ['/images/placeholder-2.jpg'],
		previewImage: '/images/placeholder-2.jpg'
	},
	{
		slug: 'what-a-mag',
		title: 'What a MAG! Zine',
		client: 'Mag to Mag',
		category: 'Editorial Design',
		year: '2024',
		description: 'A zestful zine created to celebrate independent publishing and magazine culture.',
		images: ['/images/placeholder-3.jpg'],
		previewImage: '/images/placeholder-3.jpg'
	},
	{
		slug: 'utopia-cover',
		title: 'UTOPIA cover redesign',
		client: 'RUFA',
		category: 'Brand/Editorial Design',
		year: '2024/25',
		description: 'Redesign of the UTOPIA magazine cover, focusing on bold typography and abstract imagery.',
		images: ['/images/placeholder-1.jpg'],
		previewImage: '/images/placeholder-1.jpg'
	},
	{
		slug: 'kinetic-type-tarantino',
		title: 'Kinetic Type Tarantino',
		client: 'RUFA',
		category: 'Motion Design',
		year: '2024/25',
		description: 'Motion design piece exploring kinetic typography through the lens of Tarantino\'s filmography.',
		images: ['/images/placeholder-2.jpg'],
		previewImage: '/images/placeholder-2.jpg'
	},
	{
		slug: 'ute-limited-edition',
		title: 'UTE Limited edition',
		client: 'RUFA x Jungle Juice Brewing',
		category: 'Packaging Design',
		year: '2024/25',
		description: 'Limited edition packaging design for a craft beer collaboration.',
		images: ['/images/placeholder-3.jpg'],
		previewImage: '/images/placeholder-3.jpg'
	},
	{
		slug: 'inception-intro',
		title: 'inception intro',
		client: 'RUFA',
		category: '3D Modeling + Motion',
		year: '2025',
		description: 'A 3D motion project reimagining the introduction sequence of the movie Inception.',
		images: ['/images/placeholder-1.jpg'],
		previewImage: '/images/placeholder-1.jpg'
	}
];

/**
 * Find a project by its slug
 * @param {string} slug 
 * @returns {Project | undefined}
 */
export function getProjectBySlug(slug) {
	return projects.find(p => p.slug === slug);
}
