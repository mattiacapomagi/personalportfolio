/**
 * Dithering Engine
 * Advanced Algorithms & Palettes
 */

// --- TYPES ---
export interface Color {
  r: number;
  g: number;
  b: number;
}

export type DitherAlgorithm =
  | "FloydSteinberg"
  | "FalseFloydSteinberg"
  | "Atkinson"
  | "Stucki"
  | "Burkes"
  | "Sierra3"
  | "Sierra2"
  | "SierraLite"
  | "Jarvis"
  | "Bayer2x2"
  | "Bayer4x4"
  | "Bayer8x8"
  | "Bayer16x16"
  | "Threshold"
  | "SimpleNoise";

// --- PALETTES ---

export const PALETTES: Record<string, Color[]> = {
  GRAYSCALE: [
    { r: 0, g: 0, b: 0 },
    { r: 25, g: 25, b: 25 },
    { r: 51, g: 51, b: 51 },
    { r: 76, g: 76, b: 76 },
    { r: 102, g: 102, b: 102 },
    { r: 127, g: 127, b: 127 },
    { r: 153, g: 153, b: 153 },
    { r: 178, g: 178, b: 178 },
    { r: 204, g: 204, b: 204 },
    { r: 229, g: 229, b: 229 },
    { r: 255, g: 255, b: 255 },
  ],
  GAMEBOY: [
    { r: 15, g: 56, b: 15 },
    { r: 48, g: 98, b: 48 },
    { r: 139, g: 172, b: 15 },
    { r: 155, g: 188, b: 15 },
  ],
  CGA: [
    { r: 0, g: 0, b: 0 },
    { r: 0, g: 0, b: 170 },
    { r: 0, g: 170, b: 0 },
    { r: 0, g: 170, b: 170 },
    { r: 170, g: 0, b: 0 },
    { r: 170, g: 0, b: 170 },
    { r: 170, g: 85, b: 0 },
    { r: 170, g: 170, b: 170 },
    { r: 85, g: 85, b: 85 },
    { r: 85, g: 85, b: 255 },
    { r: 85, g: 255, b: 85 },
    { r: 85, g: 255, b: 255 },
    { r: 255, g: 85, b: 85 },
    { r: 255, g: 85, b: 255 },
    { r: 255, g: 255, b: 85 },
    { r: 255, g: 255, b: 255 },
  ],
  MACINTOSH: [
    { r: 255, g: 255, b: 255 },
    { r: 255, g: 255, b: 0 },
    { r: 255, g: 102, b: 0 },
    { r: 221, g: 0, b: 0 },
    { r: 255, g: 0, b: 153 },
    { r: 51, g: 0, b: 153 },
    { r: 0, g: 0, b: 204 },
    { r: 0, g: 153, b: 255 },
    { r: 0, g: 170, b: 0 },
    { r: 0, g: 102, b: 0 },
    { r: 102, g: 51, b: 0 },
    { r: 153, g: 102, b: 51 },
    { r: 187, g: 187, b: 187 },
    { r: 136, g: 136, b: 136 },
    { r: 68, g: 68, b: 68 },
    { r: 0, g: 0, b: 0 },
  ],
  C64: [
    {r: 0, g: 0, b: 0}, {r: 255, g: 255, b: 255}, {r: 136, g: 0, b: 0}, {r: 170, g: 255, b: 238},
    {r: 204, g: 68, b: 204}, {r: 0, g: 204, b: 85}, {r: 0, g: 0, b: 170}, {r: 238, g: 238, b: 119},
    {r: 221, g: 136, b: 85}, {r: 102, g: 68, b: 0}, {r: 255, g: 119, b: 119}, {r: 51, g: 51, b: 51},
    {r: 119, g: 119, b: 119}, {r: 170, g: 255, b: 102}, {r: 0, g: 136, b: 255}, {r: 187, g: 187, b: 187}
  ],
  APPLE_II: [
    {r: 0, g: 0, b: 0}, {r: 255, g: 255, b: 255}, {r: 136, g: 0, b: 0}, {r: 170, g: 255, b: 238}, // Approximate / subset
    {r: 20, g: 245, b: 60}, {r: 167, g: 11, b: 255} 
  ],
  SEPIA: [
    {r: 64, g: 32, b: 0},
    {r: 128, g: 64, b: 0},
    {r: 192, g: 128, b: 64},
    {r: 255, g: 220, b: 192}
  ],
  GRAY_2BIT: [
    { r: 0, g: 0, b: 0 },
    { r: 85, g: 85, b: 85 },
    { r: 170, g: 170, b: 170 },
    { r: 255, g: 255, b: 255 },
  ],
  TELETEXT: [
    {r:0,g:0,b:0}, {r:255,g:0,b:0}, {r:0,g:255,b:0}, {r:255,g:255,b:0},
    {r:0,g:0,b:255}, {r:255,g:0,b:255}, {r:0,g:255,b:255}, {r:255,g:255,b:255}
  ],
  PICO_8: [
    {r:0,g:0,b:0}, {r:29,g:43,b:83}, {r:126,g:37,b:83}, {r:0,g:135,b:81},
    {r:171,g:82,b:54}, {r:95,g:87,b:79}, {r:194,g:195,b:199}, {r:255,g:241,b:232},
    {r:255,g:0,b:77}, {r:255,g:163,b:0}, {r:255,g:236,b:39}, {r:0,g:228,b:54},
    {r:41,g:173,b:255}, {r:131,g:118,b:156}, {r:255,g:119,b:168}, {r:255,g:204,b:170}
  ],
  ZX_SPECTRUM: [
    {r:0,g:0,b:0}, {r:0,g:0,b:215}, {r:215,g:0,b:0}, {r:215,g:0,b:215},
    {r:0,g:215,b:0}, {r:0,g:215,b:215}, {r:215,g:215,b:0}, {r:215,g:215,b:215},
    {r:0,g:0,b:255}, {r:255,g:0,b:0}, {r:255,g:0,b:255}, {r:0,g:255,b:0},
    {r:0,g:255,b:255}, {r:255,g:255,b:0}, {r:255,g:255,b:255}
  ],
  NES: [
    {r:124,g:124,b:124}, {r:0,g:0,b:252}, {r:0,g:0,b:188}, {r:68,g:40,b:188},
    {r:148,g:0,b:132}, {r:168,g:0,b:32}, {r:168,g:16,b:0}, {r:136,g:20,b:0},
    {r:80,g:48,b:0}, {r:0,g:120,b:0}, {r:0,g:104,b:0}, {r:0,g:88,b:0},
    {r:0,g:64,b:88}, {r:0,g:0,b:0}, {r:188,g:188,b:188}, {r:0,g:120,b:248},
    {r:0,g:88,b:248}, {r:104,g:68,b:252}, {r:216,g:0,b:204}, {r:228,g:0,b:88},
    {r:248,g:56,b:0}, {r:228,g:92,b:16}, {r:172,g:124,b:0}, {r:0,g:184,b:0},
    {r:0,g:168,b:0}, {r:0,g:168,b:68}, {r:0,g:136,b:136}, {r:248,g:248,b:248},
    {r:60,g:188,b:252}, {r:104,g:136,b:252}, {r:152,g:120,b:248}, {r:248,g:120,b:248},
    {r:248,g:88,b:152}, {r:248,g:120,b:88}, {r:252,g:160,b:68}, {r:248,g:184,b:0},
    {r:184,g:248,b:24}, {r:88,g:216,b:84}, {r:88,g:248,b:152}, {r:0,g:232,b:216},
    {r:120,g:120,b:120}, {r:252,g:252,b:252}, {r:164,g:228,b:252}, {r:184,g:184,b:248},
    {r:216,g:184,b:248}, {r:248,g:184,b:248}, {r:248,g:164,b:192}, {r:240,g:208,b:176},
    {r:252,g:224,b:168}, {r:248,g:216,b:120}, {r:216,g:248,b:120}, {r:184,g:248,b:184},
    {r:184,g:248,b:216}, {r:0,g:252,b:252}, {r:216,g:216,b:216}, {r:0,g:0,b:0}
  ],
  VAPORWAVE: [
    {r:255,g:0,b:214}, {r:36,g:235,b:253}, {r:255,g:255,b:255}, {r:0,g:0,b:0},
    {r:255,g:184,b:220}, {r:155,g:81,b:224}, {r:48,g:213,b:200}, {r:255,g:154,b:139},
    {r:252,g:103,b:250}, {r:244,g:148,b:252}, {r:116,g:235,b:213}, {r:172,g:182,b:229}
  ],
  NEON: [
    {r:0,g:0,b:0}, {r:57,g:255,b:20}, {r:255,g:16,b:240}, {r:0,g:255,b:255},
    {r:255,g:240,b:31}, {r:255,g:69,b:0}, {r:157,g:0,b:255}, {r:255,g:255,b:255}
  ]
};

