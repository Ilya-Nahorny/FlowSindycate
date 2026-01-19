<template>
  <div class="finances-page">
    <h1 class="finances-page__title">{{ t('admin.finances') }}</h1>

    <div v-if="adminStore.isLoading" class="finances-page__loading">
      {{ t('common.loading') }}
    </div>

    <div v-else class="finances-page__content">
      <div class="finances-page__summary glass-medium">
        <div class="finance-summary">
          <div class="finance-summary__item">
            <span class="finance-summary__label">{{ t('admin.totalRevenue') }}</span>
            <span class="finance-summary__value finance-summary__value--primary">
              {{ adminStore.financialStats?.totalRevenue || 0 }} PLN
            </span>
          </div>
          <div class="finance-summary__item">
            <span class="finance-summary__label">{{ t('admin.pendingPayments') }}</span>
            <span class="finance-summary__value finance-summary__value--warning">
              {{ adminStore.financialStats?.pendingPayments || 0 }} PLN
            </span>
          </div>
        </div>
      </div>

      <div class="finances-page__note">
        {{ t('admin.financesNote') }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAdminStore } from '@/stores/admin'

/**
 * Страница финансов и аналитики
 */

const { t } = useI18n()
const adminStore = useAdminStore()

/**
 * Загрузка данных
 */
onMounted(async () => {
  await adminStore.loadFinancialStats()
})
</script>

<style scoped lang="scss">
@import './FinancesPage.styles.scss';
</style>
