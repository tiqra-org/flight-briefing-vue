<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import DarkModeIcon from '@/icons/DarkModeIcon.vue'
import LightModeIcon from '@/icons/LightModeIcon.vue'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <button @click="toggleDark()">
    <LightModeIcon v-if="isDark" class="dark:text-white" />
    <DarkModeIcon v-else class="dark:text-white" />
  </button>
</template>
