import TelegramBot from 'node-telegram-bot-api';
import { getMainMenuKeyboard } from '../keyboards/reply.keyboard.js';
import { logger } from '../utils/logger.js';

export class CommandHandler {
  constructor(private bot: TelegramBot) {}

  handleStart(msg: TelegramBot.Message): void {
    const chatId = msg.chat.id;
    const welcome =
      'Assalamu Alaikum! 🌙\n\n' +
      'I am the *Quran Search Bot*. I help you find Quranic verses instantly.\n\n' +
      '🔍 *Send any keyword* — in Arabic, Bangla, or English — and I will return matching ayahs.\n\n' +
      'Use the menu below or just type to search!';
    this.bot.sendMessage(chatId, welcome, {
      parse_mode: 'Markdown',
      reply_markup: getMainMenuKeyboard(),
    });
    logger.info(`/start from user ${msg.from?.id}`);
  }

  handleHelp(msg: TelegramBot.Message): void {
    const chatId = msg.chat.id;
    const help =
      '🤖 *Quran Search Bot — Help*\n\n' +
      '*How to Search*\n' +
      'Just type any keyword and I\'ll find matching verses.\n\n' +
      '*Example Keywords*\n' +
      '• رحمة (Arabic)\n' +
      '• করুণা (Bangla)\n' +
      '• mercy (English)\n\n' +
      '*Menu Buttons*\n' +
      '🔍 *Search Quran* — Enter a keyword to search\n' +
      '📖 *Random Ayah* — Get a random verse\n' +
      '🕌 *Browse Surah* — Browse by chapter (coming soon)\n' +
      '❤️ *Favorites* — Your saved verses (coming soon)\n' +
      'ℹ *Help* — Show this message\n\n' +
      '*Commands*\n' +
      '/start — Welcome message\n' +
      '/help — Show help';
    this.bot.sendMessage(chatId, help, {
      parse_mode: 'Markdown',
      reply_markup: getMainMenuKeyboard(),
    });
    logger.info(`/help from user ${msg.from?.id}`);
  }
}
