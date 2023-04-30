import { prisma } from '@/lib/prisma'
import { PrismaUsersRepostory } from '@/repositories/prisma-users-repository'
import { hash } from 'bcryptjs'

interface registerUseCaseRequest {
  name: string
  email: string
  password: string
}

export async function registerUseCase({
  name,
  email,
  password,
}: registerUseCaseRequest) {
  const password_hash = await hash(password, 6)

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userWithSameEmail) {
    throw new Error('E-mail already exits')
  }

  const prismaUsersRepository = new PrismaUsersRepostory()
  await prismaUsersRepository.create({ name, email, password_hash })
}
