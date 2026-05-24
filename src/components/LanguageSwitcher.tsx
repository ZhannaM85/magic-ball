import { useTranslation } from 'react-i18next';
import styles from '../styles/LanguageSwitcher.module.css';

const LANGUAGES = [
  { code: 'en', label: 'EN' },
  { code: 'ru', label: 'RU' },
] as const;

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const current = i18n.language.startsWith('ru') ? 'ru' : 'en';

  return (
    <nav className={styles.switcher} aria-label="Language">
      {LANGUAGES.map(({ code, label }) => (
        <button
          key={code}
          className={`${styles.langBtn} ${current === code ? styles.langBtnActive : ''}`}
          onClick={() => i18n.changeLanguage(code)}
          aria-current={current === code ? 'true' : undefined}
        >
          {label}
        </button>
      ))}
    </nav>
  );
}
