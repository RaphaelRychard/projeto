import { z } from 'zod/v4'

import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

import { isRight, unwrapEither } from '@/infra/shared/either'
import { deleteShortLink } from '@/functions/delete-short-links'

export const deleteShortLinksRoute: FastifyPluginAsyncZod = async (app) => {
  app.delete(
    '/short-links/:id',
    {
      schema: {
        tags: ['short-links'],
        summary: 'Delete short link',
        params: z.object({
          id: z.cuid2(),
        }),
        response: {
          204: z.null().describe('Short deleted.'),
          409: z
            .object({
              message: z.string(),
            })
            .describe('Short links not found.'),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params

      const result = await deleteShortLink({
        id
      })

      if (isRight(result)) {
        return reply.status(204).send()
      }

      const error = unwrapEither(result)

      switch (error.constructor.name) {
        case 'ShortLinkNotFound':
          return reply.status(409).send({ message: error.message })
      }
    },
  )
}
