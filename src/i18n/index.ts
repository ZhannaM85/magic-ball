import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en';
import ru from './locales/ru';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ru: { translation: ru },
    },
    fallbackLng: 'ru',
    supportedLngs: ['en', 'ru'],
    interpolation: { escapeValue: false },
    detection: {
      // Only use stored user choice; ignore browser language so Russian is always the default
      order: ['localStorage'],
      caches: ['localStorage'],
    },
  });

export default i18n;
