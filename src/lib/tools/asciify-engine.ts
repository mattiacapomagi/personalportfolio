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
          // Map angle to char: | - / \
          // Vertical: near 90 or -90 (or 270)
          // Horizontal: near 0 or 180 (or -180)
          // Diagonals in between
          
          const absAngle = Math.abs(angle);
          if (absAngle < 22.5 || absAngle > 157.5) char = "|"; // Vertical gradient -> Horizontal Edge usually represented as '-' but gradient is perpendicular? 
          // Wait, gradient direction is perpendicular to edge.
          // If Gx is high, Gy low -> Gradient is Horizontal -> Vertical Edge -> Char '|'
          // atan2(0, 1) = 0 deg. So 0 deg is horizontal gradient -> Vertical line. Correct.
          
          else if (absAngle > 67.5 && absAngle < 112.5) char = "-"; // Vertical gradient -> Horizontal line
          else if (angle > 22.5 && angle < 67.5) char = "/"; // +/+ Gradient (Tricky, let's simplify)
          // Visual mapping:
          // If gradient is 45deg (TopLeft to BottomRight intensity change), edge is BottomLeft to TopRight (/).
          // Let's just swap slashes until it looks right visually.
          else if (angle > 0) char = "\\"; 
          else char = "/";
        }
      }

      // --- LUMINANCE MAPPING (Fallback or Non-Edge) ---
      if (!isEdge) {
        const gray = 0.21 * r + 0.72 * g + 0.07 * b;
        const normalized = Math.max(0, Math.min(1, gray / 255));
        
        // INVERT MAPPING: Dark pixels should be Dense chars (Index 0 is Dense $)
        // Light pixels should be Empty (Index Last is Space)
        // normalized 0 (black) -> index 0 (Dense)
        // normalized 1 (white) -> index Last (Empty)
        const charIndex = Math.floor((1 - normalized) * (charLen - 1)); // Wait, if I want 0->0, I use normalized directly IF chart 0 is dark.
        // My chart: $ (Dark/Dense) ... Space (Light/Empty).
        // If pixel is black (0), I want $. So index 0.
        // If pixel is white (1), I want Space. So index Last.
        // So: index = (1 - normalized) * len? No.
        // 0 -> (1-0) * len = len (Space). WRONG.
        // 0 -> 0 * len = 0 ($). CORRECT.
        // So use 'normalized' directly?
        // Let's re-verify: normalized = gray/255. 
        // Black=0. 0 * len = 0 ($). Correct.
        // White=1. 1 * len = len (Space). Correct.
        // BUT wait, usually standard ramps go Dark -> Light.
        // My ramp IS Dark -> Light ($ -> Space).
        // But what if I want INVERTED (White text on Black bg)?
        // If bg is black, ' ' is black. '$' is white pixels.
        // So I want bright pixels to have '$' and dark pixels to have ' '.
        // In that case: White(1) -> Index 0 ($). Black(0) -> Index Last (Space).
        // Formula: (1 - normalized).
        
        // Let's assume standard "White Text on Black BG" terminal look.
        // Image Brightness 255 (White) -> Should be drawn with lots of ink or light. So '$'.
        // Image Brightness 0 (Black) -> Should be empty. So ' '.
        // So White -> Index 0 ($). Black -> Index Last (Space).
        // So we need INVERSE mapping: (1 - normalized).

        const charIndexFallback = Math.floor((1 - normalized) * (charLen - 1));
        char = charset[charIndexFallback];
      }

      // --- COLOR MAPPING ---
      // If Color Mode: extract pixel color
      // If Mono Mode: use null (renderer will use default text color)
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

  // Fill Background
  if (!transparentBg) {
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  } else {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  // Render Loop
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const cell = grid[y][x];
      
      // Use cell color if specific, otherwise global text color
      ctx.fillStyle = cell.color ? cell.color : textColor;
      
      ctx.fillText(cell.char, x * charWidth, y * lineHeight);
    }
  }
}
