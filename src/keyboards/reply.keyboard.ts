import TelegramBot from 'node-telegram-bot-api';

export function getMainMenuKeyboard(): TelegramBot.ReplyKeyboardMarkup {
  return {
    keyboard: [
      [{ text: '🔍 Search Quran' }, { text: '📖 Random Ayah' }],
      [{ text: '🕌 Browse Surah' }, { text: '❤️ Favorites' }],
      [{ text: 'ℹ Help' }],
    ],
    resize_keyboard: true,
    one_time_keyboard: false,
    input_field_placeholder: 'Search Quran...',
  };
}
