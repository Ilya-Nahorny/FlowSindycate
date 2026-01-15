# Public Assets

## Video Background

To add a background video to the hero section:

1. Place your video file in this directory (e.g., `hero-video.mp4`)
2. Update the `videoSrc` in `src/views/sections/HomeSection.vue`:

```javascript
const videoSrc = ref('/hero-video.mp4')
```

### Recommended Video Specifications:
- **Format**: MP4 (H.264 codec)
- **Resolution**: 1920x1080 or higher
- **Frame Rate**: 30fps
- **Duration**: 10-30 seconds (looping)
- **File Size**: Under 10MB for web performance
- **Aspect Ratio**: 16:9

### Video Optimization Tips:
- Compress videos using tools like HandBrake or FFmpeg
- Use a poster image for faster initial load
- Consider using a fallback image for mobile devices

### Fallback Image:
Place a fallback image (e.g., `hero-fallback.jpg`) in this directory and update:

```javascript
const fallbackImage = ref('/hero-fallback.jpg')
```

## Example Video Sources:
- [Pexels Videos](https://www.pexels.com/videos/) - Free stock videos
- [Pixabay Videos](https://pixabay.com/videos/) - Free video clips
- [Coverr](https://coverr.co/) - Free videos for websites
