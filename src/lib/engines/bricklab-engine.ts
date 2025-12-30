/**
 * BRICKLAB Mosaic Generator Engine
 * Converted from React/TypeScript to vanilla TypeScript for Svelte
 */

export type RGB = { r: number; g: number; b: number };
export type Grid = {
  columns: number;
  rows: number;
  data: (RGB | null)[];
};

/**
 * Draws a single "Plastic Brick" on the canvas context.
 */
export const drawBrick = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  color: RGB
) => {
  // Base Color
  ctx.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;
  ctx.fillRect(x, y, size, size);

  const bevelSize = Math.max(2, size * 0.15);

  // Highlights (White)
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';

  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + size, y);
  ctx.lineTo(x + size - bevelSize, y + bevelSize);
  ctx.lineTo(x + bevelSize, y + bevelSize);
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x, y + size);
  ctx.lineTo(x + bevelSize, y + size - bevelSize);
  ctx.lineTo(x + bevelSize, y + bevelSize);
  ctx.fill();

  // Shadows (Black)
  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';

  ctx.beginPath();
  ctx.moveTo(x + size, y);
  ctx.lineTo(x + size, y + size);
  ctx.lineTo(x + size - bevelSize, y + size - bevelSize);
  ctx.lineTo(x + size - bevelSize, y + bevelSize);
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(x, y + size);
  ctx.lineTo(x + size, y + size);
  ctx.lineTo(x + size - bevelSize, y + size - bevelSize);
  ctx.lineTo(x + bevelSize, y + size - bevelSize);
  ctx.fill();
};

/**
 * Analyzes the image and returns a grid of colors
 */
export const computeMosaicGrid = (
  imageSource: HTMLImageElement | HTMLCanvasElement,
  blockSize: number
): Grid => {
  const w = imageSource.width;
  const h = imageSource.height;

  const columns = Math.ceil(w / blockSize);
  const rows = Math.ceil(h / blockSize);

  // Helper canvas for downsampling
  const canvas = document.createElement('canvas');
  canvas.width = columns;
  canvas.height = rows;
  const ctx = canvas.getContext('2d', { willReadFrequently: true })!;

  ctx.drawImage(imageSource, 0, 0, columns, rows);
  const pixelData = ctx.getImageData(0, 0, columns, rows).data;

  const data: (RGB | null)[] = [];

  for (let i = 0; i < pixelData.length; i += 4) {
    const alpha = pixelData[i + 3];
    if (alpha < 50) {
      data.push(null);
    } else {
      data.push({
        r: pixelData[i],
        g: pixelData[i + 1],
        b: pixelData[i + 2]
      });
    }
  }

  return { columns, rows, data };
};

/**
 * Renders a computed grid to a target canvas context
 */
export const renderGridToCanvas = (
  ctx: CanvasRenderingContext2D,
  grid: Grid,
  pixelSize: number
) => {
  const { columns, rows, data } = grid;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      const index = r * columns + c;
      const color = data[index];
      if (color) {
        drawBrick(ctx, c * pixelSize, r * pixelSize, pixelSize, color);
      }
    }
  }
};

/**
 * Generates an SVG string of the mosaic
 */
export const renderGridToSVG = (
  grid: Grid,
  totalWidth: number,
  totalHeight: number
): string => {
  const { columns, rows, data } = grid;

  const blockW = totalWidth / columns;
  const blockH = totalHeight / rows;

  let svgBody = '';

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      const index = r * columns + c;
      const color = data[index];
      if (color) {
        const x = c * blockW;
        const y = r * blockH;
        const fill = `rgb(${color.r},${color.g},${color.b})`;

        // Base rect
        svgBody += `<rect x="${x}" y="${y}" width="${blockW}" height="${blockH}" fill="${fill}" />`;

        svgBody += `<path d="M${x},${y} h${blockW} l-${blockW * 0.15},${blockH * 0.15} h-${blockW * 0.7} z" fill="white" fill-opacity="0.4" />`;
        svgBody += `<path d="M${x},${y} v${blockH} l${blockW * 0.15},-${blockH * 0.15} v-${blockH * 0.7} z" fill="white" fill-opacity="0.4" />`;
        svgBody += `<path d="M${x},${y + blockH} h${blockW} l-${blockW * 0.15},-${blockH * 0.15} h-${blockW * 0.7} z" fill="black" fill-opacity="0.2" />`;
        svgBody += `<path d="M${x + blockW},${y} v${blockH} l-${blockW * 0.15},-${blockH * 0.15} v-${blockH * 0.7} z" fill="black" fill-opacity="0.2" />`;
      }
    }
  }

  return `<svg width="${totalWidth}" height="${totalHeight}" viewBox="0 0 ${totalWidth} ${totalHeight}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="transparent"/>
    ${svgBody}
  </svg>`.trim();
};
