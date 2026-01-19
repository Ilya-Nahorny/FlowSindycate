<template>
  <div class="hero-content">
    <div class="hero-content__container">
      <!-- Заголовок -->
      <h1 class="hero-content__title">
        <span class="hero-content__title-line">Flow</span>
        <span class="hero-content__title-line">Syndicate</span>
      </h1>

      <!-- Подзаголовок -->
      <p class="hero-content__subtitle">
        {{ t('hero.subtitle') }}
      </p>

      <!-- CTA кнопка -->
      <button class="hero-content__cta" @click="handlePrimaryAction">
        {{ t('hero.cta') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

/**
 * Hero контент для главной страницы
 * Fullscreen секция с заголовком, подзаголовком и CTA
 */

const router = useRouter()
const { t } = useI18n()

/**
 * Обработчик основного действия
 */
const handlePrimaryAction = () => {
  router.push('/join')
}
</script>

<style scoped lang="scss">
@import './HeroContent.styles.scss';
</style>
