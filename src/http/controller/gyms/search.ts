import { makeSearchGymsUseCase } from '@/use-cases/factory/make-search-gyms-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchGymBodySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { q, page } = searchGymBodySchema.parse(request.query)

  const searchGymUseCase = makeSearchGymsUseCase()

  const { gyms } = await searchGymUseCase.execute({
    query: q,
    page,
  })

  return reply.status(200).send({ gyms })
}
