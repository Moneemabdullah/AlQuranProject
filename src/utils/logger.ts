const isDev = process.env.NODE_ENV !== 'production';

const levels = { error: 0, warn: 1, info: 2, debug: 3 } as const;
type Level = keyof typeof levels;

function log(level: Level, message: string, ...args: unknown[]): void {
  if (!isDev && level === 'debug') return;

  const timestamp = new Date().toISOString();
  const prefix = `[${timestamp}] [${level.toUpperCase()}]`;

  if (level === 'error') {
    console.error(prefix, message, ...args);
  } else if (level === 'warn') {
    console.warn(prefix, message, ...args);
  } else {
    console.log(prefix, message, ...args);
  }
}

export const logger = {
  error: (message: string, ...args: unknown[]) => log('error', message, ...args),
  warn: (message: string, ...args: unknown[]) => log('warn', message, ...args),
  info: (message: string, ...args: unknown[]) => log('info', message, ...args),
  debug: (message: string, ...args: unknown[]) => log('debug', message, ...args),
};
