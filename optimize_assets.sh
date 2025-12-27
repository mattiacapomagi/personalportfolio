#!/bin/bash

# Define thresholds
VIDEO_SIZE_THRESHOLD="10M"
IMAGE_SIZE_THRESHOLD="2M"

# Function to optimize video
optimize_video() {
    file="$1"
    width=$(ffprobe -v error -select_streams v:0 -show_entries stream=width -of csv=s=x:p=0 "$file")
    
    # Check if we need to resize (max width 1920)
    scale_filter=""
    if [ "$width" -gt 1920 ]; then
        scale_filter="-vf scale=1920:-2"
    fi

    echo "Optimizing video: $file"
    tmp_file="${file%.*}_optimized.mp4"
    
    # Compress video: H.264, CRF 26 (good quality/size balance), AAC audio
    ffmpeg -y -i "$file" $scale_filter -c:v libx264 -crf 26 -preset medium -c:a aac -b:a 128k -movflags +faststart "$tmp_file" < /dev/null
    
    if [ $? -eq 0 ]; then
        # Check if new file is smaller
        orig_size=$(stat -f%z "$file")
        new_size=$(stat -f%z "$tmp_file")
        
        if [ $new_size -lt $orig_size ]; then
            echo "Optimization successful: Reduced size from $orig_size to $new_size bytes."
            mv "$tmp_file" "$file"
        else
            echo "Optimization resulted in larger file. Keeping original."
            rm "$tmp_file"
        fi
    else
        echo "Optimization failed."
        rm "$tmp_file"
    fi
}

# Function to optimize image
optimize_image() {
    file="$1"
    echo "Optimizing image: $file"
    tmp_file="${file%.*}_optimized.${file##*.}"
    
    # Resize to max 2000px width, reduce quality
    # Handle different formats
    case "${file##*.}" in
        jpg|JPG|jpeg|JPEG)
             ffmpeg -y -i "$file" -vf "scale='min(2000,iw)':-1" -q:v 15 "$tmp_file" < /dev/null
            ;;
        png|PNG)
             # Convert huge PNGs to WebP if possible, but here we keep format to avoid breaking links.
             # Actually, ffmpeg compression for PNG is limited. Let's try to convert to jpg? No, transparency.
             # Let's just resize.
             ffmpeg -y -i "$file" -vf "scale='min(2000,iw)':-1" "$tmp_file" < /dev/null
            ;;
        webp|WEBP)
             ffmpeg -y -i "$file" -vf "scale='min(2000,iw)':-1" -c:v libwebp -q:v 75 "$tmp_file" < /dev/null
            ;;
    esac

    if [ $? -eq 0 ] && [ -f "$tmp_file" ]; then
        mv "$tmp_file" "$file"
        echo "Optimized $file"
    else
        echo "Failed to optimize $file"
        [ -f "$tmp_file" ] && rm "$tmp_file"
    fi
}

# Find and optimize videos > 10MB
find static/media -type f \( -iname "*.mp4" -o -iname "*.mov" \) -size +$VIDEO_SIZE_THRESHOLD | while read file; do
    optimize_video "$file"
done

# Find and optimize images > 2MB
find static/media -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.webp" \) -size +$IMAGE_SIZE_THRESHOLD | while read file; do
    optimize_image "$file"
done
