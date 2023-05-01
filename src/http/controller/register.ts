import { PrismaUsersRepostory } from '@/repositories/prisma/prisma-users-repository'
import { UserAlreadyExists } from '@/use-cases/erros/user-already-exists'
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
  } catch (err) {
    if (err instanceof UserAlreadyExists) {
      return reply.status(401).send({ message: err.message })
    }

    return reply.status(500).send() // TODO: fix me
  }

  return reply.status(201).send()
}
