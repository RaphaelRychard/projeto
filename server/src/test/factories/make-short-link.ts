import { fakerPT_BR as faker } from '@faker-js/faker'
import type { InferInsertModel } from 'drizzle-orm'

import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'

export async function makeShortLink(
  overrides?: Partial<InferInsertModel<typeof schema.shortLinks>>,
) {
  const uuid = faker.string.uuid()

  const result = await db
    .insert(schema.shortLinks)
    .values({
      originUrl: `https://fake.test/${uuid}`,
      shortLink: uuid.replace(/[^a-z-]/g, '').slice(0, 20),
      accessCount: 0,
      ...overrides,
    })
    .returning()

  return result[0]
}
