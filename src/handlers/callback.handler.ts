import TelegramBot from 'node-telegram-bot-api';
import { SearchService } from '../services/search.service.js';
import { getAyahInlineKeyboard } from '../keyboards/inline.keyboard.js';
import { formatSingleAyah } from '../utils/formatter.js';
import { CallbackData } from '../types/index.js';
import { logger } from '../utils/logger.js';

export class CallbackHandler {
  // FUTURE: Store user sessions in Redis for pagination state
  // FUTURE: Persist favorites in PostgreSQL per userId
  // FUTURE: Add daily ayah scheduler with node-cron

  constructor(
    private bot: TelegramBot,
    private searchService: SearchService,
  ) {}

  async handle(query: TelegramBot.CallbackQuery): Promise<void> {
    if (!query.data || !query.message) return;

    try {
      const parsed = this.parseCallbackData(query.data);
      if (!parsed) {
        await this.bot.answerCallbackQuery(query.id, {
          text: 'Invalid action.',
          show_alert: false,
        });
        return;
      }

      switch (parsed.action) {
        case 'tafsir':
          await this.handleTafsir(query, parsed);
          break;
        case 'audio':
          await this.handleAudio(query, parsed);
          break;
        case 'favorite':
          await this.handleFavorite(query, parsed);
          break;
        case 'more_results':
          await this.handleMoreResults(query, parsed);
          break;
      }
    } catch (error) {
      logger.error('Callback handler error:', error);
      await this.bot.answerCallbackQuery(query.id, {
        text: '⚠️ An error occurred.',
        show_alert: true,
      });
    }
  }

  private parseCallbackData(data: string): CallbackData | null {
    // Format: tafsir_1:5 | audio_1:5 | favorite_1:5 | more_results_5
    const [action, ...rest] = data.split('_');
    const payload = rest.join('_');

    if (action === 'more_results') {
      return { action: 'more_results', offset: Number(payload) };
    }

    const parts = payload.split(':');
    if (parts.length === 2) {
      return {
        action: action as CallbackData['action'],
        chapter: Number(parts[0]),
        verse: Number(parts[1]),
      };
    }

    return null;
  }

  private async handleTafsir(
    query: TelegramBot.CallbackQuery,
    data: CallbackData,
  ): Promise<void> {
    // FUTURE: Fetch tafsir from API or database
    await this.bot.answerCallbackQuery(query.id, {
      text: `📚 Tafsir for ${data.chapter}:${data.verse} coming soon...`,
      show_alert: false,
    });
    logger.debug(`Tafsir requested: ${data.chapter}:${data.verse}`);
  }

  private async handleAudio(
    query: TelegramBot.CallbackQuery,
    data: CallbackData,
  ): Promise<void> {
    // FUTURE: Stream audio from external API (e.g., EveryAyah, MP3Quran)
    await this.bot.answerCallbackQuery(query.id, {
      text: `🔊 Audio for ${data.chapter}:${data.verse} coming soon...`,
      show_alert: false,
    });
    logger.debug(`Audio requested: ${data.chapter}:${data.verse}`);
  }

  private async handleFavorite(
    query: TelegramBot.CallbackQuery,
    data: CallbackData,
  ): Promise<void> {
    // FUTURE: Save to PostgreSQL with userId, chapter, verse, created_at
    await this.bot.answerCallbackQuery(query.id, {
      text: `❤️ Added ${data.chapter}:${data.verse} to favorites (coming soon!)`,
      show_alert: false,
    });
    logger.debug(`Favorite toggled: ${data.chapter}:${data.verse}`);
  }

  private async handleMoreResults(
    query: TelegramBot.CallbackQuery,
    data: CallbackData,
  ): Promise<void> {
    // FUTURE: Retrieve last search query from Redis session and paginate
    await this.bot.answerCallbackQuery(query.id, {
      text: '📖 Pagination coming soon...',
      show_alert: false,
    });
    logger.debug(`More results requested at offset ${data.offset}`);
  }
}
