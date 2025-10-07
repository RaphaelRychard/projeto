import { z } from 'zod/v4'
import { type Either, makeLeft, makeRight } from '@/infra/shared/either'
import { ShortLinkNotFound } from './errors/short-link-not-found'

import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { eq } from 'drizzle-orm'


const deleteShortLinkInput = z.object({
  id: z.cuid2(),
})

type DeleteShortLinkInput = z.input<typeof deleteShortLinkInput>

export async function deleteShortLink(
  input: DeleteShortLinkInput,
): Promise<Either<ShortLinkNotFound, null>> {
  const { id } = deleteShortLinkInput.parse(input)

  const [link] = await db
    .select()
    .from(schema.shortLinks)
    .where(eq(schema.shortLinks.id, id))

  if (!link) {
    return makeLeft(new ShortLinkNotFound)
  }

  await db.delete(schema.shortLinks).where(eq(schema.shortLinks.id, id))

  return makeRight(null)
}
