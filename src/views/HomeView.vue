<template>
  <div class="home-view">
    <h1>{{ t('app.welcome') }}</h1>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style lang="scss" scoped>
.home-view {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: $bg-primary;
  color: $text-primary;

  h1 {
    font-size: 3rem;
    font-weight: 700;
  }
}
</style>
