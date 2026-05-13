import TelegramBot from 'node-telegram-bot-api';
import { SearchService } from '../services/search.service.js';
import { CommandHandler } from '../handlers/command.handler.js';
import { MessageHandler } from '../handlers/message.handler.js';
import { CallbackHandler } from '../handlers/callback.handler.js';
import { logger } from '../utils/logger.js';

export class Bot {
  private bot: TelegramBot;
  private commandHandler: CommandHandler;
  private messageHandler: MessageHandler;
  private callbackHandler: CallbackHandler;

  constructor(token: string, searchService: SearchService) {
    this.bot = new TelegramBot(token, { polling: true });
    this.commandHandler = new CommandHandler(this.bot);
    this.messageHandler = new MessageHandler(this.bot, searchService);
    this.callbackHandler = new CallbackHandler(this.bot, searchService);
    this.registerHandlers();
  }

  private registerHandlers(): void {
    this.bot.onText(/\/start/, (msg) => {
      this.commandHandler.handleStart(msg);
    });

    this.bot.onText(/\/help/, (msg) => {
      this.commandHandler.handleHelp(msg);
    });

    this.bot.on('message', (msg) => {
      if (msg.text?.startsWith('/')) return;
      this.messageHandler.handle(msg);
    });

    this.bot.on('callback_query', (query) => {
      this.callbackHandler.handle(query);
    });

    logger.info('Bot handlers registered');
  }
}
