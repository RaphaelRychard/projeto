import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'

import { getShortLinks } from '@/functions/get-short-links'
import { isRight, unwrapEither } from '@/infra/shared/either'

export const getShortLinksRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/short-link/:shortLink',
    {
      schema: {
        tags: ['short-links'],
        summary: 'Get the original URL from a short link',
        params: z.object({
          shortLink: z.string(),
        }),
        response: {
          200: z.object({ originUrl: z.string().url() }),
          404: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const { shortLink } = request.params

      const result = await getShortLinks({
        shortLink
      })

      if (isRight(result)) {
        const { originUrl } = unwrapEither(result)

        return reply.status(200).send({ originUrl })
      }

      const error = unwrapEither(result)

      switch (error.constructor.name) {
        case 'ShortLinkNotFound':
          return reply.status(404).send({ message: error.message })
      }
    },
  )
}
