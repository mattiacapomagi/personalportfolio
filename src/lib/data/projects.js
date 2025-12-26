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
		client: 'INTO Magazine',
		category: 'Editorial Design',
		year: '2024',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
		images: ['/images/placeholder-1.jpg', '/images/placeholder-2.jpg', '/images/placeholder-3.jpg'],
		previewImage: '/images/placeholder-1.jpg'
	},
	{
		slug: 'dottie',
		title: 'DOTTIE',
		client: 'Dottie Studio',
		category: 'Branding',
		year: '2024',
		description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
		images: ['/images/placeholder-2.jpg', '/images/placeholder-1.jpg'],
		previewImage: '/images/placeholder-2.jpg'
	},
	{
		slug: 'visual-identity',
		title: 'Visual Identity',
		client: 'Studio ABC',
		category: 'Branding',
		year: '2023',
		description: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
		images: ['/images/placeholder-3.jpg', '/images/placeholder-1.jpg', '/images/placeholder-2.jpg'],
		previewImage: '/images/placeholder-3.jpg'
	},
	{
		slug: 'poster-series',
		title: 'Poster Series',
		client: 'Gallery XYZ',
		category: 'Print',
		year: '2023',
		description: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',
		images: ['/images/placeholder-1.jpg', '/images/placeholder-3.jpg'],
		previewImage: '/images/placeholder-1.jpg'
	},
	{
		slug: 'packaging-design',
		title: 'Packaging Design',
		client: 'Brand Co.',
		category: 'Packaging',
		year: '2022',
		description: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.',
		images: ['/images/placeholder-2.jpg', '/images/placeholder-3.jpg', '/images/placeholder-1.jpg'],
		previewImage: '/images/placeholder-2.jpg'
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
