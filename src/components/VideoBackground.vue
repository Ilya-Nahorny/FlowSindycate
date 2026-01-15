<template>
  <div class="video-background">
    <!-- Video Element -->
    <video
      v-if="videoSrc"
      ref="videoRef"
      class="video-element"
      :src="videoSrc"
      :poster="poster"
      autoplay
      muted
      loop
      playsinline
      @loadeddata="onVideoLoaded"
      @error="onVideoError"
    ></video>

    <!-- Fallback Image -->
    <div 
      v-else-if="fallbackImage" 
      class="video-fallback"
      :style="{ backgroundImage: `url(${fallbackImage})` }"
    ></div>

    <!-- Gradient Placeholder if no video/image -->
    <div v-else class="video-placeholder"></div>

    <!-- Blur & Opacity Overlay -->
    <div class="video-overlay" :style="overlayStyle"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  videoSrc: {
    type: String,
    default: ''
  },
  poster: {
    type: String,
    default: ''
  },
  fallbackImage: {
    type: String,
    default: ''
  },
  overlayOpacity: {
    type: Number,
    default: 0.7,
    validator: (value) => value >= 0 && value <= 1
  },
  overlayColor: {
    type: String,
    default: '#0a0a0a'
  },
  blur: {
    type: Number,
    default: 0,
    validator: (value) => value >= 0
  }
})

const videoRef = ref(null)
const videoLoaded = ref(false)
const videoError = ref(false)

const overlayStyle = computed(() => ({
  backgroundColor: props.overlayColor,
  opacity: props.overlayOpacity,
  backdropFilter: props.blur ? `blur(${props.blur}px)` : 'none',
  WebkitBackdropFilter: props.blur ? `blur(${props.blur}px)` : 'none'
}))

const onVideoLoaded = () => {
  videoLoaded.value = true
  if (videoRef.value) {
    videoRef.value.play().catch(err => {
      console.warn('Video autoplay failed:', err)
    })
  }
}

const onVideoError = (error) => {
  console.error('Video loading error:', error)
  videoError.value = true
}

onMounted(() => {
  if (videoRef.value) {
    // Ensure video plays on mobile devices
    videoRef.value.play().catch(() => {
      // Autoplay was prevented, which is fine
    })
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/mixins.scss';

.video-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
}

.video-element,
.video-fallback,
.video-placeholder {
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  transform: translate(-50%, -50%);
  object-fit: cover;
}

.video-element {
  z-index: 1;
}

.video-fallback {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 1;
}

.video-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, 
    $bg-primary 0%, 
    $bg-secondary 50%, 
    $bg-tertiary 100%
  );
  z-index: 1;
  
  // Animated gradient
  background-size: 200% 200%;
  animation: gradientShift 15s ease infinite;
}

@keyframes gradientShift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  pointer-events: none;
  transition: all $transition-slow;
}

// Performance optimization
.video-element {
  will-change: transform;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}
</style>
