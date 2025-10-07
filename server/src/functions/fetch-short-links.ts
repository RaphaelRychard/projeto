import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeRight } from '@/infra/shared/either'
import { ilike } from 'drizzle-orm'
import { z } from 'zod'

const fetchShortLinksInput = z.object({
  searchQuery: z.string().optional()
})

type FetchShortLinksInput = z.input<typeof fetchShortLinksInput>

type FetchShortLinksOutput = {
  shortLinks: Array<{
    id: string;
    shortLink: string;
    originUrl: string;
    accessCount: number;
    createdAt: Date;
  }>
}

export async function fetchShortLinks(
  input: FetchShortLinksInput
): Promise<Either<null, FetchShortLinksOutput>> {
  const { searchQuery } =
    fetchShortLinksInput.parse(input)

  const shortLinks = await db
    .select({
      id: schema.shortLinks.id,
      shortLink: schema.shortLinks.shortLink,
      originUrl: schema.shortLinks.originUrl,
      accessCount: schema.shortLinks.accessCount,
      createdAt: schema.shortLinks.createdAt
    })
    .from(schema.shortLinks)
    .where(
      searchQuery
        ? ilike(schema.shortLinks.shortLink, `%${searchQuery}%`)
        : undefined,
    )


  return makeRight({ shortLinks })
}