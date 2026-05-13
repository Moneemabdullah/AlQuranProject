import TelegramBot from 'node-telegram-bot-api';
import { SearchService } from '../services/search.service.js';
import { getAyahInlineKeyboard, getMoreResultsKeyboard } from '../keyboards/inline.keyboard.js';
import { formatSingleAyah, formatResults } from '../utils/formatter.js';
import { logger } from '../utils/logger.js';

export class MessageHandler {
  constructor(
    private bot: TelegramBot,
    private searchService: SearchService,
  ) {}

  async handle(msg: TelegramBot.Message): Promise<void> {
    const text = msg.text?.trim();
    if (!text) return;

    try {
      if (text === '🔍 Search Quran') {
        await this.bot.sendMessage(msg.chat.id, 'Send a keyword to search the Quran.');
        return;
      }

      if (text === '📖 Random Ayah') {
        await this.handleRandomAyah(msg);
        return;
      }

      if (text === '🕌 Browse Surah') {
        await this.bot.sendMessage(msg.chat.id, '📚 Surah browser coming soon...');
        return;
      }

      if (text === '❤️ Favorites') {
        await this.bot.sendMessage(msg.chat.id, '❤️ Favorites system coming soon...');
        return;
      }

      if (text === 'ℹ Help') {
        // handled by command handler via /help registered in bot
        return;
      }

      await this.handleSearch(msg, text);
    } catch (error) {
      logger.error('Message handler error:', error);
      await this.bot.sendMessage(msg.chat.id, '⚠️ An error occurred. Please try again.');
    }
  }

  private async handleRandomAyah(msg: TelegramBot.Message): Promise<void> {
    const ayah = this.searchService.getRandomAyah();
    const response = formatSingleAyah(ayah);
    const inlineKeyboard = getAyahInlineKeyboard(ayah.chapter, ayah.verse);

    await this.bot.sendMessage(msg.chat.id, response, {
      reply_markup: inlineKeyboard,
    });

    logger.info(`Random ayah sent to user ${msg.from?.id}: ${ayah.key}`);
  }

  private async handleSearch(msg: TelegramBot.Message, query: string): Promise<void> {
    const results = this.searchService.search(query);

    if (results.length === 0) {
      await this.bot.sendMessage(
        msg.chat.id,
        `😔 No results found for "${query}". Try a different keyword.`,
      );
      return;
    }

    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      const response = formatSingleAyah(result.item);
      const inlineKeyboard = getAyahInlineKeyboard(
        result.item.chapter,
        result.item.verse,
      );
      await this.bot.sendMessage(msg.chat.id, response, {
        reply_markup: inlineKeyboard,
      });
    }

    if (results.length >= 5) {
      const moreKeyboard = getMoreResultsKeyboard(5);
      await this.bot.sendMessage(
        msg.chat.id,
        '➡️ Want more? Click below for additional results.',
        { reply_markup: moreKeyboard },
      );
    }

    logger.info(
      `Search "${query}" → ${results.length} results for user ${msg.from?.id}`,
    );
  }
}
