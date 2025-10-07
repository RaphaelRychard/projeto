import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeLeft, makeRight } from '@/infra/shared/either'
import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { ShortLinkNotFound } from './errors/short-link-not-found'

const getShortLinksInput = z.object({
  shortLink: z.string()
})

type GetShortLinksInput = z.input<typeof getShortLinksInput>

type GetShortLinksOutput = {
  originUrl: string
}

export async function getShortLinks(
  input: GetShortLinksInput
): Promise<Either<ShortLinkNotFound, GetShortLinksOutput>> {
  const { shortLink } =
    getShortLinksInput.parse(input)

  const [shortLinks] = await db
    .select({
      originUrl: schema.shortLinks.originUrl,
    })
    .from(schema.shortLinks)
    .where(eq(schema.shortLinks.shortLink, shortLink))

  if (!shortLinks) {
    return makeLeft(new ShortLinkNotFound())
  }

  return makeRight({ originUrl: shortLinks.originUrl })
}