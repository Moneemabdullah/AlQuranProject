import 'dotenv/config';
import { DataLoaderService } from './services/data-loader.service.js';
import { SearchService } from './services/search.service.js';
import { Bot } from './bot/index.js';
import { logger } from './utils/logger.js';

// FUTURE: Replace JSON data loader with PostgreSQL + Redis
// FUTURE: Add Dockerfile and docker-compose.yml with Postgres + Redis services
// FUTURE: Add Express API for webhook mode (replace polling)
// FUTURE: Add user session manager for pagination and preferences
// FUTURE: Add daily ayah scheduler with node-cron

async function main(): Promise<void> {
  const token = process.env.BOT_TOKEN;
  if (!token) {
    logger.error('BOT_TOKEN is not set in environment variables.');
    process.exit(1);
  }

  logger.info('Loading Quran data...');
  const verses = DataLoaderService.load();
  logger.info(`Loaded ${verses.length} verses.`);

  logger.info('Building search index...');
  const searchService = new SearchService(verses);

  logger.info('Starting bot...');
  new Bot(token, searchService);

  logger.info('Bot is running!');
}

process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled rejection:', reason);
});

process.on('uncaughtException', (error) => {
  logger.error('Uncaught exception:', error);
  process.exit(1);
});

main();
