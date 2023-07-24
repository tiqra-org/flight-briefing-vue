<script setup lang="ts">
import { ref, watch, computed, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { AIRPORTS_PATTERN, COUNTRIES_PATTERN, reportTypes } from './constants'
import type { IFlightBriefingFilterData } from './model'
import { stringToArray } from '@/infrastructure/utils'
import HelpText from '@/components/HelpText.vue'

const emits = defineEmits(['query'])

const { t } = useI18n()

const filterData: IFlightBriefingFilterData = reactive({
  reportTypes: [],
  airports: [],
  countries: []
})

const reportTypesError = ref()
const airportsError = ref()
const airportsAndCountriesError = ref()

const errors = [reportTypesError, airportsError, airportsAndCountriesError]

const validateReportTypes = (): boolean => {
  const isValid = filterData.reportTypes.length > 0
  reportTypesError.value = isValid ? undefined : t('messageTypesRequired')
  return isValid
}

const validateAirports = (): boolean => {
  if (filterData.airports.length > 0) {
    const airportsOk = filterData.airports.filter((c) => c.match(AIRPORTS_PATTERN))
    if (airportsOk.length !== filterData.airports.length) {
      airportsError.value = t('airportsPatternMismatch', ['4'])
      return false
    }
  }

  airportsError.value = undefined
  return true
}

const validateAirportsAndCountries = (): boolean => {
  const isEmpty = filterData.airports.length === 0 && filterData.countries.length === 0

  if (isEmpty) {
    airportsAndCountriesError.value = t('airportsOrCountriesRequired')
    return false
  }

  if (filterData.countries.length > 0) {
    const countriesOk = filterData.countries.filter((c) => c.match(COUNTRIES_PATTERN))
    if (countriesOk.length !== filterData.countries.length) {
      airportsAndCountriesError.value = t('countriesPatternMismatch', ['2'])
      return false
    }
  }

  airportsAndCountriesError.value = undefined
  return true
}

watch(
  () => filterData.reportTypes,
  () => {
    validateReportTypes()
  }
)

watch(
  () => filterData.airports,
  () => {
    validateAirports()
    validateAirportsAndCountries()
  }
)

watch(
  () => filterData.countries,
  () => {
    validateAirportsAndCountries()
  }
)

const airports = computed({
  get() {
    return filterData.airports.join(' ')
  },
  set(value) {
    filterData.airports = stringToArray(value.toUpperCase())
  }
})

const countries = computed({
  get() {
    return filterData.countries.join(' ')
  },
  set(value) {
    filterData.countries = stringToArray(value.toUpperCase())
  }
})

const submit = () => {
  validateForm().then((isValid: boolean) => {
    if (isValid) {
      emits('query', filterData)
    }
  })
}

const clearErrors = () => {
  errors.forEach((e) => (e.value = undefined))
}

const validateForm = (): Promise<boolean> => {
  clearErrors()
  let result = true
  if (!validateReportTypes()) {
    result = false
  }
  if (!validateAirportsAndCountries()) {
    result = false
  }
  return Promise.resolve(result)
}
</script>

<template>
  <form @submit.prevent="submit">
    <div class="grid sm:grid-cols-2 pb-4 sm:pb-8 items-center">
      <label class="pb-2 sm:pb-0">{{ t('messageTypes') }}</label>
      <div class="grid gap-2 sm:gap-4 sm:grid-cols-3">
        <div v-for="item in reportTypes" :key="item.id">
          <input
            type="checkbox"
            v-model="filterData.reportTypes"
            :value="item.id"
            :id="item.id.toLowerCase()"
            class="mr-4"
          />
          <label :for="item.id.toLocaleLowerCase()">{{ item.name }}</label>
        </div>
      </div>
      <div v-if="reportTypesError" class="sm:col-start-2 text-rose-600">{{ reportTypesError }}</div>
    </div>
    <div class="grid sm:grid-cols-2 pb-4 items-center">
      <label for="airports">{{ t('airports') }}</label>
      <div class="relative">
        <input
          v-model.lazy="airports"
          id="airports"
          type="text"
          :placeholder="`${t('forExample')} LKPR`"
          class="uppercase border px-2 py-1 w-full dark:bg-slate-900"
        />
        <HelpText>{{ t('airportsHelpText') }}</HelpText>
      </div>
    </div>
    <div v-if="airportsError" class="grid sm:grid-cols-2 pb-4 items-center">
      <div class="col-start-2 text-rose-600">{{ airportsError }}</div>
    </div>
    <div class="grid sm:grid-cols-2 pb-2 items-center">
      <label for="countries">{{ t('countries') }}</label>
      <div class="relative">
        <input
          v-model.lazy="countries"
          id="countries"
          type="text"
          :placeholder="`${t('forExample')} SQ`"
          class="uppercase border px-2 py-1 w-full dark:bg-slate-900"
        />
        <HelpText>{{ t('countriesHelpText') }}</HelpText>
      </div>
    </div>
    <div v-if="airportsAndCountriesError" class="grid sm:grid-cols-2 pb-4 items-center">
      <div class="col-start-2 text-rose-600">{{ airportsAndCountriesError }}</div>
    </div>
    <div class="flex justify-center sm:justify-end my-4">
      <button
        type="submit"
        class="border px-4 py-2 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-900"
      >
        {{ t('createBriefing') }}
      </button>
    </div>
  </form>
</template>

<style scoped lang="css">
input::placeholder {
  text-transform: none;
}
</style>

<i18n lang="yaml" locale="en-US" src="./i18n/en.yaml"></i18n>
<i18n lang="yaml" locale="sk-SK" src="./i18n/sk.yaml"></i18n>
