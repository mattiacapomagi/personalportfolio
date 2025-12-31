const tools = [
  {
    slug: "bricklab",
    title: "BRICKLAB",
    year: "2025",
    description: "A brutalist mosaic generator that transforms images into vector-ready brick layouts.",
    description_it: "Un generatore di mosaici brutalisti che trasforma immagini in layout di mattoncini pronti per la stampa.",
    externalUrl: null,
    embedPath: "/tools/bricklab",
    previewImage: "/media/tools/bricklab-preview.webp"
  },
  {
    slug: "asciify",
    title: "ASCII-fy",
    year: "2025",
    description: "Image to ASCII Art Converter",
    description_it: "Convertitore Immagini in Arte ASCII",
    externalUrl: null,
    embedPath: "/tools/asciify",
    previewImage: "/media/tools/asciify-preview.png"
  },
  {
    slug: "dithering",
    title: "DITHERING",
    year: "2025",
    description: "Multi-algorithm Dithering Studio",
    description_it: "Studio di Dithering Multi-algoritmo",
    externalUrl: null,
    embedPath: "/tools/dithering",
    previewImage: "/media/tools/bricklab-preview.webp"
  }
];
function getToolBySlug(slug) {
  return tools.find((tool) => tool.slug === slug);
}
export {
  getToolBySlug as g,
  tools as t
};