// --- PREPROCESSING ---

export function applyGrain(imageData: ImageData, amount: number) {
  if (amount <= 0) return;
  const { data } = imageData;
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * amount * 2.55; // amount 0-100 -> noise 
    data[i] = Math.min(255, Math.max(0, data[i] + noise));
    data[i+1] = Math.min(255, Math.max(0, data[i+1] + noise));
    data[i+2] = Math.min(255, Math.max(0, data[i+2] + noise));
  }
}

export function applyBlur(imageData: ImageData, radius: number) {
  if (radius <= 0) return;
  const { width, height, data } = imageData;
  
  // Separable Box Blur: Horizontal pass -> Vertical pass
  // This is much faster (O(2R) per pixel vs O(R^2))
  
  const buffer = new Uint8ClampedArray(data);

  // Horizontal Pass
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let r = 0, g = 0, b = 0, count = 0;
      // Optimize: Sliding window would be O(1) but basic separable loop with clamped bounds is acceptable for radii < 20
      const start = Math.max(0, x - radius);
      const end = Math.min(width - 1, x + radius);
      
      for (let k = start; k <= end; k++) {
         const off = (y * width + k) * 4;
         r += buffer[off];
         g += buffer[off+1];
         b += buffer[off+2];
         count++;
      }
      
      const i = (y * width + x) * 4;
      data[i] = r / count;
      data[i+1] = g / count;
      data[i+2] = b / count;
    }
  }

  // Vertical Pass (Read from current data, write back to buffer then copy? Or simpler in-place approx if we don't care about perfect correctness, but let's copy)
  // To avoid allocating another full buffer, we can write to 'buffer' ensuring we use 'data' as source which is now horizontally blurred.
  buffer.set(data);

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let r = 0, g = 0, b = 0, count = 0;
      const start = Math.max(0, y - radius);
      const end = Math.min(height - 1, y + radius);
      
      for (let k = start; k <= end; k++) {
         const off = (k * width + x) * 4;
         r += buffer[off];
         g += buffer[off+1];
         b += buffer[off+2];
         count++;
      }
      
      const i = (y * width + x) * 4;
      data[i] = r / count;
      data[i+1] = g / count;
      data[i+2] = b / count;
    }
  }
}

