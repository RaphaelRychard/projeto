import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'

import { exportShortLinks } from '@/functions/export-short-links'
import { unwrapEither } from '@/infra/shared/either'

export const exportShortLinksRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '/short-link/exports',
    {
      schema: {
        tags: ['short-links'],
        summary: 'Get the original URL from a short link',
        response: {
          200: z.object({
            reportUrl: z.url(),
          }),
        },
      },
    },
    async (request, reply) => {
      const result = await exportShortLinks()

      const { reportUrl } = unwrapEither(result)

      return reply.status(200).send({ reportUrl })
    },
  )
}
