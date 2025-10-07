import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'

import { fetchShortLinks } from '@/functions/fetch-short-links'
import { isRight, unwrapEither } from '@/infra/shared/either'

export const fetchShortLinkRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/short-links',
    {
      schema: {
        tags: ['short-links'],
        summary: 'Fetch all links',
        querystring: z.object({
          searchQuery: z.string().optional(),
        }),
        response: {
          200: z.object({
            shortLinks: z.array(
              z.object({
                id: z.string(),
                originUrl: z.string(),
                shortLink: z.string(),
                accessCount: z.number(),
              }),
            ),
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { searchQuery } = request.query

      const result = await fetchShortLinks({
        searchQuery
      })

      if (isRight(result)) {
        const { shortLinks } = unwrapEither(result)
        return reply.status(200).send({ shortLinks })
      }
    },
  )
}