// --- QUANTIZATION (Adaptive Palette) ---

/**
 * Perform Median Cut Quantization to generate a palette from the image
 */
export function quantizeImage(imageData: ImageData, colorCount: number): Color[] {
  const pixels: Color[] = [];
  const { data } = imageData;
  // Sample pixels to avoid heavy lifting on huge images?
  // Let's sample 1 in 10 if large, or limit total samples.
  // Sampling ensures speed.
  const step = data.length > 40000 ? 40 : 4; 
  
  for (let i = 0; i < data.length; i += step) {
    pixels.push({ r: data[i], g: data[i+1], b: data[i+2] });
  }

  // Recursive Median Cut
  // If we just need N colors.
  if (pixels.length <= colorCount) return pixels;

  interface Bucket {
     colors: Color[];
  }
  
  let buckets: Bucket[] = [{ colors: pixels }];

  while (buckets.length < colorCount) {
    // Find bucket with largest range in any channel
    let maxRange = -1;
    let splitBucketIndex = -1;
    let splitChannel: 'r'|'g'|'b' = 'r';

    buckets.forEach((bucket, idx) => {
        if (bucket.colors.length === 0) return;
        const rMin = Math.min(...bucket.colors.map(c => c.r));
        const rMax = Math.max(...bucket.colors.map(c => c.r));
        const gMin = Math.min(...bucket.colors.map(c => c.g));
        const gMax = Math.max(...bucket.colors.map(c => c.g));
        const bMin = Math.min(...bucket.colors.map(c => c.b));
        const bMax = Math.max(...bucket.colors.map(c => c.b));
        
        const rRange = rMax - rMin;
        const gRange = gMax - gMin;
        const bRange = bMax - bMin;
        
        const currentMax = Math.max(rRange, gRange, bRange);
        if (currentMax > maxRange) {
           maxRange = currentMax;
           splitBucketIndex = idx;
           if (rRange === currentMax) splitChannel = 'r';
           else if (gRange === currentMax) splitChannel = 'g';
           else splitChannel = 'b';
        }
    });

    if (splitBucketIndex === -1) break; // Cannot split further

    const bucketToSplit = buckets[splitBucketIndex];
    // Sort
    bucketToSplit.colors.sort((a, b) => a[splitChannel] - b[splitChannel]);
    
    // Split
    const median = Math.floor(bucketToSplit.colors.length / 2);
    const b1 = { colors: bucketToSplit.colors.slice(0, median) };
    const b2 = { colors: bucketToSplit.colors.slice(median) };
    
    // Replace
    buckets.splice(splitBucketIndex, 1, b1, b2);
  }

  // Average colors in buckets
  return buckets.map(b => {
    const sum = b.colors.reduce((acc, c) => ({ r: acc.r + c.r, g: acc.g + c.g, b: acc.b + c.b }), { r: 0, g: 0, b: 0 });
    const count = Math.max(1, b.colors.length);
    return {
       r: Math.round(sum.r / count),
       g: Math.round(sum.g / count),
       b: Math.round(sum.b / count)
    };
  });
}

