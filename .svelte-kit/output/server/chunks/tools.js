const tools = [
  {
    slug: "bricklab",
    title: "BRICKLAB",
    year: "2025",
    description: "A brutalist mosaic generator that transforms images into vector-ready brick layouts.",
    description_it: "Un generatore di mosaici brutalisti che trasforma immagini in layout di mattoncini pronti per la stampa.",
    externalUrl: null,
    // Will be embedded
    embedPath: "/tools/bricklab",
    // Internal embed route
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
