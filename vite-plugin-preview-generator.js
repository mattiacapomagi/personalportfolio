import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

// Config
const PROJECTS_DIR = 'src/lib/assets/projects';
const PREVIEWS_OUT_DIR = 'static/previews';
const DURATION = 10; // seconds
const WIDTH = 450; // slightly larger for retina screens
const FPS = 12; // Cinematic but low weight

async function generatePreview(projectSlug, assetPath) {
    const ext = path.extname(assetPath).toLowerCase();
    const outPath = path.join(PREVIEWS_OUT_DIR, `${projectSlug}.webp`);
    
    // Ensure dir exists
    if (!fs.existsSync(PREVIEWS_OUT_DIR)) {
        fs.mkdirSync(PREVIEWS_OUT_DIR, { recursive: true });
    }

    // Skip if input newer than output? (Optional optimization, but user said "updates auto")
    // Simple check: exists?
    // Better: Check mtimes.
    if (fs.existsSync(outPath)) {
        const assetStat = fs.statSync(assetPath);
        const outStat = fs.statSync(outPath);
        if (outStat.mtime > assetStat.mtime) {
            // console.log(`[Preview] Skipping ${projectSlug} (Up to date)`);
            return;
        }
    }

    console.log(`[Preview] Generating for ${projectSlug}...`);

    try {
        if (['.mp4', '.mov', '.webm'].includes(ext)) {
            // Video -> Animated WebP
            // -t 10: First 10 seconds
            // -vf: Scale, FPS set
            // -loop 0: Infinite loop
            // -compression_level 4: Balance speed/size
            // -q:v 60: Quality
            const cmd = `ffmpeg -y -i "${assetPath}" -t ${DURATION} -vf "fps=${FPS},scale=${WIDTH}:-1:flags=lanczos" -vcodec libwebp -lossless 0 -compression_level 4 -q:v 60 -loop 0 -an "${outPath}"`;
            await execAsync(cmd);
        } else {
            // Image -> Static WebP
            const cmd = `ffmpeg -y -i "${assetPath}" -vf "scale=${WIDTH}:-1:flags=lanczos" -vcodec libwebp -lossless 0 -compression_level 4 -q:v 80 "${outPath}"`;
            await execAsync(cmd);
        }
        console.log(`[Preview] Done: ${projectSlug}`);
    } catch (err) {
        console.error(`[Preview] Error generating ${projectSlug}:`, err.message);
    }
}

export default function previewGenerator() {
    return {
        name: 'vite-plugin-preview-generator',
        async buildStart() {
            // Scan projects
            if (!fs.existsSync(PROJECTS_DIR)) return;
            
            const projects = fs.readdirSync(PROJECTS_DIR, { withFileTypes: true })
                .filter(d => d.isDirectory())
                .map(d => d.name);

            // Process sequentially or parallel? Parallel is limited by CPU.
            // Let's do huge parallel but maybe cap it? 
            // For now, simple loop.
            for (const slug of projects) {
                const pDir = path.join(PROJECTS_DIR, slug);
                const files = fs.readdirSync(pDir);
                
                // Find "1.*"
                const firstAsset = files.find(f => f.startsWith('1.') && !f.includes('_'));
                if (firstAsset) {
                    await generatePreview(slug, path.join(pDir, firstAsset));
                }
            }
        },
        // HMR handling could be added "handleHotUpdate" but buildStart covers server restarts.
        // For real-time "watch", we can use configureServer.
        configureServer(server) {
             server.watcher.on('change', async (file) => {
                 if (file.includes(PROJECTS_DIR) && file.includes('/1.')) {
                     // Trigger regen for that specific project
                     // Extract slug from path
                     // ... logic to extract slug ...
                     // await generatePreview(slug, file);
                     // Simplified: Just re-run all (lazy) or robust logic.
                     console.log('[Preview] Asset changed, regenerating...');
                     const parts = file.split(path.sep);
                     const slugIndex = parts.indexOf('projects') + 1;
                     if (slugIndex > 0 && slugIndex < parts.length) {
                         const slug = parts[slugIndex];
                         await generatePreview(slug, file);
                     }
                 }
             });
        }
    }
}
