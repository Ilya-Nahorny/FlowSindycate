<template>
  <div class="header-controls">
    <LanguageSwitcher />
    <AuthButton />
  </div>
</template>

<script setup lang="ts">
/**
 * Контролы в header
 * Содержит переключатель языка и кнопку авторизации
 */
import LanguageSwitcher from '@/components/header/LanguageSwitcher'
import AuthButton from '@/components/header/AuthButton'
</script>

<style scoped lang="scss">
@import './HeaderControls.styles.scss';
</style>
