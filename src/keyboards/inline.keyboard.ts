import TelegramBot from 'node-telegram-bot-api';

export function getAyahInlineKeyboard(
  chapter: number,
  verse: number,
): TelegramBot.InlineKeyboardMarkup {
  return {
    inline_keyboard: [
      [
        
      ],
    ],
  };
}

export function getMoreResultsKeyboard(
  offset: number,
): TelegramBot.InlineKeyboardMarkup {
  return {
    inline_keyboard: [
      
    ],
  };
}
