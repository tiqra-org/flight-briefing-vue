<script setup lang="ts">
import ToggleDarkButton from './ToggleDarkButton.vue'
import ToggleLocaleButton from './ToggleLocaleButton.vue'
</script>

<template>
  <div class="container mx-auto max-w-screen-md py-2">
    <div class="flex justify-end p-2">
      <ToggleLocaleButton />
      <ToggleDarkButton />
    </div>
  </div>
</template>
