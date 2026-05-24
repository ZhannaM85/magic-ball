import { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MagicBall } from './components/MagicBall';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { useDeviceMotion } from './hooks/useDeviceMotion';
import { getRandomAnswer } from './data/answers';
import type { AppPhase, Answer, Language } from './types';
import styles from './styles/App.module.css';

export default function App() {
  const { t, i18n } = useTranslation();
  const [phase, setPhase] = useState<AppPhase>('idle');
  const [answer, setAnswer] = useState<Answer | null>(null);
  const [skipMotion, setSkipMotion] = useState(false);

  const lang = (i18n.language.startsWith('ru') ? 'ru' : 'en') as Language;

  // When language changes, reset any currently-revealed answer
  useEffect(() => {
    setPhase('idle');
    setAnswer(null);
  }, [lang]);

  const handleShake = useCallback(() => {
    if (phase === 'shaking') return;
    setAnswer(getRandomAnswer(lang));
    setPhase('shaking');
  }, [phase, lang]);

  const handleAnimationEnd = useCallback(() => {
    setPhase('revealing');
  }, []);

  const { permissionState, requestPermission } = useDeviceMotion({
    onShake: handleShake,
    threshold: 15,
    cooldownMs: 1500,
  });

  const showPermissionOverlay =
    permissionState === 'unknown' && !skipMotion;

  const handleAllowMotion = useCallback(async () => {
    await requestPermission();
    // If denied, the overlay still closes — app continues in button-only mode
    setSkipMotion(true);
  }, [requestPermission]);

  const handleSkipMotion = useCallback(() => {
    setSkipMotion(true);
  }, []);

  return (
    <div className={styles.app}>
      <LanguageSwitcher />

      <h1 className={styles.title}>{t('title')}</h1>

      <MagicBall
        appPhase={phase}
        answer={answer}
        onShake={handleShake}
        onAnimationEnd={handleAnimationEnd}
      />

      {/* iOS permission overlay — only shown when permissionState is 'unknown' and user hasn't dismissed it */}
      {showPermissionOverlay && (
        <div className={styles.permissionOverlay} role="dialog" aria-modal="true">
          <p>{t('permissionTitle')}</p>
          <button className={styles.permissionAllowBtn} onClick={handleAllowMotion}>
            {t('permissionAllow')}
          </button>
          <button className={styles.permissionSkipBtn} onClick={handleSkipMotion}>
            {t('permissionSkip')}
          </button>
        </div>
      )}
    </div>
  );
}
