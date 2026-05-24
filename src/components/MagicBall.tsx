import { useTranslation } from 'react-i18next';
import type { Answer, AppPhase } from '../types';
import styles from '../styles/MagicBall.module.css';

interface MagicBallProps {
  appPhase: AppPhase;
  answer: Answer | null;
  onShake: () => void;
  onAnimationEnd: () => void;
}

export function MagicBall({ appPhase, answer, onShake, onAnimationEnd }: MagicBallProps) {
  const { t } = useTranslation();

  const ballClass = [
    styles.ball,
    appPhase === 'shaking' ? styles.ballShaking : '',
  ].join(' ');

  const windowClass = [
    styles.window,
    appPhase === 'revealing' ? styles.windowRevealed : '',
  ].join(' ');

  const answerClass = [
    styles.answer,
    answer ? styles[answer.sentiment] : '',
    appPhase === 'revealing' ? styles.answerVisible : '',
  ].join(' ');

  return (
    <div className={styles.scene}>
      <div
        className={ballClass}
        onAnimationEnd={onAnimationEnd}
        onClick={appPhase === 'revealing' ? onShake : undefined}
        role={appPhase === 'revealing' ? 'button' : undefined}
        aria-label={appPhase === 'revealing' ? t('shakeButton') : undefined}
      >
        <span className={styles.eight}>8</span>

        <div className={windowClass}>
          <div className={styles.triangle} />
          {answer && (
            <p className={answerClass}>{answer.text}</p>
          )}
        </div>
      </div>

      <button
        className={styles.shakeBtn}
        onClick={onShake}
        disabled={appPhase === 'shaking'}
        aria-label={t('shakeButton')}
      >
        {appPhase === 'shaking' ? t('shakingButton') : t('shakeButton')}
      </button>
    </div>
  );
}
