/**
 * Tool data for the portfolio
 * @typedef {Object} Tool
 * @property {string} slug - URL-friendly identifier
 * @property {string} title - Tool title
 * @property {string} year - Year created
 * @property {string} description - Short description (English)
 * @property {string} description_it - Short description (Italian)
 * @property {string} [externalUrl] - External link (if hosted elsewhere)
 * @property {string} [embedPath] - Path to embedded tool (if hosted internally)
 * @property {string} previewImage - Preview image for the tool
 */

/** @type {Tool[]} */
export const tools = [
  {
    slug: 'bricklab',
    title: 'BRICKLAB',
    year: '2025',
    description: 'A brutalist mosaic generator that transforms images into vector-ready brick layouts.',
    description_it: 'Un generatore di mosaici brutalisti che trasforma immagini in layout di mattoncini pronti per la stampa.',
    externalUrl: null, // Will be embedded
    embedPath: '/tools/bricklab', // Internal embed route
    previewImage: '/media/tools/bricklab-preview.webp'
  },
  {
    slug: "asciify",
    title: "ASCII-fy",
    year: "2025",
    description: "Image to ASCII Art Converter",
    description_it: "Convertitore Immagini in Arte ASCII",
    externalUrl: null,
    embedPath: "/tools/asciify",
    previewImage: "/images/tools/asciify-preview.png",
  },
  {
    slug: "dithering",
    title: "DITHERING",
    year: "2025",
    description: "Multi-algorithm Dithering Studio",
    description_it: "Studio di Dithering Multi-algoritmo",
    externalUrl: null,
    embedPath: "/tools/dithering",
    previewImage: "/media/tools/bricklab-preview.webp", // Placeholder
  },
];

/**
 * Find a tool by its slug
 * @param {string} slug 
 * @returns {Tool | undefined}
 */
export function getToolBySlug(slug) {
  return tools.find(tool => tool.slug === slug);
}