// --- CORE ---

const BAYER_2x2 = [
  [0, 2],
  [3, 1]
];

const BAYER_4x4 = [[0,8,2,10],[12,4,14,6],[3,11,1,9],[15,7,13,5]];

const BAYER_8x8 = [
  [0,32,8,40,2,34,10,42],[48,16,56,24,50,18,58,26],
  [12,44,4,36,14,46,6,38],[60,28,52,20,62,30,54,22],
  [3,35,11,43,1,33,9,41],[51,19,59,27,49,17,57,25],
  [15,47,7,39,13,45,5,37],[63,31,55,23,61,29,53,21]
];

const BAYER_16x16 = [
  [0,128,32,160,8,136,40,168,2,130,34,162,10,138,42,170],[192,64,224,96,200,72,232,104,194,66,226,98,202,74,234,106],
  [48,176,16,144,56,184,24,152,50,178,18,146,58,186,26,154],[240,112,208,80,248,120,216,88,242,114,210,82,250,122,218,90],
  [12,140,44,172,4,132,36,164,14,142,46,174,6,134,38,166],[204,76,236,108,196,68,228,100,206,78,238,110,198,70,230,102],
  [60,188,28,156,52,180,20,148,62,190,30,158,54,182,22,150],[252,124,220,92,244,116,212,84,254,126,222,94,246,118,214,86],
  [3,131,35,163,11,139,43,171,1,129,33,161,9,137,41,169],[195,67,227,99,203,75,235,107,193,65,225,97,201,73,233,105],
  [51,179,19,147,59,187,27,155,49,177,17,145,57,185,25,153],[243,115,211,83,251,123,219,91,241,113,209,81,249,121,217,89],
  [15,143,47,175,7,135,39,167,13,141,45,173,5,133,37,165],[207,79,239,111,199,71,231,103,205,77,237,109,197,69,229,101],
  [63,191,31,159,55,183,23,151,61,189,29,157,53,181,21,149],[255,127,223,95,247,119,215,87,253,125,221,93,245,117,213,85]
];

