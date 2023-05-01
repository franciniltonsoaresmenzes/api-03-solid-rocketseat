import { PrismaUsersRepostory } from '@/repositories/prisma/prisma-users-repository'
import { RegisterUseCase } from '../register'

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepostory()
  const registerUseCase = new RegisterUseCase(usersRepository)

  return registerUseCase
}
