<script setup lang="ts">
import { ref } from 'vue'
import QuestionIcon from '@/icons/QuestionIcon.vue'

const visible = ref(false)
</script>

<template>
  <button
    type="button"
    class="absolute right-0 top-0 bottom-0 mr-2"
    @mouseover="visible = true"
    @mouseleave="visible = false"
  >
    <QuestionIcon class="text-gray-500 hover:text-rose-600" />
  </button>
  <Transition>
    <div
      v-if="visible"
      class="absolute bg-gray-700 text-white p-4 z-10 rounded helptext transition-all transform duration-500 delay-100"
    >
      <slot></slot>
    </div>
  </Transition>
</template>

<style scoped lang="css">
@media (max-width: 640px) {
  .helptext {
    right: 0;
  }
}

@media (min-width: 1280px) {
  .helptext {
    right: -100%;
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
