<template>
  <div class="classes-section section-container">
    <div class="section-content animate-fade-in-up">
      <h2 class="section-title">Classes</h2>
      <p class="section-text">
        Explore our diverse range of dance classes designed for all skill levels.
      </p>
    </div>
  </div>
</template>

<script setup>
// Component logic
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.classes-section {
  background: #0a0a0a;
}

.section-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: $spacing-12 $spacing-8;
  padding-bottom: 200px;
}

.section-content {
  max-width: 800px;
  text-align: center;
}

.section-title {
  font-size: $font-size-5xl;
  font-weight: $font-weight-bold;
  margin-bottom: $spacing-6;
  color: $text-primary;
}

.section-text {
  font-size: $font-size-xl;
  color: $text-secondary;
  line-height: $line-height-relaxed;
}

@media (max-width: 768px) {
  .section-container {
    padding-bottom: 160px;
  }
}
</style>