function findNearestColor(r: number, g: number, b: number, palette: Color[]): Color {
  let minDist = Infinity;
  let nearest = palette[0];
  let i = 0;
  const len = palette.length;
  // Use while loop for slightly better perf in hot path?
  for (; i < len; i++) {
    const c = palette[i];
    const dr = r - c.r;
    const dg = g - c.g;
    const db = b - c.b;
    // Weighted Euclidean dist (Redmean) better? Or Standard? Using standard weighted.
    const dist = dr * dr * 0.3 + dg * dg * 0.59 + db * db * 0.11;
    if (dist < minDist) {
      minDist = dist;
      nearest = c;
    }
  }
  return nearest;
}

function ditherErrorDiffusion(imageData: ImageData, palette: Color[], kernel: { dx: number; dy: number; factor: number }[], divisor: number) {
  const { width, height, data } = imageData;
  const buffer = new Float32Array(width * height * 3);
  for (let i = 0; i < width * height; i++) {
    buffer[i * 3] = data[i * 4]; buffer[i*3+1] = data[i*4+1]; buffer[i*3+2] = data[i*4+2];
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 3;
      const oldR = buffer[idx]; const oldG = buffer[idx+1]; const oldB = buffer[idx+2];
      const newColor = findNearestColor(oldR, oldG, oldB, palette);
      
      const dataIdx = (y * width + x) * 4;
      data[dataIdx] = newColor.r; data[dataIdx+1] = newColor.g; data[dataIdx+2] = newColor.b; data[dataIdx+3] = 255;

      const errR = oldR - newColor.r;
      const errG = oldG - newColor.g;
      const errB = oldB - newColor.b;

      for (const k of kernel) {
        const nx = x + k.dx; const ny = y + k.dy;
        if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
          const nIdx = (ny * width + nx) * 3;
          buffer[nIdx] += errR * (k.factor / divisor);
          buffer[nIdx+1] += errG * (k.factor / divisor);
          buffer[nIdx+2] += errB * (k.factor / divisor);
        }
      }
    }
  }
}

function ditherOrdered(imageData: ImageData, palette: Color[], matrix: number[][]) {
  const { width, height, data } = imageData;
  const dim = matrix.length;
  const mSize = dim * dim;
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const t = matrix[y % dim][x % dim];
      const normT = (t / mSize) - 0.5;
      const factor = normT * 64; // Tunable spread

      const p = {
        r: data[i] + factor,
        g: data[i+1] + factor,
        b: data[i+2] + factor
      };
      
      const c = findNearestColor(p.r, p.g, p.b, palette);
      data[i] = c.r; data[i+1] = c.g; data[i+2] = c.b; data[i+3] = 255;
    }
  }
}

function simpleNoiseDither(imageData: ImageData, palette: Color[]) {
  const { width, height, data } = imageData;
  // Simple noise dithering just adds random noise to pixel before quantizing.
  // It's stateless (unordered). Use low magnitude to just nudge.
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i+1];
    const b = data[i+2];
    
    // Add noise [-32, 32]
    const noise = (Math.random() - 0.5) * 64;
    
    // Clamp
    const pr = Math.min(255, Math.max(0, r + noise));
    const pg = Math.min(255, Math.max(0, g + noise));
    const pb = Math.min(255, Math.max(0, b + noise));
    
    const c = findNearestColor(pr, pg, pb, palette);
    data[i] = c.r; data[i+1] = c.g; data[i+2] = c.b; data[i+3] = 255;
  }
}

