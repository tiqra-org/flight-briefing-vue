<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import SkIcon from '@/icons/SkIcon.vue'
import EnIcon from '@/icons/EnIcon.vue'
import { LOCALE } from '@/constants'

const { locale } = useI18n()

const toggleLocale = () => {
  locale.value = locale.value === LOCALE.EN ? LOCALE.SK : LOCALE.EN
}
</script>

<template>
  <button @click="toggleLocale()" class="dark:text-white px-4">
    <SkIcon v-if="locale === 'en-US'" class="w-4 h-4" />
    <EnIcon v-else class="w-4 h-4" />
  </button>
</template>
