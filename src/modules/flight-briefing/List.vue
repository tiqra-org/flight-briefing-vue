<script setup lang="ts">
import type { IFlightBriefingListItem } from './model'
import { computed } from 'vue'
import { groupBy } from '@/infrastructure/utils'

interface Props {
  data?: Array<IFlightBriefingListItem>
}

const HIGHLIGHT_CODES = ['BKN', 'FEW', 'SCT']

const HIGHLIGHT_COLORS = {
  INFO: 'text-blue-600',
  DANGER: 'text-rose-600'
}

const props = defineProps<Props>()

const listItems = computed(() => {
  const parsedData = props.data?.map((item) => {
    const parsedText = item.text.trim().split(' ')
    const convertedText = parsedText.map((text) => {
      const trimmedText = text.trim()
      let highlightClass = ''
      HIGHLIGHT_CODES.forEach((code) => {
        if (trimmedText.indexOf(code) != -1) {
          const parsedCode = trimmedText.split(code)
          let numericValue = +parsedCode[1]
          if (isNaN(numericValue)) {
            numericValue = +parsedCode[1].substring(0, 3)
          }
          highlightClass = numericValue > 30 ? HIGHLIGHT_COLORS.DANGER : HIGHLIGHT_COLORS.INFO
        }
      })
      return text.trim()
        ? `<div class="inline-block mr-1 ${highlightClass}">${text.trim()}</div>`
        : ''
    })
    const text = convertedText.join('')
    return { ...item, text }
  })
  const groupedData = parsedData
    ? groupBy(parsedData, ({ stationId }) => stationId, 'stationId')
    : {}
  return groupedData
})
</script>

<template>
  <div class="mt-8 border-t text-sm">
    <div v-for="(items, key, index) in listItems" :key="key" class="flex flex-col">
      <div class="border-x border-b p-2 bg-gray-100 dark:bg-slate-900">
        {{ key }}
      </div>
      <div v-for="item in items" class="flex flex-col sm:flex-row border-b border-x">
        <div class="basis-2/12 p-2">{{ item.queryType }}</div>
        <div class="basis-2/12 p-2 sm:border-x">
          {{ new Date(Date.parse(item.reportTime)).toLocaleString('sk-SK') }}
        </div>
        <div v-html="item.text" class="basis-8/12 p-2"></div>
      </div>
    </div>
  </div>
</template>