export function ditherImage(imageData: ImageData, algorithm: DitherAlgorithm, palette: Color[]) {
  if (algorithm === "Threshold") {
    const { data } = imageData;
    for (let i = 0; i < data.length; i += 4) {
      const c = findNearestColor(data[i], data[i+1], data[i+2], palette);
      data[i] = c.r; data[i+1] = c.g; data[i+2] = c.b; data[i+3] = 255;
    }
    return;
  }

  if (algorithm === "SimpleNoise") {
    return simpleNoiseDither(imageData, palette);
  }

  if (algorithm === "Bayer2x2") return ditherOrdered(imageData, palette, BAYER_2x2);
  if (algorithm === "Bayer4x4") return ditherOrdered(imageData, palette, BAYER_4x4);
  if (algorithm === "Bayer8x8") return ditherOrdered(imageData, palette, BAYER_8x8);
  if (algorithm === "Bayer16x16") return ditherOrdered(imageData, palette, BAYER_16x16);

  // Error Diffusion Kernels
  let kernel: {dx:number, dy:number, factor:number}[];
  let divisor: number;

  switch (algorithm) {
    case "FloydSteinberg":
      kernel = [{dx:1,dy:0,factor:7},{dx:-1,dy:1,factor:3},{dx:0,dy:1,factor:5},{dx:1,dy:1,factor:1}];
      divisor = 16;
      break;
    case "FalseFloydSteinberg":
      kernel = [{dx:1,dy:0,factor:3},{dx:0,dy:1,factor:3},{dx:1,dy:1,factor:2}];
      divisor = 8;
      break;
    case "Atkinson":
      kernel = [{dx:1,dy:0,factor:1},{dx:2,dy:0,factor:1},{dx:-1,dy:1,factor:1},{dx:0,dy:1,factor:1},{dx:1,dy:1,factor:1},{dx:0,dy:2,factor:1}];
      divisor = 8;
      break;
    case "Stucki":
      kernel = [{dx:1,dy:0,factor:8},{dx:2,dy:0,factor:4},{dx:-2,dy:1,factor:2},{dx:-1,dy:1,factor:4},{dx:0,dy:1,factor:8},{dx:1,dy:1,factor:4},{dx:2,dy:1,factor:2},{dx:-2,dy:2,factor:1},{dx:-1,dy:2,factor:2},{dx:0,dy:2,factor:4},{dx:1,dy:2,factor:2},{dx:2,dy:2,factor:1}];
      divisor = 42;
      break;
    case "Burkes":
       kernel = [{dx:1,dy:0,factor:8},{dx:2,dy:0,factor:4},{dx:-2,dy:1,factor:2},{dx:-1,dy:1,factor:4},{dx:0,dy:1,factor:8},{dx:1,dy:1,factor:4},{dx:2,dy:1,factor:2}];
       divisor = 32;
       break;
    case "Sierra3":
       kernel = [{dx:1,dy:0,factor:5},{dx:2,dy:0,factor:3},{dx:-2,dy:1,factor:2},{dx:-1,dy:1,factor:4},{dx:0,dy:1,factor:5},{dx:1,dy:1,factor:4},{dx:2,dy:1,factor:2},{dx:-1,dy:2,factor:2},{dx:0,dy:2,factor:3},{dx:1,dy:2,factor:2}];
       divisor = 32;
       break;
    case "Sierra2":
       kernel = [{dx:1,dy:0,factor:4},{dx:2,dy:0,factor:3},{dx:-2,dy:1,factor:1},{dx:-1,dy:1,factor:2},{dx:0,dy:1,factor:3},{dx:1,dy:1,factor:2},{dx:2,dy:1,factor:1}];
       divisor = 16;
       break;
    case "SierraLite":
       kernel = [{dx:1,dy:0,factor:2},{dx:-1,dy:1,factor:1},{dx:0,dy:1,factor:1}];
       divisor = 4;
       break;
    case "Jarvis":
       kernel = [{dx:1,dy:0,factor:7},{dx:2,dy:0,factor:5},{dx:-2,dy:1,factor:3},{dx:-1,dy:1,factor:5},{dx:0,dy:1,factor:7},{dx:1,dy:1,factor:5},{dx:2,dy:1,factor:3},{dx:-2,dy:2,factor:1},{dx:-1,dy:2,factor:3},{dx:0,dy:2,factor:5},{dx:1,dy:2,factor:3},{dx:2,dy:2,factor:1}];
       divisor = 48;
       break;
    default:
       return;
  }

  ditherErrorDiffusion(imageData, palette, kernel, divisor);
}
