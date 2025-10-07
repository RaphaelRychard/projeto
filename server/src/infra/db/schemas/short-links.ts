import { createId } from '@paralleldrive/cuid2'
import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const shortLinks = pgTable('short_links', {
  id: text('id')
    .$defaultFn(() => createId())
    .primaryKey(),
  originUrl: text('origin_url').notNull(),
  shortLink: text('short_link').notNull(),
  accessCount: integer('access_count').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})
