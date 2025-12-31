#!/bin/bash

# Video Preview Optimizer Script
# Generates lightweight previews for mobile from video files

PROJECTS_DIR="src/lib/assets/projects"
PREVIEW_WIDTH=400  # Width for preview thumbnails
WEBM_WIDTH=600     # Width for animated WebM previews
WEBM_CRF=35        # Quality (higher = smaller file, lower quality)

echo "🎬 Video Preview Optimizer"
echo "=========================="

# Find all video files
find "$PROJECTS_DIR" -type f \( -iname "*.mp4" -o -iname "*.mov" \) | while read video; do
    dir=$(dirname "$video")
    filename=$(basename "$video")
    name="${filename%.*}"
    
    # Output paths
    thumbnail="${dir}/${name}_thumb.webp"
    webm_preview="${dir}/${name}_preview.webm"
    
    echo ""
    echo "📹 Processing: $filename"
    
    # 1. Extract first frame as WebP thumbnail
    if [ ! -f "$thumbnail" ]; then
        echo "   → Extracting thumbnail..."
        ffmpeg -y -i "$video" -vframes 1 -vf "scale=${PREVIEW_WIDTH}:-1" -q:v 80 "$thumbnail" 2>/dev/null
        if [ -f "$thumbnail" ]; then
            size=$(du -h "$thumbnail" | cut -f1)
            echo "   ✓ Thumbnail created: ${name}_thumb.webp ($size)"
        fi
    else
        echo "   ⏭ Thumbnail already exists"
    fi
    
    # 2. Create lightweight WebM preview (first 3 seconds, low res)
    if [ ! -f "$webm_preview" ]; then
        echo "   → Creating WebM preview..."
        ffmpeg -y -i "$video" \
            -t 3 \
            -vf "scale=${WEBM_WIDTH}:-1,fps=15" \
            -c:v libvpx-vp9 \
            -crf $WEBM_CRF \
            -b:v 0 \
            -an \
            "$webm_preview" 2>/dev/null
        if [ -f "$webm_preview" ]; then
            size=$(du -h "$webm_preview" | cut -f1)
            echo "   ✓ WebM preview created: ${name}_preview.webm ($size)"
        fi
    else
        echo "   ⏭ WebM preview already exists"
    fi
done

echo ""
echo "=========================="
echo "✅ Done! All video previews generated."
echo ""
echo "Files created:"
echo "  - *_thumb.webp  → Static thumbnail (first frame)"
echo "  - *_preview.webm → Animated preview (3s loop)"
