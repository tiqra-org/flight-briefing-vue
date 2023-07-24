<script setup lang="ts">
import { ref, type Ref } from 'vue'
import type {
  IFlightBriefingFilter,
  IFlightBriefingFilterData,
  IFlightBriefingListItem
} from './model'
import { flightBriefingRepository } from './repository'
import Filter from './Filter.vue'
import List from './List.vue'
import Loading from '@/icons/LoadingIcon.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const data: Ref<Array<IFlightBriefingListItem> | undefined> = ref()

const pending = ref(false)

const fetchData = async (filter: IFlightBriefingFilterData) => {
  pending.value = true
  data.value = []
  const requestFilter: IFlightBriefingFilter = {
    id: 'query01',
    method: 'query',
    params: [
      {
        ...filter
      }
    ]
  }

  const response = await flightBriefingRepository.fetch(requestFilter, 'POST')

  if (response.error) {
    pending.value = false
    alert(response.error.message)
    return
  }

  data.value = response.result
  pending.value = false
}
</script>
<template>
  <div
    class="container mx-auto max-w-screen-md pt-8 bg-white dark:bg-slate-800 dark:text-white p-2 sm:p-8 min-h-screen"
  >
    <Filter @query="fetchData" />
    <Transition>
      <List v-if="data && data.length > 0" :data="data" />
      <div v-else-if="data?.length === 0 && !pending" class="flex justify-center pt-8">
        {{ t('noDataAvailable') }}
      </div>
    </Transition>
    <div v-if="pending" class="flex justify-center">
      <Loading />
    </div>
  </div>
</template>

<style scoped lang="css">
.v-enter-active {
  transition: all 1s ease-in;
}

.v-leave-active {
  transition: all 0.5s ease-out;
}
</style>

<i18n lang="yaml" locale="en-US" src="./i18n/en.yaml"></i18n>
<i18n lang="yaml" locale="sk-SK" src="./i18n/sk.yaml"></i18n>
