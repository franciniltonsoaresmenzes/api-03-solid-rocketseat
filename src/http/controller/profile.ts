import { makeGetUserProfileUseCase } from '@/use-cases/factory/make-get-user-profile-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getUserProfile = makeGetUserProfileUseCase()

  const { user } = await getUserProfile.execute({ userId: request.user.sub })

  const { password_hash, ...userWithoutPassword } = user

  return reply.status(200).send({
    user: {
      ...userWithoutPassword,
    },
  })
}
