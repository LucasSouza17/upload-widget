import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

export const getHealthCheckRoute: FastifyPluginAsyncZod = async server => {
  server.get(
    '/health',
    {
      schema: {
        summary: 'Health Check',
        tags: ['health'],
        response: {
          200: z.object({
            message: z.string().default('OK'),
          }),
        },
      },
    },
    async (request, reply) => {
      return reply.status(200).send({ message: 'Health Check Ok!' })
    }
  )
}
