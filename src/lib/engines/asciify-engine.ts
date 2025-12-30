// Dense alphanumeric + symbols (Standard 70-char ramp for high detail)
export const CHARS_ALL = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,\"^`'. ";

// Symbols only (when letters excluded)
export const CHARS_SYMBOLS = "@#$*!=+~-,.: ";

/* 
 * Sobel Kernels for Edge Detection
 */
const SOBEL_X = [
  [-1, 0, 1],
  [-2, 0, 2],
  [-1, 0, 1]
];

const SOBEL_Y = [
  [-1, -2, -1],
  [0, 0, 0],
  [1, 2, 1]
];

export interface AsciiCell {
  char: string;
  color: string;
}

/**
 * Get character set based on toggle
 */
export function getPresetChars(useLetters: boolean): string {
  return useLetters ? CHARS_ALL : CHARS_SYMBOLS;
}

function getPixel(data: Uint8ClampedArray, width: number, height: number, x: number, y: number) {
  if (x < 0 || x >= width || y < 0 || y >= height) return 0;
  const i = (y * width + x) * 4;
  // Use luminance for edge detection intensity
  return 0.21 * data[i] + 0.72 * data[i + 1] + 0.07 * data[i + 2];
}

/**
 * Convert ImageData to Structured ASCII Grid
 */
export function pixelsToAsciiGrid(
  imageData: ImageData,
  charset: string,
  useEdgeDetection: boolean,
  useColor: boolean,
  colorBoost: number = 0 // Optional saturation boost for colors
): AsciiCell[][] {
  const { width, height, data } = imageData;
  const charLen = charset.length;
  const grid: AsciiCell[][] = [];

  for (let y = 0; y < height; y++) {
    const row: AsciiCell[] = [];
    for (let x = 0; x < width; x++) {
      const offset = (y * width + x) * 4;
      const r = data[offset];
      const g = data[offset + 1];
      const b = data[offset + 2];
      
      let char = ' ';
      let isEdge = false;

      // --- SOBEL EDGE DETECTION ---
      if (useEdgeDetection) {
        let gx = 0;
        let gy = 0;

        for (let ky = -1; ky <= 1; ky++) {
          for (let kx = -1; kx <= 1; kx++) {
            const pixelVal = getPixel(data, width, height, x + kx, y + ky);
            gx += pixelVal * SOBEL_X[ky + 1][kx + 1];
            gy += pixelVal * SOBEL_Y[ky + 1][kx + 1];
          }
        }

        const magnitude = Math.sqrt(gx * gx + gy * gy);
        
        // Edge Threshold - Tunable parameter
        if (magnitude > 120) { 
          isEdge = true;
          const angle = Math.atan2(gy, gx) * (180 / Math.PI);
          // Map angle to char: | - / \ (Visual direction based on edge gradient)
          const absAngle = Math.abs(angle);
          if (absAngle < 22.5 || absAngle > 157.5) char = "|"; 
          else if (absAngle > 67.5 && absAngle < 112.5) char = "-";
          else if (angle > 0) char = "\\"; 
          else char = "/";
        }
      }

      // --- LUMINANCE MAPPING (Fallback or Non-Edge) ---
      if (!isEdge) {
        const gray = 0.21 * r + 0.72 * g + 0.07 * b;
        const normalized = Math.max(0, Math.min(1, gray / 255));
        
        // INVERT MAPPING: Dark pixels should be Dense chars (Index 0 is Dense $)
        // White pixels should be Empty (Index Last is Space)
        const charIndexFallback = Math.floor((1 - normalized) * (charLen - 1));
        char = charset[charIndexFallback];
      }

      // --- COLOR MAPPING ---
      const color = useColor ? `rgb(${r},${g},${b})` : "";
      
      row.push({ char, color });
    }
    grid.push(row);
  }
  return grid;
}

/**
 * Render ASCII Grid to Canvas
 */
export function renderAsciiToCanvas(
  grid: AsciiCell[][],
  canvas: HTMLCanvasElement,
  options: {
    bgColor: string;
    textColor: string;
    fontSize: number;
    fontFamily?: string;
    transparentBg?: boolean;
  }
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const { bgColor, textColor, fontSize, fontFamily = "monospace", transparentBg = false } = options;
  if (grid.length === 0 || grid[0].length === 0) return;

  const rows = grid.length;
  const cols = grid[0].length;
  
  // Measure text
  ctx.font = `${fontSize}px ${fontFamily}`;
  const charWidth = ctx.measureText("M").width;
  const lineHeight = fontSize; // Tight fit

  // Resize canvas
  canvas.width = cols * charWidth;
  canvas.height = rows * lineHeight;

  // Re-set font
  ctx.font = `${fontSize}px ${fontFamily}`;
  ctx.textBaseline = "top";

  if (!transparentBg) {
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  } else {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const cell = grid[y][x];
      
      // Use cell color if specific, otherwise global text color
      ctx.fillStyle = cell.color ? cell.color : textColor;
      
      ctx.fillText(cell.char, x * charWidth, y * lineHeight);
    }
  }
}
