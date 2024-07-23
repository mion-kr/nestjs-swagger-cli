import type { Config } from 'drizzle-kit';

export default {
  schema: 'src/common/database/drizzle/schema/*',
  out: 'src/common/database/drizzle/migration',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
} satisfies Config;
