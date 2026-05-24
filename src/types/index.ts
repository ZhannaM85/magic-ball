export type AnswerSentiment = 'positive' | 'neutral' | 'negative';

export interface Answer {
  text: string;
  sentiment: AnswerSentiment;
}

export type AppPhase = 'idle' | 'shaking' | 'revealing';

export type Language = 'en' | 'ru';
