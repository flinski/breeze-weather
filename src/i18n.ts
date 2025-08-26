import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import translationEN from '@/locales/en/translation.json'
import translationRU from '@/locales/ru/translation.json'

const resources = {
  en: {
    translation: translationEN,
  },
  ru: {
    translation: translationRU,
  },
}

const settings = JSON.parse(localStorage.getItem('flinski-breeze-weather-settings') ?? 'null')

i18n.use(initReactI18next).init({
  resources,
  lng: settings ? (settings.language === 'english' ? 'en' : 'ru') : 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
