<template>
  <nav class="bottom-navigation">
    <div class="bottom-navigation__fade-left"></div>
    <div 
      ref="itemsContainer"
      class="bottom-navigation__items"
      @scroll="handleScroll"
    >
      <NavItem
        v-for="(item, index) in navigationItems"
        :key="item.name"
        :ref="el => setItemRef(el, index)"
        :item="item"
        :is-active="currentRoute === item.name"
        @click="navigateTo(item.name)"
      />
    </div>
    <div class="bottom-navigation__fade-right"></div>
  </nav>
</template>

<script setup lang="ts">
import { computed, ref, watch, nextTick, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import NavItem from './components/NavItem'

/**
 * Нижняя навигация
 * Адаптивная для desktop и mobile
 * Desktop: горизонтальная навигация с переключением по кликам
 * Mobile: частично видимая навигация с активным элементом по центру
 */

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

// Элементы навигации
const navigationItems = computed(() => [
  {
    name: 'home',
    label: t('navigation.home'),
    path: '/'
  },
  {
    name: 'philosophy',
    label: t('navigation.philosophy'),
    path: '/philosophy'
  },
  {
    name: 'classes',
    label: t('navigation.classes'),
    path: '/classes'
  },
  {
    name: 'schedule',
    label: t('navigation.schedule'),
    path: '/schedule'
  },
  {
    name: 'trainers',
    label: t('navigation.trainers'),
    path: '/trainers'
  },
  {
    name: 'join',
    label: t('navigation.join'),
    path: '/join'
  },
  {
    name: 'contact',
    label: t('navigation.contact'),
    path: '/contact'
  }
])

// Текущий маршрут
const currentRoute = computed(() => route.name as string)

// Refs для элементов навигации
const itemsContainer = ref<HTMLElement | null>(null)
const itemRefs = ref<(InstanceType<typeof NavItem> | null)[]>([])
const fadeLeft = ref<HTMLElement | null>(null)
const fadeRight = ref<HTMLElement | null>(null)

const setItemRef = (el: InstanceType<typeof NavItem> | null, index: number) => {
  if (el) {
    itemRefs.value[index] = el
  }
}

/**
 * Центрирование активного элемента на мобильных устройствах
 */
const centerActiveItem = async () => {
  await nextTick()
  
  if (!itemsContainer.value) return
  
  const activeIndex = navigationItems.value.findIndex(item => item.name === currentRoute.value)
  if (activeIndex === -1) return
  
  const container = itemsContainer.value
  const containerWidth = container.clientWidth
  const containerScrollWidth = container.scrollWidth
  
  // Если контент не переполняется, не нужно центрировать
  if (containerScrollWidth <= containerWidth) return
  
  // Находим активный элемент
  const activeElement = itemRefs.value[activeIndex]?.$el as HTMLElement
  if (!activeElement) return
  
  const itemRect = activeElement.getBoundingClientRect()
  const containerRect = container.getBoundingClientRect()
  
  // Позиция элемента относительно контейнера
  const itemLeft = itemRect.left - containerRect.left + container.scrollLeft
  const itemWidth = itemRect.width
  const itemCenter = itemLeft + itemWidth / 2
  
  // Центр контейнера
  const containerCenter = containerWidth / 2
  
  // Вычисляем нужную позицию скролла
  let targetScroll = itemCenter - containerCenter
  
  // Если это первый элемент, не скроллим влево
  if (activeIndex === 0) {
    targetScroll = 0
  }
  // Если это последний элемент, скроллим до конца, но с учетом центрирования
  else if (activeIndex === navigationItems.value.length - 1) {
    const maxScroll = containerScrollWidth - containerWidth
    const lastItemCenter = itemCenter
    const lastItemScroll = lastItemCenter - containerCenter
    targetScroll = Math.min(lastItemScroll, maxScroll)
  }
  
  // Плавная прокрутка
  container.scrollTo({
    left: targetScroll,
    behavior: 'smooth'
  })
  
  // Обновляем fade-эффекты после прокрутки
  setTimeout(() => {
    handleScroll()
  }, 300)
}

/**
 * Обработчик скролла для обновления fade-эффектов
 */
const handleScroll = () => {
  if (!itemsContainer.value || !fadeLeft.value || !fadeRight.value) return
  
  const container = itemsContainer.value
  const scrollLeft = container.scrollLeft
  const scrollWidth = container.scrollWidth
  const clientWidth = container.clientWidth
  const maxScroll = scrollWidth - clientWidth
  
  // Показываем fade слева, если есть скролл вправо
  fadeLeft.value.style.opacity = scrollLeft > 10 ? '1' : '0'
  
  // Показываем fade справа, если есть скролл влево
  fadeRight.value.style.opacity = scrollLeft < maxScroll - 10 ? '1' : '0'
}

// Отслеживание изменения маршрута
watch(() => route.name, () => {
  centerActiveItem()
})

// Центрирование при монтировании
onMounted(() => {
  centerActiveItem()
  // Инициализация fade-эффектов
  handleScroll()
  
  // Обновление fade-эффектов после центрирования
  if (itemsContainer.value) {
    itemsContainer.value.addEventListener('scroll', handleScroll)
  }
})

/**
 * Переход на страницу
 */
const navigateTo = (routeName: string) => {
  const item = navigationItems.value.find(item => item.name === routeName)
  if (item) {
    router.push(item.path)
  }
}
</script>

<style scoped lang="scss">
@import './BottomNavigation.styles.scss';
</style>
