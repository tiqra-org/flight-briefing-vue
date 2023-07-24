import './assets/style.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createI18n } from 'vue-i18n'
import { LOCALE } from './constants'

const i18n = createI18n({
  locale: LOCALE.EN,
  fallbackLocale: LOCALE.SK
})

createApp(App).use(i18n).mount('#app')
