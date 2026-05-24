import type { Answer, Language } from '../types';

export const ANSWERS: Record<Language, Answer[]> = {
  en: [
    // 10 Positive
    { text: 'It is certain',             sentiment: 'positive' },
    { text: 'It is decidedly so',        sentiment: 'positive' },
    { text: 'Without a doubt',           sentiment: 'positive' },
    { text: 'Yes, definitely',           sentiment: 'positive' },
    { text: 'You may rely on it',        sentiment: 'positive' },
    { text: 'As I see it, yes',          sentiment: 'positive' },
    { text: 'Most likely',               sentiment: 'positive' },
    { text: 'Outlook good',              sentiment: 'positive' },
    { text: 'Yes',                       sentiment: 'positive' },
    { text: 'Signs point to yes',        sentiment: 'positive' },
    // 5 Neutral
    { text: 'Reply hazy, try again',     sentiment: 'neutral' },
    { text: 'Ask again later',           sentiment: 'neutral' },
    { text: 'Better not tell you now',   sentiment: 'neutral' },
    { text: 'Cannot predict now',        sentiment: 'neutral' },
    { text: 'Concentrate and ask again', sentiment: 'neutral' },
    // 5 Negative
    { text: "Don't count on it",         sentiment: 'negative' },
    { text: 'My reply is no',            sentiment: 'negative' },
    { text: 'My sources say no',         sentiment: 'negative' },
    { text: 'Outlook not so good',       sentiment: 'negative' },
    { text: 'Very doubtful',             sentiment: 'negative' },
  ],
  ru: [
    // 10 Positive
    { text: 'Это точно',                         sentiment: 'positive' },
    { text: 'Бесспорно',                         sentiment: 'positive' },
    { text: 'Без сомнений',                      sentiment: 'positive' },
    { text: 'Определённо да',                    sentiment: 'positive' },
    { text: 'Можешь рассчитывать на это',        sentiment: 'positive' },
    { text: 'По-моему — да',                     sentiment: 'positive' },
    { text: 'Скорее всего',                      sentiment: 'positive' },
    { text: 'Хорошие перспективы',               sentiment: 'positive' },
    { text: 'Да',                                sentiment: 'positive' },
    { text: 'Всё указывает на «да»',             sentiment: 'positive' },
    // 5 Neutral
    { text: 'Пока неясно, попробуй снова',       sentiment: 'neutral' },
    { text: 'Спроси позже',                      sentiment: 'neutral' },
    { text: 'Лучше не говорить сейчас',          sentiment: 'neutral' },
    { text: 'Не могу предсказать сейчас',        sentiment: 'neutral' },
    { text: 'Сосредоточься и спроси снова',      sentiment: 'neutral' },
    // 5 Negative
    { text: 'Даже не надейся',                   sentiment: 'negative' },
    { text: 'Мой ответ — нет',                   sentiment: 'negative' },
    { text: 'Мои источники говорят нет',         sentiment: 'negative' },
    { text: 'Перспективы неважные',              sentiment: 'negative' },
    { text: 'Очень сомнительно',                 sentiment: 'negative' },
  ],
};

export function getRandomAnswer(lang: Language): Answer {
  const pool = ANSWERS[lang];
  return pool[Math.floor(Math.random() * pool.length)];
}
