import { PrismaUsersRepostory } from '@/repositories/prisma/prisma-users-repository'
import { RegisterUseCase } from '@/use-cases/register'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    const usersRepository = new PrismaUsersRepostory()
    const registerUseCase = new RegisterUseCase(usersRepository)
    await registerUseCase.execute({ name, email, password })
  } catch (error) {
    return reply.status(401).send()
  }

  return reply.status(201).send()
}
