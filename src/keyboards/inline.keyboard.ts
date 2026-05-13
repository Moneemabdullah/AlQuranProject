import TelegramBot from 'node-telegram-bot-api';

export function getAyahInlineKeyboard(
  chapter: number,
  verse: number,
): TelegramBot.InlineKeyboardMarkup {
  return {
    inline_keyboard: [
      [
        // {
        //   text: '📚 Tafsir',
        //   callback_data: `tafsir_${chapter}:${verse}`,
        // },
        // {
        //   text: '🔊 Audio',
        //   callback_data: `audio_${chapter}:${verse}`,
        // },
        // {
        //   text: '❤️ Favorite',
        //   callback_data: `favorite_${chapter}:${verse}`,
        // },
      ],
    ],
  };
}

export function getMoreResultsKeyboard(
  offset: number,
): TelegramBot.InlineKeyboardMarkup {
  return {
    inline_keyboard: [
      // [
      //   {
      //     text: '➡️ More Results',
      //     callback_data: `more_results_${offset}`,
      //   },
      // ],
    ],
  };
}
