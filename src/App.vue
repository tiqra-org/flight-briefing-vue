<script setup lang="ts">
import Home from '@/views/HomeView.vue'
import Header from '@/components/Header.vue'
import Background from '@/components/Background.vue'
</script>

<template>
  <main class="relative bg-gray-100 dark:bg-slate-900 sm:dark:bg-transparent sm:bg-transparent">
    <Background />
    <Header />
    <Home />
  </main>
</template>
